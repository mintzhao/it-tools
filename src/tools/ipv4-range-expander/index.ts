import { UnfoldMoreOutlined } from '@vicons/material';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'IPv4 range expander',
  path: '/ipv4-range-expander',
  description:
    'Given a start and an end IPv4 address this tool calculates a valid IPv4 network with its CIDR notation.',
  keywords: ['ipv4', 'range', 'expander', 'subnet', 'creator', 'cidr'],
  component: () => import('./ipv4-range-expander.vue'),
  icon: UnfoldMoreOutlined,
  createdAt: new Date('2023-04-19'),
  relatedToolPaths: ["/ipv4-address-converter", "/ipv4-subnet-calculator", '/ipv6-ula-generator'],
});
