import { renderExample } from '../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from '../examples/pagination/basic.js'
import { mount as ControlledExample } from '../examples/pagination/controlled.js'
import { mount as CustomizedExample } from '../examples/pagination/customized.js'
import { mount as DataSlicingExample } from '../examples/pagination/data-slicing.js'
import { mount as LinkExample } from '../examples/pagination/link.js'
import { mount as PageRangeExample } from '../examples/pagination/page-range.js'
import { mount as PageSizeControlExample } from '../examples/pagination/page-size-control.js'
import { mount as WithEdgesExample } from '../examples/pagination/with-edges.js'

const meta: Meta = { title: 'Components / Pagination' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Controlled: StoryObj = { name: 'Controlled', render: renderExample(ControlledExample) }

export const Customized: StoryObj = { name: 'Customized', render: renderExample(CustomizedExample) }

export const DataSlicing: StoryObj = { name: 'Data Slicing', render: renderExample(DataSlicingExample) }

export const Link: StoryObj = { name: 'Link', render: renderExample(LinkExample) }

export const PageRange: StoryObj = { name: 'Page Range', render: renderExample(PageRangeExample) }

export const PageSizeControl: StoryObj = { name: 'Page Size Control', render: renderExample(PageSizeControlExample) }

export const WithEdges: StoryObj = { name: 'With Edges', render: renderExample(WithEdgesExample) }
