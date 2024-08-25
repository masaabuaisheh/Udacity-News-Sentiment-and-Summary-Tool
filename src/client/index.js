import "./styles/base.scss"
import "./styles/footer.scss"
import "./styles/form.scss"
import "./styles/header.scss"
import "./styles/resets.scss"
import "./styles/style.scss"


import { formHandler, initializeFormHandler } from './js/formHandler';

document.addEventListener('DOMContentLoaded', () => {
  initializeFormHandler();
});