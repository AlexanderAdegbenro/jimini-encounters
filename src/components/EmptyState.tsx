import React from 'react';
import { View, Text } from 'react-native';
import { emptyStateStyles as styles } from './EmptyState.styles';

export function EmptyState() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No encounters yet.</Text>
    </View>
  );
}
