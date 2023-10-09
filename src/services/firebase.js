import { initializeApp } from 'firebase/app';
const firebaseConfig = {
  apiKey: 'AIzaSyASGq7xMYKVVs5_VNO28mMWbD0RTG-tD3o',
  authDomain: 'ironman-project-ee339.firebaseapp.com',
  projectId: 'ironman-project-ee339',
  storageBucket: 'ironman-project-ee339.appspot.com',
  messagingSenderId: '434510094271',
  appId: '1:434510094271:web:65e6763f416d4fd4df8b0a'
};
export const setupFirebase = () => {
  initializeApp(firebaseConfig);
};
