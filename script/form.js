const nameEl = document.getElementById('name');
const address = document.getElementById('address');
const state = document.getElementById('state');
const number = document.getElementById('number');
const emailInput = document.getElementById('email-input');
const form = document.getElementById('form');

// check name

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

form.addEventListener('submit', (e)=> {
    e.preventDefault();
    console.log('foo');
    checkName()
})

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

