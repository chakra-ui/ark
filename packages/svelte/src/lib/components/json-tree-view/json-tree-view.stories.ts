import type { Meta } from '@storybook/svelte'

import ArrayDataExample from './examples/array-data.svelte'
import BasicExample from './examples/basic.svelte'
import ExpandLevelExample from './examples/expand-level.svelte'
import FunctionsExample from './examples/functions.svelte'
import MapAndSetExample from './examples/map-and-set.svelte'
import RegexExample from './examples/regex.svelte'
import RenderValueExample from './examples/render-value.svelte'

const meta: Meta = {
  title: 'Components / Json Tree View',
}

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const ArrayData = {
  render: () => ({
    Component: ArrayDataExample,
  }),
}

export const MapAndSet = {
  render: () => ({
    Component: MapAndSetExample,
  }),
}

export const Regex = {
  render: () => ({
    Component: RegexExample,
  }),
}

export const Functions = {
  render: () => ({
    Component: FunctionsExample,
  }),
}

export const ExpandLevel = {
  render: () => ({
    Component: ExpandLevelExample,
  }),
}

export const RenderValue = {
  render: () => ({
    Component: RenderValueExample,
  }),
}
