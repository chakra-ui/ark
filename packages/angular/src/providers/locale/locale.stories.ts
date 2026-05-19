import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { LocaleSetupExample } from './examples/setup'
import { LocaleUsageExample } from './examples/usage'

const meta: Meta = {
  title: 'Utilities / Locale',
}

export default meta

export const Setup: StoryObj = {
  decorators: [moduleMetadata({ imports: [LocaleSetupExample] })],
  render: () => ({ template: '<locale-setup-example />' }),
}

export const Usage: StoryObj = {
  decorators: [moduleMetadata({ imports: [LocaleUsageExample] })],
  render: () => ({ template: '<locale-usage-example />' }),
}
