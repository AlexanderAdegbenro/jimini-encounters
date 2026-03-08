export type RootStackParamList = {
  EncounterList: undefined;
  EncounterDetail: { id: string; patientInitials?: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
