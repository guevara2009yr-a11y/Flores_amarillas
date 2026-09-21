/* =====================================================================
   CARGA DE FOTOS DESDE GFA.config.fotos
   ===================================================================== */
GFA.photos = (function() {
  const floresFotos = [];
  let ctx, ancho, alto;

  function cargarImagen(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('No se pudo cargar: ' + url));
      img.src = url;
    });
  }

  async function cargarTodas() {
    const rutas = GFA.config.fotos || [];
    for (const ruta of rutas) {
      try {
        const img = await cargarImagen(ruta);
        const flor = new GFA.FlorFoto({
          imagen: img,
          url: ruta,
          nombre: GFA.utils.limpiarNombre(ruta)
        });
        floresFotos.push(flor);
      } catch (e) {
        console.warn('⚠️ Foto no encontrada:', ruta, e.message);
      }
    }
    return floresFotos;
  }

  function actualizarYDibujar() {
    floresFotos.forEach(f => {
      f.actualizar(ancho, alto);
      f.dibujar(ctx);
    });
  }

  function init(contexto, ancho_, alto_) {
    ctx = contexto;
    ancho = ancho_;
    alto = alto_;
  }

  function redimensionar(nuevoAncho, nuevoAlto) {
    ancho = nuevoAncho;
    alto = nuevoAlto;
  }

  return {
    init,
    redimensionar,
    cargarTodas,
    actualizarYDibujar,
    get lista() { return floresFotos; }
  };
})();