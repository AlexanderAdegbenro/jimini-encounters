/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-expo',
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@shopify/flash-list|@react-native-async-storage/async-storage)',
  ],
  modulePathIgnorePatterns: ['.expo/'],
  testPathIgnorePatterns: ['/node_modules/'],
  fakeTimers: { enableGlobally: true },
  moduleNameMapper: {
    '^expo/src/winter$': '<rootDir>/__mocks__/expo-winter.js',
  },
};
