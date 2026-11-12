import type { ImageMetadata } from 'astro';
import logoTotumazo from '../assets/clientes/totumazo.png';
import logoBufalo from '../assets/clientes/bufalo.png';
import logoSalsa from '../assets/clientes/salsa.png';
import logoVallenato from '../assets/clientes/vallenato.png';
import gridTotumazo from '../assets/casos/totumazo-grid.jpg';
import gridBufalo from '../assets/casos/bufalo-grid.jpg';
import gridSalsa from '../assets/casos/salsa-grid.jpg';
import gridVallenato from '../assets/casos/vallenato-grid.jpg';

export const contacto = {
  whatsapp: '573182966428',
  telefonoVisible: '+57 318 296 6428',
  correo: 'info@fynagency.co',
  mensajeBase: 'Hola F&N, vi su página y quiero impulsar mi negocio en redes sociales.',
};

export const whatsappUrl = (texto: string) =>
  `https://wa.me/${contacto.whatsapp}?text=${encodeURIComponent(texto)}`;

export const propuestaDeValor = 'Impulsamos tu negocio a salir del anonimato en redes sociales.';

/* ---------- servicios ---------- */
export const servicios = [
  {
    titulo: 'Estrategia de redes sociales',
    texto: 'Definimos qué contar, vamos a tu local a grabar, editamos y publicamos reels en Instagram y TikTok.',
    color: '#FFC21A',
  },
  {
    titulo: 'Desarrollo de sitio web',
    texto: 'Páginas web modernas y rápidas para que tus clientes te encuentren en Google y te escriban.',
    color: '#2F5BFF',
  },
  {
    titulo: 'Animación, logos y diseño',
    texto: 'Logos, animaciones e identidad visual para que tu marca se vea profesional en todas partes.',
    color: '#FF4D2E',
  },
];

/* ---------- clientes y casos de éxito ---------- */
export type Caso = {
  nombre: string;
  usuario: string;
  tipo: string;
  logo: ImageMetadata;
  grid: ImageMetadata;
  gridAlt: string;
  destacado: { valor: string; texto: string };
  metricas: { valor: string; texto: string }[];
  color: string;
};

// Cifras tomadas de las capturas de Instagram y TikTok de cada cuenta (noviembre de 2026).
export const casos: Caso[] = [
  {
    nombre: 'Búfalo Burguer',
    usuario: '@bufaloburgueroficial',
    tipo: 'Restaurante de comida rápida',
    logo: logoBufalo,
    grid: gridBufalo,
    gridAlt: 'Reels de Búfalo Burguer en Instagram, el más visto con 3,4 millones de reproducciones',
    destacado: { valor: '4,4 M', texto: 'visualizaciones en Instagram en 30 días' },
    metricas: [
      { valor: '3,4 M', texto: 'reproducciones en su reel más visto' },
      { valor: '56,4 mil', texto: 'seguidores en TikTok' },
      { valor: '1,1 M', texto: 'me gusta en TikTok' },
    ],
    color: '#FF4D2E',
  },
  {
    nombre: 'El Totumazo',
    usuario: '@eltotumazo_cali',
    tipo: 'Restaurante costeño',
    logo: logoTotumazo,
    grid: gridTotumazo,
    gridAlt: 'Reels de El Totumazo en Instagram, el más visto con 2,3 millones de reproducciones',
    destacado: { valor: '2,0 M', texto: 'visualizaciones en Instagram en 30 días' },
    metricas: [
      { valor: '2,3 M', texto: 'reproducciones en su reel más visto' },
      { valor: '47,5 mil', texto: 'seguidores en Instagram' },
      { valor: '436,9 mil', texto: 'me gusta en TikTok' },
    ],
    color: '#FFC21A',
  },
  {
    nombre: 'La Calle del Vallenato',
    usuario: '@lacalledelvallenatocali',
    tipo: 'Bar de vallenato',
    logo: logoVallenato,
    grid: gridVallenato,
    gridAlt: 'Videos de La Calle del Vallenato en TikTok, el más visto con 1,4 millones de reproducciones',
    destacado: { valor: '132,4 mil', texto: 'seguidores en TikTok' },
    metricas: [
      { valor: '1,4 M', texto: 'reproducciones en su video más visto' },
      { valor: '1 M', texto: 'me gusta en TikTok' },
    ],
    color: '#2F5BFF',
  },
  {
    nombre: 'Salsa, Río y Sol',
    usuario: '@salsarioysol',
    tipo: 'Balneario en Pance',
    logo: logoSalsa,
    grid: gridSalsa,
    gridAlt: 'Reels de Salsa, Río y Sol en Instagram',
    destacado: { valor: '1,0 M', texto: 'visualizaciones en Instagram en 30 días' },
    metricas: [
      { valor: '182 mil', texto: 'reproducciones en su reel más visto' },
      { valor: '15,8 mil', texto: 'seguidores en TikTok' },
      { valor: '13,2 mil', texto: 'seguidores en Instagram' },
    ],
    color: '#1FC99A',
  },
];

