import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { DownloadTriggerBasicExample } from './examples/basic'
import { DownloadTriggerSvgExample } from './examples/svg'
import { DownloadTriggerWithPromiseExample } from './examples/with-promise'

const meta: Meta = {
  title: 'Components / Download Trigger',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [DownloadTriggerBasicExample] })],
  render: () => ({ template: '<download-trigger-basic-example />' }),
}

export const Svg: StoryObj = {
  decorators: [moduleMetadata({ imports: [DownloadTriggerSvgExample] })],
  render: () => ({ template: '<download-trigger-svg-example />' }),
}

export const WithPromise: StoryObj = {
  decorators: [moduleMetadata({ imports: [DownloadTriggerWithPromiseExample] })],
  render: () => ({ template: '<download-trigger-with-promise-example />' }),
}
