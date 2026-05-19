import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { StepsBasicExample } from './examples/basic'
import { StepsControlledExample } from './examples/controlled'
import { StepsRootProviderExample } from './examples/root-provider'
import { StepsVerticalExample } from './examples/vertical'

const meta: Meta = {
  title: 'Components / Steps',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [StepsBasicExample] })],
  render: () => ({ template: '<steps-basic-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [StepsControlledExample] })],
  render: () => ({ template: '<steps-controlled-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [StepsRootProviderExample] })],
  render: () => ({ template: '<steps-root-provider-example />' }),
}

export const Vertical: StoryObj = {
  decorators: [moduleMetadata({ imports: [StepsVerticalExample] })],
  render: () => ({ template: '<steps-vertical-example />' }),
}
