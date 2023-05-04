import { db } from "../firebase/config";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import InitUserData from "../Model/InitUserData";
import { state } from "../Model/main/Model";

export default async function initUser() {
  let isUserAlreadyExists = null;

  async function createUserDoc(uid, email, displayName) {
    const userDocRef = doc(db, "users", uid);
    const userInst = new InitUserData(email, displayName);
    const userData = Object.assign({}, userInst);
    await setDoc(userDocRef, userData);
  }

  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        (async () => {
          const doc = await getDoc(userDocRef);
          isUserAlreadyExists = true;
          // if user is new
          if (!doc.exists()) {
            await createUserDoc(user.uid, user.email, user.displayName);
            state.userProfile.displayName = user.displayName;
            state.userProfile.email = user.email;
            isUserAlreadyExists = false;
          }
          resolve(isUserAlreadyExists);
        })();
      }
    });
  });

  // return isUserAlreadyExists;
}
