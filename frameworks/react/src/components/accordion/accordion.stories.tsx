import type { Meta } from '@storybook/react'
import './stories/accordion.css'

const meta: Meta = {
  title: 'Components / Accordion',
}

export default meta

export { Example as Basic } from './examples/basic'
export { Example as Collapsible } from './examples/collapsible'
export { Example as Controlled } from './examples/controlled'
export { Example as Disabled } from './examples/disabled'
export { Example as LazyMount } from './examples/lazymount'
export { Example as Multiple } from './examples/multiple'
