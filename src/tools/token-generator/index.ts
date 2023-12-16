import { ArrowsShuffle } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';
// import { tool as passwordStrengthAnalyser } from '../password-strength-analyser';

export const tool = defineTool({
  name: translate('tools.token-generator.title'),
  path: '/token-generator',
  description: translate('tools.token-generator.description'),
  keywords: ['token', 'random', 'string', 'alphanumeric', 'symbols', 'number', 'letters', 'lowercase', 'uppercase', 'password'],
  relatedToolPaths: ["/password-strength-analyser", "/bip39-generator", "/bcrypt"],
  component: () => import('./token-generator.tool.vue'),
  icon: ArrowsShuffle,
});
