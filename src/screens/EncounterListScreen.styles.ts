import { StyleSheet, Platform } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export const encounterListStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  row: {
    minHeight: 44,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: { elevation: 1 },
      default: {},
    }),
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  initials: {
    ...typography.body,
    fontWeight: '600',
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
