const startDate = new Date("2025-06-10T00:00:00");

// Ajuste object-fit do vídeo em fullscreen
document.querySelectorAll('.foto video').forEach(video => {
  function setContain() {
    video.style.objectFit = 'contain';
  }
  function setCover() {
    video.style.objectFit = 'cover';
  }

  video.addEventListener('fullscreenchange', () => {
    document.fullscreenElement ? setContain() : setCover();
  });
  video.addEventListener('webkitfullscreenchange', () => {
    document.webkitFullscreenElement ? setContain() : setCover();
  });
  video.addEventListener('mozfullscreenchange', () => {
    document.mozFullScreenElement ? setContain() : setCover();
  });
  video.addEventListener('msfullscreenchange', () => {
    document.msFullscreenElement ? setContain() : setCover();
  });
});

// Só o botão mostra/oculta a descrição
document.querySelectorAll('.foto').forEach(foto => {
  const btn = foto.querySelector('.btn-descricao');
  if (btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      foto.classList.toggle('show-descricao');
      btn.textContent = foto.classList.contains('show-descricao') ? 'Ocultar descrição' : 'Mostrar descrição';
    });
  }
});

function atualizarContador() {
  const now = new Date();

  let anos = now.getFullYear() - startDate.getFullYear();
  let meses = now.getMonth() - startDate.getMonth();
  let dias = now.getDate() - startDate.getDate();
  let horas = now.getHours() - startDate.getHours();
  let minutos = now.getMinutes() - startDate.getMinutes();
  let segundos = now.getSeconds() - startDate.getSeconds();

  if (segundos < 0) {
    segundos += 60;
    minutos--;
  }
  if (minutos < 0) {
    minutos += 60;
    horas--;
  }
  if (horas < 0) {
    horas += 24;
    dias--;
  }
  if (dias < 0) {
    meses--;
    const ultimoMes = new Date(now.getFullYear(), now.getMonth(), 0);
    dias += ultimoMes.getDate();
  }
  if (meses < 0) {
    meses += 12;
    anos--;
  }

  function formatarUnidade(valor, singular, plural) {
    return valor === 1 ? `${valor} ${singular}` : `${valor} ${plural}`;
  }

  let texto = "";
  if (anos >= 1) {
    texto += formatarUnidade(anos, "ano", "anos") + ", ";
  }
  texto += formatarUnidade(meses, "mês", "meses") + ", ";
  texto += formatarUnidade(dias, "dia", "dias") + ", ";
  texto += `${String(horas).padStart(2, '0')}h : `;
  texto += `${String(minutos).padStart(2, '0')}min : `;
  texto += `${String(segundos).padStart(2, '0')}s 💞`;

  document.getElementById("contador").textContent = texto;
}

atualizarContador();
setInterval(atualizarContador, 1000);

// Player customizado estilo Spotify
document.addEventListener('DOMContentLoaded', function() {
  const audio = document.getElementById('audio');
  const playPause = document.getElementById('play-pause');
  const playPauseIcon = document.getElementById('play-pause-icon');
  const progressBar = document.getElementById('progress-bar');
  const currentTime = document.getElementById('current-time');
  const duration = document.getElementById('duration');

  function formatTime(sec) {
    sec = Math.floor(sec);
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  // Atualiza duração quando o áudio carrega
  audio.addEventListener('loadedmetadata', () => {
    duration.textContent = formatTime(audio.duration);
    progressBar.max = Math.floor(audio.duration);
  });

  // Atualiza barra e tempo atual enquanto toca
  audio.addEventListener('timeupdate', () => {
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.textContent = formatTime(audio.currentTime);
  });

  // Permite arrastar a barra para mudar o tempo
  progressBar.addEventListener('input', () => {
    audio.currentTime = progressBar.value;
  });

  // Play/Pause
  playPause.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  });

  audio.addEventListener('play', () => {
    playPauseIcon.src = "https://img.icons8.com/ios-filled/36/d63384/pause--v1.png";
  });

  audio.addEventListener('pause', () => {
    playPauseIcon.src = "https://img.icons8.com/ios-filled/36/d63384/play--v1.png";
  });
});
