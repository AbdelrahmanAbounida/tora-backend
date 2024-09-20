import { Html } from '@react-email/html';
import { Body } from '@react-email/body';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Hr } from '@react-email/hr';
import { Img } from '@react-email/img';
import { Text } from '@react-email/text';
import { Link } from '@react-email/link';

import * as React from 'react';

interface EmailProps {
  userEmail: string;
  link: string;
  // verificationUrl2?: string;
}

export const VerificationEmailTemplate = ({ userEmail, link }: EmailProps) => (
  <Html>
    <Head />
    {/* <Preview>
    </Preview> */}
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
          Welcome to Tora! We're excited to have you on board. To complete your
          registration and activate your account, please click on the following
          verification link:
        </Text>

        <Text style={paragraph}>
          Please note that this link is only valid for the next 24 hours. After
          that, you will need to request a new verification email. If you did
          not sign up for a Tora account, please ignore this email. If you have
          any questions or need assistance, please don't hesitate to contact our
          support team at{' '}
          <Link href="ToraTeam@Tora.com">ToraTeam@Tora.com</Link> . Thank you
          for choosing Tora. We look forward to helping you accelerate your AI
          development journey.
        </Text>

        <Text>Use this otp</Text>
        <Text>{link}</Text>

        <Text style={paragraph}>
          Best regards,
          <br />
          The Tora Team
        </Text>

        <Hr style={hr} />
        <Text style={footer}></Text>
      </Container>
    </Body>
  </Html>
);

export default VerificationEmailTemplate;

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
