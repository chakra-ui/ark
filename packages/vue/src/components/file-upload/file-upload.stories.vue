<script setup lang="ts">
import AcceptedFileTypes from './examples/accepted-file-types.vue'
import Basic from './examples/basic.vue'
import ClearTrigger from './examples/clear-trigger.vue'
import WithDirectoryUpload from './examples/directory-upload.vue'
import ErrorHandling from './examples/error-handling.vue'
import InitialFiles from './examples/initial-files.vue'
import RootProvider from './examples/root-provider.vue'
import WithValidation from './examples/validation.vue'
import WithField from './examples/with-field.vue'
import WithPaste from './examples/with-paste.vue'
</script>
<template>
  <Story title="FileUpload">
    <Variant title="Accepted File Types">
      <AcceptedFileTypes />
    </Variant>
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Clear Trigger">
      <ClearTrigger />
    </Variant>
    <Variant title="Error Handling">
      <ErrorHandling />
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
