import { render } from '@react-email/render';
import * as React from 'react';
import { VerificationEmailTemplate } from './register-template';
import { ForgetPasswordTemplate } from './forget-password-template';
import { EmailTemplateEnum } from '../constants/email-text.contants';

export const getTemplate = ({
  template,
  url,
  userEmail,
}: {
  template: keyof typeof EmailTemplateEnum;
  url: string;
  userEmail: string;
}) => {
  switch (template) {
    case 'REGISTER':
      return render(
        <VerificationEmailTemplate link={url} userEmail={userEmail} />,
      );

    case 'FORGET_PASSWORD':
      return render(
        <ForgetPasswordTemplate link={url} userEmail={userEmail} />,
      );

    default:
      return null;
  }
};
