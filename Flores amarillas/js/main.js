/* =====================================================================
   PUNTO DE ENTRADA
   ===================================================================== */
(function() {
  "use strict";

  const canvasFondo = document.getElementById('canvasFondo');
  const ctx = canvasFondo.getContext('2d');
  const canvasEstela = document.getElementById('canvasEstela');
  const ctxEstela = canvasEstela.getContext('2d');

  let ancho, alto;
  const dpr = window.devicePixelRatio || 1;

  function ajustarCanvas() {
    ancho = window.innerWidth;
    alto = window.innerHeight;

    canvasFondo.width  = ancho * dpr;
    canvasFondo.height = alto * dpr;
    canvasFondo.style.width  = ancho + 'px';
    canvasFondo.style.height = alto + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    canvasEstela.width  = ancho * dpr;
    canvasEstela.height = alto * dpr;
    canvasEstela.style.width  = ancho + 'px';
    canvasEstela.style.height = alto + 'px';
    ctxEstela.setTransform(dpr, 0, 0, dpr, 0, 0);

    GFA.particles.redimensionar(ancho, alto);
    GFA.photos.redimensionar(ancho, alto);
    GFA.trail.redimensionar(ancho, alto);
  }

  function animar() {
    const grad = ctx.createRadialGradient(
      ancho * 0.5, alto * 0.3, 0,
      ancho * 0.5, alto * 0.5, Math.max(ancho, alto) * 0.8
    );
    grad.addColorStop(0, '#0a0a1a');
    grad.addColorStop(0.5, '#050510');
    grad.addColorStop(1, '#000000');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, ancho, alto);

    GFA.particles.actualizarYDibujar();
    GFA.photos.actualizarYDibujar();
    GFA.trail.dibujar();

    requestAnimationFrame(animar);
  }

  async function iniciar() {
    ajustarCanvas();
    window.addEventListener('resize', ajustarCanvas);

    GFA.particles.init(ctx, ancho, alto);
    GFA.photos.init(ctx, ancho, alto);
    GFA.trail.init(ctxEstela, ancho, alto);

    // Música
    GFA.music.init();
    GFA.music.cargarTodas();

    // Fotos (se cargan asíncronamente)
    await GFA.photos.cargarTodas();

    // Arrancar animación
    animar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();