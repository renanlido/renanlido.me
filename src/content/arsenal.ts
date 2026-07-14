import type { Locale } from '@/i18n/routing';

type Localized = Record<Locale, string>;

export type ArsenalLayer = {
  id: string;
  name: Localized;
  quip: Localized;
  tools: string[];
};

export const arsenal: ArsenalLayer[] = [
  {
    id: 'frontend',
    name: { pt: 'Interface', en: 'Interface' },
    quip: {
      pt: 'o que o usuário vê, clica e julga',
      en: 'what users see, click and judge',
    },
    tools: [
      'React',
      'Next.js',
      'Angular',
      'Vue',
      'React Native',
      'Module Federation',
    ],
  },
  {
    id: 'backend',
    name: { pt: 'APIs & serviços', en: 'APIs & services' },
    quip: {
      pt: 'onde a lógica mora e o bug se esconde',
      en: 'where the logic lives and the bug hides',
    },
    tools: ['Node.js', 'NestJS', 'Express', 'AdonisJS', 'Go', 'PHP', 'Prisma'],
  },
  {
    id: 'realtime',
    name: { pt: 'Mensageria & tempo real', en: 'Messaging & realtime' },
    quip: {
      pt: 'recado dado é recado entregue',
      en: 'a message sent is a message delivered',
    },
    tools: [
      'RabbitMQ',
      'Redis',
      'WebSockets',
      'Server-Sent Events',
      'Node Streams',
    ],
  },
  {
    id: 'vision',
    name: { pt: 'Visão computacional & IoT', en: 'Computer vision & IoT' },
    quip: {
      pt: 'câmeras que leem placa de caminhão',
      en: 'cameras that read truck plates',
    },
    tools: ['NVIDIA DeepStream', 'OCR/ALPR', 'Câmeras', 'Controladoras'],
  },
  {
    id: 'data',
    name: { pt: 'Bancos de dados', en: 'Databases' },
    quip: {
      pt: 'onde a verdade mora (e faz backup)',
      en: 'where the truth lives (with backups)',
    },
    tools: ['PostgreSQL', 'MySQL', 'SQL Server', 'MongoDB'],
  },
  {
    id: 'infra',
    name: { pt: 'Infra & DevOps', en: 'Infra & DevOps' },
    quip: {
      pt: 'deploy sem drama, sexta-feira em paz',
      en: 'drama-free deploys, peaceful Fridays',
    },
    tools: [
      'Docker',
      'AWS Lambda',
      'Serverless Framework',
      'MinIO',
      'Keycloak',
      'CI/CD',
    ],
  },
];
