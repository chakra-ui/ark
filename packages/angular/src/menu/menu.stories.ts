import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { MenuBasicExample } from './examples/basic'
import { MenuControlledExample } from './examples/controlled'
import { MenuControlledHighlightExample } from './examples/controlled-highlight'
import { MenuRootProviderExample } from './examples/root-provider'
import { MenuWithSeparatorExample } from './examples/with-separator'

const meta: Meta = {
  title: 'Components / Menu',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [MenuBasicExample] })],
  render: () => ({ template: '<menu-basic-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [MenuControlledExample] })],
  render: () => ({ template: '<menu-controlled-example />' }),
}

export const WithSeparator: StoryObj = {
  decorators: [moduleMetadata({ imports: [MenuWithSeparatorExample] })],
  render: () => ({ template: '<menu-with-separator-example />' }),
}

export const ControlledHighlight: StoryObj = {
  decorators: [moduleMetadata({ imports: [MenuControlledHighlightExample] })],
  render: () => ({ template: '<menu-controlled-highlight-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [MenuRootProviderExample] })],
  render: () => ({ template: '<menu-root-provider-example />' }),
}
