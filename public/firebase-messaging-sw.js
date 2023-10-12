importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js'
);

firebase.initializeApp({
  apiKey: 'AIzaSyASGq7xMYKVVs5_VNO28mMWbD0RTG-tD3o',
  authDomain: 'ironman-project-ee339.firebaseapp.com',
  projectId: 'ironman-project-ee339',
  storageBucket: 'ironman-project-ee339.appspot.com',
  messagingSenderId: '434510094271',
  appId: '1:434510094271:web:65e6763f416d4fd4df8b0a'
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );

  const notificationTitle = payload.notification.title; //標題
  const notificationOptions = {
    body: payload.notification.body, //內文
    icon: '/vite.svg' //圖示
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
