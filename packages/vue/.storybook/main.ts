import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.ts'],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: { backgrounds: false, controls: false, actions: false },
    },
    '@storybook/addon-a11y',
    '@storybook/addon-actions',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  docs: {
    autodocs: false,
  },

  // TODO: fix this when vue-docgen accepts types from other packages in components
  // This is a workaround until vue-docgen-plugin is fixed since we also dont use autodocs
  // This removes the plugin vue-docgen-plugin so it wont load and throws an error on the use of an type import like
  // import { Avatar, type AvatarRootEmits, type AvatarRootProps } from '@ark-ui/vue/avatar'
  // using options: { docgen: "vue-component-meta",} throws other errors with node_modules/@zag-js/avatar/dist/index.mjs.vue'
  // could not be found. This could be a fix for the vue-docgen-plugin error but it is not working for now
  viteFinal(config) {
    const vueDocgenIndex =
      config.plugins?.findIndex(
        (plugin) =>
          plugin && typeof plugin === 'object' && 'name' in plugin && plugin.name === 'storybook:vue-docgen-plugin',
      ) ?? -1
    if (vueDocgenIndex !== -1) config.plugins?.splice(vueDocgenIndex, 1)
    return config
  },
}

export default config
