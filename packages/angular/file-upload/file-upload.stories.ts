import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { FileUploadAcceptedFileTypesExample } from './examples/accepted-file-types'
import { FileUploadBasicExample } from './examples/basic'
import { FileUploadClearTriggerExample } from './examples/clear-trigger'
import { FileUploadDirectoryUploadExample } from './examples/directory-upload'
import { FileUploadErrorHandlingExample } from './examples/error-handling'
import { FileUploadFormUsageExample } from './examples/form-usage'
import { FileUploadInitialFilesExample } from './examples/initial-files'
import { FileUploadMaxFilesExample } from './examples/max-files'
import { FileUploadMediaCaptureExample } from './examples/media-capture'
import { FileUploadPastingFilesExample } from './examples/pasting-files'
import { FileUploadRejectedFilesExample } from './examples/rejected-files'
import { FileUploadRootProviderExample } from './examples/root-provider'
import { FileUploadTransformFilesExample } from './examples/transform-files'
import { FileUploadWithFieldExample } from './examples/with-field'
import { FileUploadWithDropzoneExample } from './examples/with-dropzone'
import { FileUploadWithImagePreviewExample } from './examples/with-image-preview'

const meta: Meta = {
  title: 'Components / File Upload',
}

export default meta

export const Basic: StoryObj = {
  decorators: [moduleMetadata({ imports: [FileUploadBasicExample] })],
  render: () => ({ template: '<file-upload-basic-example />' }),
}

export const AcceptedFileTypes: StoryObj = {
  decorators: [moduleMetadata({ imports: [FileUploadAcceptedFileTypesExample] })],
  render: () => ({ template: '<file-upload-accepted-file-types-example />' }),
}

export const ClearTrigger: StoryObj = {
  decorators: [moduleMetadata({ imports: [FileUploadClearTriggerExample] })],
  render: () => ({ template: '<file-upload-clear-trigger-example />' }),
}

export const DirectoryUpload: StoryObj = {
  decorators: [moduleMetadata({ imports: [FileUploadDirectoryUploadExample] })],
  render: () => ({ template: '<file-upload-directory-upload-example />' }),
}

export const Dropzone: StoryObj = {
  decorators: [moduleMetadata({ imports: [FileUploadWithDropzoneExample] })],
  render: () => ({ template: '<file-upload-with-dropzone-example />' }),
}

export const ErrorHandling: StoryObj = {
  decorators: [moduleMetadata({ imports: [FileUploadErrorHandlingExample] })],
  render: () => ({ template: '<file-upload-error-handling-example />' }),
}

export const FormUsage: StoryObj = {
  decorators: [moduleMetadata({ imports: [FileUploadFormUsageExample] })],
  render: () => ({ template: '<file-upload-form-usage-example />' }),
}

export const InitialFiles: StoryObj = {
  decorators: [moduleMetadata({ imports: [FileUploadInitialFilesExample] })],
  render: () => ({ template: '<file-upload-initial-files-example />' }),
}

export const MaxFiles: StoryObj = {
  decorators: [moduleMetadata({ imports: [FileUploadMaxFilesExample] })],
  render: () => ({ template: '<file-upload-max-files-example />' }),
}

export const MediaCapture: StoryObj = {
  decorators: [moduleMetadata({ imports: [FileUploadMediaCaptureExample] })],
  render: () => ({ template: '<file-upload-media-capture-example />' }),
}

export const PastingFiles: StoryObj = {
  decorators: [moduleMetadata({ imports: [FileUploadPastingFilesExample] })],
  render: () => ({ template: '<file-upload-pasting-files-example />' }),
}

export const RejectedFiles: StoryObj = {
  decorators: [moduleMetadata({ imports: [FileUploadRejectedFilesExample] })],
  render: () => ({ template: '<file-upload-rejected-files-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [FileUploadRootProviderExample] })],
  render: () => ({ template: '<file-upload-root-provider-example />' }),
}

export const TransformFiles: StoryObj = {
  decorators: [moduleMetadata({ imports: [FileUploadTransformFilesExample] })],
  render: () => ({ template: '<file-upload-transform-files-example />' }),
}

export const WithField: StoryObj = {
  decorators: [moduleMetadata({ imports: [FileUploadWithFieldExample] })],
  render: () => ({ template: '<file-upload-with-field-example />' }),
}

export const WithImagePreview: StoryObj = {
  decorators: [moduleMetadata({ imports: [FileUploadWithImagePreviewExample] })],
  render: () => ({ template: '<file-upload-with-image-preview-example />' }),
}
