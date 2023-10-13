import {
  collection,
  addDoc,
  doc,
  where,
  query,
  getDocs
} from 'firebase/firestore';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { setupFirebase, db } from '@/services/firebase.js';
import { toast } from 'vue3-toastify';

// 取得 getMessaging實例
export const messaging = getMessaging(setupFirebase);

onMessage(messaging, payload => {
  console.log('Message received. ', payload);
  toast(`${payload.notification.title}<br>${payload.notification.body}`);
});

export const getFCMToken = () => {
  getToken(messaging, {
    vapidKey:
      'BNJBA-vn3n0piRfxaEjP5WzC-MAk9WGd59p_oV8d37N6duCv__VmX-cfwwTzSiy7m8k6pHPDDztECNPAIxRqui8'
  })
    .then(async currentToken => {
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        // ...
        console.log('currentToken', currentToken);

        // 檢查 token 是否已經存在
        const exists = await checkTokenExists(currentToken);
        if (!exists) {
          try {
            const docRef = await addDoc(collection(db, 'fcmTokens'), {
              token: currentToken,
              date: new Date().getTime()
            });
            console.log('Document written with ID: ', docRef.id);
          } catch (e) {
            console.error('Error adding document: ', e);
          }
        }
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
};

const checkTokenExists = async token => {
  const tokensCollection = collection(db, 'fcmTokens');
  const q = query(tokensCollection, where('token', '==', token));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty; // 如果查詢結果不為空，則返回 true，表示 token 已存在
};
