import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { SwitchBasicExample } from './examples/basic'
import { SwitchContextExample } from './examples/context'
import { SwitchControlledExample } from './examples/controlled'
import { SwitchDisabledExample } from './examples/disabled'
import { SwitchInitialCheckedExample } from './examples/initial-checked'
import { SwitchRootProviderExample } from './examples/root-provider'
import { SwitchWithFieldExample } from './examples/with-field'

const meta: Meta = {
  title: 'Components / Switch',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [SwitchBasicExample] })],
  render: () => ({ template: '<switch-basic-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [SwitchControlledExample] })],
  render: () => ({ template: '<switch-controlled-example />' }),
}

export const Disabled: StoryObj = {
  decorators: [moduleMetadata({ imports: [SwitchDisabledExample] })],
  render: () => ({ template: '<switch-disabled-example />' }),
}

export const InitialChecked: StoryObj = {
  decorators: [moduleMetadata({ imports: [SwitchInitialCheckedExample] })],
  render: () => ({ template: '<switch-initial-checked-example />' }),
}

export const Context: StoryObj = {
  decorators: [moduleMetadata({ imports: [SwitchContextExample] })],
  render: () => ({ template: '<switch-context-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [SwitchRootProviderExample] })],
  render: () => ({ template: '<switch-root-provider-example />' }),
}

export const WithField: StoryObj = {
  decorators: [moduleMetadata({ imports: [SwitchWithFieldExample] })],
  render: () => ({ template: '<switch-with-field-example />' }),
}
