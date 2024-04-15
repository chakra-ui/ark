import type { Meta } from '@storybook/react'
import './stories/accordion.css'

const meta: Meta = {
  title: 'Components / Accordion',
}

export default meta

export { Example as Basic } from './stories/accordion-basic'
export { Example as Collapsible } from './stories/accordion-collapsible'
export { Example as Controlled } from './stories/accordion-controlled'
export { Example as Disabled } from './stories/accordion-disabled'
export { Example as LazyMount } from './stories/accordion-lazymount'
export { Example as Multiple } from './stories/accordion-multiple'
