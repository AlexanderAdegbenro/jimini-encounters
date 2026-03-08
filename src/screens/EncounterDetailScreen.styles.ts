import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export const encounterDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionHeader: {
    ...typography.caption,
    color: colors.primary, // Using Jimini Teal for accents
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 12,
    marginTop: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    // Subtle Shadow
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  fieldContainer: {
    marginBottom: 12,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  value: {
    ...typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: 2,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gridField: {
    flex: 1, // Creates the 50/50 split
  },
  fullWidthField: {
    width: '100%',
  },
  divider: {
    height: 1,
    backgroundColor: '#F2F4F7', // Very subtle light gray
    marginVertical: 12,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  primaryText: {
    color: '#00D1C1', // Jimini Teal for the Status value
    fontWeight: '700',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusBadgeCompleted: {
    backgroundColor: '#D1FAE5',
  },
  statusBadgeScheduled: {
    backgroundColor: '#FEF3C7',
  },
  statusBadgeDefault: {
    backgroundColor: '#F3F4F6',
  },
  statusBadgeTextCompleted: {
    ...typography.caption,
    fontWeight: '600',
    color: '#065F46',
  },
  statusBadgeTextScheduled: {
    ...typography.caption,
    fontWeight: '600',
    color: '#92400E',
  },
  statusBadgeTextDefault: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  notesCard: {
    backgroundColor: '#F2F4F7', // Light gray contrast for clinical notes
    borderColor: '#D0D5DD',
  },
  notesText: {
    ...typography.body,
    lineHeight: 24,
    color: colors.textPrimary,
    fontStyle: 'italic',
  },
  assessmentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  assessmentName: {
    ...typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  scoreBadge: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  scoreText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#026AA2',
  },
});