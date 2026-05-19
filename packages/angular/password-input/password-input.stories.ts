import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { PasswordInputBasicExample } from './examples/basic'
import { PasswordInputControlledExample } from './examples/controlled'
import { PasswordInputDefaultVisibleExample } from './examples/default-visible'
import { PasswordInputRootProviderExample } from './examples/root-provider'
import { PasswordInputWithFieldExample } from './examples/with-field'

const meta: Meta = {
  title: 'Components / Password Input',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [PasswordInputBasicExample] })],
  render: () => ({ template: '<password-input-basic-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [PasswordInputControlledExample] })],
  render: () => ({ template: '<password-input-controlled-example />' }),
}

export const WithField: StoryObj = {
  decorators: [moduleMetadata({ imports: [PasswordInputWithFieldExample] })],
  render: () => ({ template: '<password-input-with-field-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [PasswordInputRootProviderExample] })],
  render: () => ({ template: '<password-input-root-provider-example />' }),
}

export const DefaultVisible: StoryObj = {
  decorators: [moduleMetadata({ imports: [PasswordInputDefaultVisibleExample] })],
  render: () => ({ template: '<password-input-default-visible-example />' }),
}
