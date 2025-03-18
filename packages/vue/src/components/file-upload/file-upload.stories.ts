import BasicExample from './examples/basic.vue'
import WithFieldExample from './examples/with-field.vue'
import RootProviderExample from './examples/root-provider.vue'

export default {
  title: 'Components / File Upload',
};

export const Basic = {
  render: () => ({
    components: { BasicExample },
    template: '<BasicExample />',
  }),
};

export const WithField = {
  render: () => ({
    components: { WithFieldExample },
    template: '<WithFieldExample />',
  }),
};

export const RootProvider = {
  render: () => ({
    components: { RootProviderExample },
    template: '<RootProviderExample />',
  }),
};