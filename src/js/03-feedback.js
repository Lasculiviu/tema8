
// Importă funcția throttle din lodash
import throttle from 'https://cdn.jsdelivr.net/npm/lodash.throttle@4.1.1/index.js';

// Selectarea formularului
const form = document.querySelector('.feedback-form');

// Cheia sub care se vor salva datele în localStorage
const STORAGE_KEY = 'feedback-form-state';

// Încărcarea datelor din localStorage, dacă există, la încărcarea paginii
document.addEventListener('DOMContentLoaded', populateForm);

// Funcție pentru salvarea datelor în localStorage
const saveFormData = throttle((event) => {
    const formData = {
        email: form.elements.email.value,
        message: form.elements.message.value,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}, 500);

// Evenimentul de input pentru a salva datele pe măsură ce sunt introduse
form.addEventListener('input', saveFormData);

// Funcție pentru a popula formularul cu datele din localStorage
function populateForm() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
        const { email, message } = JSON.parse(savedData);
        form.elements.email.value = email || '';
        form.elements.message.value = message || '';
    }
}

// Evenimentul de submit pentru a curăța localStorage și a afișa datele în consolă
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = {
        email: form.elements.email.value,
        message: form.elements.message.value,
    };

    console.log(formData);

    // Curățarea localStorage
    localStorage.removeItem(STORAGE_KEY);

    // Resetarea formularului
    form.reset();
});
