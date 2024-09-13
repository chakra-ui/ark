<script setup lang="ts">
import { ref } from 'vue'
import Input from './examples/input.vue'
import Select from './examples/select.vue'
import Textarea from './examples/textarea.vue'
const inputModel = ref('This input is controlled')
const selectModel = ref(3)
const textareaModel = ref(['This is some text', 'then more text'])
</script>
<template>
  <Story title="Field">
    <Variant title="Input">
      <Input />
    </Variant>
    <Variant title="Input Controlled">
      <span>Input value: {{ inputModel }}</span>
      <Input v-model="inputModel" />
    </Variant>
    <Variant title="Select">
      <Select />
    </Variant>
    <Variant title="Select Controlled">
      <span>Selected: Option {{ selectModel }}</span>
      <Select v-model="selectModel" />
    </Variant>
    <Variant title="Textarea">
      <Textarea />
    </Variant>
    <Variant title="Textarea Controlled">
      <span>Textarea value: {{ textareaModel }}</span>
      <Textarea v-model="textareaModel" />
    </Variant>
  </Story>
</template>
