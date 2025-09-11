<script setup lang="ts">
import AcceptedFileTypes from './examples/accepted-file-types.vue'
import Basic from './examples/basic.vue'
import ClearTrigger from './examples/clear-trigger.vue'
import DirectoryUpload from './examples/directory-upload.vue'
import DragAndDrop from './examples/drag-and-drop.vue'
import ErrorHandling from './examples/error-handling.vue'
import FileTransformations from './examples/file-transformations.vue'
import InitialFiles from './examples/initial-files.vue'
import RejectedFiles from './examples/rejected-files.vue'
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
    <Variant title="Drag And Drop">
      <DragAndDrop />
    </Variant>
    <Variant title="Error Handling">
      <ErrorHandling />
    </Variant>
    <Variant title="File Transformations">
      <FileTransformations />
    </Variant>
    <Variant title="Initial Files">
      <InitialFiles />
    </Variant>
    <Variant title="Rejected Files">
      <RejectedFiles />
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
    <Variant title="Directory Upload">
      <DirectoryUpload />
    </Variant>
    <Variant title="With Paste">
      <WithPaste />
    </Variant>
  </Story>
</template>
