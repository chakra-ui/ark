import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { RadioGroupBasicExample } from './examples/basic'
import { RadioGroupControlledExample } from './examples/controlled'
import { RadioGroupDisabledExample } from './examples/disabled'
import { RadioGroupInitialValueExample } from './examples/initial-value'
import { RadioGroupOrientationExample } from './examples/orientation'
import { RadioGroupRootProviderExample } from './examples/root-provider'
import { RadioGroupWithFieldsetExample } from './examples/with-fieldset'

const meta: Meta = {
  title: 'Components / Radio Group',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [RadioGroupBasicExample] })],
  render: () => ({ template: '<radio-group-basic-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [RadioGroupControlledExample] })],
  render: () => ({ template: '<radio-group-controlled-example />' }),
}

export const Disabled: StoryObj = {
  decorators: [moduleMetadata({ imports: [RadioGroupDisabledExample] })],
  render: () => ({ template: '<radio-group-disabled-example />' }),
}

export const InitialValue: StoryObj = {
  decorators: [moduleMetadata({ imports: [RadioGroupInitialValueExample] })],
  render: () => ({ template: '<radio-group-initial-value-example />' }),
}

export const Orientation: StoryObj = {
  decorators: [moduleMetadata({ imports: [RadioGroupOrientationExample] })],
  render: () => ({ template: '<radio-group-orientation-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [RadioGroupRootProviderExample] })],
  render: () => ({ template: '<radio-group-root-provider-example />' }),
}

export const WithFieldset: StoryObj = {
  decorators: [moduleMetadata({ imports: [RadioGroupWithFieldsetExample] })],
  render: () => ({ template: '<radio-group-with-fieldset-example />' }),
}
