/* =====================================================================
   MÚSICA DE FONDO (sin UI, autorreproduce tras primera interacción)
   ===================================================================== */
GFA.music = (function() {
  let audio;
  let listaCanciones = [];
  let indiceActual = 0;

  function init() {
    audio = document.getElementById('audioFondo');
    audio.volume = GFA.config.volumenInicial;
    audio.loop = false;

    // Cuando acaba una canción, pasa a la siguiente
    audio.addEventListener('ended', siguiente);

    // Autorreproducir tras la PRIMERA interacción del usuario (política de autoplay)
    const intentarReproducir = () => {
      if (listaCanciones.length > 0) {
        audio.play().catch(() => {});
      }
      document.removeEventListener('click', intentarReproducir);
      document.removeEventListener('touchstart', intentarReproducir);
      document.removeEventListener('keydown', intentarReproducir);
    };

    document.addEventListener('click', intentarReproducir);
    document.addEventListener('touchstart', intentarReproducir);
    document.addEventListener('keydown', intentarReproducir);
  }

  function cargarTodas() {
    listaCanciones = (GFA.config.musica || []).slice();
    if (listaCanciones.length === 0) return;
    indiceActual = 0;
    audio.src = listaCanciones[indiceActual];
    audio.load();
  }

  function siguiente() {
    if (listaCanciones.length === 0) return;
    indiceActual = (indiceActual + 1) % listaCanciones.length;
    audio.src = listaCanciones[indiceActual];
    audio.play().catch(() => {});
  }

  return { init, cargarTodas };
})();