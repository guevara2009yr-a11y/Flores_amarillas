/* =====================================================================
   ESTELA DORADA QUE SIGUE AL CURSOR
   ===================================================================== */
GFA.trail = (function() {
  const puntos = [];
  let ctxEstela, ancho, alto;

  function init(contexto, ancho_, alto_) {
    ctxEstela = contexto;
    ancho = ancho_;
    alto = alto_;

    document.addEventListener('mousemove', (e) => {
      puntos.push({
        x: e.clientX,
        y: e.clientY,
        vida: 1.0,
        tamano: Math.random() * 6 + 3
      });
      if (puntos.length > GFA.config.MAX_ESTELA) puntos.shift();
    });
  }

  function dibujar() {
    ctxEstela.clearRect(0, 0, ancho, alto);
    for (let i = 0; i < puntos.length; i++) {
      const p = puntos[i];
      p.vida -= 0.025;
      p.tamano *= 0.98;
      if (p.vida <= 0) continue;

      const g = ctxEstela.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.tamano * 2);
      g.addColorStop(0, `rgba(255,215,0,${p.vida * 0.8})`);
      g.addColorStop(0.5, `rgba(255,193,7,${p.vida * 0.4})`);
      g.addColorStop(1, `rgba(255,143,0,0)`);

      ctxEstela.beginPath();
      ctxEstela.arc(p.x, p.y, p.tamano * 2, 0, Math.PI * 2);
      ctxEstela.fillStyle = g;
      ctxEstela.fill();
    }
    for (let i = puntos.length - 1; i >= 0; i--) {
      if (puntos[i].vida <= 0) puntos.splice(i, 1);
    }
  }

  function redimensionar(nuevoAncho, nuevoAlto) {
    ancho = nuevoAncho;
    alto = nuevoAlto;
  }

  return { init, dibujar, redimensionar };
})();