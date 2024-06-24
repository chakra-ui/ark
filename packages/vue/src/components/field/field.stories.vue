<script setup lang="ts">
import Input from './examples/input.vue'
import Select from './examples/select.vue'
import Textarea from './examples/textarea.vue'
</script>
<template>
  <Story title="Field">
    <Variant title="Input">
      <Input />
    </Variant>
    <Variant title="Select">
      <Select />
    </Variant>
    <Variant title="Textarea">
      <Textarea />
    </Variant>
  </Story>
</template>
