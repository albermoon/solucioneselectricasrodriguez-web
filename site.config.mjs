// ─────────────────────────────────────────────────────────────────────────────
//  CONFIGURACIÓN ÚNICA DEL NEGOCIO
//  Todo lo que sale en la web (NAP, schema, llms.txt, sitemap…) se genera desde
//  aquí. Cambia un dato aquí → `npm run build` → toda la web queda coherente.
//  REGLA DE ORO SEO LOCAL: nombre, teléfono y zona deben ser IDÉNTICOS a los de
//  Google Business Profile, Bing Places, Apple y los directorios.
// ─────────────────────────────────────────────────────────────────────────────

export default {
  // Dominio definitivo (sin barra final). Cámbialo cuando lo compres.
  url: 'https://www.solucioneselectricasrodriguez.es',

  // Pon a false sólo si quieres publicar una versión de pruebas sin indexar.
  indexable: true,

  nombre: 'Soluciones Eléctricas Rodríguez',
  nombreCorto: 'Eléctricas Rodríguez',
  // Variantes con las que la gente (y las IA) pueden nombrar el negocio.
  alternateName: ['Electricistas Rodríguez', 'Rodríguez Electricistas Valencia', 'Soluciones Electricas Rodriguez'],
  // Descriptor que acompaña a la marca en títulos (keyword principal).
  descriptor: 'Electricista en Valencia',
  eslogan: 'Acometidas, aprobación de líneas y boletines eléctricos en Valencia y alrededores',

  telefono: '+34647419523',
  telefonoVisible: '647 41 95 23',
  whatsapp: '34647419523', // formato wa.me: prefijo país + número, sin "+" ni espacios
  email: '', // opcional: si lo rellenas aparece en contacto y en el schema

  // Negocio de área de servicio (sin local abierto al público): no se publica calle.
  // Si algún día tenéis local/nave con atención al público, añade `calle`.
  direccion: {
    calle: '',
    cp: '46001',
    localidad: 'Valencia',
    provincia: 'Valencia',
    comunidad: 'Comunitat Valenciana',
    pais: 'ES',
  },
  geo: { lat: 39.4699, lng: -0.3763 },
  radioServicioKm: 40,

  // Horario copiado de la ficha de Google Business Profile (16/11/2026).
  // Si cambias uno, cambia el otro: deben coincidir siempre.
  horario: [
    { dias: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], abre: '08:00', cierra: '19:00', texto: 'Lunes a viernes' },
    { dias: ['Saturday'], abre: '09:00', cierra: '17:00', texto: 'Sábados' },
  ],
  urgencias: true, // muestra "urgencias: escríbenos por WhatsApp" (no promete 24 h)

  ciudad: 'Valencia',
  ciudadVal: 'València',
  comarca: 'l’Horta de València',
  distribuidora: 'i-DE (Iberdrola Redes)',
  organismoIndustria: 'la Conselleria competente en Industria de la Generalitat Valenciana',

  // Datos que refuerzan confianza (E-E-A-T). Rellénalos cuando los tengas.
  titular: null, // ej.: { nombre: 'Juan Rodríguez', cargo: 'Responsable técnico', anios: 20 }
  anioFundacion: null, // ej.: 2008
  cif: '',
  registroIndustrial: '', // nº de empresa instaladora habilitada (REIC / registro autonómico)
  categorias: ['Empresa instaladora en baja tensión'], // añade 'Especialista (IBTE)', 'Líneas de alta tensión (LAT)'…
  seguroRC: true,

  // Perfiles oficiales (sameAs). Muy importante para que Google y las IA
  // "unan" la web con la ficha de Google y redes. Pega las URLs reales.
  perfiles: {
    googleBusiness: 'https://maps.google.com/?cid=4392986678764536654', // ficha verificada en Google Maps
    facebook: '',
    instagram: '',
    habitissimo: '',
    paginasAmarillas: '',
  },

  // Valoración visible en la ficha de Google (actualízala de vez en cuando).
  // Se muestra como distintivo con enlace a Google; NO se marca como
  // aggregateRating en el schema (Google no lo permite para reseñas propias).
  resenasGoogle: { nota: '5,0', total: 4 },

  analyticsGA4: '', // vacío = sin cookies, sin banner. Si lo usas, añade banner de consentimiento.
  indexNowKey: 'b7e4c2a9f1d84e6a9c3b5d7e8f0a1b2c',

  // ── Zonas de servicio ────────────────────────────────────────────────────
  // Cada zona genera /electricista/<slug>/ con contenido propio. Para evitar
  // "páginas puerta", cada zona lleva notas reales y diferenciadas.
  zonas: [
    {
      slug: 'valencia', nombre: 'Valencia', val: 'València', poblacion: '≈ 800.000 hab.', minutos: 0,
      cps: '46001 – 46026',
      barrios: ['Ciutat Vella', 'Eixample', 'Extramurs', 'Campanar', 'Benimaclet', 'Patraix', 'Jesús', 'Quatre Carreres', 'Poblats Marítims', 'Algirós', 'Benicalap', 'Rascanya'],
      notas: 'En Valencia capital predominan los edificios de viviendas de los años 60-80 con líneas generales de alimentación y centralizaciones de contadores que se han quedado cortas para la climatización, la inducción y el coche eléctrico. Es donde más hacemos renovaciones de LGA, aumentos de potencia y boletines para pisos que vuelven a darse de alta. En Ciutat Vella y el Cabanyal trabajamos a menudo en fincas protegidas, donde la acometida y las canalizaciones tienen que respetar fachada.',
      tipico: ['Renovación de LGA y centralización de contadores en comunidades', 'Aumento de potencia para aire acondicionado e inducción', 'Boletín eléctrico (CIE) para alta de pisos de alquiler'],
    },
    {
      slug: 'torrent', nombre: 'Torrent', val: 'Torrent', poblacion: '≈ 85.000 hab.', minutos: 20,
      cps: '46900 – 46901',
      barrios: ['Centro', 'El Vedat', 'Calicanto', 'Mas del Jutge', 'Xenillet'],
      notas: 'Torrent combina casco urbano con muchas urbanizaciones de chalets (El Vedat, Calicanto, Mas del Jutge) donde son habituales las acometidas nuevas o soterradas, la ampliación de potencia para piscinas y bombas de calor y la legalización de instalaciones antiguas que nunca tuvieron boletín.',
      tipico: ['Acometidas para viviendas unifamiliares', 'Legalización de chalets sin boletín', 'Puntos de recarga en garaje propio'],
    },
    {
      slug: 'paterna', nombre: 'Paterna', val: 'Paterna', poblacion: '≈ 72.000 hab.', minutos: 15,
      cps: '46980 – 46988',
      barrios: ['Centro', 'La Canyada', 'Valterna', 'Lloma Llarga', 'Parque Tecnológico', 'Fuente del Jarro'],
      notas: 'Paterna tiene dos realidades: zonas residenciales como La Canyada o Lloma Llarga y grandes áreas empresariales (Parque Tecnológico, Fuente del Jarro, Táctica). En las naves y oficinas tramitamos aumentos de potencia, nuevas acometidas y líneas que requieren aprobación de la distribuidora y, cuando procede, proyecto técnico.',
      tipico: ['Acometidas y potencia para naves industriales', 'Aprobación de líneas y cesión a distribuidora', 'Instalaciones de locales y oficinas'],
    },
    {
      slug: 'mislata', nombre: 'Mislata', val: 'Mislata', poblacion: '≈ 44.000 hab.', minutos: 10,
      cps: '46920',
      barrios: ['Centro', 'Entorno Avenida Gregorio Gea', 'Zona metro Nou d’Octubre'],
      notas: 'Mislata es uno de los municipios más densos de España: casi todo son fincas de varias alturas. Por eso aquí lo más frecuente es actualizar instalaciones de enlace (CGP, LGA, centralización de contadores) en comunidades de propietarios y adecuar cuadros de viviendas antiguas.',
      tipico: ['Renovación de instalaciones de enlace en comunidades', 'Cuadros eléctricos en pisos antiguos', 'Boletines para cambio de titular o alta'],
    },
    {
      slug: 'burjassot', nombre: 'Burjassot', val: 'Burjassot', poblacion: '≈ 39.000 hab.', minutos: 12,
      cps: '46100',
      barrios: ['Centro', 'Barrio de las 613', 'Entorno del campus universitario'],
      notas: 'En Burjassot trabajamos mucho en viviendas próximas al campus universitario que se alquilan por habitaciones y necesitan más potencia y un boletín al día, y en edificios antiguos donde la derivación individual de cada piso se ha quedado pequeña.',
      tipico: ['Aumento de potencia en pisos de alquiler', 'Nueva derivación individual', 'Revisión y certificado de la instalación'],
    },
    {
      slug: 'manises', nombre: 'Manises', val: 'Manises', poblacion: '≈ 31.000 hab.', minutos: 15,
      cps: '46940',
      barrios: ['Centro', 'Polígono La Cova', 'Entorno del aeropuerto'],
      notas: 'Manises une tradición cerámica, polígonos industriales y la actividad del aeropuerto. Aquí realizamos instalaciones para talleres y naves, acometidas trifásicas y legalización de actividades que necesitan certificado para la licencia municipal.',
      tipico: ['Acometidas trifásicas para talleres', 'Certificados para licencia de actividad', 'Cuadros industriales'],
    },
    {
      slug: 'quart-de-poblet', nombre: 'Quart de Poblet', val: 'Quart de Poblet', poblacion: '≈ 25.000 hab.', minutos: 12,
      cps: '46930',
      barrios: ['Centro', 'Barri del Crist', 'Polígonos junto a la A-3'],
      notas: 'Quart de Poblet concentra polígonos industriales junto a la A-3 y barrios residenciales consolidados. Hacemos desde aumentos de potencia en viviendas hasta nuevas líneas de baja tensión para naves que se dividen o cambian de actividad.',
      tipico: ['Líneas de BT para naves divididas', 'Aumentos de potencia', 'Boletines de vivienda'],
    },
    {
      slug: 'alboraya', nombre: 'Alboraya', val: 'Alboraia', poblacion: '≈ 25.000 hab.', minutos: 12,
      cps: '46120',
      barrios: ['Centro', 'Port Saplaya', 'Patacona', 'Huerta de Alboraya'],
      notas: 'En Alboraya hay obra nueva junto a la playa de la Patacona y Port Saplaya y muchas parcelas en la huerta. En la huerta las acometidas suelen requerir extensión de red, y ahí es clave tramitar bien la solicitud de acceso y conexión con la distribuidora.',
      tipico: ['Acometidas con extensión de red en la huerta', 'Instalaciones en obra nueva', 'Puntos de recarga en garajes comunitarios'],
    },
    {
      slug: 'paiporta', nombre: 'Paiporta', val: 'Paiporta', poblacion: '≈ 27.000 hab.', minutos: 15,
      cps: '46200',
      barrios: ['Centro', 'Plantas bajas y garajes del casco urbano', 'Zona industrial'],
      notas: 'Paiporta fue uno de los municipios más golpeados por la DANA de octubre de 2024. Muchas plantas bajas, garajes y bajos comerciales tuvieron que rehacer la instalación eléctrica completa: cuadros, derivaciones individuales y centralizaciones de contadores inundadas. Seguimos ayudando con instalaciones nuevas y con el certificado para volver a dar de alta el suministro.',
      tipico: ['Rehacer instalaciones dañadas por inundación', 'Subir contadores y cuadros a cota segura', 'Certificado para reenganche del suministro'],
    },
    {
      slug: 'catarroja', nombre: 'Catarroja', val: 'Catarroja', poblacion: '≈ 30.000 hab.', minutos: 18,
      cps: '46470',
      barrios: ['Centro', 'Port de Catarroja', 'Polígonos industriales', 'Entorno de l’Albufera'],
      notas: 'Catarroja, junto a l’Albufera, también sufrió la DANA de 2024. Además de rehabilitar instalaciones de viviendas y bajos, trabajamos en naves de sus polígonos donde ha sido necesario renovar acometidas y cuadros generales.',
      tipico: ['Rehabilitación eléctrica tras inundación', 'Renovación de acometidas en naves', 'Boletines y altas de suministro'],
    },
    {
      slug: 'alfafar', nombre: 'Alfafar', val: 'Alfafar', poblacion: '≈ 22.000 hab.', minutos: 15,
      cps: '46910',
      barrios: ['Centro', 'Barrio Orba', 'Parque Alcosa', 'Zona comercial'],
      notas: 'En Alfafar se mezcla zona comercial de gran superficie con barrios como Orba, muy afectados por la DANA. Trabajamos en comunidades que han renovado su centralización de contadores y en locales que necesitan certificado para reabrir.',
      tipico: ['Centralización de contadores en comunidades', 'Certificados para reapertura de locales', 'Instalaciones nuevas de vivienda'],
    },
    {
      slug: 'sagunto', nombre: 'Sagunto', val: 'Sagunt', poblacion: '≈ 68.000 hab.', minutos: 30,
      cps: '46500 – 46520',
      barrios: ['Sagunt ciudad', 'Port de Sagunt', 'Almardà', 'Parc Sagunt'],
      notas: 'Sagunto crece con el desarrollo industrial de Parc Sagunt y la actividad del puerto. Es una zona con mucha demanda de acometidas y líneas para naves, y de viviendas unifamiliares en la costa (Almardà, Corinto) que necesitan acometida nueva o aumento de potencia.',
      tipico: ['Líneas y acometidas para naves', 'Acometidas en viviendas de costa', 'Aumento de potencia'],
    },
  ],
};
