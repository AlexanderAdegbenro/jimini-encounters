import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const loadingStateStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
    backgroundColor: colors.background,
  },
});
