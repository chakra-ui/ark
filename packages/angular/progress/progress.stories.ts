import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { ProgressLinearBasicExample } from './examples/linear/basic'
import { ProgressLinearControlledExample } from './examples/linear/controlled'
import { ProgressLinearIndeterminateExample } from './examples/linear/indeterminate'
import { ProgressLinearInitialValueExample } from './examples/linear/initial-value'
import { ProgressLinearMinMaxExample } from './examples/linear/min-max'
import { ProgressLinearRootProviderExample } from './examples/linear/root-provider'
import { ProgressLinearValueTextExample } from './examples/linear/value-text'
import { ProgressCircularBasicExample } from './examples/circular/basic'
import { ProgressCircularControlledExample } from './examples/circular/controlled'
import { ProgressCircularIndeterminateExample } from './examples/circular/indeterminate'
import { ProgressCircularInitialValueExample } from './examples/circular/initial-value'
import { ProgressCircularMinMaxExample } from './examples/circular/min-max'
import { ProgressCircularRootProviderExample } from './examples/circular/root-provider'
import { ProgressCircularWithLabelExample } from './examples/circular/with-label'

const meta: Meta = {
  title: 'Components / Progress',
}

export default meta

export const LinearBasic: StoryObj = {
  decorators: [moduleMetadata({ imports: [ProgressLinearBasicExample] })],
  render: () => ({ template: '<progress-linear-basic-example />' }),
}

export const LinearControlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [ProgressLinearControlledExample] })],
  render: () => ({ template: '<progress-linear-controlled-example />' }),
}

export const LinearIndeterminate: StoryObj = {
  decorators: [moduleMetadata({ imports: [ProgressLinearIndeterminateExample] })],
  render: () => ({ template: '<progress-linear-indeterminate-example />' }),
}

export const LinearInitialValue: StoryObj = {
  decorators: [moduleMetadata({ imports: [ProgressLinearInitialValueExample] })],
  render: () => ({ template: '<progress-linear-initial-value-example />' }),
}

export const LinearMinMax: StoryObj = {
  decorators: [moduleMetadata({ imports: [ProgressLinearMinMaxExample] })],
  render: () => ({ template: '<progress-linear-min-max-example />' }),
}

export const LinearRootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [ProgressLinearRootProviderExample] })],
  render: () => ({ template: '<progress-linear-root-provider-example />' }),
}

export const LinearValueText: StoryObj = {
  decorators: [moduleMetadata({ imports: [ProgressLinearValueTextExample] })],
  render: () => ({ template: '<progress-linear-value-text-example />' }),
}

export const CircularBasic: StoryObj = {
  decorators: [moduleMetadata({ imports: [ProgressCircularBasicExample] })],
  render: () => ({ template: '<progress-circular-basic-example />' }),
}

export const CircularControlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [ProgressCircularControlledExample] })],
  render: () => ({ template: '<progress-circular-controlled-example />' }),
}

export const CircularIndeterminate: StoryObj = {
  decorators: [moduleMetadata({ imports: [ProgressCircularIndeterminateExample] })],
  render: () => ({ template: '<progress-circular-indeterminate-example />' }),
}

export const CircularInitialValue: StoryObj = {
  decorators: [moduleMetadata({ imports: [ProgressCircularInitialValueExample] })],
  render: () => ({ template: '<progress-circular-initial-value-example />' }),
}

export const CircularMinMax: StoryObj = {
  decorators: [moduleMetadata({ imports: [ProgressCircularMinMaxExample] })],
  render: () => ({ template: '<progress-circular-min-max-example />' }),
}

export const CircularRootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [ProgressCircularRootProviderExample] })],
  render: () => ({ template: '<progress-circular-root-provider-example />' }),
}

export const CircularWithLabel: StoryObj = {
  decorators: [moduleMetadata({ imports: [ProgressCircularWithLabelExample] })],
  render: () => ({ template: '<progress-circular-with-label-example />' }),
}
