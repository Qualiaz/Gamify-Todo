import { auth } from "../../firebase/config";

import {
  loginContainer,
  formLogin,
  loginEmail,
  loginPassword,
  loginGoogleBtn,
  signupContainer,
  formSignup,
  signupPassword,
  signupEmailLabel,
  signupEmail,
  signupDisplayName,
  askSignupBtn,
  askLoginBtn,
  loginEmailLabel,
  loginPasswordLabel,
} from "./authDOM";

import signupCheck, { renderInvalidCheck } from "./signupCheck";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { userId } from "../../Controller/TasksComponentController";
/////////////////

export default function initAuthPageScript() {
  // SIGN UP //
  formSignup.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("auth script signup");
    if (!signupCheck().ok) return;

    createUserWithEmailAndPassword(
      auth,
      signupEmail.value,
      signupPassword.value
    )
      .then((cred) => {
        const user = cred.user;
        updateProfile(cred.user, {
          displayName: signupDisplayName.value,
        });
      })
      .catch((err) => {
        if (err.code === "auth/email-already-in-use") {
          renderInvalidCheck(
            "emailUsed",
            signupEmailLabel,
            " (Email already in use) "
          );
        }
        return;
      });
  });

  // LOGIN EMAIL //
  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
      .then((cred) => {
        console.log("sign in success");
      })
      .catch((err) => {
        if (err.code === "auth/user-not-found") {
          renderInvalidCheck(
            "emailNotFound",
            loginEmailLabel,
            " (Email not found) "
          );
        }
        if (err.code === "auth/wrong-password") {
          renderInvalidCheck(
            "wrongPassword",
            loginPasswordLabel,
            " (Wrong password) "
          );
        }
      });
  });

  // LOGIN GOOGLE //
  loginGoogleBtn.addEventListener("click", (e) => {
    e.preventDefault();
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((res) => {
        const credential = GoogleAuthProvider.credentialFromResult(res);
        const user = res.user;
      })
      .catch((err) => {});
  });

  // CHECK AUTH STATE //
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // new UserModel(user);
      // userId = user.uid;
      console.log(localStorage.setItem("user", user.uid));
      window.location.pathname = "/";
    } else {
      console.log("AuthState signed out");
    }
  });

  askSignupBtn.addEventListener("click", () => {
    loginContainer.classList.add("hidden");
    signupContainer.classList.remove("hidden");
  });

  askLoginBtn.addEventListener("click", () => {
    signupContainer.classList.add("hidden");
    loginContainer.classList.remove("hidden");
  });
}
