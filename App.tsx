import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryProvider } from './src/providers/QueryProvider';
import { RootStack } from './src/navigation/RootStack';
import { ErrorState } from './src/components/ErrorState';

export default function App() {
  return (
    <SafeAreaProvider>
      <ErrorBoundary
        fallbackRender={({ resetErrorBoundary }: FallbackProps) => (
          <ErrorState
            message="A critical error occurred."
            onRetry={resetErrorBoundary}
          />
        )}
      >
        <QueryProvider>
          <NavigationContainer>
            <StatusBar style="auto" />
            <RootStack />
          </NavigationContainer>
        </QueryProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}
