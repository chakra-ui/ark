import type { Meta } from '@storybook/svelte'
import BasicExample from './examples/basic.svelte'
import ControlledExample from './examples/controlled.svelte'
import CustomizedExample from './examples/customized.svelte'
import LinkExample from './examples/link.svelte'
import RootProviderExample from './examples/root-provider.svelte'

const meta: Meta = {
  title: 'Components / Pagination',
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

export const Customized = {
  render: () => ({
    Component: CustomizedExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}

export const Link = {
  render: () => ({
    Component: LinkExample,
  }),
}
