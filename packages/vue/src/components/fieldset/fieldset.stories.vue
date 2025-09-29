<script setup lang="ts">
import Basic from './examples/basic.vue'
import Disabled from './examples/disabled.vue'
import Invalid from './examples/invalid.vue'
import PhoneInput from './examples/phone-input.vue'
import RootProvider from './examples/root-provider.vue'
import WithCheckbox from './examples/with-checkbox.vue'
import WithField from './examples/with-field.vue'
</script>
<template>
  <Story title="Fieldset">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Disabled">
      <Disabled />
    </Variant>
    <Variant title="Invalid">
      <Invalid />
    </Variant>
    <Variant title="Root Provider">
      <RootProvider />
    </Variant>
    <Variant title="WithField">
      <WithField />
    </Variant>
    <Variant title="WithCheckbox">
      <WithCheckbox />
    </Variant>
    <Variant title="PhoneInput">
      <PhoneInput />
    </Variant>
  </Story>
</template>
