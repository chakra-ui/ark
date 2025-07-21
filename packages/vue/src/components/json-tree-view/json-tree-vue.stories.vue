<script setup lang="ts">
import ArrayData from './examples/array-data.vue'
import Basic from './examples/basic.vue'
import Errors from './examples/errors.vue'
import ExpandLevel from './examples/expand-level.vue'
import Functions from './examples/functions.vue'
import MapAndSet from './examples/map-and-set.vue'
import Regex from './examples/regex.vue'
import RenderValue from './examples/render-value.vue'
</script>

<template>
  <Story title="JsonTreeView">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Array Data">
      <ArrayData />
    </Variant>
    <Variant title="Map And Set">
      <MapAndSet />
    </Variant>
    <Variant title="Regex">
      <Regex />
    </Variant>
    <Variant title="Functions">
      <Functions />
    </Variant>
    <Variant title="Expand Level">
      <ExpandLevel />
    </Variant>
    <Variant title="Render Value">
      <RenderValue />
    </Variant>
    <Variant title="Errors">
      <Errors />
    </Variant>
  </Story>
</template>
