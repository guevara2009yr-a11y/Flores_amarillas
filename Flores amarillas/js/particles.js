/* =====================================================================
   ESTRELLAS Y FLORES DECORATIVAS DEL FONDO
   ===================================================================== */
GFA.particles = (function() {
  const estrellas = [];
  const flores = [];
  let ctx, ancho, alto;

  /* ---------- ESTRELLA ---------- */
  class Estrella {
    constructor() { this.reset(); }

    reset() {
      this.x = Math.random() * ancho;
      this.y = Math.random() * alto;
      this.radio = Math.random() * 2.2 + 0.5;
      this.parpadeo = Math.random() * Math.PI * 2;
      this.velParpadeo = Math.random() * 0.03 + 0.008;
      this.opacidadBase = Math.random() * 0.6 + 0.4;
      this.color = Math.random() > 0.5 ? '#FFD700' : '#FFF8E7';
    }

    actualizar() {
      this.parpadeo += this.velParpadeo;
      this.y += 0.03;
      if (this.y > alto + 10) {
        this.y = -10;
        this.x = Math.random() * ancho;
      }
    }

    dibujar() {
      const op = this.opacidadBase * (0.5 + 0.5 * Math.sin(this.parpadeo));
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = op;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    }
  }

  /* ---------- FLOR DECORATIVA ---------- */
  class Flor {
    constructor() {
      this.x = Math.random() * ancho;
      this.y = Math.random() * alto;
      this.profundidad = Math.random() * 0.7 + 0.3;
      this.escala = this.profundidad * 0.8 + 0.3;
      this.radio = 20 * this.escala;
      this.velX = (Math.random() - 0.5) * 0.4 * this.profundidad;
      this.velY = (Math.random() - 0.5) * 0.3 * this.profundidad;
      this.rotacion = Math.random() * Math.PI * 2;
      // Giro perpetuo
      this.velRotacion = (Math.random() * 0.008 + 0.004) * (Math.random() > 0.5 ? 1 : -1);
      this.opacidadBase = this.profundidad * 0.7 + 0.3;
      this.fase = Math.random() * Math.PI * 2;
    }

    actualizar() {
      this.fase += 0.01;
      this.x += this.velX + Math.sin(this.fase) * 0.15;
      this.y += this.velY + Math.cos(this.fase * 0.7) * 0.1;
      this.rotacion += this.velRotacion;  // giro perpetuo
      const m = this.radio + 20;
      if (this.x < -m) this.x = ancho + m;
      if (this.x > ancho + m) this.x = -m;
      if (this.y < -m) this.y = alto + m;
      if (this.y > alto + m) this.y = -m;
    }

    dibujar() {
      const numPetalos = 8;
      const rP = this.radio * 0.55;
      const rC = this.radio * 0.3;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotacion);
      ctx.globalAlpha = this.opacidadBase;

      for (let i = 0; i < numPetalos; i++) {
        const a = (Math.PI * 2 / numPetalos) * i;
        const px = Math.cos(a) * rP * 0.9;
        const py = Math.sin(a) * rP * 0.9;
        const g = ctx.createRadialGradient(px, py, 0, px, py, rP);
        g.addColorStop(0, '#FFD700');
        g.addColorStop(0.6, '#FFC107');
        g.addColorStop(1, '#FF8F00');
        ctx.beginPath();
        ctx.ellipse(px, py, rP * 0.7, rP * 0.4, a, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 15 * this.profundidad;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(0, 0, rC, 0, Math.PI * 2);
      const gc = ctx.createRadialGradient(0, 0, 0, 0, 0, rC);
      gc.addColorStop(0, '#FFF8E7');
      gc.addColorStop(0.7, '#FFD700');
      gc.addColorStop(1, '#FF8F00');
      ctx.fillStyle = gc;
      ctx.shadowBlur = 20;
      ctx.fill();
      ctx.restore();
    }
  }

  function init(contexto, ancho_, alto_) {
    ctx = contexto; ancho = ancho_; alto = alto_;
    estrellas.length = 0;
    flores.length = 0;
    for (let i = 0; i < GFA.config.NUM_ESTRELLAS; i++) estrellas.push(new Estrella());
    for (let i = 0; i < GFA.config.NUM_FLORES; i++) flores.push(new Flor());
  }

  function actualizarYDibujar() {
    estrellas.forEach(e => { e.actualizar(); e.dibujar(); });
    flores.forEach(f => { f.actualizar(); f.dibujar(); });
  }

  function redimensionar(nuevoAncho, nuevoAlto) {
    ancho = nuevoAncho;
    alto = nuevoAlto;
  }

  return { init, actualizarYDibujar, redimensionar };
})();