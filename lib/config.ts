import type { AppConfig, EnvKey } from "@/types/config";

export const config: Record<EnvKey, AppConfig> = {
  dev: {
    gizlitext: process.env.NEXT_PUBLIC_GIZLITEXT_DEV,
    firebase: {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY_DEV ?? "",
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN_DEV ?? "",
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID_DEV ?? "",
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_DEV ?? "",
      messagingSenderId:
        process.env.NEXT_PUBLIC_FIREBASE_MSG_SENDER_ID_DEV ?? "",
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID_DEV ?? "",
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID_DEV ?? "",
    },
  },
  prod: {
    gizlitext: process.env.NEXT_PUBLIC_GIZLITEXT_PROD,
    firebase: {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY_PROD ?? "",
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN_PROD ?? "",
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID_PROD ?? "",
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_PROD ?? "",
      messagingSenderId:
        process.env.NEXT_PUBLIC_FIREBASE_MSG_SENDER_ID_PROD ?? "",
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID_PROD ?? "",
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID_PROD ?? "",
    },
  },
};
