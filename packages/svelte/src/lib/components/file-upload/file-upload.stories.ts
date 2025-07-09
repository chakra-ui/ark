import type { Meta } from '@storybook/svelte'

import AcceptedFileTypesExample from './examples/accepted-file-types.svelte'
import BasicExample from './examples/basic.svelte'
import ClearTriggerExample from './examples/clear-trigger.svelte'
import DirectoryUploadExample from './examples/directory-upload.svelte'
import MediaCaptureExample from './examples/media-capture.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import SingleFileExample from './examples/single-file.svelte'
import SizeLimitsExample from './examples/size-limits.svelte'
import ValidationExample from './examples/validation.svelte'
import WithFieldExample from './examples/with-field.svelte'

const meta: Meta = {
  title: 'Components/FileUpload',
}

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const AcceptedFileTypes = {
  render: () => ({
    Component: AcceptedFileTypesExample,
  }),
}

export const ClearTrigger = {
  render: () => ({
    Component: ClearTriggerExample,
  }),
}

export const DirectoryUpload = {
  render: () => ({
    Component: DirectoryUploadExample,
  }),
}

export const MediaCapture = {
  render: () => ({
    Component: MediaCaptureExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}

export const SingleFile = {
  render: () => ({
    Component: SingleFileExample,
  }),
}

export const SizeLimits = {
  render: () => ({
    Component: SizeLimitsExample,
  }),
}

export const Validation = {
  render: () => ({
    Component: ValidationExample,
  }),
}

export const WithField = {
  render: () => ({
    Component: WithFieldExample,
  }),
}
