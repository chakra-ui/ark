import type { Meta } from '@storybook/vue3'

import BasicExample from './examples/basic.vue'
import ImagePreviewExample from './examples/image-preview.vue'
import RootProviderExample from './examples/root-provider.vue'
import WithFieldExample from './examples/with-field.vue'

const meta = {
  title: 'Components / SignaturePad',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    components: { BasicExample },
    template: '<BasicExample />',
  }),
}

export const ImagePreview = {
  render: () => ({
    components: { ImagePreviewExample },
    template: '<ImagePreviewExample />',
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