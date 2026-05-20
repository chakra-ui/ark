import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { EnvironmentBasicExample } from './examples/basic'
import { EnvironmentShadowRootExample } from './examples/shadow-root'

const meta: Meta = {
  title: 'Utilities / Environment',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [EnvironmentBasicExample] })],
  render: () => ({ template: '<environment-basic-example />' }),
}

export const ShadowRoot: StoryObj = {
  decorators: [moduleMetadata({ imports: [EnvironmentShadowRootExample] })],
  render: () => ({ template: '<environment-shadow-root-example />' }),
}
