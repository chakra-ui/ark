import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as ActionExample } from '../../../examples/toast/action.js'
import { mount as BasicExample } from '../../../examples/toast/basic.js'
import { mount as DurationExample } from '../../../examples/toast/duration.js'
import { mount as MaxToastsExample } from '../../../examples/toast/max-toasts.js'
import { mount as PlacementExample } from '../../../examples/toast/placement.js'
import { mount as PromiseToastExample } from '../../../examples/toast/promise-toast.js'
import { mount as TypesExample } from '../../../examples/toast/types.js'
import { mount as UndoExample } from '../../../examples/toast/undo.js'
import { mount as UpdateExample } from '../../../examples/toast/update.js'
import { mount as VaryingHeightExample } from '../../../examples/toast/varying-height.js'

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
