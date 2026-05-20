import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { AngleSliderBasicExample } from './examples/basic'
import { AngleSliderControlledExample } from './examples/controlled'
import { AngleSliderDisabledExample } from './examples/disabled'
import { AngleSliderStepExample } from './examples/step'
import { AngleSliderContextExample } from './examples/context'
import { AngleSliderRootProviderExample } from './examples/root-provider'

const meta: Meta = {
  title: 'Components / Angle Slider',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [AngleSliderBasicExample] })],
  render: () => ({ template: '<angle-slider-basic-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [AngleSliderControlledExample] })],
  render: () => ({ template: '<angle-slider-controlled-example />' }),
}

export const Disabled: StoryObj = {
  decorators: [moduleMetadata({ imports: [AngleSliderDisabledExample] })],
  render: () => ({ template: '<angle-slider-disabled-example />' }),
}

export const Step: StoryObj = {
  decorators: [moduleMetadata({ imports: [AngleSliderStepExample] })],
  render: () => ({ template: '<angle-slider-step-example />' }),
}

export const Context: StoryObj = {
  decorators: [moduleMetadata({ imports: [AngleSliderContextExample] })],
  render: () => ({ template: '<angle-slider-context-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [AngleSliderRootProviderExample] })],
  render: () => ({ template: '<angle-slider-root-provider-example />' }),
}
