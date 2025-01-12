import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cohome.app',
  appName: 'CoHome',
  webDir: 'www',
  server: {
    cleartext: true,
  }
};

export default config;
