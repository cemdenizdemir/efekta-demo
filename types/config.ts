export type EnvKey = "dev" | "prod";

export type AppConfig = {
  gizlitext?: string;
  firebase: FirebaseConfig;
};

export type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
};
