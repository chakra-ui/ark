import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { ClientOnlyBasicExample } from './examples/basic'
import { ClientOnlyWithFallbackExample } from './examples/with-fallback'

const meta: Meta = {
  title: 'Utilities / ClientOnly',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [ClientOnlyBasicExample] })],
  render: () => ({ template: '<client-only-basic-example />' }),
}

export const WithFallback: StoryObj = {
  decorators: [moduleMetadata({ imports: [ClientOnlyWithFallbackExample] })],
  render: () => ({ template: '<client-only-with-fallback-example />' }),
}
