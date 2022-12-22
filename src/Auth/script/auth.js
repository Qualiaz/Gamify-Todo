import { auth, db } from "../../firebase/config";

import {
  loginContainer,
  formLogin,
  loginEmail,
  loginPassword,
  loginGoogleBtn,
  signupContainer,
  formSignup,
  signupPassword,
  signupEmail,
  signupDisplayName,
  askSignupBtn,
  askLoginBtn,
} from "./authDOM";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
/////////////////

export default function initAuthPageScript() {
  // SIGN UP //
  formSignup.addEventListener("submit", (e) => {
    e.preventDefault();
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
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  });

  // LOGIN EMAIL //
  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
      .then((cred) => {})
      .catch((err) => console.log(err));
  });

  // LOGIN GOOGLE //
  loginGoogleBtn.addEventListener("click", (e) => {
    e.preventDefault();
    signInWithPopup(auth, new GoogleAuthProvider()).then((res) => {
      const credential = GoogleAuthProvider.credentialFromResult(res);
      const user = res.user;
      console.log(credential);
    });
  });

  // CHECK AUTH STATE //
  onAuthStateChanged(auth, (user) => {
    if (user) {
      window.location.pathname = "/";
    } else {
      console.log("AuthState signed out");
    }
  });

  askSignupBtn.addEventListener("click", (e) => {
    loginContainer.classList.add("hidden");
    signupContainer.classList.remove("hidden");
    console.log("clicked");
  });

  askLoginBtn.addEventListener("click", (e) => {
    signupContainer.classList.add("hidden");
    loginContainer.classList.remove("hidden");
  });
}
