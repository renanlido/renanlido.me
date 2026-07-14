import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Renan Oliveira — renanlido.me',
    short_name: 'renanlido.me',
    description:
      'Tech Lead & Desenvolvedor Full Stack Sênior. Sistemas que não podem parar.',
    start_url: '/',
    display: 'browser',
    background_color: '#ffffff',
    theme_color: '#5b3df5',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
