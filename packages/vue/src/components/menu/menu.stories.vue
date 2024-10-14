<script setup lang="ts">
import Basic from './examples/basic.vue'
import Checkbox from './examples/checkbox.vue'
import Context from './examples/context.vue'
import Controlled from './examples/controlled.vue'
import Group from './examples/group.vue'
import Nested from './examples/nested.vue'
import RadioGroup from './examples/radio-group.vue'
import RenderProp from './examples/render-prop.vue'
import RootProvider from './examples/root-provider.vue'
import Separator from './examples/separator.vue'
</script>
<template>
  <Story title="Menu">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Controlled">
      <Controlled />
    </Variant>
    <Variant title="Group">
      <Group />
    </Variant>
    <Variant title="Separator">
      <Separator />
    </Variant>
    <Variant title="Context">
      <Context />
    </Variant>
    <Variant title="RenderProp">
      <RenderProp />
    </Variant>
    <Variant title="Nested">
      <Nested />
    </Variant>
    <Variant title="Checkbox">
      <Checkbox />
    </Variant>
    <Variant title="RadioGroup">
      <RadioGroup />
    </Variant>
    <Variant title="RootProvider">
      <RootProvider />
    </Variant>
  </Story>
</template>
