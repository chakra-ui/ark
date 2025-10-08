<script setup lang="ts">
import Basic from './examples/basic.vue'
import Controlled from './examples/controlled.vue'
import DefaultChecked from './examples/default-checked.vue'
import Disabled from './examples/disabled.vue'
import GroupControlled from './examples/group-controlled.vue'
import GroupProvider from './examples/group-provider.vue'
import GroupWithFieldset from './examples/group-with-fieldset.vue'
import GroupWithForm from './examples/group-with-form.vue'
import GroupWithInvalid from './examples/group-with-invalid.vue'
import GroupWithSelectAll from './examples/group-with-select-all.vue'
import Group from './examples/group.vue'
import Indeterminate from './examples/indeterminate.vue'
import ProgrammaticControl from './examples/programmatic-control.vue'
import RenderProp from './examples/render-prop.vue'
import RootProvider from './examples/root-provider.vue'
import WithField from './examples/with-field.vue'
import WithForm from './examples/with-form.vue'
</script>

<template>
  <Story title="Checkbox">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Controlled">
      <Controlled />
    </Variant>
    <Variant title="Default Checked">
      <DefaultChecked />
    </Variant>
    <Variant title="Disabled">
      <Disabled />
    </Variant>
    <Variant title="Indeterminate">
      <Indeterminate />
    </Variant>
    <Variant title="Programmatic Control">
      <ProgrammaticControl />
    </Variant>
    <Variant title="RenderProp">
      <RenderProp />
    </Variant>
    <Variant title="Group">
      <Group />
    </Variant>
    <Variant title="With Field">
      <WithField />
    </Variant>
    <Variant title="Group With Fieldset">
      <GroupWithFieldset />
    </Variant>
    <Variant title="With Form">
      <WithForm />
    </Variant>
    <Variant title="RootProvider">
      <RootProvider />
    </Variant>
    <Variant title="Group Controlled">
      <GroupControlled />
    </Variant>
    <Variant title="Group Provider">
      <GroupProvider />
    </Variant>
    <Variant title="Group With Form">
      <GroupWithForm />
    </Variant>
    <Variant title="Group With Invalid">
      <GroupWithInvalid />
    </Variant>
    <Variant title="Group With Select All">
      <GroupWithSelectAll />
    </Variant>
  </Story>
</template>
