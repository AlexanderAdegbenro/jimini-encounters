import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

const MIN_TOUCH_TARGET = 44;

export const errorStateStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
    padding: 24,
    backgroundColor: colors.background,
  },
  message: {
    ...typography.body,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 16,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    minHeight: MIN_TOUCH_TARGET,
    minWidth: MIN_TOUCH_TARGET,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 100,
  },
  buttonText: {
    ...typography.body,
    fontWeight: '600',
    color: colors.white,
  },
});
