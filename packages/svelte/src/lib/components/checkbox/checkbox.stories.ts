import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import ContextExample from './examples/context.svelte'
import IndeterminateExample from './examples/indeterminate.svelte'
import RootProviderExample from './examples/root-provider.svelte'

const meta = {
  title: 'Components / Checkbox',
} as Meta

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const Indeterminate = {
  render: () => ({
    Component: IndeterminateExample,
  }),
}

// export const RenderProp = {
//   render: () => ({
//     Component: RenderPropExample,
//   }),
// }

// export const Group = {
//   render: () => ({
//     Component: GroupExample,
//   }),
// }

// export const WithField = {
//   render: () => ({
//     Component: WithFieldExample,
//   }),
// }

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}

export const Context = {
  render: () => ({
    Component: ContextExample,
  }),
}
