import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from './examples/basic.js'
import { mount as SvgExample } from './examples/svg.js'
import { mount as WithPromiseExample } from './examples/with-promise.js'

const meta: Meta = { title: 'Utilities / Download Trigger' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Svg: StoryObj = { name: 'Svg', render: renderExample(SvgExample) }

export const WithPromise: StoryObj = { name: 'With Promise', render: renderExample(WithPromiseExample) }
