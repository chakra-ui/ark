<script setup lang="ts">
import Autocomplete from './examples/autocomplete.vue'
import Basic from './examples/basic.vue'
import ControlledVisibility from './examples/controlled-visibility.vue'
import IgnorePasswordManager from './examples/ignore-password-manager.vue'
import RootProvider from './examples/root-provider.vue'
import WithField from './examples/with-field.vue'
import WithValidation from './examples/with-validation.vue'
</script>
<template>
  <Story title="PasswordInput">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Autocomplete">
      <Autocomplete />
    </Variant>
    <Variant title="Controlled Visibility">
      <ControlledVisibility />
    </Variant>
    <Variant title="Ignore Password Manager">
      <IgnorePasswordManager />
    </Variant>
    <Variant title="With Field">
      <WithField />
    </Variant>
    <Variant title="RootProvider">
      <RootProvider />
    </Variant>
    <Variant title="With Validation">
      <WithValidation />
    </Variant>
  </Story>
</template>
