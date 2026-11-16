// Fotos de Unsplash (licencia Unsplash: uso comercial libre, sin atribución obligatoria).
// Sustitúyelas por fotos reales de obras propias en cuanto las haya: mismo nombre de fichero en public/img/<clave>-800.webp y -1600.webp.
export const FOTOS = {
  hero: { alt: 'Electricista con casco trabajando en un cuadro eléctrico', w: 1600, h: 1068 },
  acometida: { alt: 'Zanja abierta para canalizar una acometida eléctrica subterránea', w: 1600, h: 1200 },
  lineas: { alt: 'Operarios trabajando en una línea eléctrica aérea desde una plataforma elevadora', w: 1600, h: 1067 },
  boletin: { alt: 'Interruptores automáticos y diferenciales en un cuadro eléctrico de vivienda', w: 1600, h: 1200 },
  potencia: { alt: 'Filas de interruptores automáticos en un cuadro general', w: 1600, h: 900 },
  alta: { alt: 'Torres de alta tensión sobre un campo de cultivo', w: 1600, h: 1067 },
  contadores: { alt: 'Centralización de contadores antigua con el cableado a la vista', w: 1600, h: 1067 },
  instalacion: { alt: 'Mecanismo de enchufe desmontado con el cableado a la vista', w: 1600, h: 1200 },
  cuadro: { alt: 'Cableado y protecciones dentro de un cuadro eléctrico', w: 1600, h: 1067 },
  recarga: { alt: 'Punto de recarga de coche eléctrico en el garaje de una vivienda', w: 1600, h: 893 },
  averias: { alt: 'Medición con comprobador en un cuadro eléctrico para localizar una avería', w: 1600, h: 1200 },
  valencia: { alt: 'Ciudad de las Artes y las Ciencias de Valencia', w: 1600, h: 898 },
  obra: { alt: 'Instalación eléctrica en una obra en construcción', w: 1600, h: 1060 },
};

// Foto de cada servicio (clave de FOTOS)
export const FOTO_SERVICIO = {
  'acometidas-electricas': 'acometida',
  'aprobacion-legalizacion-lineas': 'lineas',
  'boletin-electrico': 'boletin',
  'aumento-de-potencia': 'potencia',
  'alta-de-luz-suministro': 'alta',
  'instalaciones-de-enlace-lga': 'contadores',
  'instalaciones-electricas': 'instalacion',
  'cuadros-electricos': 'cuadro',
  'puntos-recarga-coche-electrico': 'recarga',
  'averias-electricas': 'averias',
};
