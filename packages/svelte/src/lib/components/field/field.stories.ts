import type { Meta } from '@storybook/svelte'

import DisabledExample from './examples/disabled.svelte'
import InputExample from './examples/input.svelte'
import InvalidExample from './examples/invalid.svelte'
import RequiredExample from './examples/required.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import SelectExample from './examples/select.svelte'
import TextareaAutoresizeExample from './examples/textarea-autoresize.svelte'
import TextareaExample from './examples/textarea.svelte'
import CustomControlExample from './examples/custom-control.svelte'

const meta: Meta = {
  title: 'Components/Field',
}

export default meta

export const Input = {
  render: () => ({
    Component: InputExample,
  }),
}

export const Invalid = {
  render: () => ({
    Component: InvalidExample,
  }),
}

export const Required = {
  render: () => ({
    Component: RequiredExample,
  }),
}

export const Textarea = {
  render: () => ({
    Component: TextareaExample,
  }),
}

export const TextareaAutoresize = {
  render: () => ({
    Component: TextareaAutoresizeExample,
  }),
}

export const Select = {
  render: () => ({
    Component: SelectExample,
  }),
}

export const Disabled = {
  render: () => ({
    Component: DisabledExample,
  }),
}

export const CustomControl = {
  render: () => ({
    Component: CustomControlExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}
