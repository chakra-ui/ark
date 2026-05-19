import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { EnvironmentSetupExample } from './examples/setup'
import { EnvironmentUsageExample } from './examples/usage'

const meta: Meta = {
  title: 'Utilities / Environment',
}

export default meta

export const Setup: StoryObj = {
  decorators: [moduleMetadata({ imports: [EnvironmentSetupExample] })],
  render: () => ({ template: '<environment-setup-example />' }),
}

export const Usage: StoryObj = {
  decorators: [moduleMetadata({ imports: [EnvironmentUsageExample] })],
  render: () => ({ template: '<environment-usage-example />' }),
}
