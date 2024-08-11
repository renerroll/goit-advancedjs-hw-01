import throttle from 'lodash.throttle';
import { FormStateStorage } from './form-state-storage';

import 'the-new-css-reset/css/reset.css';

const formEL = document.querySelector('.feedback-form');
const formStateOptions = {
  key: 'feedback-form-state',
};
const formState = new FormStateStorage(formStateOptions);

const onFormInput = () => {
  const { email, message } = formEL.elements;
  formState.data = { email: email.value, message: message.value };
};

const onFormSubmit = event => {
  event.preventDefault();
  formEL.reset();
  console.log(formState.data);
  formState.reset();
};

const fillFormFromStorage = () => {
  const { email, message } = formState.data;

  formEL.elements.email.value = email || '';
  formEL.elements.message.value = message || '';
};

fillFormFromStorage();
formEL.addEventListener('input', throttle(onFormInput, 500));
formEL.addEventListener('submit', onFormSubmit);