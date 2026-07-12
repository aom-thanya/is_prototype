import fs from 'fs';
import { MOCK_DASHBOARD_DATA, MOCK_SLA_STATS } from './src/mockData/dashboardData.js';

fs.writeFileSync('./backend/dashboard_data.json', JSON.stringify({
  briefs: MOCK_DASHBOARD_DATA,
  stats: MOCK_SLA_STATS
}, null, 2));
