import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { FileUploadBasicExample } from './examples/basic'
import { FileUploadMaxFilesExample } from './examples/max-files'
import { FileUploadRootProviderExample } from './examples/root-provider'
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

export const WithDropzone: StoryObj = {
  decorators: [moduleMetadata({ imports: [FileUploadWithDropzoneExample] })],
  render: () => ({ template: '<file-upload-with-dropzone-example />' }),
}

export const WithImagePreview: StoryObj = {
  decorators: [moduleMetadata({ imports: [FileUploadWithImagePreviewExample] })],
  render: () => ({ template: '<file-upload-with-image-preview-example />' }),
}

export const MaxFiles: StoryObj = {
  decorators: [moduleMetadata({ imports: [FileUploadMaxFilesExample] })],
  render: () => ({ template: '<file-upload-max-files-example />' }),
}

export const RootProvider: StoryObj = {
  decorators: [moduleMetadata({ imports: [FileUploadRootProviderExample] })],
  render: () => ({ template: '<file-upload-root-provider-example />' }),
}
