import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import { EncounterListScreen } from '../screens/EncounterListScreen';
import { EncounterDetailScreen } from '../screens/EncounterDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="EncounterList"
      screenOptions={{ headerBackTitle: 'Back' }}
    >
      <Stack.Screen
        name="EncounterList"
        component={EncounterListScreen}
        options={{ title: 'Encounters' }}
      />
      <Stack.Screen
        name="EncounterDetail"
        component={EncounterDetailScreen}
        options={{ title: 'Encounter' }}
      />
    </Stack.Navigator>
  );
}
