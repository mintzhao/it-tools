import { List } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'JSON to CSV',
  path: '/json-to-csv',
  description: 'Convert JSON to CSV with automatic header detection.',
  keywords: ['json', 'to', 'csv', 'convert'],
  component: () => import('./json-to-csv.vue'),
  icon: List,
  createdAt: new Date('2023-06-18'),
  // relatedToolPaths: ["/yaml-to-json-converter", "/yaml-to-toml", "/toml-to-json", "/toml-to-yaml", "/json-to-toml", "/json-to-yaml-converter"],
});
