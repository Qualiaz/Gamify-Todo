import { db } from "../firebase/config";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import InitUserData from "../Model/InitUserData";

export default function initUser() {
  async function createUserDoc(uid, email, displayName) {
    const userDocRef = doc(db, "users", uid);
    const userInst = new InitUserData(email, displayName);
    const userData = Object.assign({}, userInst);
    await setDoc(userDocRef, userData);
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      (async () => {
        const doc = await getDoc(userDocRef);
        // if user is new
        if (!doc.exists()) {
          createUserDoc(user.uid, user.email, user.displayName);
        }
      })();
    } else {
      window.location.href = "/auth.html";
    }
  });
}
