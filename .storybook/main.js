module.exports = {
  stories: [
    '../src/**/stories.mdx',
    '../src/**/*.stories.mdx',
    '../src/**/stories.@(js|jsx|ts|tsx)',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/preset-create-react-app',
    '@storybook/addon-storysource',
    'storybook-addon-designs',
    'storybook-dark-mode',
    'storybook-react-i18next',
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  typescript: {
    check: true, // type-check stories during Storybook build
  },
  managerHead: (head, { configType }) => {
    if (configType === 'PRODUCTION') {
      return `
        ${head}
        <base href="/storybook/">
      `;
    }
  },
};
