import type { Meta } from '@storybook/vue3'

import BasicExample from './examples/basic.vue'
import DirectoryUploadExample from './examples/directory-upload.vue'
import RootProviderExample from './examples/root-provider.vue'
import ValidationExample from './examples/validation.vue'
import WithFieldExample from './examples/with-field.vue'

const meta = {
  title: 'Components / File Upload',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    components: { BasicExample },
    template: '<BasicExample />',
  }),
}

export const DirectoryUpload = {
  render: () => ({
    components: { DirectoryUploadExample },
    template: '<DirectoryUploadExample />',
  }),
}

export const Validation = {
  render: () => ({
    components: { ValidationExample },
    template: '<ValidationExample />',
  }),
}

export const WithField = {
  render: () => ({
    components: { WithFieldExample },
    template: '<WithFieldExample />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { RootProviderExample },
    template: '<RootProviderExample />',
  }),
}
