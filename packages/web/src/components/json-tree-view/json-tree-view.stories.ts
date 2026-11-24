import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as ArrayDataExample } from './examples/array-data.js'
import { mount as BasicExample } from './examples/basic.js'
import { mount as ErrorsExample } from './examples/errors.js'
import { mount as ExpandLevelExample } from './examples/expand-level.js'
import { mount as FromMarkupExample } from './examples/from-markup.js'
import { mount as FunctionsExample } from './examples/functions.js'
import { mount as MapAndSetExample } from './examples/map-and-set.js'
import { mount as RegexExample } from './examples/regex.js'
import { mount as RenderValueExample } from './examples/render-value.js'

const meta: Meta = { title: 'Components / JSON Tree View' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const ArrayData: StoryObj = { name: 'Array Data', render: renderExample(ArrayDataExample) }

export const Errors: StoryObj = { name: 'Errors', render: renderExample(ErrorsExample) }

export const ExpandLevel: StoryObj = { name: 'Expand Level', render: renderExample(ExpandLevelExample) }

export const FromMarkup: StoryObj = { name: 'From Markup', render: renderExample(FromMarkupExample) }

export const Functions: StoryObj = { name: 'Functions', render: renderExample(FunctionsExample) }

export const MapAndSet: StoryObj = { name: 'Map and Set', render: renderExample(MapAndSetExample) }

export const Regex: StoryObj = { name: 'Regex', render: renderExample(RegexExample) }

export const RenderValue: StoryObj = { name: 'Render Value', render: renderExample(RenderValueExample) }
