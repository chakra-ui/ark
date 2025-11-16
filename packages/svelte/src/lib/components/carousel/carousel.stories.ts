import type { Meta } from '@storybook/svelte'
import AutoplayExample from './examples/autoplay.svelte'
import BasicExample from './examples/basic.svelte'
import ControlledExample from './examples/controlled.svelte'
import CustomIndicatorExample from './examples/custom-indicator.svelte'
import DynamicSlidesExample from './examples/dynamic-slides.svelte'
import PauseOnHoverExample from './examples/pause-on-hover.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import ScrollToExample from './examples/scroll-to.svelte'
import SlidesPerPageExample from './examples/slides-per-page.svelte'
import VariableSizeExample from './examples/variable-size.svelte'
import VerticalExample from './examples/vertical.svelte'

const meta: Meta = {
  title: 'Components/Carousel',
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

export const CustomIndicator = {
  render: () => ({
    Component: CustomIndicatorExample,
  }),
}

export const DynamicSlides = {
  render: () => ({
    Component: DynamicSlidesExample,
  }),
}

export const PauseOnHover = {
  render: () => ({
    Component: PauseOnHoverExample,
  }),
}

export const Autoplay = {
  render: () => ({
    Component: AutoplayExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}

export const ScrollTo = {
  render: () => ({
    Component: ScrollToExample,
  }),
}

export const SlidesPerPage = {
  render: () => ({
    Component: SlidesPerPageExample,
  }),
}

export const VariableSize = {
  render: () => ({
    Component: VariableSizeExample,
  }),
}

export const Vertical = {
  render: () => ({
    Component: VerticalExample,
  }),
}
