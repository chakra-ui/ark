import { mount as TransformFilesExample } from './examples/transform-files.js'
import { mount as CustomValidationExample } from './examples/custom-validation.js'
import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from './examples/basic.js'
import { mount as AcceptedFileTypesExample } from './examples/accepted-file-types.js'
import { mount as ClearTriggerExample } from './examples/clear-trigger.js'
import { mount as DirectoryUploadExample } from './examples/directory-upload.js'
import { mount as DropzoneExample } from './examples/dropzone.js'
import { mount as ErrorHandlingExample } from './examples/error-handling.js'
import { mount as InitialFilesExample } from './examples/initial-files.js'
import { mount as MediaCaptureExample } from './examples/media-capture.js'
import { mount as PastingFilesExample } from './examples/pasting-files.js'
import { mount as RejectedFilesExample } from './examples/rejected-files.js'

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
