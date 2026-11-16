// Fotos: Unsplash (licencia Unsplash, sin atribución obligatoria) y Wikimedia Commons (con `credito`,
// que se muestra en /aviso-legal/ como exige su licencia). Las de Commons se han recortado y redimensionado.
// Sustitúyelas por fotos reales de obras propias cuando las haya: public/img/<clave>-800.webp y -1600.webp.
export const FOTOS = {
  hero: { alt: "Electricista con chaleco reflectante junto a un cuadro eléctrico de vivienda", w: 1240, h: 1333, sw: 800 },
  acometida: { alt: "Zanja con tubos rojos para una canalización eléctrica subterránea", w: 1200, h: 900, sw: 800, credito: {"autor": "Chixoy", "licencia": "CC BY-SA 3.0", "licenciaUrl": "https://creativecommons.org/licenses/by-sa/3.0/deed.es", "fuente": "https://commons.wikimedia.org/wiki/File:Canalització.JPG"} },
  lineas: { alt: "Apoyo metálico de una línea aérea de media tensión con seccionadores, en Alginet (Ribera Alta)", w: 1600, h: 1200, sw: 800, credito: {"autor": "Vicenç Salvador Torres Guerola", "licencia": "CC BY-SA 3.0", "licenciaUrl": "https://creativecommons.org/licenses/by-sa/3.0/deed.es", "fuente": "https://commons.wikimedia.org/wiki/File:Línia_elèctrica_aèria_(Alginet,_Ribera_Alta,_País_Valencià).jpg"} },
  boletin: { alt: "Interruptores automáticos y diferenciales en un cuadro eléctrico de vivienda", w: 1600, h: 1200, sw: 800 },
  potencia: { alt: "Filas de interruptores automáticos en un cuadro general", w: 1600, h: 900, sw: 800 },
  alta: { alt: "Huerta de Vera (València) con una línea eléctrica al fondo", w: 1600, h: 1042, sw: 800, credito: {"autor": "Joanbanjo", "licencia": "CC BY-SA 3.0", "licenciaUrl": "https://creativecommons.org/licenses/by-sa/3.0/deed.es", "fuente": "https://commons.wikimedia.org/wiki/File:Camp_de_xufa_a_la_partida_de_Vera,_València.JPG"} },
  contadores: { alt: "Centralización de contadores antigua en un edificio de viviendas", w: 1200, h: 900, sw: 800, credito: {"autor": "Ana Yacobi", "licencia": "CC BY 2.0", "licenciaUrl": "https://creativecommons.org/licenses/by/2.0/deed.es", "fuente": "https://commons.wikimedia.org/wiki/File:Contadores_en_Cádiz_(2716552983).jpg"} },
  instalacion: { alt: "Mecanismo de enchufe desmontado con el cableado a la vista", w: 1600, h: 1200, sw: 800 },
  cuadro: { alt: "Cableado y protecciones dentro de un cuadro eléctrico", w: 1600, h: 1067, sw: 800 },
  recarga: { alt: "Punto de recarga de coche eléctrico en el garaje de una vivienda", w: 1600, h: 893, sw: 800 },
  averias: { alt: "Medición con comprobador en un cuadro eléctrico para localizar una avería", w: 1600, h: 1200, sw: 800 },
  valencia: { alt: "Ciudad de las Artes y las Ciencias de Valencia", w: 1600, h: 898, sw: 800 },
  obra: { alt: "Instalación eléctrica en una obra en construcción", w: 1600, h: 1060, sw: 800 },
  apoyo: { alt: "Apoyo de una línea de media tensión junto a una carretera en Vinaròs", w: 1600, h: 1067, sw: 800, credito: {"autor": "Zavijava2", "licencia": "CC BY-SA 3.0", "licenciaUrl": "https://creativecommons.org/licenses/by-sa/3.0/deed.es", "fuente": "https://commons.wikimedia.org/wiki/File:Mittelspannungsleitung_Vinaros10082026.png"} },
  huerta: { alt: "Huerta de Almàssera junto al barranco del Carraixet, con una torre eléctrica", w: 1600, h: 1200, sw: 800, credito: {"autor": "Enrique Íñiguez Rodríguez (Qoan)", "licencia": "CC BY-SA 3.0", "licenciaUrl": "https://creativecommons.org/licenses/by-sa/3.0/deed.es", "fuente": "https://commons.wikimedia.org/wiki/File:Almàssera._Horta_vora_el_Carraixet.JPG"} },
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
