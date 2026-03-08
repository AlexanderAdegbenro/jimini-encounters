import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { api } from '../api/client';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { formatEncounterDateTime } from '../utils/date';
import { formatLabel } from '../utils/string';
import { encounterDetailStyles as styles } from './EncounterDetailScreen.styles';

/**
 * Detail Field component for consistent label/value pairs.
 * Optional style prop allows horizontal/grid layouts.
 */
const DetailField = ({ label, value, style }: { label: string; value: string; style?: any }) => (
  <View style={[styles.fieldContainer, style]}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

/**
 * Status badge for Session Details (styled for detail context).
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

export function EncounterDetailScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { id } = route.params ?? {};

  // Guard against missing ID
  if (!id) {
    return <ErrorState message="Encounter ID is missing" onRetry={() => navigation.goBack()} />;
  }

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['encounter', id ?? ''],
    queryFn: () => api.getEncounterById(id),
  });

  if (isLoading) return <LoadingState />;
  if (isError || !data) {
    return <ErrorState message="Could not load session details." onRetry={() => refetch()} />;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* SECTION 1: Patient Context */}
      <Text style={styles.sectionHeader}>Patient Information</Text>
      <View style={styles.card}>
        <DetailField label="Patient Initials" value={data.patientInitials} />
        <DetailField label="Encounter ID" value={data.id} />
      </View>

      {/* SECTION 2: Session Logistics */}
      <Text style={styles.sectionHeader}>Session Details</Text>
      <View style={styles.card}>
        {/* Row 1: Date & Time - Full Width */}
        <DetailField
          label="Date & Time"
          value={formatEncounterDateTime(data.encounterDate)}
          style={styles.fullWidthField}
        />

        <View style={styles.divider} />

        {/* Row 2: Type & Duration - Split Width */}
        <View style={styles.gridRow}>
          <DetailField
            label="Type"
            value={formatLabel(data.encounterType)}
            style={styles.gridField}
          />
          <DetailField
            label="Duration"
            value={`${data.duration}m`}
            style={styles.gridField}
          />
        </View>

        <View style={styles.divider} />

        {/* Row 3: Status with Badge - Full Width */}
        <View style={styles.statusRow}>
          <Text style={styles.label}>Status</Text>
          <StatusBadge status={data.status} />
        </View>
      </View>

      {/* SECTION 3: Clinical Content */}
      <Text style={styles.sectionHeader}>Clinical Notes</Text>
      <View style={[styles.card, styles.notesCard]}>
        <Text style={styles.notesText}>{data.notes}</Text>
      </View>

      {/* SECTION 4: Assessments */}
      {data.assessments && data.assessments.length > 0 && (
        <>
          <Text style={styles.sectionHeader}>Assessments</Text>
          {data.assessments.map((item, index) => (
            <View key={index} style={styles.assessmentRow}>
              <Text style={styles.assessmentName}>{item.name}</Text>
              <View style={styles.scoreBadge}>
                <Text style={styles.scoreText}>Score: {item.score}</Text>
              </View>
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
}