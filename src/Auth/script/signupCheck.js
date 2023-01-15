import {
  signupPasswordLabel,
  signupPassword,
  signupRepeatPassword,
  signupDisplayNameLabel,
  signupDisplayName,
} from "./authDOM";

export function renderInvalidCheck(elementId, parentEl, textContent) {
  if (parentEl.firstElementChild) {
    parentEl.removeChild(parentEl.firstElementChild);
  }
  if (!parentEl.firstElementChild) {
    const span = document.createElement("span");
    span.classList.add("auth__invalid-check");
    span.id = elementId;
    span.textContent = textContent;
    parentEl.insertAdjacentElement("beforeend", span);
  }
}

export default function signupCheck() {
  let ok = true;
  let check = {
    passwordLength: true,
    passwordsMatch: true,
    displayNameLength: true,
    displayNameChars: true,
  };

  (function checkPasswords() {
    const password = signupPassword.value;
    const repeatPassword = signupRepeatPassword.value;

    password.length < 6
      ? (check.passwordLength = false)
      : (check.passwordLength = true);

    password !== repeatPassword
      ? (check.passwordsMatch = false)
      : (check.passwordsMatch = true);

    // RENDER

    // password match
    if (!check.passwordsMatch) {
      renderInvalidCheck(
        "pwMatchInvalid",
        signupPasswordLabel,
        " (Passwords don't match) "
      );
    } else {
      const invalidEl = document.getElementById("pwMatchInvalid");
      if (invalidEl !== null) signupPasswordLabel.removeChild(invalidEl);
    }

    // // password length
    if (!check.passwordLength) {
      renderInvalidCheck(
        "pwLengthInvalid",
        signupPasswordLabel,
        " (6 characters min) "
      );
    } else {
      const invalidEl = document.getElementById("pwLengthInvalid");
      if (invalidEl !== null) signupPasswordLabel.removeChild(invalidEl);
    }
  })();

  (function checkDisplayName() {
    // remove additional spaces
    const displayName = signupDisplayName.value.trim();

    displayName.length > 1 && displayName.length < 25
      ? (check.displayNameLength = true)
      : (check.displayNameLength = false);

    // check characters value contains only letters and spaces
    /^[a-zA-Z\s]*$/.test(displayName)
      ? (check.displayNameChars = true)
      : (check.displayNameChars = false);

    // RENDER

    // invalid characters
    if (!check.displayNameChars) {
      renderInvalidCheck(
        "dnCharsInvalid",
        signupDisplayNameLabel,
        " (Must contain only letters and spaces) "
      );
    } else {
      const invalidEl = document.getElementById("dnCharsInvalid");
      if (invalidEl !== null) signupDisplayNameLabel.removeChild(invalidEl);
    }

    // invalid length
    if (!check.displayNameLength) {
      if (displayName.length > 25) {
        renderInvalidCheck(
          "dnLengthInvalid",
          signupDisplayNameLabel,
          " (Must contain less than 25 characters) "
        );
      } else
        renderInvalidCheck(
          "dnLengthInvalid",
          signupDisplayNameLabel,
          " (Must contain at least 2 characters) "
        );
    } else {
      const invalidEl = document.getElementById("dnLengthInvalid");
      if (invalidEl !== null) signupDisplayNameLabel.removeChild(invalidEl);
    }
  })();

  Object.values(check).forEach((value) => {
    if (!value) ok = false;
  });

  return { ok };
}
