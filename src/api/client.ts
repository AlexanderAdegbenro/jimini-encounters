import {
  Encounter,
  EncounterDetail,
  EncountersResponse,
} from '../types/encounter';
import { logger } from '../logger/logger';

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const MOCK_DATA: Encounter[] = Array.from({ length: 100 }).map((_, i) => ({
  id: `enc_${i + 1}`,
  patientId: `pat_${1000 + i}`,
  patientInitials: ['AB', 'XY', 'JD', 'MT', 'SK'][i % 5],
  encounterDate: new Date(Date.now() - i * 3600000).toISOString(),
  encounterType: i % 2 === 0 ? 'therapy_session' : 'intake',
  duration: 50,
  status: 'completed',
  notes:
    'Patient showed improvement in anxiety management during the session.',
}));

export const api = {
  getEncounters: async (
    page: number,
    pageSize: number
  ): Promise<EncountersResponse> => {
    logger.debug('Fetching encounters', { page, pageSize });
    await delay(800);

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const encounters = MOCK_DATA.slice(start, end);

    return {
      encounters,
      pagination: {
        page,
        pageSize,
        total: MOCK_DATA.length,
        hasMore: end < MOCK_DATA.length,
      },
    };
  },

  getEncounterById: async (id: string): Promise<EncounterDetail> => {
    logger.debug('Fetching encounter detail', { id });
    await delay(500);
    const encounter = MOCK_DATA.find((e) => e.id === id);
    if (!encounter) throw new Error('Encounter not found');

    return {
      ...encounter,
      assessments: [{ name: 'GAD-7', score: 8 }],
    };
  },
};
