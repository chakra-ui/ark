import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { TourBasicExample } from './examples/basic'
import { TourControlledExample } from './examples/controlled'
import { TourWaitForClickExample } from './examples/wait-for-click'

const meta: Meta = {
  title: 'Components / Tour',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [TourBasicExample] })],
  render: () => ({ template: '<tour-basic-example />' }),
}

export const Controlled: StoryObj = {
  decorators: [moduleMetadata({ imports: [TourControlledExample] })],
  render: () => ({ template: '<tour-controlled-example />' }),
}

export const WaitForClick: StoryObj = {
  decorators: [moduleMetadata({ imports: [TourWaitForClickExample] })],
  render: () => ({ template: '<tour-wait-for-click-example />' }),
}
