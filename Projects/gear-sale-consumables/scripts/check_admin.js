const admin = require('firebase-admin');
const path = require('path');
const svc = path.join(__dirname, '..', 'pnz-gear-sale-tracker-improved-firebase-adminsdk-fbsvc-2a899f4bf0.json');
try{
  admin.initializeApp({credential: admin.credential.cert(require(svc))});
}catch(e){ console.error('Failed to init admin SDK', e.message); process.exit(2); }
(async ()=>{
  const email = 'admin@primesandzooms.com';
  try{
    const user = await admin.auth().getUserByEmail(email);
    console.log('Auth user found:', user.uid, user.email);
    const db = admin.firestore();
  const doc = await db.doc(`admins/${user.uid}`).get();
  console.log('admins exists?', doc.exists);
  if(doc.exists) console.log('admins data:', doc.data());
    process.exit(0);
  }catch(e){
    console.error('Check failed:', e.message);
    process.exit(3);
  }
})();
