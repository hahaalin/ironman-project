import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { toast } from 'vue3-toastify';
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

// 取得 getMessaging實例
export const messaging = getMessaging(setupFirebase);

onMessage(messaging, payload => {
  console.log('Message received. ', payload);
  toast(`${payload.notification.title}<br>${payload.notification.body}`);
});

getToken(messaging, {
  vapidKey:
    'BL-CV5af2LaycuPIQGc1MlbxW91R1ZPioqoxwLSF-tNkzdeL6WtsIV1p7Syix4mEZtIzdOtC0d8Zc4z1oJGFHxU'
})
  .then(currentToken => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...
      console.log('currentToken', currentToken);
    } else {
      // Show permission request UI
      console.log(
        'No registration token available. Request permission to generate one.'
      );
      // ...
    }
  })
  .catch(err => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });
