import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyASGq7xMYKVVs5_VNO28mMWbD0RTG-tD3o',
  authDomain: 'ironman-project-ee339.firebaseapp.com',
  projectId: 'ironman-project-ee339',
  storageBucket: 'ironman-project-ee339.appspot.com',
  messagingSenderId: '434510094271',
  appId: '1:434510094271:web:65e6763f416d4fd4df8b0a'
};

// 初始化 Firebase
export const setupFirebase = initializeApp(firebaseConfig);

// 取得 Firestore 實例
export const db = getFirestore(setupFirebase);

// 取得 getStorage 實例
export const storage = getStorage(setupFirebase);
