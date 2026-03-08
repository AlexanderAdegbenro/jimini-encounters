import { StyleSheet } from 'react-native';

export const encounterListStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  initials: {
    fontSize: 16,
    fontWeight: '600',
    width: 40,
  },
  meta: {
    flex: 1,
  },
  type: {
    fontSize: 15,
  },
  date: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  status: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    padding: 16,
    alignItems: 'center',
  },
});
