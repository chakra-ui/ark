import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { CarouselAutoplayExample } from './examples/autoplay'
import { CarouselBasicExample } from './examples/basic'
import { CarouselControlledExample } from './examples/controlled'
import { CarouselDynamicSlidesExample } from './examples/dynamic-slides'
import { CarouselPauseOnHoverExample } from './examples/pause-on-hover'
import { CarouselRootProviderExample } from './examples/root-provider'
import { CarouselScrollToExample } from './examples/scroll-to'
import { CarouselSlidesPerPageExample } from './examples/slides-per-page'
import { CarouselSpacingExample } from './examples/spacing'
import { CarouselThumbnailIndicatorExample } from './examples/thumbnail-indicator'
import { CarouselVariableSizeExample } from './examples/variable-size'
import { CarouselVerticalExample } from './examples/vertical'

const meta: Meta = {
  title: 'Components / Carousel',
}

export default meta

export const Autoplay: StoryObj = {
  decorators: [moduleMetadata({ imports: [CarouselAutoplayExample] })],
  render: () => ({ template: '<carousel-autoplay-example />' }),
}

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [CarouselBasicExample] })],
  render: () => ({ template: '<carousel-basic-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [CarouselControlledExample] })],
  render: () => ({ template: '<carousel-controlled-example />' }),
}

export const ThumbnailIndicator: StoryObj = {
  decorators: [moduleMetadata({ imports: [CarouselThumbnailIndicatorExample] })],
  render: () => ({ template: '<carousel-thumbnail-indicator-example />' }),
}

export const DynamicSlides: StoryObj = {
  decorators: [moduleMetadata({ imports: [CarouselDynamicSlidesExample] })],
  render: () => ({ template: '<carousel-dynamic-slides-example />' }),
}

export const PauseOnHover: StoryObj = {
  decorators: [moduleMetadata({ imports: [CarouselPauseOnHoverExample] })],
  render: () => ({ template: '<carousel-pause-on-hover-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [CarouselRootProviderExample] })],
  render: () => ({ template: '<carousel-root-provider-example />' }),
}

export const ScrollTo: StoryObj = {
  decorators: [moduleMetadata({ imports: [CarouselScrollToExample] })],
  render: () => ({ template: '<carousel-scroll-to-example />' }),
}

export const SlidesPerPage: StoryObj = {
  decorators: [moduleMetadata({ imports: [CarouselSlidesPerPageExample] })],
  render: () => ({ template: '<carousel-slides-per-page-example />' }),
}

export const Spacing: StoryObj = {
  decorators: [moduleMetadata({ imports: [CarouselSpacingExample] })],
  render: () => ({ template: '<carousel-spacing-example />' }),
}

export const VariableSize: StoryObj = {
  decorators: [moduleMetadata({ imports: [CarouselVariableSizeExample] })],
  render: () => ({ template: '<carousel-variable-size-example />' }),
}

export const Vertical: StoryObj = {
  decorators: [moduleMetadata({ imports: [CarouselVerticalExample] })],
  render: () => ({ template: '<carousel-vertical-example />' }),
}
