import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import ControlledExample from './examples/controlled.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import WithContextExample from './examples/with-context.svelte'
import ImagePreviewExample from './examples/image-preview.svelte'
import WithFieldExample from './examples/with-field.svelte'

const meta: Meta = {
  title: 'Components/SignaturePad',
}

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const Controlled = {
  render: () => ({
    Component: ControlledExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}

export const WithContext = {
  render: () => ({
    Component: WithContextExample,
  }),
}

export const ImagePreview = {
  render: () => ({
    Component: ImagePreviewExample,
  }),
}

export const WithField = {
  render: () => ({
    Component: WithFieldExample,
  }),
}
