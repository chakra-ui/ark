import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { ProgressLinearBasicExample } from './examples/linear/basic'
import { ProgressLinearIndeterminateExample } from './examples/linear/indeterminate'
import { ProgressLinearMinMaxExample } from './examples/linear/min-max'
import { ProgressLinearRootProviderExample } from './examples/linear/root-provider'
import { ProgressLinearValueTextExample } from './examples/linear/value-text'
import { ProgressLinearVerticalExample } from './examples/linear/vertical'
import { ProgressCircularBasicExample } from './examples/circular/basic'
import { ProgressCircularIndeterminateExample } from './examples/circular/indeterminate'
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

export const LinearMinMax: StoryObj = {
  decorators: [moduleMetadata({ imports: [ProgressLinearMinMaxExample] })],
  render: () => ({ template: '<progress-linear-min-max-example />' }),
}

export const LinearIndeterminate: StoryObj = {
  decorators: [moduleMetadata({ imports: [ProgressLinearIndeterminateExample] })],
  render: () => ({ template: '<progress-linear-indeterminate-example />' }),
}

export const LinearValueText: StoryObj = {
  decorators: [moduleMetadata({ imports: [ProgressLinearValueTextExample] })],
  render: () => ({ template: '<progress-linear-value-text-example />' }),
}

export const LinearVertical: StoryObj = {
  decorators: [moduleMetadata({ imports: [ProgressLinearVerticalExample] })],
  render: () => ({ template: '<progress-linear-vertical-example />' }),
}

export const LinearRootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [ProgressLinearRootProviderExample] })],
  render: () => ({ template: '<progress-linear-root-provider-example />' }),
}

export const CircularBasic: StoryObj = {
  decorators: [moduleMetadata({ imports: [ProgressCircularBasicExample] })],
  render: () => ({ template: '<progress-circular-basic-example />' }),
}

export const CircularMinMax: StoryObj = {
  decorators: [moduleMetadata({ imports: [ProgressCircularMinMaxExample] })],
  render: () => ({ template: '<progress-circular-min-max-example />' }),
}

export const CircularIndeterminate: StoryObj = {
  decorators: [moduleMetadata({ imports: [ProgressCircularIndeterminateExample] })],
  render: () => ({ template: '<progress-circular-indeterminate-example />' }),
}

export const CircularWithLabel: StoryObj = {
  decorators: [moduleMetadata({ imports: [ProgressCircularWithLabelExample] })],
  render: () => ({ template: '<progress-circular-with-label-example />' }),
}

export const CircularRootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [ProgressCircularRootProviderExample] })],
  render: () => ({ template: '<progress-circular-root-provider-example />' }),
}
