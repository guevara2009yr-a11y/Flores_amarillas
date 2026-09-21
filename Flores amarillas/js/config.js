/* =====================================================================
   CONFIGURACIÓN GLOBAL
   ===================================================================== */
window.GFA = window.GFA || {};

GFA.config = {
  NUM_ESTRELLAS: 250,
  NUM_FLORES: 35,
  MAX_ESTELA: 40,

  // ============================================================
  // 🖼️ FOTOS QUE QUIERES PONER
  // Escribe aquí las rutas de tus fotos dentro de assets/fotos/
  // ============================================================
  fotos: [
    'assets/fotos/foto1.png',
    'assets/fotos/foto2.png',
    'assets/fotos/foto3.png',
    'assets/fotos/foto4.png',
    'assets/fotos/foto5.png',
    'assets/fotos/foto6.png',
    'assets/fotos/foto7.png',
    'assets/fotos/foto8.png',
    'assets/fotos/foto9.jpeg',
  ],

  // ============================================================
  // 🎵 MÚSICA QUE QUIERES PONER
  // Escribe aquí las rutas de tus canciones dentro de assets/musica/
  // ============================================================
  musica: [
    'assets/musica/cancion1.mp3',
    'assets/musica/cancion2.mp3'
  ],

  // Volumen inicial (0.0 a 1.0)
  volumenInicial: 0.5
};

GFA.utils = {
  uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  },
  limpiarNombre(nombre) {
    return nombre.split('/').pop().replace(/\.[^/.]+$/, '');
  }
};