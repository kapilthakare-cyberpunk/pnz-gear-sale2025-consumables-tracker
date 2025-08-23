const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const serviceAccountPath = path.join(__dirname, '..', 'pnz-gear-sale-tracker-improved-firebase-adminsdk-fbsvc-2a899f4bf0.json');
if(!fs.existsSync(serviceAccountPath)){
  console.error('Service account JSON not found at', serviceAccountPath);
  process.exit(1);
}
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

(async ()=>{
  const email = 'admin@primesandzooms.com';
  try{
    const user = await admin.auth().getUserByEmail(email);
    const uid = user.uid;
    const db = admin.firestore();
  await db.doc(`admins/${uid}`).set({isAdmin:true, role:'superadmin', createdAt: admin.firestore.FieldValue.serverTimestamp()});
  console.log('admins created for uid', uid);
  process.exit(0);
  }catch(e){
  console.error('Failed to ensure admins doc for', email, e);
    process.exit(2);
  }
})();
