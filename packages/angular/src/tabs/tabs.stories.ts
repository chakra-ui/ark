import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { TabsBasicExample } from './examples/basic'
import { TabsControlledExample } from './examples/controlled'
import { TabsDisabledTabExample } from './examples/disabled-tab'
import { TabsIndicatorExample } from './examples/indicator'
import { TabsManualActivationExample } from './examples/manual-activation'
import { TabsRootProviderExample } from './examples/root-provider'
import { TabsVerticalExample } from './examples/vertical'

const meta: Meta = {
  title: 'Components / Tabs',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [TabsBasicExample] })],
  render: () => ({ template: '<tabs-basic-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [TabsControlledExample] })],
  render: () => ({ template: '<tabs-controlled-example />' }),
}

export const DisabledTab: StoryObj = {
  decorators: [moduleMetadata({ imports: [TabsDisabledTabExample] })],
  render: () => ({ template: '<tabs-disabled-tab-example />' }),
}

export const Indicator: StoryObj = {
  decorators: [moduleMetadata({ imports: [TabsIndicatorExample] })],
  render: () => ({ template: '<tabs-indicator-example />' }),
}

export const ManualActivation: StoryObj = {
  decorators: [moduleMetadata({ imports: [TabsManualActivationExample] })],
  render: () => ({ template: '<tabs-manual-activation-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [TabsRootProviderExample] })],
  render: () => ({ template: '<tabs-root-provider-example />' }),
}

export const Vertical: StoryObj = {
  decorators: [moduleMetadata({ imports: [TabsVerticalExample] })],
  render: () => ({ template: '<tabs-vertical-example />' }),
}
