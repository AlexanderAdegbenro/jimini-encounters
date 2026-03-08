import { StyleSheet, Platform } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export const encounterListStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingVertical: 12,
    paddingBottom: 24,
  },
  row: {
    backgroundColor: colors.white,
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 16,
    borderRadius: 12,
    minHeight: 44,
    borderWidth: 1,
    borderColor: colors.border,
    ...Platform.select({
      ios: {
        shadowColor: '#101828',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: { elevation: 2 },
      default: {},
    }),
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  initials: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    width: 40,
  },
  meta: {
    flex: 1,
  },
  type: {
    ...typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 2,
    gap: 4,
  },
  datePartBold: {
    ...typography.secondary,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  datePartTime: {
    ...typography.secondary,
    fontWeight: '400',
    color: colors.textSecondary,
  },
  date: {
    ...typography.secondary,
    color: colors.textSecondary,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 100,
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBadgeCompleted: {
    backgroundColor: colors.statusCompleted,
  },
  statusBadgeScheduled: {
    backgroundColor: colors.statusScheduled,
  },
  statusBadgeTextCompleted: {
    ...typography.secondary,
    fontWeight: '600',
    color: colors.statusCompletedText,
  },
  statusBadgeTextScheduled: {
    ...typography.secondary,
    fontWeight: '600',
    color: colors.statusScheduledText,
  },
  statusBadgeDefault: {
    backgroundColor: colors.border,
  },
  statusBadgeTextDefault: {
    ...typography.secondary,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  footer: {
    padding: 16,
    alignItems: 'center',
  },
});
