import type { Meta, StoryObj } from '@storybook/html-vite'

import { renderExample } from '../../../.storybook/render-example.js'
import { mount as BasicExample } from '../../../examples/drawer/basic.js'
import { mount as ControlledExample } from '../../../examples/drawer/controlled.js'
import { mount as NestedExample } from '../../../examples/drawer/nested.js'
import { mount as NonDraggableExample } from '../../../examples/drawer/non-draggable.js'
import { mount as ScrollableExample } from '../../../examples/drawer/scrollable.js'
import { mount as SnapPointsExample } from '../../../examples/drawer/snap-points.js'
import { mount as SwipeDirectionExample } from '../../../examples/drawer/swipe-direction.js'

const meta: Meta = { title: 'Components / Drawer' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Controlled: StoryObj = { name: 'Controlled', render: renderExample(ControlledExample) }

export const Nested: StoryObj = { name: 'Nested', render: renderExample(NestedExample) }

export const NonDraggable: StoryObj = { name: 'Non Draggable', render: renderExample(NonDraggableExample) }

export const Scrollable: StoryObj = { name: 'Scrollable', render: renderExample(ScrollableExample) }

export const SnapPoints: StoryObj = { name: 'Snap Points', render: renderExample(SnapPointsExample) }

export const SwipeDirection: StoryObj = { name: 'Swipe Direction', render: renderExample(SwipeDirectionExample) }
