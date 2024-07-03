
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const STORAGE_KEY = 'videoplayer-current-time';

// Funcție pentru salvarea timpului curent de redare
const saveCurrentTime = throttle((data) => {
    localStorage.setItem(STORAGE_KEY, data.seconds);
}, 1000);

// Ascultăm evenimentul de timeupdate pentru a salva timpul curent de redare
player.on('timeupdate', saveCurrentTime);

// La reîncărcarea paginii, setăm timpul de redare la valoarea salvată
document.addEventListener('DOMContentLoaded', () => {
    const savedTime = localStorage.getItem(STORAGE_KEY);
    if (savedTime) {
        player.setCurrentTime(savedTime).catch(error => {
            console.error('Error setting current time:', error);
        });
    }
});
