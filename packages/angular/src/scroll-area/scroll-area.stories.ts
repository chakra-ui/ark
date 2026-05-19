import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { ScrollAreaBasicExample } from './examples/basic'
import { ScrollAreaBothDirectionsExample } from './examples/both-directions'
import { ScrollAreaHorizontalExample } from './examples/horizontal'
import { ScrollAreaNestedExample } from './examples/nested'
import { ScrollAreaRootProviderExample } from './examples/root-provider'

const meta: Meta = {
  title: 'Components / Scroll Area',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [ScrollAreaBasicExample] })],
  render: () => ({ template: '<scroll-area-basic-example />' }),
}

export const Horizontal: StoryObj = {
  decorators: [moduleMetadata({ imports: [ScrollAreaHorizontalExample] })],
  render: () => ({ template: '<scroll-area-horizontal-example />' }),
}

export const BothDirections: StoryObj = {
  decorators: [moduleMetadata({ imports: [ScrollAreaBothDirectionsExample] })],
  render: () => ({ template: '<scroll-area-both-directions-example />' }),
}

export const Nested: StoryObj = {
  decorators: [moduleMetadata({ imports: [ScrollAreaNestedExample] })],
  render: () => ({ template: '<scroll-area-nested-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [ScrollAreaRootProviderExample] })],
  render: () => ({ template: '<scroll-area-root-provider-example />' }),
}
