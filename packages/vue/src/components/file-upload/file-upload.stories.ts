import type { Meta } from '@storybook/vue3-vite'

import AcceptedFileTypesExample from './examples/accepted-file-types.vue'
import BasicExample from './examples/basic.vue'
import ClearTriggerExample from './examples/clear-trigger.vue'
import DirectoryUploadExample from './examples/directory-upload.vue'
import DropzoneExample from './examples/dropzone.vue'
import ErrorHandlingExample from './examples/error-handling.vue'
import FormUsageExample from './examples/form-usage.vue'
import InitialFilesExample from './examples/initial-files.vue'
import MediaCaptureExample from './examples/media-capture.vue'
import PastingFilesExample from './examples/pasting-files.vue'
import RejectedFilesExample from './examples/rejected-files.vue'
import RootProviderExample from './examples/root-provider.vue'
import TransformFilesExample from './examples/transform-files.vue'
import WithFieldExample from './examples/with-field.vue'

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

export const Dropzone = {
  render: () => ({
    components: { Component: DropzoneExample },
    template: '<Component />',
  }),
}

export const ErrorHandling = {
  render: () => ({
    components: { Component: ErrorHandlingExample },
    template: '<Component />',
  }),
}

export const FormUsage = {
  render: () => ({
    components: { Component: FormUsageExample },
    template: '<Component />',
  }),
}

export const TransformFiles = {
  render: () => ({
    components: { Component: TransformFilesExample },
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

export const DirectoryUpload = {
  render: () => ({
    components: { Component: DirectoryUploadExample },
    template: '<Component />',
  }),
}

export const PastingFiles = {
  render: () => ({
    components: { Component: PastingFilesExample },
    template: '<Component />',
  }),
}
