import React from 'react';
import {
  View,
  Text,
  Pressable,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import type { Encounter } from '../types/encounter';
import { api } from '../api/client';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { EmptyState } from '../components/EmptyState';
import { encounterListStyles as styles } from './EncounterListScreen.styles';

const PAGE_SIZE = 20;
const ESTIMATED_ITEM_HEIGHT = 88;

type Nav = NativeStackNavigationProp<RootStackParamList, 'EncounterList'>;

function EncounterRow({
  item,
  onPress,
}: {
  item: Encounter;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.row} onPress={onPress} android_ripple={{ color: '#eee' }}>
      <View style={styles.rowContent}>
        <Text style={styles.initials}>{item.patientInitials}</Text>
        <View style={styles.meta}>
          <Text style={styles.type}>{item.encounterType}</Text>
          <Text style={styles.date}>{item.encounterDate.slice(0, 10)}</Text>
        </View>
        <Text style={styles.status}>{item.status}</Text>
      </View>
    </Pressable>
  );
}

export function EncounterListScreen() {
  const navigation = useNavigation<Nav>();

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['encounters'],
    queryFn: ({ pageParam }) => api.getEncounters(pageParam as number, PAGE_SIZE),
    initialPageParam: 1,
    getNextPageParam: (last) =>
      last.pagination.hasMore ? last.pagination.page + 1 : undefined,
  });

  const encounters = data?.pages.flatMap((p) => p.encounters) ?? [];

  const onRefresh = () => refetch();

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return (
      <ErrorState
        message={error instanceof Error ? error.message : 'Failed to load encounters.'}
        onRetry={() => refetch()}
      />
    );
  }

  if (encounters.length === 0) {
    return <EmptyState />;
  }

  return (
    <View style={styles.container}>
      <FlashList<Encounter>
        data={encounters}
        renderItem={({ item }) => (
          <EncounterRow
            item={item}
            onPress={() => navigation.navigate('EncounterDetail', { id: item.id })}
          />
        )}
        keyExtractor={(item) => item.id}
        estimatedItemSize={ESTIMATED_ITEM_HEIGHT}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />
        }
        ListFooterComponent={
          isFetchingNextPage ? (
            <View style={styles.footer}>
              <ActivityIndicator size="small" />
            </View>
          ) : null
        }
      />
    </View>
  );
}
