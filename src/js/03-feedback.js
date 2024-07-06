const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

const STORAGE_KEY = 'feedback-form-state';

const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const loadFromLocalStorage = key => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading data from localStorage:', error);
    return null;
  }
};

const throttle = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) return;
    timeoutId = setTimeout(() => {
      func(...args);
      timeoutId = null;
    }, delay);
  };
};


const saveFormState = throttle(() => {
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };
  saveToLocalStorage(STORAGE_KEY, formData);
}, 500);

const loadFormState = () => {
  const savedData = loadFromLocalStorage(STORAGE_KEY);
  if (savedData) {
    emailInput.value = savedData.email || '';
    messageInput.value = savedData.message || '';
  }
};


const handleSubmit = event => {
  event.preventDefault();
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };
  console.log('Form data submitted:', formData);
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
};


form.addEventListener('input', saveFormState);
form.addEventListener('submit', handleSubmit);
document.addEventListener('DOMContentLoaded', loadFormState);
