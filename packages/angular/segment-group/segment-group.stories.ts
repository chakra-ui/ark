import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { SegmentGroupBasicExample } from './examples/basic'
import { SegmentGroupConditionalExample } from './examples/conditional'
import { SegmentGroupControlledExample } from './examples/controlled'
import { SegmentGroupDisabledExample } from './examples/disabled'
import { SegmentGroupRootProviderExample } from './examples/root-provider'

const meta: Meta = {
  title: 'Components / Segment Group',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [SegmentGroupBasicExample] })],
  render: () => ({ template: '<segment-group-basic-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [SegmentGroupControlledExample] })],
  render: () => ({ template: '<segment-group-controlled-example />' }),
}

export const Disabled: StoryObj = {
  decorators: [moduleMetadata({ imports: [SegmentGroupDisabledExample] })],
  render: () => ({ template: '<segment-group-disabled-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [SegmentGroupRootProviderExample] })],
  render: () => ({ template: '<segment-group-root-provider-example />' }),
}

export const Conditional: StoryObj = {
  decorators: [moduleMetadata({ imports: [SegmentGroupConditionalExample] })],
  render: () => ({ template: '<segment-group-conditional-example />' }),
}
