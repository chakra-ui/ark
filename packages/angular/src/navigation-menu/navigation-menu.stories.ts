import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { NavigationMenuBasicExample } from './examples/basic'
import { NavigationMenuControlledExample } from './examples/controlled'
import { NavigationMenuRootProviderExample } from './examples/root-provider'
import { NavigationMenuViewportExample } from './examples/viewport'
import { NavigationMenuWithIndicatorExample } from './examples/with-indicator'

const meta: Meta = {
  title: 'Components / Navigation Menu',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [NavigationMenuBasicExample] })],
  render: () => ({ template: '<navigation-menu-basic-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [NavigationMenuControlledExample] })],
  render: () => ({ template: '<navigation-menu-controlled-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [NavigationMenuRootProviderExample] })],
  render: () => ({ template: '<navigation-menu-root-provider-example />' }),
}

export const Viewport: StoryObj = {
  decorators: [moduleMetadata({ imports: [NavigationMenuViewportExample] })],
  render: () => ({ template: '<navigation-menu-viewport-example />' }),
}

export const WithIndicator: StoryObj = {
  decorators: [moduleMetadata({ imports: [NavigationMenuWithIndicatorExample] })],
  render: () => ({ template: '<navigation-menu-with-indicator-example />' }),
}
