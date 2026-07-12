import fs from 'fs';
import { MOCK_PLANNER_DETAILS } from './src/mockData/plannerDetails.js';
import { MOCK_BUYER_RECOMMENDATIONS } from './src/mockData/buyerRecommendations.js';

fs.writeFileSync('./backend/buyer_workspace_data.json', JSON.stringify({
  plannerDetails: MOCK_PLANNER_DETAILS,
  buyerRecommendations: MOCK_BUYER_RECOMMENDATIONS
}, null, 2));
