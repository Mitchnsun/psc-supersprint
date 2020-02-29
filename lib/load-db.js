export default async function loadDb() {
  const firebase = await import('firebase/app');
  await import('firebase/database');

  try {
    firebase.initializeApp({
      apiKey: 'AIzaSyBnJfndT0mQIfO_fTcuj0qmkag6cQDH4V0',
      authDomain: 'supersprintparis20.firebaseapp.com',
      databaseURL: 'https://supersprintparis20.firebaseio.com',
      projectId: 'supersprintparis20',
      storageBucket: 'supersprintparis20.appspot.com',
      messagingSenderId: '503589705326',
      appId: '1:503589705326:web:d4c6b8c17f73f83d82787f',
      measurementId: 'G-CEC7CQNF65',
    });
  } catch (err) {
    // we skip the "already exists" message which is
    // not an actual error when we're hot-reloading
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack);
    }
  }

  return firebase.database();
}
