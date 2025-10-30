import type { Meta } from '@storybook/vue3-vite'

import AcceptedFileTypesExample from './examples/accepted-file-types.vue'
import BasicExample from './examples/basic.vue'
import ClearTriggerExample from './examples/clear-trigger.vue'
import DirectoryUploadExample from './examples/directory-upload.vue'
import DragAndDropExample from './examples/drag-and-drop.vue'
import ErrorHandlingExample from './examples/error-handling.vue'
import FileTransformationsExample from './examples/file-transformations.vue'
import InitialFilesExample from './examples/initial-files.vue'
import MediaCaptureExample from './examples/media-capture.vue'
import RejectedFilesExample from './examples/rejected-files.vue'
import RootProviderExample from './examples/root-provider.vue'
import SingleFileExample from './examples/single-file.vue'
import SizeLimitsExample from './examples/size-limits.vue'
import WithValidationExample from './examples/validation.vue'
import WithFieldExample from './examples/with-field.vue'
import WithPasteExample from './examples/with-paste.vue'

const meta: Meta = {
  title: 'Components / FileUpload',
}

export default meta

export const AcceptedFileTypes = {
  render: () => ({
    components: { Component: AcceptedFileTypesExample },
    template: '<Component />',
  }),
}

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const ClearTrigger = {
  render: () => ({
    components: { Component: ClearTriggerExample },
    template: '<Component />',
  }),
}

export const DragAndDrop = {
  render: () => ({
    components: { Component: DragAndDropExample },
    template: '<Component />',
  }),
}

export const ErrorHandling = {
  render: () => ({
    components: { Component: ErrorHandlingExample },
    template: '<Component />',
  }),
}

export const FileTransformations = {
  render: () => ({
    components: { Component: FileTransformationsExample },
    template: '<Component />',
  }),
}

export const InitialFiles = {
  render: () => ({
    components: { Component: InitialFilesExample },
    template: '<Component />',
  }),
}

export const MediaCapture = {
  render: () => ({
    components: { Component: MediaCaptureExample },
    template: '<Component />',
  }),
}

export const RejectedFiles = {
  render: () => ({
    components: { Component: RejectedFilesExample },
    template: '<Component />',
  }),
}

export const SingleFile = {
  render: () => ({
    components: { Component: SingleFileExample },
    template: '<Component />',
  }),
}

export const SizeLimits = {
  render: () => ({
    components: { Component: SizeLimitsExample },
    template: '<Component />',
  }),
}

export const WithField = {
  render: () => ({
    components: { Component: WithFieldExample },
    template: '<Component />',
  }),
}

export const RootProvider = {
  render: () => ({
    components: { Component: RootProviderExample },
    template: '<Component />',
  }),
}

export const WithValidation = {
  render: () => ({
    components: { Component: WithValidationExample },
    template: '<Component />',
  }),
}

export const DirectoryUpload = {
  render: () => ({
    components: { Component: DirectoryUploadExample },
    template: '<Component />',
  }),
}

export const WithPaste = {
  render: () => ({
    components: { Component: WithPasteExample },
    template: '<Component />',
  }),
}
