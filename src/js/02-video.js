const iframe = document.querySelector('#vimeo-player');
const player = new Vimeo.Player(iframe);

const LOCAL_STORAGE_KEY = 'vimeo-player-current-time';

// Reia redarea de la timpul salvat
player.on('loaded', function() {
  const savedTime = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (savedTime !== null) {
    player.setCurrentTime(parseFloat(savedTime)).catch(function(error) {
      console.error('Error setting current time:', error);
    });
  }
});

// Salvează timpul curent de redare la fiecare secundă
player.on('timeupdate', function(event) {
  localStorage.setItem(LOCAL_STORAGE_KEY, event.seconds);
});

// Optional: Șterge timpul salvat când utilizatorul finalizează vizionarea
player.on('ended', function() {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
});
