import { Html } from '@react-email/html';
import { Body } from '@react-email/body';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Hr } from '@react-email/hr';
import { Img } from '@react-email/img';
import { Text } from '@react-email/text';

import * as React from 'react';

interface KoalaWelcomeEmailProps {
  userEmail: string;
  link: string;
}

export const ForgetPasswordTemplate = ({
  userEmail,
  link,
}: KoalaWelcomeEmailProps) => (
  <Html>
    <Head />

    <Body style={main}>
      <Container style={container}>
        <Img
          src={'https://tora-bucket.s3.eu-north-1.amazonaws.com/logo.png'}
          width="170"
          height="50"
          alt="Tora"
          style={logo}
        />
        <Text style={paragraph}>Hi {userEmail},</Text>
        <Text style={paragraph}>
          Someone recently requested a password change for your Tora account. If
          this was you, you can set a new password here:
        </Text>

        <Text>Enter this OTP</Text>
        <Text> {link}</Text>

        <Text style={paragraph}>
          Best,
          <br />
          The Tora team
        </Text>

        <Hr style={hr} />
        <Text style={footer}></Text>
      </Container>
    </Body>
  </Html>
);

export default ForgetPasswordTemplate;

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
};

const logo = {
  margin: '0 auto',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
};

const btnContainer = {
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#5F51E8',
  borderRadius: '3px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
};

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
};
