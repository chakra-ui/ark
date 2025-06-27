import type { Meta } from '@storybook/svelte'

import BasicExample from './examples/basic.svelte'
import ControlledExample from './examples/controlled.svelte'
import DisabledExample from './examples/disabled.svelte'
import FormUsageExample from './examples/form-usage.svelte'
import HalfRatingsExample from './examples/half-ratings.svelte'
import InitialValueExample from './examples/initial-value.svelte'
import ReadOnlyExample from './examples/read-only.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import WithFieldExample from './examples/with-field.svelte'

const meta: Meta = {
  title: 'Components / Rating Group',
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

export const Disabled = {
  render: () => ({
    Component: DisabledExample,
  }),
}

export const FormUsage = {
  render: () => ({
    Component: FormUsageExample,
  }),
}

export const HalfRatings = {
  render: () => ({
    Component: HalfRatingsExample,
  }),
}

export const InitialValue = {
  render: () => ({
    Component: InitialValueExample,
  }),
}

export const ReadOnly = {
  render: () => ({
    Component: ReadOnlyExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}

export const WithField = {
  render: () => ({
    Component: WithFieldExample,
  }),
}
