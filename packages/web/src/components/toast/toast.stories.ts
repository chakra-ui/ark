import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as ActionExample } from './examples/action.js'
import { mount as BasicExample } from './examples/basic.js'
import { mount as DurationExample } from './examples/duration.js'
import { mount as MaxToastsExample } from './examples/max-toasts.js'
import { mount as PlacementExample } from './examples/placement.js'
import { mount as PromiseToastExample } from './examples/promise-toast.js'
import { mount as TypesExample } from './examples/types.js'
import { mount as UndoExample } from './examples/undo.js'
import { mount as UpdateExample } from './examples/update.js'
import { mount as VaryingHeightExample } from './examples/varying-height.js'

const meta: Meta = { title: 'Components / Toast' }
export default meta

export const Action: StoryObj = { name: 'Action', render: renderExample(ActionExample) }

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Duration: StoryObj = { name: 'Duration', render: renderExample(DurationExample) }

export const MaxToasts: StoryObj = { name: 'Max Toasts', render: renderExample(MaxToastsExample) }

export const Placement: StoryObj = { name: 'Placement', render: renderExample(PlacementExample) }

export const PromiseToast: StoryObj = { name: 'Promise Toast', render: renderExample(PromiseToastExample) }

export const Types: StoryObj = { name: 'Types', render: renderExample(TypesExample) }

export const Undo: StoryObj = { name: 'Undo', render: renderExample(UndoExample) }

export const Update: StoryObj = { name: 'Update', render: renderExample(UpdateExample) }

export const VaryingHeight: StoryObj = { name: 'Varying Height', render: renderExample(VaryingHeightExample) }
