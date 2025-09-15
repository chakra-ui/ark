import type { Meta } from '@storybook/svelte'

import BasicExample from './examples/basic.svelte'
import SnapPointsExample from './examples/snap-points.svelte'
import ControlledExample from './examples/controlled.svelte'
import ModalExample from './examples/modal.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import ScrollableExample from './examples/scrollable.svelte'

const meta: Meta = {
  title: 'Components / Bottom Sheet',
}

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const SnapPoints = {
  render: () => ({
    Component: SnapPointsExample,
  }),
}

export const Controlled = {
  render: () => ({
    Component: ControlledExample,
  }),
}

export const Modal = {
  render: () => ({
    Component: ModalExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}

export const Scrollable = {
  render: () => ({
    Component: ScrollableExample,
  }),
}
