import { db } from "../firebase/config";
import { setDoc, doc, getDoc, addDoc } from "firebase/firestore";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import InitUserData from "../Model/InitUserData";

export default function initUser() {
  let userInst;
  async function createUserDoc(uid, email, displayName) {
    // const ref = doc(db, "users", user.uid);
    userInst = new InitUserData(email, displayName);
    const userData = Object.assign({}, userInst);
    await setDoc(doc(db, "users", uid), userData);
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      (async () => {
        const doc = await getDoc(userDocRef);
        // if user is New
        if (!doc.exists()) {
          createUserDoc(user.uid, user.email, user.displayName);
        }
      })();

      const profileName = document.getElementById("profileNameNav");
      profileName.textContent = user.displayName;
      const energyDOM = document.getElementById("energyNav");

      (async () => {
        const doc = await getDoc(userDocRef);
        const energyData = doc.data().stats.energyPoints;
        energyDOM.textContent = energyData;
      })();
    } else {
      window.location.href = "/auth.html";
    }
  });
}
