import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { BasicExample } from './examples/basic'
import { ContextExample } from './examples/context'
import { EventsExample } from './examples/events'
import { RootProviderExample } from './examples/root-provider'

const meta: Meta = {
  title: 'Components / Avatar',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [BasicExample] })],
  render: () => ({ template: '<avatar-basic-example />' }),
}

export const Context: StoryObj = {
  decorators: [moduleMetadata({ imports: [ContextExample] })],
  render: () => ({ template: '<avatar-context-example />' }),
}

export const Events: StoryObj = {
  decorators: [moduleMetadata({ imports: [EventsExample] })],
  render: () => ({ template: '<avatar-events-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [RootProviderExample] })],
  render: () => ({ template: '<avatar-root-provider-example />' }),
}
