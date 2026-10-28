import igStats1 from '../assets/ig-stats-1.jpg';
import igStats2 from '../assets/ig-stats-2.jpg';
import tiktokStats from '../assets/tiktok-stats.jpg';

export const contacto = {
  whatsapp: '573182966428',
  telefonoVisible: '+57 318 296 6428',
  mensajeBase: 'Hola F&N, vi la propuesta y quiero agendar la primera grabación.',
};

export const whatsappUrl = (texto: string) =>
  `https://wa.me/${contacto.whatsapp}?text=${encodeURIComponent(texto)}`;

export const stats = [
  { valor: '1.748.617', texto: 'reproducciones en un solo video', red: 'Instagram' },
  { valor: '222.271', texto: 'cuentas alcanzadas por ese mismo video', red: 'Instagram' },
  { valor: '558.230', texto: 'reproducciones de un video de hamburguesería', red: 'Instagram' },
  { valor: '85,9 K', texto: 'visualizaciones y 1,1 K seguidores nuevos', red: 'TikTok' },
];

export const capturas = [
  {
    imagen: igStats1,
    alt: 'Captura de estadísticas de Instagram: 1.748.617 reproducciones, 222.271 cuentas alcanzadas, 2.997 seguidores',
    destacado: '2.997 seguidores',
    texto: 'nuevos con un solo video.',
  },
  {
    imagen: igStats2,
    alt: 'Captura de estadísticas de Instagram: 558.230 reproducciones, 41.129 espectadores, 2.023 seguidores',
    destacado: '2.023 seguidores',
    texto: 'y 3 mil compartidos.',
  },
  {
    imagen: tiktokStats,
    alt: 'Captura de TikTok Studio: 85,9 K visualizaciones, 295 horas de reproducción, 1,1 K seguidores nuevos',
    destacado: '295 horas',
    texto: 'de reproducción en TikTok.',
  },
];

// Inner SVG markup for each step icon (24x24 viewBox, stroke-based).
export const pasos = [
  {
    titulo: 'Estrategia personalizada',
    texto: 'Estudiamos tu nicho y definimos qué contar para hacer crecer la cuenta y ganar autoridad.',
    icono: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/>',
  },
  {
    titulo: 'Grabación en tu local',
    texto: 'Vamos a tu negocio varias veces al mes y grabamos con enfoque estratégico.',
    icono: '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3"/>',
  },
  {
    titulo: 'Edición',
    texto: 'Cortes, textos y ritmo pensados para retener al espectador en los primeros segundos.',
    icono: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12"/>',
  },
  {
    titulo: 'Publicación',
    texto: 'Publicamos cada video correctamente, con el formato y la descripción adecuados.',
    icono: '<path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4z"/>',
  },
];

export type Paquete = {
  nombre: string;
  videosMes: number;
  videosDia: number;
  precio: number;
  visitas: string;
  recomendado?: boolean;
  serieFabio?: string;
};

export const paquetes: Paquete[] = [
  { nombre: 'Básico', videosMes: 30, videosDia: 1, precio: 1_000_000, visitas: '4' },
  { nombre: 'Medio', videosMes: 60, videosDia: 2, precio: 1_800_000, visitas: '4 a 5' },
  { nombre: 'Premium', videosMes: 90, videosDia: 3, precio: 2_000_000, visitas: '6', recomendado: true, serieFabio: '3 a 4 videos' },
];

export const pesos = (valor: number) => '$' + Math.floor(valor).toLocaleString('es-CO');

export const costoPorVideo = (p: Paquete) => pesos(p.precio / p.videosMes);

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
