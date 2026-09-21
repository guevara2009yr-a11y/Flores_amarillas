/* =====================================================================
   FLOR-FOTO: imagen circular con pétalos dorados girando alrededor
   ===================================================================== */
GFA.FlorFoto = class FlorFoto {
  constructor({ imagen, url, nombre }) {
    this.imagen = imagen;
    this.url = url;
    this.nombre = nombre || 'foto';

    this.x = Math.random() * (window.innerWidth - 200) + 100;
    this.y = Math.random() * (window.innerHeight - 200) + 100;
    this.profundidad = Math.random() * 0.5 + 0.5;
    this.escala = this.profundidad * 0.7 + 0.6;
    this.radio = 40 * this.escala;
    this.velX = (Math.random() - 0.5) * 0.35 * this.profundidad;
    this.velY = (Math.random() - 0.5) * 0.3 * this.profundidad;
    this.rotacion = Math.random() * Math.PI * 2;
    // Giro perpetuo
    this.velRotacion = (Math.random() * 0.01 + 0.006) * (Math.random() > 0.5 ? 1 : -1);
    this.opacidadBase = this.profundidad * 0.5 + 0.5;
    this.fase = Math.random() * Math.PI * 2;
  }

  actualizar(ancho, alto) {
    this.fase += 0.012;
    this.x += this.velX + Math.sin(this.fase) * 0.15;
    this.y += this.velY + Math.cos(this.fase * 0.8) * 0.1;
    this.rotacion += this.velRotacion;  // giro perpetuo

    const m = this.radio + 30;
    if (this.x < -m) this.x = ancho + m;
    if (this.x > ancho + m) this.x = -m;
    if (this.y < -m) this.y = alto + m;
    if (this.y > alto + m) this.y = -m;
  }

  dibujar(ctx) {
    if (!this.imagen || !this.imagen.complete) return;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotacion);
    ctx.globalAlpha = this.opacidadBase;

    // Pétalos dorados alrededor
    const numPetalos = 12;
    const radioPetalo = this.radio * 0.55;
    for (let i = 0; i < numPetalos; i++) {
      const a = (Math.PI * 2 / numPetalos) * i;
      const px = Math.cos(a) * this.radio * 0.95;
      const py = Math.sin(a) * this.radio * 0.95;
      const g = ctx.createRadialGradient(px, py, 0, px, py, radioPetalo);
      g.addColorStop(0, '#FFD700');
      g.addColorStop(0.5, '#FFC107');
      g.addColorStop(1, '#FF8F00');
      ctx.beginPath();
      ctx.ellipse(px, py, radioPetalo * 0.7, radioPetalo * 0.35, a, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.shadowColor = '#FFD700';
      ctx.shadowBlur = 18;
      ctx.fill();
    }

    // Imagen circular recortada
    ctx.beginPath();
    ctx.arc(0, 0, this.radio * 0.72, 0, Math.PI * 2);
    ctx.closePath();
    ctx.save();
    ctx.clip();
    const size = this.radio * 1.44;
    ctx.drawImage(this.imagen, -size / 2, -size / 2, size, size);
    ctx.restore();

    // Borde dorado
    ctx.beginPath();
    ctx.arc(0, 0, this.radio * 0.72, 0, Math.PI * 2);
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 3 + this.profundidad * 2;
    ctx.shadowColor = '#FFD700';
    ctx.shadowBlur = 20;
    ctx.stroke();

    ctx.restore();
  }
};