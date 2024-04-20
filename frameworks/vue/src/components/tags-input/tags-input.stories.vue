<script setup lang="ts">
import Basic from './examples/basic.vue'
import BlurBehavior from './examples/blur-behavior.vue'
import DisabledEditing from './examples/disabled-editing.vue'
import InitialValue from './examples/initial-value.vue'
import MaxWithOverflow from './examples/max-with-overflow.vue'
import OnEvent from './examples/on-event.vue'
import PasteBehavior from './examples/paste-behavior.vue'
import Validated from './examples/validated.vue'
</script>
<template>
<Story title="TagsInput">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="InitialValue">
      <InitialValue />
    </Variant>
    <Variant title="MaxWithOverflow">
      <MaxWithOverflow />
    </Variant>
    <Variant title="Validated">
      <Validated />
    </Variant>
    <Variant title="BlurBehavior">
      <BlurBehavior />
    </Variant>
    <Variant title="PasteBehavior">
      <PasteBehavior />
    </Variant>
    <Variant title="DisabledEditing">
      <DisabledEditing />
    </Variant>
    <Variant title="OnEvent">
      <OnEvent />
    </Variant>
</Story>
</template>
