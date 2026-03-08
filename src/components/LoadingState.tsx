import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { loadingStateStyles as styles } from './LoadingState.styles';

export function LoadingState() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}
