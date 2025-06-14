import type { Meta } from '@storybook/svelte'

import BasicExample from './examples/basic.svelte'
import DisabledExample from './examples/disabled.svelte'
import InvalidExample from './examples/invalid.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import WithFieldExample from './examples/with-field.svelte'

const meta: Meta = {
  title: 'Components/Fieldset',
}

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const Disabled = {
  render: () => ({
    Component: DisabledExample,
  }),
}

export const Invalid = {
  render: () => ({
    Component: InvalidExample,
  }),
}

export const WithField = {
  render: () => ({
    Component: WithFieldExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}
