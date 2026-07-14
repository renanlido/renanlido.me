import type { Locale } from '@/i18n/routing';

type Localized = Record<Locale, string>;

export type PostBlock =
  | { type: 'p'; text: Localized }
  | { type: 'h2'; text: Localized }
  | { type: 'ul'; items: { pt: string[]; en: string[] } }
  | { type: 'code'; lang: string; code: string };

export type Post = {
  slug: string;
  title: Localized;
  description: Localized;
  date: string;
  tags: string[];
  readingMinutes: number;
  body: PostBlock[];
};

export const posts: Post[] = [
  {
    slug: 'ocr-alpr-pipeline-portuario',
    title: {
      pt: 'Como câmeras leem placas de caminhão: um pipeline OCR/ALPR de porto por dentro',
      en: 'How cameras read truck plates: inside a port OCR/ALPR pipeline',
    },
    description: {
      pt: 'A anatomia de um gate automatizado: da câmera ao gate abrindo, e as lições de manter visão computacional funcionando 24/7.',
      en: 'The anatomy of an automated gate: from camera to the gate opening, and the lessons of keeping computer vision running 24/7.',
    },
    date: '2026-07-10',
    tags: ['computer-vision', 'event-driven', 'mission-critical'],
    readingMinutes: 5,
    body: [
      {
        type: 'p',
        text: {
          pt: 'Num terminal portuário, o gate é onde o dinheiro passa. Cada caminhão parado na entrada é custo acumulando por minuto — e a fila cresce rápido. A promessa da automação é simples de falar e difícil de entregar: a câmera lê a placa, o sistema decide, o gate abre. Sem humano digitando placa em teclado.',
          en: 'At a port terminal, the gate is where the money flows through. Every truck stopped at the entrance is cost piling up by the minute — and the queue grows fast. The promise of automation is easy to say and hard to deliver: the camera reads the plate, the system decides, the gate opens. No human typing plates on a keyboard.',
        },
      },
      {
        type: 'h2',
        text: {
          pt: 'A anatomia do problema',
          en: 'The anatomy of the problem',
        },
      },
      {
        type: 'p',
        text: {
          pt: 'Todo pipeline desse tipo, independente das ferramentas, precisa resolver quatro responsabilidades bem separadas — e é essa separação que mantém o sistema vivo quando alguma parte engasga.',
          en: 'Every pipeline of this kind, whatever the tooling, needs to solve four well-separated responsibilities — and that separation is what keeps the system alive when one part chokes.',
        },
      },
      {
        type: 'ul',
        items: {
          pt: [
            'Capturar: transformar câmeras físicas em streams de vídeo que outros componentes conseguem consumir sem depender do hardware',
            'Inferir: detectar o veículo, localizar a placa e ler os caracteres — descartando cedo (e barato) todo frame que não interessa',
            'Decidir: cruzar a leitura com regras de negócio, agendamentos e autorizações, e responder uma única pergunta: abre ou não abre?',
            'Atuar: transformar a decisão em movimento físico do gate e em informação para todo mundo que precisa saber, em tempo real',
          ],
          en: [
            'Capture: turn physical cameras into video streams other components can consume without depending on the hardware',
            'Infer: detect the vehicle, locate the plate and read the characters — discarding early (and cheaply) every frame that does not matter',
            'Decide: cross-check the reading against business rules, schedules and authorizations, and answer a single question: open or not?',
            'Actuate: turn the decision into physical gate movement and into information for everyone who needs to know, in real time',
          ],
        },
      },
      {
        type: 'h2',
        text: {
          pt: 'Por que evento, e não chamada direta',
          en: 'Why events instead of direct calls',
        },
      },
      {
        type: 'p',
        text: {
          pt: 'A tentação de amarrar esses estágios com chamadas HTTP diretas é grande — é o caminho de menor esforço. Mas um gate opera 24/7, e componente reiniciando às 3h da manhã não pode significar caminhão preso. Com mensageria no meio, cada estágio degrada de forma independente: se a decisão ficar fora do ar por 30 segundos, as leituras acumulam e são processadas na volta. O caminhão espera segundos a mais; ninguém liga pro plantão.',
          en: "The temptation to wire these stages together with direct HTTP calls is real — it's the path of least effort. But a gate runs 24/7, and a component restarting at 3am cannot mean a stuck truck. With messaging in between, each stage degrades independently: if the decision stage goes down for 30 seconds, readings pile up and get processed on recovery. The truck waits a few extra seconds; nobody pages the on-call.",
        },
      },
      {
        type: 'p',
        text: {
          pt: 'O mesmo raciocínio vale para quem observa a operação: telas de pátio e de gate funcionam melhor como projeções de eventos do que como consultas. Para um fluxo que é 99% servidor→tela, Server-Sent Events resolve com muito menos peça móvel do que WebSocket.',
          en: 'The same reasoning applies to whoever watches the operation: yard and gate screens work better as event projections than as queries. For a flow that is 99% server→screen, Server-Sent Events solves it with far fewer moving parts than WebSocket.',
        },
      },
      {
        type: 'h2',
        text: {
          pt: 'O que aprendi segurando isso em produção',
          en: 'What I learned keeping this in production',
        },
      },
      {
        type: 'ul',
        items: {
          pt: [
            'Confiança tem gradiente: toda leitura de OCR vem com score. Abaixo do corte, o fluxo degrada para confirmação humana — automatizar 95% bem vale mais do que automatizar 100% mal.',
            'Câmera é hardware, e hardware falha: monitorar o stream é tão importante quanto monitorar o serviço. Stream congelado é bug silencioso.',
            'Idempotência não é opcional: a mesma placa pode ser lida três vezes em dois segundos. Quem consome precisa tratar releitura como ruído, não como três caminhões.',
            'Fronteiras claras pagam o aluguel: a regra de "pode entrar?" não deve saber o que é câmera, GPU ou controladora. É isso que deixa a infra evoluir sem reescrever a decisão.',
          ],
          en: [
            'Confidence is a gradient: every OCR reading comes with a score. Below the cutoff, the flow degrades to human confirmation — automating 95% well beats automating 100% badly.',
            'Cameras are hardware, and hardware fails: monitoring the stream matters as much as monitoring the service. A frozen stream is a silent bug.',
            'Idempotency is not optional: the same plate can be read three times in two seconds. Consumers must treat re-reads as noise, not as three trucks.',
            'Clear boundaries pay rent: the "can it enter?" rule should not know what a camera, a GPU or a gate controller is. That is what lets the infrastructure evolve without rewriting the decision.',
          ],
        },
      },
      {
        type: 'p',
        text: {
          pt: 'No fim, o pipeline inteiro existe para uma coisa: transformar um frame de vídeo em uma cancela subindo em poucos segundos, milhares de vezes por dia, sem drama. É o tipo de sistema que ninguém percebe quando funciona — que é exatamente como se mede sucesso em missão crítica.',
          en: "In the end, the whole pipeline exists for one thing: turning a video frame into a gate arm rising within seconds, thousands of times a day, drama-free. It's the kind of system nobody notices when it works — which is exactly how you measure success in mission-critical software.",
        },
      },
    ],
  },
  {
    slug: '80-mil-ingressos-uma-catraca',
    title: {
      pt: '80 mil ingressos, uma catraca e zero segundas chances',
      en: '80,000 tickets, one turnstile, zero second chances',
    },
    description: {
      pt: 'Sistemas de acesso a estádio não têm horário de pico — têm paredão de gente. Lições de integrar ingressos a catracas quando o deadline é a hora do jogo.',
      en: "Stadium access systems don't have rush hour — they have a wall of people. Lessons from integrating tickets with turnstiles when kickoff is the deadline.",
    },
    date: '2026-07-13',
    tags: ['serverless', 'legacy', 'scale'],
    readingMinutes: 5,
    body: [
      {
        type: 'p',
        text: {
          pt: 'A maioria dos sistemas escala em curva. Estádio escala em paredão: não existe "aumento gradual de tráfego" quando 80 mil pessoas chegam na mesma janela de duas horas, cada uma com um ingresso que precisa validar na catraca em menos de um segundo. Se falhar, o problema não é um erro 500 — é multidão acumulando na porta.',
          en: 'Most systems scale on a curve. Stadiums scale like a wall: there is no "gradual traffic increase" when 80,000 people arrive within the same two-hour window, each holding a ticket that must validate at the turnstile in under a second. When it fails, the problem is not a 500 error — it is a crowd piling up at the door.',
        },
      },
      {
        type: 'h2',
        text: {
          pt: 'O legado não é o vilão da história',
          en: 'Legacy is not the villain of this story',
        },
      },
      {
        type: 'p',
        text: {
          pt: 'No centro de operações assim costuma viver um sistema legado que já provou seu valor vendendo milhões. Reescrever tudo seria o clássico erro de arquiteto empolgado. A jogada certa é outra: cercar o legado de serviços novos que assumem o trabalho pesado — processamento em lote, comunicação em alto volume, integrações — e deixar o núcleo fazer o que ele já faz bem. Foi assim que processos que levavam horas passaram a terminar em minutos, sem parar a operação para trocar o motor.',
          en: 'At the center of operations like this there is usually a legacy system that has already proven itself selling millions. Rewriting everything would be the classic overexcited-architect mistake. The right move is different: surround the legacy with new services that take over the heavy lifting — batch processing, high-volume communication, integrations — and let the core keep doing what it already does well. That is how hours-long processes started finishing in minutes, without stopping the operation to swap the engine.',
        },
      },
      {
        type: 'h2',
        text: {
          pt: 'A catraca é um sistema distribuído com pernas',
          en: 'A turnstile is a distributed system with legs',
        },
      },
      {
        type: 'p',
        text: {
          pt: 'Integrar ingresso com catraca de estádio te ensina rápido que a rede do estádio é hostil, o hardware tem opinião própria e o torcedor não vai esperar seu retry com backoff exponencial. O desenho precisa assumir o pior: validação rápida perto da catraca, sincronização resiliente, e a regra de ouro — a catraca nunca pode depender de uma chamada remota para girar.',
          en: 'Integrating tickets with stadium turnstiles teaches you fast that stadium networks are hostile, hardware has opinions, and fans will not wait for your exponential-backoff retry. The design must assume the worst: fast validation close to the turnstile, resilient synchronization, and the golden rule — the turnstile must never depend on a remote call to spin.',
        },
      },
      {
        type: 'h2',
        text: {
          pt: 'Lições que levo para qualquer sistema',
          en: 'Lessons I carry into any system',
        },
      },
      {
        type: 'ul',
        items: {
          pt: [
            'Deadline físico muda tudo: o jogo começa às 16h com você pronto ou não. Feature incompleta se corta; confiabilidade não.',
            'Serverless brilha em carga espinhosa: pagar por execução faz sentido quando seu tráfego é 50 eventos por ano com picos brutais.',
            'Modernizar é estratégia, não estética: o legado continuou no centro, e foi a decisão certa. Reescrita total é a última opção, não a primeira.',
            'Processos de horas viram minutos quando você para de tratar batch como sagrado e quebra o trabalho em unidades paralelizáveis.',
          ],
          en: [
            'A physical deadline changes everything: kickoff is at 4pm whether you are ready or not. Incomplete features get cut; reliability does not.',
            'Serverless shines under spiky load: paying per execution makes sense when your traffic is 50 events a year with brutal peaks.',
            'Modernization is strategy, not aesthetics: the legacy stayed at the center, and that was the right call. Full rewrites are the last option, not the first.',
            'Hours-long processes become minutes when you stop treating batches as sacred and break the work into parallelizable units.',
          ],
        },
      },
      {
        type: 'p',
        text: {
          pt: 'Sistemas de evento ao vivo são a melhor escola de humildade que existe em engenharia: produção te dá nota na frente de 80 mil pessoas. Passar nessa prova algumas dezenas de vezes muda como você desenha qualquer coisa — até um formulário de contato.',
          en: 'Live-event systems are the best humility school in engineering: production grades you in front of 80,000 people. Passing that exam a few dozen times changes how you design anything — even a contact form.',
        },
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
