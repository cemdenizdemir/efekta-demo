import { config } from "@/lib/config";
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// import type { FirebaseConfig } from "@/types/config";

const env = (process.env.ENV_OPT ?? "dev") as "dev" | "prod";
const firebaseConfig = config[env].firebase;

//

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
