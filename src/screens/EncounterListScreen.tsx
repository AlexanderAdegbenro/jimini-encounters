import React, { useCallback } from 'react';
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
import { formatEncounterDateParts } from '../utils/date';
import { formatLabel } from '../utils/string';
import { encounterListStyles as styles } from './EncounterListScreen.styles';

const PAGE_SIZE = 20;

type Nav = NativeStackNavigationProp<RootStackParamList, 'EncounterList'>;

/**
 * Optimized Status Badge using React.memo to prevent unnecessary re-renders.
 */
const StatusBadge = React.memo(({ status }: { status: string }) => {
  const isCompleted = status === 'completed';
  const isScheduled = status === 'scheduled';

  const badgeStyle = isCompleted
    ? styles.statusBadgeCompleted
    : isScheduled
      ? styles.statusBadgeScheduled
      : styles.statusBadgeDefault;

  const textStyle = isCompleted
    ? styles.statusBadgeTextCompleted
    : isScheduled
      ? styles.statusBadgeTextScheduled
      : styles.statusBadgeTextDefault;

  return (
    <View style={[styles.statusBadge, badgeStyle]}>
      <Text style={textStyle}>{formatLabel(status)}</Text>
    </View>
  );
});
StatusBadge.displayName = 'StatusBadge';

/**
 * Encounter Row component defined outside to maintain a stable reference.
 * Accepts onPress(id, patientInitials?) so the parent can pass a stable callback and avoid list jitter.
 */
function EncounterRow({
  item,
  onPress,
}: {
  item: Encounter;
  onPress: (id: string, patientInitials?: string) => void;
}) {
  const handlePress = useCallback(
    () => onPress(item.id, item.patientInitials),
    [item.id, item.patientInitials, onPress]
  );
  const { datePart, timePart } = formatEncounterDateParts(item.encounterDate);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`View encounter for patient ${item.patientInitials}`}
      style={({ pressed }) => [
        styles.row,
        pressed && { transform: [{ scale: 0.98 }] },
      ]}
      onPress={handlePress}
      android_ripple={{ color: '#eee' }}
    >
      <View style={styles.rowContent}>
        <Text style={styles.initials}>{item.patientInitials}</Text>
        <View style={styles.meta}>
          <Text style={styles.type}>{formatLabel(item.encounterType)}</Text>
          <View style={styles.dateRow}>
            <Text style={styles.datePartBold}>{datePart}</Text>
            {timePart ? (
              <Text style={styles.datePartTime}>{timePart}</Text>
            ) : null}
          </View>
        </View>
        <StatusBadge status={item.status} />
      </View>
    </Pressable>
  );
}

const MemoizedEncounterRow = React.memo(EncounterRow);

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

  // Memoizing handlers to prevent unnecessary FlashList re-renders
  const onRefresh = useCallback(() => refetch(), [refetch]);

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handlePress = useCallback(
    (id: string, patientInitials?: string) => {
      navigation.navigate('EncounterDetail', { id, patientInitials });
    },
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }: { item: Encounter }) => (
      <MemoizedEncounterRow item={item} onPress={handlePress} />
    ),
    [handlePress]
  );

  const keyExtractor = useCallback((item: Encounter) => item.id, []);

  if (isLoading) return <LoadingState />;

  if (isError) {
    return (
      <ErrorState
        message={error instanceof Error ? error.message : 'Failed to load encounters.'}
        onRetry={() => refetch()}
      />
    );
  }

  if (encounters.length === 0) return <EmptyState />;

  return (
    <View style={styles.container}>
      {/* Note: We let TypeScript infer the generic type from 'data' 
        to avoid the common FlashList generic JSX error.
      */}
      <FlashList
        data={encounters}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
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