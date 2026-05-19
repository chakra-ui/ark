import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { CarouselAutoplayExample } from './examples/autoplay'
import { CarouselBasicExample } from './examples/basic'
import { CarouselControlledExample } from './examples/controlled'
import { CarouselDynamicSlidesExample } from './examples/dynamic-slides'
import { CarouselRootProviderExample } from './examples/root-provider'
import { CarouselVerticalExample } from './examples/vertical'

const meta: Meta = {
  title: 'Components / Carousel',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [CarouselBasicExample] })],
  render: () => ({ template: '<carousel-basic-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [CarouselControlledExample] })],
  render: () => ({ template: '<carousel-controlled-example />' }),
}

export const Autoplay: StoryObj = {
  decorators: [moduleMetadata({ imports: [CarouselAutoplayExample] })],
  render: () => ({ template: '<carousel-autoplay-example />' }),
}

export const DynamicSlides: StoryObj = {
  decorators: [moduleMetadata({ imports: [CarouselDynamicSlidesExample] })],
  render: () => ({ template: '<carousel-dynamic-slides-example />' }),
}

export const Vertical: StoryObj = {
  decorators: [moduleMetadata({ imports: [CarouselVerticalExample] })],
  render: () => ({ template: '<carousel-vertical-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [CarouselRootProviderExample] })],
  render: () => ({ template: '<carousel-root-provider-example />' }),
}
