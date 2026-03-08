export type RootStackParamList = {
  EncounterList: undefined;
  EncounterDetail: { id: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
