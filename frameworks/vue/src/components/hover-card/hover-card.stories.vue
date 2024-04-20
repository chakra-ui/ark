<script setup lang="ts">
import Basic from './examples/basic.vue'
import Controlled from './examples/controlled.vue'
import Positioning from './examples/positioning.vue'
import RenderProp from './examples/render-prop.vue'
</script>
<template>
<Story title="HoverCard">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Controlled">
      <Controlled />
    </Variant>
    <Variant title="Positioning">
      <Positioning />
    </Variant>
    <Variant title="RenderProp">
      <RenderProp />
    </Variant>
</Story>
</template>
