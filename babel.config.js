module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@screens': './app/screens',
          '@components': './app/components',
          '@services': './app/services',
          '@state': './app/state',
        },
      },
    ],
  ],
};
