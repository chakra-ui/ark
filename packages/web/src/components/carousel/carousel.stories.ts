import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as AutoplayExample } from '../../../examples/carousel/autoplay.js'
import { mount as BasicExample } from '../../../examples/carousel/basic.js'
import { mount as ControlledExample } from '../../../examples/carousel/controlled.js'
import { mount as DynamicSlidesExample } from '../../../examples/carousel/dynamic-slides.js'
import { mount as PauseOnHoverExample } from '../../../examples/carousel/pause-on-hover.js'
import { mount as ScrollToExample } from '../../../examples/carousel/scroll-to.js'
import { mount as SlidesPerPageExample } from '../../../examples/carousel/slides-per-page.js'
import { mount as SpacingExample } from '../../../examples/carousel/spacing.js'
import { mount as ThumbnailIndicatorExample } from '../../../examples/carousel/thumbnail-indicator.js'
import { mount as VariableSizeExample } from '../../../examples/carousel/variable-size.js'
import { mount as VerticalExample } from '../../../examples/carousel/vertical.js'

const meta: Meta = { title: 'Components / Carousel' }
export default meta

export const Autoplay: StoryObj = { name: 'Autoplay', render: renderExample(AutoplayExample) }

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Controlled: StoryObj = { name: 'Controlled', render: renderExample(ControlledExample) }

export const DynamicSlides: StoryObj = { name: 'Dynamic Slides', render: renderExample(DynamicSlidesExample) }

export const PauseOnHover: StoryObj = { name: 'Pause On Hover', render: renderExample(PauseOnHoverExample) }

export const ScrollTo: StoryObj = { name: 'Scroll To', render: renderExample(ScrollToExample) }

export const SlidesPerPage: StoryObj = { name: 'Slides Per Page', render: renderExample(SlidesPerPageExample) }

export const Spacing: StoryObj = { name: 'Spacing', render: renderExample(SpacingExample) }

export const ThumbnailIndicator: StoryObj = {
  name: 'Thumbnail Indicator',
  render: renderExample(ThumbnailIndicatorExample),
}

export const VariableSize: StoryObj = { name: 'Variable Size', render: renderExample(VariableSizeExample) }

export const Vertical: StoryObj = { name: 'Vertical', render: renderExample(VerticalExample) }
