import firebase from "firebase";

import { ApiKey, AuthDomain, ProjectId, StorageBucket, MessagingSenderId, AppId} from './env.js'
const firebaseApp = firebase.initializeApp({
    apiKey: ApiKey,
    authDomain: AuthDomain,
    projectId: ProjectId,
    storageBucket: StorageBucket,
    messagingSenderId: MessagingSenderId,
    appId: AppId,
});

  export const db = firebaseApp.firestore();
  export const auth = firebase.auth();
  export const storage = firebase.storage();