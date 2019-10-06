// eslint-disable-next-line no-undef
App.info({
  id: 'ru.sacralium',
  name: 'sacralium',
  version: '0.0.1',
  description: 'Sacralium, the Game.',
  author: 'Morula',
  email: 'contact@sacralium.ru',
  website: 'http://sacralium.ru',
});

// eslint-disable-next-line no-undef
App.configurePlugin('cordova-plugin-googleplus', {
  REVERSED_CLIENT_ID: 'REVERSED_CLIENT_ID_FOR_cordova-plugin-googleplus',
});

// eslint-disable-next-line no-undef
App.icons({
  app_store: 'resources/icons/icon-1024x1024.png',
  iphone_2x: 'resources/icons/icon-120x120.png',
  iphone_3x: 'resources/icons/icon-180x180.png',
  ipad: 'resources/icons/icon-76x76.png',
  ipad_2x: 'resources/icons/icon-152x152.png',
  ipad_pro: 'resources/icons/icon-167x167.png',
  ios_settings: 'resources/icons/icon-29x29.png',
  ios_settings_2x: 'resources/icons/icon-58x58.png',
  ios_settings_3x: 'resources/icons/icon-87x87.png',
  ios_spotlight: 'resources/icons/icon-40x40.png',
  ios_spotlight_2x: 'resources/icons/icon-80x80.png',
  ios_spotlight_3x: 'resources/icons/icon-120x120.png',
  ios_notification: 'resources/icons/icon-20x20.png',
  ios_notification_2x: 'resources/icons/icon-40x40.png',
  ios_notification_3x: 'resources/icons/icon-60x60.png',
  ipad_app_legacy: 'resources/icons/icon-72x72.png',
  ipad_app_legacy_2x: 'resources/icons/icon-144x144.png',
  android_mdpi: 'resources/icons/icon-48x48.png',
  android_hdpi: 'resources/icons/icon-72x72.png',
  android_xhdpi: 'resources/icons/icon-96x96.png',
  android_xxhdpi: 'resources/icons/icon-144x144.png',
  android_xxxhdpi: 'resources/icons/icon-192x192.png',
});

// eslint-disable-next-line no-undef
App.launchScreens({
  iphoneX_portrait: 'resources/splashes/splash-1125x2436.png',
  iphoneX_landscape: 'resources/splashes/splash-2436x1125.png',
  iphone6p_portrait: 'resources/splashes/splash-1242x2208.png',
  iphone6p_landscape: 'resources/splashes/splash-2208x1242.png',
  ipad_portrait_2x: 'resources/splashes/splash-1536x2048.png',
  ipad_landscape_2x: 'resources/splashes/splash-2048x1536.png',
  iphone6: 'resources/splashes/splash-750x1334.png',
  iphone5: 'resources/splashes/splash-640x1136.png',
  ipad_portrait: 'resources/splashes/splash-768x1024.png',
  ipad_landscape: 'resources/splashes/splash-1024x768.png',
  iphone_2x: 'resources/splashes/splash-640x960.png',
  iphone: 'resources/splashes/splash-320x480.png',
  android_mdpi_portrait: 'resources/splashes/splash-320.9.png',
  android_mdpi_landscape: 'resources/splashes/splash-320.9.png',
  android_hdpi_portrait: 'resources/splashes/splash-320.9.png',
  android_hdpi_landscape: 'resources/splashes/splash-320.9.png',
  android_xhdpi_portrait: 'resources/splashes/splash-320.9.png',
  android_xhdpi_landscape: 'resources/splashes/splash-320.9.png',
  android_xxhdpi_portrait: 'resources/splashes/splash-320.9.png',
  android_xxhdpi_landscape: 'resources/splashes/splash-320.9.png',
  android_xxxhdpi_portrait: 'resources/splashes/splash-320.9.png',
  android_xxxhdpi_landscape: 'resources/splashes/splash-320.9.png',
});
