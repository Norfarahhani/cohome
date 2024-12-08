import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'cohome',
  webDir: 'www',
  server: {
    url: 'https://cohome-4dc5d.web.app',
    cleartext: false,
  },
  plugins: {
    SocialLogin: {
      providers: {
        google: {
          clientId:
            '177188313300-hunumgnolnkojc9ldb505ucia6dfq64r.apps.googleusercontent.com', // Replace with your Google Client ID
        },
      },
    },
    GoogleAuth: {
      scopes: ['profile', 'email', 'https://www.googleapis.com/auth/firebase.messaging', 'https://www.googleapis.com/auth/drive.file'],
      serverClientId: '177188313300-hunumgnolnkojc9ldb505ucia6dfq64r.apps.googleusercontent.com', // Use the web client ID
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
