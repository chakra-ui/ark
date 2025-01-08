<script setup lang="ts">
import InputControlled from './examples/input-controlled.vue'
import Input from './examples/input.vue'
import ReactiveInvalid from './examples/reactive-invalid.vue'
import RequiredIndicator from './examples/required-indicator.vue'
import SelectControlled from './examples/select-controlled.vue'
import Select from './examples/select.vue'
import TextareaControlled from './examples/textarea-controlled.vue'
import Textarea from './examples/textarea.vue'
</script>
<template>
  <Story title="Field">
    <Variant title="Input">
      <Input />
    </Variant>
    <Variant title="Input Controlled">
      <InputControlled />
    </Variant>
    <Variant title="Select">
      <Select />
    </Variant>
    <Variant title="Select Controlled">
      <SelectControlled />
    </Variant>
    <Variant title="Textarea">
      <Textarea />
    </Variant>
    <Variant title="Textarea Controlled">
      <TextareaControlled />
    </Variant>
    <Variant title="Required Indicator">
      <RequiredIndicator />
    </Variant>
    <Variant title="Reactive Invalid">
      <ReactiveInvalid />
    </Variant>
  </Story>
</template>
