import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useRoute, RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/types';
import { api } from '../api/client';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { encounterDetailStyles as styles } from './EncounterDetailScreen.styles';

type DetailRoute = RouteProp<RootStackParamList, 'EncounterDetail'>;

export function EncounterDetailScreen() {
  const { params } = useRoute<DetailRoute>();
  const { id } = params;

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['encounter', id],
    queryFn: () => api.getEncounterById(id),
  });

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError || !data) {
    return (
      <ErrorState
        message={error instanceof Error ? error.message : 'Failed to load encounter.'}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.section}>
        <Text style={styles.label}>ID</Text>
        <Text style={styles.value}>{data.id}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Patient initials</Text>
        <Text style={styles.value}>{data.patientInitials}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Date</Text>
        <Text style={styles.value}>{data.encounterDate.slice(0, 10)}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Type</Text>
        <Text style={styles.value}>{data.encounterType}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Duration (min)</Text>
        <Text style={styles.value}>{data.duration}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Status</Text>
        <Text style={styles.value}>{data.status}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Notes</Text>
        <Text style={styles.value}>{data.notes}</Text>
      </View>
      {data.assessments.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.label}>Assessments</Text>
          {data.assessments.map((a, i) => (
            <Text key={i} style={styles.value}>
              {a.name}: {a.score}
            </Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
