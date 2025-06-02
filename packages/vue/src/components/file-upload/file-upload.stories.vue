<script setup lang="ts">
import Basic from './examples/basic.vue'
import WithDirectoryUpload from './examples/directory-upload.vue'
import RootProvider from './examples/root-provider.vue'
import WithValidation from './examples/validation.vue'
import WithField from './examples/with-field.vue'
</script>
<template>
  <Story title="FileUpload">
    <Variant title="Basic">
      <Basic />
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
    <Variant title="With Directory Upload">
      <WithDirectoryUpload />
    </Variant>
  </Story>
</template>
