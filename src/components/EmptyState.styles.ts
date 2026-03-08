import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export const emptyStateStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
    padding: 24,
    backgroundColor: colors.background,
  },
  text: {
    ...typography.body,
    color: colors.textSecondary,
  },
});
