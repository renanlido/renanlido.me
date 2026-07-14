import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Renan Oliveira — Tech Lead & Full Stack';

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isPt = locale === 'pt';

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#4b2fe0',
        padding: '72px 80px',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 999,
              backgroundColor: '#4ade80',
              display: 'flex',
            }}
          />
          <div
            style={{
              color: '#e9e5ff',
              fontSize: 28,
              display: 'flex',
            }}
          >
            {isPt ? 'disponível para contratos' : 'available for contracts'}
          </div>
        </div>
        <div
          style={{
            color: '#e9e5ff',
            fontSize: 28,
            fontWeight: 700,
            display: 'flex',
          }}
        >
          renanlido.me
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div
          style={{
            color: '#ffffff',
            fontSize: 84,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -2,
            display: 'flex',
          }}
        >
          {isPt ? 'Eu construo sistemas' : 'I build systems'}
        </div>
        <div style={{ display: 'flex' }}>
          <div
            style={{
              color: '#241a4f',
              backgroundColor: '#f5d90a',
              fontSize: 84,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              padding: '0 20px',
              display: 'flex',
            }}
          >
            {isPt ? 'que não podem parar.' : "that can't go down."}
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ color: '#c9c0ff', fontSize: 30, display: 'flex' }}>
          Renan Oliveira — Tech Lead & Full Stack
        </div>
        <div style={{ color: '#c9c0ff', fontSize: 26, display: 'flex' }}>
          Embraer · Heineken · Priime
        </div>
      </div>
    </div>,
    size,
  );
}
