import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { ToggleGroupBasicExample } from './examples/basic'
import { ToggleGroupControlledExample } from './examples/controlled'
import { ToggleGroupMultipleExample } from './examples/multiple'
import { ToggleGroupRootProviderExample } from './examples/root-provider'

const meta: Meta = {
  title: 'Components / Toggle Group',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [ToggleGroupBasicExample] })],
  render: () => ({ template: '<toggle-group-basic-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [ToggleGroupControlledExample] })],
  render: () => ({ template: '<toggle-group-controlled-example />' }),
}

export const Multiple: StoryObj = {
  decorators: [moduleMetadata({ imports: [ToggleGroupMultipleExample] })],
  render: () => ({ template: '<toggle-group-multiple-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [ToggleGroupRootProviderExample] })],
  render: () => ({ template: '<toggle-group-root-provider-example />' }),
}
