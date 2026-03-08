import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryProvider } from './src/providers/QueryProvider';
import { RootStack } from './src/navigation/RootStack';

export default function App() {
  return (
    <SafeAreaProvider>
      <QueryProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <RootStack />
        </NavigationContainer>
      </QueryProvider>
    </SafeAreaProvider>
  );
}
