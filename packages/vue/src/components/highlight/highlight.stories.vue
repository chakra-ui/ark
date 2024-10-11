<script setup lang="ts">
import Basic from './examples/basic.vue'
import IgnoreCase from './examples/ignore-case.vue'
import MatchAll from './examples/match-all.vue'
import Multiple from './examples/multiple.vue'
import WithInput from './examples/with-input.vue'
</script>

<template>
  <Story title="Highlight">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Multiple">
      <Multiple />
    </Variant>
    <Variant title="WithInput">
      <WithInput />
    </Variant>
    <Variant title="IgnoreCase">
      <IgnoreCase />
    </Variant>
    <Variant title="MatchAll">
      <MatchAll />
    </Variant>
  </Story>
</template>
