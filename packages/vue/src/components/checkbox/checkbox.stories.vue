<script setup lang="ts">
import Basic from './examples/basic.vue'
import Controlled from './examples/controlled.vue'
import GroupControlled from './examples/group-controlled.vue'
import GroupProvider from './examples/group-provider.vue'
import Group from './examples/group.vue'
import Indeterminate from './examples/indeterminate.vue'
import RenderProp from './examples/render-prop.vue'
import RootProvider from './examples/root-provider.vue'
import WithField from './examples/with-field.vue'
</script>

<template>
  <Story title="Checkbox">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Controlled">
      <Controlled />
    </Variant>
    <Variant title="Indeterminate">
      <Indeterminate />
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
    <Variant title="RootProvider">
      <RootProvider />
    </Variant>
    <Variant title="Group Controlled">
      <GroupControlled />
    </Variant>
    <Variant title="Group Provider">
      <GroupProvider />
    </Variant>
  </Story>
</template>
