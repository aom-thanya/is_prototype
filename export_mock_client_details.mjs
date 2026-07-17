import fs from 'fs';
import { GET_MOCK_CLIENT } from './src/mockData/clientDetails.js';

const clients = {
  "1": GET_MOCK_CLIENT("1"),
  "2": GET_MOCK_CLIENT("2"),
  "3": GET_MOCK_CLIENT("3")
};

fs.writeFileSync('./backend/client_details_data.json', JSON.stringify(clients, null, 2));
