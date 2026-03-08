import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export const encounterDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  value: {
    ...typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
  },
});
