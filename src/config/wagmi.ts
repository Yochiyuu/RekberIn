import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { liskSepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Rekber Drew System',
  projectId: 'YOUR_PROJECT_ID',
  chains: [liskSepolia],
});