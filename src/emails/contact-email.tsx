import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

type ContactEmailProps = {
  name: string;
  email: string;
  company?: string;
  message: string;
};

export function ContactEmail({
  name,
  email,
  company,
  message,
}: ContactEmailProps) {
  return (
    <Html lang="pt-BR">
      <Head />
      <Preview>Novo contato de {name} via renanlido.me</Preview>
      <Body
        style={{
          backgroundColor: '#f4f3fb',
          fontFamily: 'Helvetica, Arial, sans-serif',
          margin: 0,
          padding: '24px 0',
        }}
      >
        <Container
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 16,
            border: '1px solid #e4e1f0',
            maxWidth: 560,
            padding: '32px 36px',
          }}
        >
          <Text
            style={{
              color: '#6b46ff',
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 1,
              margin: 0,
            }}
          >
            RENANLIDO.ME
          </Text>
          <Heading
            style={{ color: '#211c3d', fontSize: 24, margin: '12px 0 4px' }}
          >
            Novo contato no site 🚀
          </Heading>
          <Text style={{ color: '#5c5a6e', fontSize: 15, margin: '0 0 24px' }}>
            Alguém apertou o botão amarelo. Detalhes abaixo:
          </Text>

          <Section>
            <Text
              style={{
                color: '#8a879c',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 1,
                margin: '0 0 2px',
                textTransform: 'uppercase',
              }}
            >
              Nome
            </Text>
            <Text
              style={{ color: '#211c3d', fontSize: 16, margin: '0 0 16px' }}
            >
              {name}
            </Text>

            <Text
              style={{
                color: '#8a879c',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 1,
                margin: '0 0 2px',
                textTransform: 'uppercase',
              }}
            >
              E-mail
            </Text>
            <Text
              style={{ color: '#211c3d', fontSize: 16, margin: '0 0 16px' }}
            >
              {email}
            </Text>

            {company ? (
              <>
                <Text
                  style={{
                    color: '#8a879c',
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: 1,
                    margin: '0 0 2px',
                    textTransform: 'uppercase',
                  }}
                >
                  Empresa
                </Text>
                <Text
                  style={{ color: '#211c3d', fontSize: 16, margin: '0 0 16px' }}
                >
                  {company}
                </Text>
              </>
            ) : null}
          </Section>

          <Hr style={{ borderColor: '#e4e1f0', margin: '8px 0 20px' }} />

          <Text
            style={{
              color: '#8a879c',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 1,
              margin: '0 0 8px',
              textTransform: 'uppercase',
            }}
          >
            Mensagem
          </Text>
          <Text
            style={{
              color: '#211c3d',
              fontSize: 16,
              lineHeight: 1.6,
              margin: 0,
              whiteSpace: 'pre-wrap',
            }}
          >
            {message}
          </Text>

          <Hr style={{ borderColor: '#e4e1f0', margin: '24px 0 16px' }} />
          <Text style={{ color: '#8a879c', fontSize: 13, margin: 0 }}>
            Responda este e-mail para falar direto com {name} — o reply-to já
            está configurado.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
