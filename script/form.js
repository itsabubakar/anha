const nameEl = document.getElementById('name');
const addressEl = document.getElementById('address');
const stateEl = document.getElementById('origin');
const numberEl = document.getElementById('number');
const emailEl = document.getElementById('email-input');
const profEl = document.getElementById('prof');
const nationEl = document.getElementById('nation');
const form = document.getElementById('form');

const checkName = () => {

    let valid = false;
    const name = nameEl.value.trim();

    if (!isRequired(name)) {
        showError(nameEl, 'Name cannot be blank.');
    } else {
        showSuccess(nameEl);
        valid = true;
    }
    return valid;
}

const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
}

const checkAddress = () => {

    let valid = false;
    const address = addressEl.value.trim();

    if (!isRequired(address)) {
        showError(addressEl, 'Address cannot be blank.');
    } else {
        showSuccess(addressEl);
        valid = true;
    }
    return valid;
}

const checkState = () => {

    let valid = false;
    const state = stateEl.value.trim();

    if (!isRequired(state)) {
        showError(stateEl, 'State cannot be blank.');
    } else {
        showSuccess(stateEl);
        valid = true;
        console.log(stateEl.value);
    }
    return valid;
}

const checkProf = () => {

    let valid = false;
    const prof = profEl.value.trim();

    if (!isRequired(prof)) {
        showError(profEl, 'Profession cannot be blank.');
    } else {
        showSuccess(profEl);
        valid = true;
    }
    return valid;
}

const checkNationality = () => {

    let valid = false;
    const nation = nationEl.value.trim();

    if (!isRequired(nation)) {
        showError(nationEl, 'Nationality cannot be blank.');
    } else {
        showSuccess(nationEl);
        valid = true;
    }
    return valid;
}

const checkNumber = () => {

    let valid = false;
    const number = numberEl.value.trim();

    if (!isRequired(number)) {
        showError(numberEl, 'Number cannot be blank.');
    } else {
        showSuccess(numberEl);
        valid = true;
    }
    return valid;
}

form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate fields
    let isNameValid = checkName(),
        isEmailValid = checkEmail(),
        isAddressValid = checkAddress(),
        isStateValid = checkState(),
        isProfValid = checkProf(),
        isNationValid = checkNationality(),
        isNumberValid = checkNumber();

    let isFormValid = isNameValid &&
        isEmailValid &&
        isAddressValid &&
        isStateValid &&
        isProfValid &&
        isNationValid &&
        isNumberValid;

    // submit to the server if the form is valid
    if (isFormValid) {
        const myFormData = new FormData(e.target);
        let formDataObj = {};
         myFormData.forEach((value, key) => (formDataObj[key] = value));
          fetch('https://africannoniandherbs.herokuapp.com/join-us', {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify(formDataObj),
          })
          .then(res => res.json())
          .then(data => console.log(data))
    }
});

// utility function

const isRequired = value => value === '' ? false : true;
const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

// show error

const showError = (input, message) => {
    // get the form-field element
    const inputElem = input.parentElement;
    // add the error class
    inputElem.classList.remove('success');
    inputElem.classList.add('error');

    // show the error message
    const error = inputElem.querySelector('small');
    error.textContent = message;
};

// show success

const showSuccess = (input) => {
    // get the form-field element
    const inputElem = input.parentElement;

    // remove the error class
    inputElem.classList.remove('error');
    inputElem.classList.add('success');

    // hide the error message
    const error = inputElem.querySelector('small');
    error.textContent = '';
}

const debounce = (fn, delay = 1000) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'name':
            checkName();
            break;
        case 'email-input':
            checkEmail();
            break;
        case 'address':
            checkAddress();
            break;
        case 'origin':
            checkState();
            break;
        case 'number':
            checkNumber();
            break;
        case 'nation':
            checkNationality();
            break;
        case 'prof':
            checkProf();
            break;
    }
}));