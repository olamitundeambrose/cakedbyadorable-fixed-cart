import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, token, functionsVersion } = appParams;

// For static hosting, create a minimal client or mock client
export const base44 = {
  // Mock the Base44 client methods that the app expects
  auth: {
    getCurrentUser: () => Promise.resolve(null),
    signOut: () => Promise.resolve(),
  },
  apps: {
    getPublicSettings: () => Promise.resolve({ public_settings: {} }),
  },
  // Add other methods as needed
  query: () => Promise.resolve([]),
  create: () => Promise.resolve({}),
  update: () => Promise.resolve({}),
  delete: () => Promise.resolve({}),
};
