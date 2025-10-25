<script setup lang="ts">
import AutoFill from './examples/auto-fill.vue'
import Basic from './examples/basic.vue'
import FiniteLoops from './examples/finite-loops.vue'
import PauseOnInteraction from './examples/pause-on-interaction.vue'
import ProgrammaticControl from './examples/programmatic-control.vue'
import Reverse from './examples/reverse.vue'
import Speed from './examples/speed.vue'
import Vertical from './examples/vertical.vue'
import WithEdges from './examples/with-edges.vue'
</script>

<template>
  <Story title="Marquee">
    <Variant title="Auto Fill">
      <AutoFill />
    </Variant>
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Finite Loops">
      <FiniteLoops />
    </Variant>
    <Variant title="Pause On Interaction">
      <PauseOnInteraction />
    </Variant>
    <Variant title="Programmatic Control">
      <ProgrammaticControl />
    </Variant>
    <Variant title="Reverse">
      <Reverse />
    </Variant>
    <Variant title="Speed">
      <Speed />
    </Variant>
    <Variant title="Vertical">
      <Vertical />
    </Variant>
    <Variant title="With Edges">
      <WithEdges />
    </Variant>
  </Story>
</template>
