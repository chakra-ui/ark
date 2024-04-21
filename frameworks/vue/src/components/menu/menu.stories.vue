<script setup lang="ts">
import Basic from './examples/basic.vue'
import Context from './examples/context.vue'
import Controlled from './examples/controlled.vue'
import Group from './examples/group.vue'
import Nested from './examples/nested.vue'
import RenderProp from './examples/render-prop.vue'
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
  </Story>
</template>
