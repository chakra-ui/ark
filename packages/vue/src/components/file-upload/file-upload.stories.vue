<script setup lang="ts">
import Basic from './examples/basic.vue'
import WithDirectoryUpload from './examples/directory-upload.vue'
import InitialFiles from './examples/initial-files.vue'
import RootProvider from './examples/root-provider.vue'
import WithValidation from './examples/validation.vue'
import WithField from './examples/with-field.vue'
import WithPaste from './examples/with-paste.vue'
</script>
<template>
  <Story title="FileUpload">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Initial Files">
      <InitialFiles />
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
    <Variant title="With Paste">
      <WithPaste />
    </Variant>
  </Story>
</template>
