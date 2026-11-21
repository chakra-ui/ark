import type * as fileUpload from '@zag-js/file-upload'
import { str } from '../../utils/attrs.js'
import { definePart, ownInput, wrapped, wrappedButton } from '../../utils/define.js'
import { templateOf } from '../../utils/repeat.js'
import { fileKey, itemOf, items, repeat, root } from './shared.js'

const autoText = new WeakSet<HTMLElement>()
const trackEmpty = (el: HTMLElement) => {
  if (!el.firstChild) autoText.add(el)
}

const typeOf = (el: HTMLElement) => (str(el, 'type') === 'rejected' ? 'rejected' : 'accepted')

const itemStateOf = (api: fileUpload.Api, el: HTMLElement) => {
  const item = itemOf(el)
  return item ? api.getItemState(item) : undefined
}

export const FileUploadLabel = definePart<fileUpload.Api>({
  tag: 'ark-file-upload-label',
  root,
  props: (api) => api.getLabelProps(),
})

export const FileUploadDropzone = definePart<fileUpload.Api, fileUpload.DropzoneState>({
  tag: 'ark-file-upload-dropzone',
  root,
  attributes: ['disable-click'],
  props: (api, el) => api.getDropzoneProps({ disableClick: el.hasAttribute('disable-click') }),
  state: (api) => api.getDropzoneState(),
})

export const FileUploadTrigger = definePart<fileUpload.Api, fileUpload.TriggerState>({
  tag: 'ark-file-upload-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getTriggerProps(),
  state: (api) => api.getTriggerState(),
})

export const FileUploadClearTrigger = definePart<fileUpload.Api>({
  tag: 'ark-file-upload-clear-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getClearTriggerProps(),
})

export const FileUploadHiddenInput = definePart<fileUpload.Api>({
  tag: 'ark-file-upload-hidden-input',
  root,
  target: ownInput,
  props: (api) => api.getHiddenInputProps(),
})

export const FileUploadItemGroup = definePart<fileUpload.Api, fileUpload.ItemGroupState>({
  tag: 'ark-file-upload-item-group',
  root,
  attributes: ['type'],
  props: (api, el) => api.getItemGroupProps({ type: typeOf(el) }),
  state: (api, el) => api.getItemGroupState({ type: typeOf(el) }),
  render: (api, el) => {
    const template = templateOf(el)
    if (!template) return
    const type = typeOf(el)
    const entries: { file: File; errors?: fileUpload.FileRejection['errors'] }[] =
      type === 'rejected' ? api.rejectedFiles : api.acceptedFiles.map((file) => ({ file }))
    repeat(
      template,
      entries,
      ({ file }) => fileKey(file),
      (node, { file, errors }) => {
        items.set(node, { file, type, errors })
      },
    )
  },
})

export const FileUploadItem = definePart<fileUpload.Api, fileUpload.ItemState | undefined>({
  tag: 'ark-file-upload-item',
  root,
  props: (api, el) => {
    const item = itemOf(el)
    return item ? api.getItemProps(item) : {}
  },
  state: (api, el) => itemStateOf(api, el),
})

export const FileUploadItemName = definePart<fileUpload.Api, fileUpload.ItemState | undefined>({
  tag: 'ark-file-upload-item-name',
  root,
  setup: trackEmpty,
  props: (api, el) => {
    const item = itemOf(el)
    return item ? api.getItemNameProps(item) : {}
  },
  state: (api, el) => itemStateOf(api, el),
  render: (_, el) => {
    const item = itemOf(el)
    if (item && autoText.has(el)) el.textContent = item.file.name
  },
})

export const FileUploadItemSizeText = definePart<fileUpload.Api, fileUpload.ItemState | undefined>({
  tag: 'ark-file-upload-item-size-text',
  root,
  setup: trackEmpty,
  props: (api, el) => {
    const item = itemOf(el)
    return item ? api.getItemSizeTextProps(item) : {}
  },
  state: (api, el) => itemStateOf(api, el),
  render: (api, el) => {
    const item = itemOf(el)
    if (item && autoText.has(el)) el.textContent = api.getFileSize(item.file)
  },
})

export const FileUploadItemPreview = definePart<fileUpload.Api, fileUpload.ItemState | undefined>({
  tag: 'ark-file-upload-item-preview',
  root,
  attributes: ['type'],
  props: (api, el) => {
    const item = itemOf(el)
    if (!item) return { hidden: true }
    return { ...api.getItemPreviewProps(item), hidden: !item.file.type.match(str(el, 'type') ?? '.*') }
  },
  state: (api, el) => itemStateOf(api, el),
})

interface Preview {
  file: File
  url: string
  revoke: VoidFunction
}

const previews = new WeakMap<HTMLElement, Preview>()

const revokePreview = (el: HTMLElement) => {
  previews.get(el)?.revoke()
  previews.delete(el)
}

export const FileUploadItemPreviewImage = definePart<fileUpload.Api, fileUpload.ItemState | undefined>({
  tag: 'ark-file-upload-item-preview-image',
  root,
  target: wrapped('img'),
  setup: (el) => () => revokePreview(el),
  props: (api, el) => {
    const item = itemOf(el)
    if (!item?.file.type.startsWith('image/')) {
      revokePreview(el)
      return { hidden: true }
    }
    let preview = previews.get(el)
    if (preview?.file !== item.file) {
      revokePreview(el)
      let url = ''
      const revoke = api.createFileUrl(item.file, (value) => (url = value))
      preview = { file: item.file, url, revoke }
      previews.set(el, preview)
    }
    return api.getItemPreviewImageProps({ ...item, url: preview.url })
  },
  state: (api, el) => itemStateOf(api, el),
})

export const FileUploadItemDeleteTrigger = definePart<fileUpload.Api, fileUpload.ItemState | undefined>({
  tag: 'ark-file-upload-item-delete-trigger',
  root,
  target: wrappedButton,
  props: (api, el) => {
    const item = itemOf(el)
    return item ? api.getItemDeleteTriggerProps(item) : {}
  },
  state: (api, el) => itemStateOf(api, el),
})
