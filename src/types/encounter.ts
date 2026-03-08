export interface Encounter {
  id: string;
  patientId: string;
  patientInitials: string;
  encounterDate: string;
  encounterType: string;
  duration: number;
  status: string;
  notes: string;
}

export interface Assessment {
  name: string;
  score: number;
}

export interface EncounterDetail extends Encounter {
  assessments: Assessment[];
}

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
}

export interface EncountersResponse {
  encounters: Encounter[];
  pagination: Pagination;
}
