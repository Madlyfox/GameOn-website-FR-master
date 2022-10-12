function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalClose = document.querySelectorAll(".close");
const formData = document.querySelectorAll(".formData");

const form = document.getElementById("form");
const firstnameEl = document.getElementById("firstname");
const lastnameEl = document.getElementById("lastname");
const emailEl = document.getElementById("email");
const birthdateEl = document.getElementById("birthdate");
const quantityEl = document.getElementById("quantity");
const radios = document.getElementsByName("location");
const checkbox = document.getElementById("checkbox1");

const isRequired = (value) => (value === "" ? false : true);
const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;
const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
modalClose.forEach((span) => span.addEventListener("click", closeModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

//FORM VALIDATION

//SHOW ERROR

function showError(input, message) {
  // get the form-field element
  const formControl = input.parentElement;
  // add the error class
  formControl.classList.remove("success");
  formControl.classList.add("error");
  // show the error message
  const small = formControl.querySelector("small");
  small.innerText = message;
}

//SHOW SUCCES

const showSuccess = (input) => {
  // get the form-field element
  const formConstrol = input.parentElement;

  // remove the error class
  formConstrol.classList.remove("error");
  formConstrol.classList.add("success");

  // hide the error message
  const error = formConstrol.querySelector("small");
  error.textContent = "";
};

//CHECK FIRSTNAME

const checkFirstname = () => {
  let valid = false;
  const min = 2,
    max = 25;
  const firstname = firstnameEl.value.trim();

  if (!isRequired(firstname)) {
    showError(firstnameEl, "Veuillez renseigner vote prénom.");
  } else if (!isBetween(firstname.length, min, max)) {
    showError(
      firstnameEl,
      `Veuillez entrer entre ${min} et ${max} caractères pour le champ du nom.`
    );
  } else {
    showSuccess(firstnameEl);
    valid = true;
  }
  return valid;
};

//CHECK LASTNAME

const checkLastname = () => {
  let valid = false;
  const min = 2,
    max = 25;
  const lastname = lastnameEl.value.trim();

  if (!isRequired(lastname)) {
    showError(lastnameEl, "Veuillez renseigner votre nom.");
  } else if (!isBetween(lastname.length, min, max)) {
    showError(
      lastnameEl,
      `Veuillez entrer entre ${min} et ${max} caractères pour le champ du nom.`
    );
  } else {
    showSuccess(lastnameEl);
    valid = true;
  }
  return valid;
};

//CHECK EMAIL

const checkEmail = () => {
  let valid = false;
  const email = emailEl.value.trim();
  if (!isRequired(email)) {
    showError(emailEl, "Veuillez entrer vote adresse mail.");
  } else if (!isEmailValid(email)) {
    showError(emailEl, "Veuillez entrer une adresse mail valide.");
  } else {
    showSuccess(emailEl);
    valid = true;
  }
  return valid;
};

//CHECK BIRTHDATE

const checkBirthdate = () => {
  let valid = false;

  const birthdate = birthdateEl;

  if (birthdate.value.trim() === "") {
    showError(birthdate, "Vous devez entrer votre date de naissance.");
  } else {
    showSuccess(birthdate);
    valid = true;
  }
  return valid;
};

//CHECK LOCATION

const checkLocation = () => {
  let valid = false;

  const location = radios;

  for (var i = 0, length = location.length; i < length; i++) {
    if (
      !(
        location[0].checked ||
        location[1].checked ||
        location[2].checked ||
        location[3].checked ||
        location[4].checked ||
        location[5].checked
      )
    ) {
      showError(location[i], "Vous devez choisir une option.");
    } else {
      showSuccess(location[i]);
      valid = true;
    }
    return valid;
  }
};

// CHECK CGU

const checkCGU = () => {
  let valid = false;

  if (checkbox.checked == true) {
    showSuccess(checkbox);
    valid = true;
  } else {
    showError(
      checkbox,
      "Vous devez vérifier que vous acceptez les termes et conditions."
    );
  }
  return valid;
};

form.addEventListener("submit", function (e) {
  // validate forms
  let isFirstnameValid = checkFirstname(),
    isLastnameValid = checkLastname(),
    isEmailValid = checkEmail(),
    isBirthdateValid = checkBirthdate();
  isLocationValid = checkLocation();
  isCheckBoxValid = checkCGU();

  let isFormValid =
    isFirstnameValid &&
    isLastnameValid &&
    isEmailValid &&
    isBirthdateValid &&
    isLocationValid &&
    isCheckBoxValid;

  // if the form is valid

  if (isFormValid) {
    alert("Merci, votre inscription a bine été prise en compte !");
  } else {
    e.preventDefault();
  }
});

form.addEventListener("input", function (e) {
  switch (e.target.id) {
    case "firstname":
      checkFirstname();
      break;
    case "lastname":
      checkLastname();
      break;
    case "email":
      checkEmail();
      break;
    case "birthdate":
      checkBirthdate();
      break;
    case "location":
      checkLocation();
      break;
    case "checkbox":
      checkCGU();
  }
});
