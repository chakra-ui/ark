import type { Meta } from '@storybook/vue3-vite'

import AutoplayExample from './examples/autoplay.vue'
import BasicExample from './examples/basic.vue'
import ControlledExample from './examples/controlled.vue'
import CustomIndicatorExample from './examples/custom-indicator.vue'
import DynamicSlidesExample from './examples/dynamic-slides.vue'
import PauseOnHoverExample from './examples/pause-on-hover.vue'
import RootProviderExample from './examples/root-provider.vue'
import ScrollToExample from './examples/scroll-to.vue'
import SlidesPerPageExample from './examples/slides-per-page.vue'
import VerticalExample from './examples/vertical.vue'

const meta: Meta = {
  title: 'Components / Carousel',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const Controlled = {
  render: () => ({
    components: { Component: ControlledExample },
    template: '<Component />',
  }),
}

export const CustomIndicator = {
  render: () => ({
    components: { Component: CustomIndicatorExample },
    template: '<Component />',
  }),
}

export const DynamicSlides = {
  render: () => ({
    components: { Component: DynamicSlidesExample },
    template: '<Component />',
  }),
}

export const PauseOnHover = {
  render: () => ({
    components: { Component: PauseOnHoverExample },
    template: '<Component />',
  }),
}

export const Autoplay = {
  render: () => ({
    components: { Component: AutoplayExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}

export const ScrollTo = {
  render: () => ({
    components: { Component: ScrollToExample },
    template: '<Component />',
  }),
}

export const SlidesPerPage = {
  render: () => ({
    components: { Component: SlidesPerPageExample },
    template: '<Component />',
  }),
}

export const Vertical = {
  render: () => ({
    components: { Component: VerticalExample },
    template: '<Component />',
  }),
}
