<script setup lang="ts">
import InteractionModality from './examples/interaction.vue'
import FocusVisible from './examples/focus-visible.vue'
import FocusVisibleTextInput from './examples/focus-visible-text-input.vue'
</script>

<template>
  <Story title="Interaction">
    <Variant title="Interaction Modality">
      <InteractionModality />
    </Variant>
    <Variant title="Focus Visible">
      <FocusVisible />
    </Variant>
    <Variant title="Focus Visible Text Input">
      <FocusVisibleTextInput />
    </Variant>
  </Story>
</template>
