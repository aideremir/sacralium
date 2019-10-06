import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { ServiceConfiguration } from 'meteor/service-configuration';

ServiceConfiguration.configurations.upsert({
  service: 'facebook',
}, {
  $set: {
    appId: Meteor.settings.private.facebook.appId,
    loginStyle: 'popup',
    secret: Meteor.settings.private.facebook.secret,
  },
});
ServiceConfiguration.configurations.upsert({
  service: 'google',
}, {
  $set: {
    clientId: Meteor.settings.private.google.clientId,
    loginStyle: 'popup',
    secret: Meteor.settings.private.google.secret,
  },
});
ServiceConfiguration.configurations.upsert({
  service: 'vk',
}, {
  $set: {
    appId: Meteor.settings.private.vk.appId,
    loginStyle: 'popup',
    secret: Meteor.settings.private.vk.secret,
  },
});

// Ссылка на восстановление пароля
Accounts.urls.resetPassword = token => Meteor.absoluteUrl(`reset-password/${token}`);

const { mail } = Meteor.settings.private;
if (mail) {
  process.env.MAIL_URL = `${mail.protocol}://${mail.username}:${mail.password}@${mail.server}:${mail.port}`;

  Accounts.emailTemplates.from = mail.from;

  Accounts.emailTemplates.siteName = mail.sitename;

  Accounts.emailTemplates.resetPassword.subject = function () {
    return 'Сброс пароля';
  };

  Accounts.emailTemplates.resetPassword.html = function (user, url) {
    return '<p>Чтобы сбросить пароль, нажмите на ссылку: '
      + `<a href="${url}">${url}</a></p>`;
  };
} else if (process.env.NODE_ENV !== 'development') {
  throw Error('Не установлены настройки почты');
}