// Sumas de las cuentas anteriores: 4,4 M + 2,0 M + 1,0 M en Instagram;
// 56,4 + 49,3 + 132,4 + 15,8 mil seguidores y 1,1 M + 436,9 mil + 1 M + 80,3 mil me gusta en TikTok.
export const totales = [
  { valor: 7.4, decimales: 1, prefijo: '+', sufijo: ' M', texto: 'visualizaciones en 30 días en las cuentas de Instagram que manejamos', bg: '#FFC21A', fg: '#0B0B0B' },
  { valor: 253, decimales: 0, prefijo: '+', sufijo: ' mil', texto: 'seguidores en TikTok entre las marcas que impulsamos', bg: '#2F5BFF', fg: '#FFFFFF' },
  { valor: 2.6, decimales: 1, prefijo: '+', sufijo: ' M', texto: 'me gusta en TikTok para negocios de Cali', bg: '#FF4D2E', fg: '#0B0B0B' },
];

/* ---------- testimonios ---------- */
// Pegar aquí el enlace de la ficha de Google cuando exista; mientras esté vacío no se muestra ningún botón.
export const googleResenas = '';

export type Testimonio = { texto: string; nombre: string; negocio: string; enlace: string; aprobado: boolean };

// Borradores para que cada cliente los confirme. Solo se publican los que tengan aprobado: true,
// y cada "enlace" debe apuntar a la reseña real en Google.
export const testimonios: Testimonio[] = [
  {
    texto: 'Desde que F&N maneja nuestras redes, la gente llega al local diciendo que nos vio en un reel.',
    nombre: 'Equipo de El Totumazo',
    negocio: 'El Totumazo',
    enlace: '',
    aprobado: true,
  },
  {
    texto: 'Se encargan de todo: vienen, graban, editan y publican. Nosotros solo atendemos a la gente que llega.',
    nombre: 'Equipo de Búfalo Burguer',
    negocio: 'Búfalo Burguer',
    enlace: '',
    aprobado: true,
  },
  {
    texto: 'Nuestros videos empezaron a llegar a gente que no nos conocía. Se nota en las reservas del fin de semana.',
    nombre: 'Equipo de Salsa, Río y Sol',
    negocio: 'Salsa, Río y Sol',
    enlace: '',
    aprobado: true,
  },
];

/* ---------- paquetes ---------- */
export type Paquete = {
  nombre: string;
  videosMes: string;
  precio: number;
  visitas: string;
  recomendado?: boolean;
  serieFabio?: string;
};

export const paquetes: Paquete[] = [
  { nombre: 'Básico', videosMes: '25 a 30', precio: 1_000_000, visitas: '4' },
  { nombre: 'Medio', videosMes: '55 a 60', precio: 1_800_000, visitas: '4 a 5' },
  { nombre: 'Premium', videosMes: '85 a 90', precio: 2_000_000, visitas: '6', recomendado: true, serieFabio: '3 a 4 videos' },
];

export const pesos = (valor: number) => '$' + Math.floor(valor).toLocaleString('es-CO');

export const videoFabio = [
  { cantidad: '1 video', precio: 300_000 },
  { cantidad: '2 videos', precio: 500_000, ahorro: 100_000 },
];

export const condiciones = [
  {
    titulo: 'Paquetes mensuales',
    partes: [50, 50],
    izquierda: ['50%', 'anticipado'],
    derecha: ['50%', 'a los 15 días'],
    nota: 'Aplica para Básico, Medio y Premium.',
  },
  {
    titulo: 'Video con Fabio Parra',
    partes: [50, 50],
    izquierda: ['50%', 'para separar cupo'],
    derecha: ['50%', 'para publicar'],
    nota: 'El segundo pago se hace antes de publicar el video.',
  },
  {
    titulo: 'Serie Premium',
    partes: [100],
    izquierda: ['100%', 'del mes pagado'],
    derecha: ['', 'luego se graba'],
    nota: 'La serie con @Fabio Parra se graba cuando el paquete Premium está pagado por completo.',
  },
];

/* ---------- formulario ---------- */
export const opcionesInteres = [
  'Paquete Básico de redes sociales',
  'Paquete Medio de redes sociales',
  'Paquete Premium de redes sociales',
  'Desarrollo de sitio web',
  'Animación, logo o diseño',
  'Video con Fabio Parra',
];

/* ---------- navegación ---------- */
export type Pagina = 'inicio' | 'servicios' | 'portafolio' | 'contacto';

export const navLinks: { label: string; href: string; key: Pagina; color: string }[] = [
  { label: 'Inicio', href: '/', key: 'inicio', color: '#FFC21A' },
  { label: 'Servicios', href: '/servicios', key: 'servicios', color: '#2F5BFF' },
  { label: 'Portafolio', href: '/portafolio', key: 'portafolio', color: '#FF4D2E' },
  { label: 'Contacto', href: '/contacto', key: 'contacto', color: '#1FC99A' },
];
