const startDate = new Date("2025-06-10T00:00:00");


document.querySelectorAll('.foto video').forEach(video => {
  function setContain() {
    video.style.objectFit = 'contain';
  }
  function setCover() {
    video.style.objectFit = 'cover';
  }

  // Eventos para diferentes navegadores
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

document.querySelectorAll('.foto').forEach(foto => {
  foto.addEventListener('click', function(e) {
    // Evita fechar ao clicar dentro da descrição
    if (e.target.classList.contains('descricao')) return;
    this.classList.toggle('show-descricao');
  });
  // Se houver vídeo, também alterna ao clicar no vídeo (para mobile)
  const video = foto.querySelector('video');
  if (video) {
    video.addEventListener('click', function(e) {
      e.stopPropagation(); // Evita conflito com o clique na div
      foto.classList.toggle('show-descricao');
    });
  }

  const btn = foto.querySelector('.btn-descricao');
  if (btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      foto.classList.toggle('show-descricao');
      btn.textContent = foto.classList.contains('show-descricao') ? 'Ocultar descrição' : 'Mostrar descrição';
    });
  }
});

  document.addEventListener('touchstart', playAudioOnce, { once: true });
document.addEventListener('click', playAudioOnce, { once: true });

function playAudioOnce() {
  const audio = document.querySelector('#sound audio');
  if (audio) {
    audio.play().catch(() => {}); // ignora erros de autoplay
  }
}

function atualizarContador() {
  const now = new Date();

  let anos = now.getFullYear() - startDate.getFullYear();
  let meses = now.getMonth() - startDate.getMonth();
  let dias = now.getDate() - startDate.getDate();
  let horas = now.getHours() - startDate.getHours();
  let minutos = now.getMinutes() - startDate.getMinutes();
  let segundos = now.getSeconds() - startDate.getSeconds();

  // Corrigir valores negativos (emprestar de unidades maiores)
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
    const ultimoMes = new Date(now.getFullYear(), now.getMonth(), 0);
    dias += ultimoMes.getDate();
    meses--;
  }
  if (meses < 0) {
    meses += 12;
    anos--;
  }

  // Função para definir singular/plural
  function formatarUnidade(valor, singular, plural) {
    return `${valor} ${valor === 1 ? singular : plural}`;
  }

  let texto = "";

  // Só mostrar "anos" se passou de 12 meses completos
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

// Executa ao iniciar
atualizarContador();
// Atualiza a cada segundo
setInterval(atualizarContador, 1000);
