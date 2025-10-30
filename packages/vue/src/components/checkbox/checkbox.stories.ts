import type { Meta } from '@storybook/vue3-vite'

import BasicExample from './examples/basic.vue'
import ControlledExample from './examples/controlled.vue'
import DefaultCheckedExample from './examples/default-checked.vue'
import DisabledExample from './examples/disabled.vue'
import GroupControlledExample from './examples/group-controlled.vue'
import GroupProviderExample from './examples/group-provider.vue'
import GroupWithFieldsetExample from './examples/group-with-fieldset.vue'
import GroupWithFormExample from './examples/group-with-form.vue'
import GroupWithInvalidExample from './examples/group-with-invalid.vue'
import GroupWithSelectAllExample from './examples/group-with-select-all.vue'
import GroupExample from './examples/group.vue'
import IndeterminateExample from './examples/indeterminate.vue'
import ProgrammaticControlExample from './examples/programmatic-control.vue'
import RenderPropExample from './examples/render-prop.vue'
import RootProviderExample from './examples/root-provider.vue'
import WithFieldExample from './examples/with-field.vue'
import WithFormExample from './examples/with-form.vue'

const meta: Meta = {
  title: 'Components / Checkbox',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const Controlled = {
  render: () => ({
    components: { Component: ControlledExample },
    template: '<Component />',
  }),
}

export const DefaultChecked = {
  render: () => ({
    components: { Component: DefaultCheckedExample },
    template: '<Component />',
  }),
}

export const Disabled = {
  render: () => ({
    components: { Component: DisabledExample },
    template: '<Component />',
  }),
}

export const Indeterminate = {
  render: () => ({
    components: { Component: IndeterminateExample },
    template: '<Component />',
  }),
}

export const ProgrammaticControl = {
  render: () => ({
    components: { Component: ProgrammaticControlExample },
    template: '<Component />',
  }),
}

export const RenderProp = {
  render: () => ({
    components: { Component: RenderPropExample },
    template: '<Component />',
  }),
}

export const Group = {
  render: () => ({
    components: { Component: GroupExample },
    template: '<Component />',
  }),
}

export const WithField = {
  render: () => ({
    components: { Component: WithFieldExample },
    template: '<Component />',
  }),
}

export const GroupWithFieldset = {
  render: () => ({
    components: { Component: GroupWithFieldsetExample },
    template: '<Component />',
  }),
}

export const WithForm = {
  render: () => ({
    components: { Component: WithFormExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}

export const GroupControlled = {
  render: () => ({
    components: { Component: GroupControlledExample },
    template: '<Component />',
  }),
}

export const GroupProvider = {
  render: () => ({
    components: { Component: GroupProviderExample },
    template: '<Component />',
  }),
}

export const GroupWithForm = {
  render: () => ({
    components: { Component: GroupWithFormExample },
    template: '<Component />',
  }),
}

export const GroupWithInvalid = {
  render: () => ({
    components: { Component: GroupWithInvalidExample },
    template: '<Component />',
  }),
}

export const GroupWithSelectAll = {
  render: () => ({
    components: { Component: GroupWithSelectAllExample },
    template: '<Component />',
  }),
}
