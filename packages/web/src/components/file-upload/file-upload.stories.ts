import { mount as TransformFilesExample } from '../../../examples/file-upload/transform-files.js'
import { mount as CustomValidationExample } from '../../../examples/file-upload/custom-validation.js'
import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from '../../../examples/file-upload/basic.js'
import { mount as AcceptedFileTypesExample } from '../../../examples/file-upload/accepted-file-types.js'
import { mount as ClearTriggerExample } from '../../../examples/file-upload/clear-trigger.js'
import { mount as DirectoryUploadExample } from '../../../examples/file-upload/directory-upload.js'
import { mount as DropzoneExample } from '../../../examples/file-upload/dropzone.js'
import { mount as ErrorHandlingExample } from '../../../examples/file-upload/error-handling.js'
import { mount as InitialFilesExample } from '../../../examples/file-upload/initial-files.js'
import { mount as MediaCaptureExample } from '../../../examples/file-upload/media-capture.js'
import { mount as PastingFilesExample } from '../../../examples/file-upload/pasting-files.js'
import { mount as RejectedFilesExample } from '../../../examples/file-upload/rejected-files.js'

const meta: Meta = { title: 'Components / File Upload' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const AcceptedFileTypes: StoryObj = {
  name: 'Accepted File Types',
  render: renderExample(AcceptedFileTypesExample),
}

export const ClearTrigger: StoryObj = { name: 'Clear Trigger', render: renderExample(ClearTriggerExample) }

export const DirectoryUpload: StoryObj = { name: 'Directory Upload', render: renderExample(DirectoryUploadExample) }

export const Dropzone: StoryObj = { name: 'Dropzone', render: renderExample(DropzoneExample) }

export const ErrorHandling: StoryObj = { name: 'Error Handling', render: renderExample(ErrorHandlingExample) }

export const InitialFiles: StoryObj = { name: 'Initial Files', render: renderExample(InitialFilesExample) }

export const MediaCapture: StoryObj = { name: 'Media Capture', render: renderExample(MediaCaptureExample) }

export const PastingFiles: StoryObj = { name: 'Pasting Files', render: renderExample(PastingFilesExample) }

export const RejectedFiles: StoryObj = { name: 'Rejected Files', render: renderExample(RejectedFilesExample) }

export const CustomValidation: StoryObj = { name: 'Custom Validation', render: renderExample(CustomValidationExample) }

export const TransformFiles: StoryObj = { name: 'Transform Files', render: renderExample(TransformFilesExample) }
