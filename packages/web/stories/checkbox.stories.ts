import { renderExample } from '../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from '../examples/checkbox/basic.js'
import { mount as ControlledExample } from '../examples/checkbox/controlled.js'
import { mount as DefaultCheckedExample } from '../examples/checkbox/default-checked.js'
import { mount as DisabledExample } from '../examples/checkbox/disabled.js'
import { mount as GroupControlledExample } from '../examples/checkbox/group-controlled.js'
import { mount as GroupWithFieldsetExample } from '../examples/checkbox/group-with-fieldset.js'
import { mount as GroupWithFormExample } from '../examples/checkbox/group-with-form.js'
import { mount as GroupWithInvalidExample } from '../examples/checkbox/group-with-invalid.js'
import { mount as GroupWithMaxSelectedExample } from '../examples/checkbox/group-with-max-selected.js'
import { mount as GroupWithSelectAllExample } from '../examples/checkbox/group-with-select-all.js'
import { mount as GroupExample } from '../examples/checkbox/group.js'
import { mount as IndeterminateExample } from '../examples/checkbox/indeterminate.js'
import { mount as WithFieldExample } from '../examples/checkbox/with-field.js'
import { mount as WithFormExample } from '../examples/checkbox/with-form.js'

const meta: Meta = { title: 'Components / Checkbox' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Controlled: StoryObj = { name: 'Controlled', render: renderExample(ControlledExample) }

export const DefaultChecked: StoryObj = { name: 'Default Checked', render: renderExample(DefaultCheckedExample) }

export const Disabled: StoryObj = { name: 'Disabled', render: renderExample(DisabledExample) }

export const GroupControlled: StoryObj = { name: 'Group Controlled', render: renderExample(GroupControlledExample) }

export const GroupWithFieldset: StoryObj = {
  name: 'Group With Fieldset',
  render: renderExample(GroupWithFieldsetExample),
}

export const GroupWithForm: StoryObj = { name: 'Group With Form', render: renderExample(GroupWithFormExample) }

export const GroupWithInvalid: StoryObj = { name: 'Group With Invalid', render: renderExample(GroupWithInvalidExample) }

export const GroupWithMaxSelected: StoryObj = {
  name: 'Group With Max Selected',
  render: renderExample(GroupWithMaxSelectedExample),
}

export const GroupWithSelectAll: StoryObj = {
  name: 'Group With Select All',
  render: renderExample(GroupWithSelectAllExample),
}

export const Group: StoryObj = { name: 'Group', render: renderExample(GroupExample) }

export const Indeterminate: StoryObj = { name: 'Indeterminate', render: renderExample(IndeterminateExample) }

export const WithField: StoryObj = { name: 'With Field', render: renderExample(WithFieldExample) }

export const WithForm: StoryObj = { name: 'With Form', render: renderExample(WithFormExample) }
