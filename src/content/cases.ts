import type { Locale } from '@/i18n/routing';

type Localized = Record<Locale, string>;

export type CaseStudy = {
  id: string;
  client: string;
  flagship?: boolean;
  period: Localized;
  role: Localized;
  headline: Localized;
  context: Localized;
  bullets: { pt: string[]; en: string[] };
  metrics: { value: string; label: Localized }[];
  stack: string[];
};

export const cases: CaseStudy[] = [
  {
    id: 'priime',
    client: 'Priime',
    flagship: true,
    period: { pt: '2022 — hoje', en: '2022 — today' },
    role: {
      pt: 'Arquitetura & Liderança Técnica',
      en: 'Architecture & Tech Leadership',
    },
    headline: {
      pt: 'Três portos que nunca dormem',
      en: 'Three ports that never sleep',
    },
    context: {
      pt: 'Os terminais portuários de Aratu, Salvador e Ilhéus operam 24/7. Caminhão parado na frente do gate é prejuízo por minuto — e o software que decide se o gate abre é o meu.',
      en: 'The port terminals of Aratu, Salvador and Ilhéus run 24/7. A truck stuck at the gate means losses by the minute — and the software deciding whether that gate opens is mine.',
    },
    bullets: {
      pt: [
        'Liderança técnica da plataforma de operação portuária de missão crítica, aplicando Clean Architecture e DDD',
        'Reescrita do Terminal Operating System (TOS) e controle de gates com pipeline de OCR/ALPR: câmeras leem a placa, o sistema decide, o gate abre',
        'PACS — controle de acesso físico com reconhecimento facial, orquestrando câmeras, catracas e controladoras',
        'Pátio de triagem event-driven com atualização em tempo real via Server-Sent Events',
      ],
      en: [
        'Tech leadership of the mission-critical port operations platform, applying Clean Architecture and DDD',
        'Rewrite of the Terminal Operating System (TOS) and gate control with an OCR/ALPR pipeline: cameras read the plate, the system decides, the gate opens',
        'PACS — physical access control with facial recognition, orchestrating cameras, turnstiles and controllers',
        'Event-driven triage yard with real-time updates over Server-Sent Events',
      ],
    },
    metrics: [
      {
        value: '24/7',
        label: { pt: 'operação contínua', en: 'continuous operation' },
      },
      {
        value: '3',
        label: { pt: 'terminais portuários', en: 'port terminals' },
      },
      {
        value: 'OCR/ALPR',
        label: { pt: 'gates automatizados', en: 'automated gates' },
      },
    ],
    stack: [
      'NVIDIA DeepStream',
      'Node.js',
      'Go',
      'RabbitMQ',
      'Redis',
      'MinIO',
      'MediaMTX',
      'TypeScript',
    ],
  },
  {
    id: 'bilheteria',
    client: 'Bilheteria Digital',
    period: { pt: 'full stack', en: 'full stack' },
    role: { pt: 'Desenvolvedor Full Stack', en: 'Full Stack Developer' },
    headline: {
      pt: '80 mil pessoas, uma catraca e zero segundas chances',
      en: '80,000 people, one turnstile, zero second chances',
    },
    context: {
      pt: 'Dia de jogo não tem replay: ou o ingresso valida na catraca, ou são dezenas de milhares de pessoas presas do lado de fora do estádio.',
      en: 'Match day has no replay: either the ticket validates at the turnstile, or tens of thousands of people are stuck outside the stadium.',
    },
    bullets: {
      pt: [
        'Integração dos ingressos às catracas de estádio, com capacidade estimada de 80 mil ingressos por evento',
        'Automação serverless da divisão, compactação e exportação de tickets integrada a um sistema PHP legado — um processo de horas caiu para minutos',
        'Serviço centralizado de disparo de e-mails transacionais em alto volume',
        'Coleta e processamento de grandes volumes de transações financeiras via EDI, com rate-limiting e janelas de menor carga',
      ],
      en: [
        'Ticket integration with stadium turnstiles, sized for an estimated 80,000 tickets per event',
        'Serverless automation of ticket splitting, compression and export integrated with a legacy PHP system — an hours-long process dropped to minutes',
        'Centralized high-volume transactional email dispatch service',
        'Collection and processing of large financial transaction volumes via EDI, with rate-limiting and low-load windows',
      ],
    },
    metrics: [
      {
        value: '80k',
        label: { pt: 'ingressos por evento', en: 'tickets per event' },
      },
      {
        value: 'h → min',
        label: { pt: 'exportação de tickets', en: 'ticket exports' },
      },
    ],
    stack: [
      'Node.js',
      'AWS Lambda',
      'Serverless Framework',
      'PHP',
      'TypeScript',
    ],
  },
  {
    id: 'heineken',
    client: 'Heineken',
    period: { pt: 'backend', en: 'backend' },
    role: {
      pt: 'Desenvolvedor Sênior — Backend',
      en: 'Senior Developer — Backend',
    },
    headline: {
      pt: 'Backend à prova de Copa e Carnaval',
      en: 'A backend that survives World Cups and Carnival',
    },
    context: {
      pt: 'Campanha de resgate de bebidas em dia de jogo do Brasil: milhões de pessoas com sede e cupom na mão, todas ao mesmo tempo. O backend não pode nem piscar.',
      en: 'A drink-redemption campaign on a Brazil match day: millions of thirsty people holding coupons, all at once. The backend cannot even blink.',
    },
    bullets: {
      pt: [
        'Backend da plataforma de resgates para campanhas sazonais e de alto volume — jogos de futebol, Copa, campeonatos, Carnaval e ações promocionais esporádicas',
        'Arquitetura serverless dimensionada para picos extremos e imprevisíveis de tráfego',
      ],
      en: [
        'Backend of the redemption platform for seasonal, high-volume campaigns — football matches, the World Cup, championships, Carnival and one-off promo events',
        'Serverless architecture sized for extreme, unpredictable traffic spikes',
      ],
    },
    metrics: [
      {
        value: 'Copa',
        label: { pt: 'pico de tráfego', en: 'traffic peaks' },
      },
    ],
    stack: ['TypeScript', 'Serverless Framework', 'AWS Lambda'],
  },
  {
    id: 'embraer',
    client: 'Embraer',
    period: { pt: 'sistemas internos', en: 'internal systems' },
    role: { pt: 'Desenvolvedor Sênior', en: 'Senior Developer' },
    headline: {
      pt: 'Modernizando quem constrói aviões',
      en: 'Modernizing the people who build airplanes',
    },
    context: {
      pt: 'Sistemas internos de uma fabricante de aeronaves calculam custos que valem milhões. Legado não se derruba: se moderniza em pleno voo.',
      en: "An aircraft manufacturer's internal systems compute costs worth millions. You don't tear legacy down: you modernize it mid-flight.",
    },
    bullets: {
      pt: [
        'Reescrita e modernização de sistemas legados para ingestão de dados e cálculos avançados de custos internos',
        'Micro-frontends com Module Federation sobre sistemas distribuídos',
      ],
      en: [
        'Rewrite and modernization of legacy systems for data ingestion and advanced internal cost calculations',
        'Micro-frontends with Module Federation on top of distributed systems',
      ],
    },
    metrics: [
      {
        value: 'micro-fe',
        label: { pt: 'Module Federation', en: 'Module Federation' },
      },
    ],
    stack: ['React', 'Module Federation', 'TypeScript'],
  },
];
