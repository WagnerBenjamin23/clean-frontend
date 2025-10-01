import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { environments } from './environments'

const app = initializeApp(environments.firebaseConfig);
export const storage = getStorage(app);
