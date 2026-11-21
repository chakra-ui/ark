import type * as tagsInput from '@zag-js/tags-input'
import { definePart, ownInput, wrapped, wrappedButton } from '../../utils/define.js'
import { repeat, templateOf } from '../../utils/repeat.js'
import { itemOf, root } from './shared.js'

const autoText = new WeakSet<HTMLElement>()

export const TagsInputLabel = definePart<tagsInput.Api>({
  tag: 'ark-tags-input-label',
  root,
  props: (api) => api.getLabelProps(),
})

export const TagsInputControl = definePart<tagsInput.Api>({
  tag: 'ark-tags-input-control',
  root,
  props: (api) => api.getControlProps(),
  render: (api, el) => {
    const template = templateOf(el)
    if (!template) return
    // Keyed by index, so a tag being edited keeps its node and input focus
    repeat(
      template,
      api.value,
      (_, index) => String(index),
      (node, value, index) => {
        node.setAttribute('index', String(index))
        node.setAttribute('value', value)
      },
    )
  },
})

export const TagsInputInput = definePart<tagsInput.Api>({
  tag: 'ark-tags-input-input',
  root,
  target: wrapped('input'),
  props: (api) => api.getInputProps(),
})

export const TagsInputClearTrigger = definePart<tagsInput.Api>({
  tag: 'ark-tags-input-clear-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getClearTriggerProps(),
})

export const TagsInputHiddenInput = definePart<tagsInput.Api>({
  tag: 'ark-tags-input-hidden-input',
  root,
  target: ownInput,
  props: (api) => api.getHiddenInputProps(),
})

export const TagsInputItem = definePart<tagsInput.Api, tagsInput.ItemState>({
  tag: 'ark-tags-input-item',
  root,
  attributes: ['index', 'value', 'disabled'],
  display: 'inline-block',
  props: (api, el) => api.getItemProps(itemOf(el)),
  state: (api, el) => api.getItemState(itemOf(el)),
})

export const TagsInputItemPreview = definePart<tagsInput.Api, tagsInput.ItemState>({
  tag: 'ark-tags-input-item-preview',
  root,
  display: 'inline-block',
  props: (api, el) => api.getItemPreviewProps(itemOf(el)),
  state: (api, el) => api.getItemState(itemOf(el)),
})

export const TagsInputItemText = definePart<tagsInput.Api, tagsInput.ItemState>({
  tag: 'ark-tags-input-item-text',
  root,
  display: 'inline',
  setup: (el) => {
    if (!el.firstChild) autoText.add(el)
  },
  props: (api, el) => api.getItemTextProps(itemOf(el)),
  state: (api, el) => api.getItemState(itemOf(el)),
  render: (_, el) => {
    if (autoText.has(el)) el.textContent = itemOf(el).value
  },
})

export const TagsInputItemInput = definePart<tagsInput.Api, tagsInput.ItemState>({
  tag: 'ark-tags-input-item-input',
  root,
  target: wrapped('input'),
  props: (api, el) => api.getItemInputProps(itemOf(el)),
  state: (api, el) => api.getItemState(itemOf(el)),
})

export const TagsInputItemDeleteTrigger = definePart<tagsInput.Api, tagsInput.ItemState>({
  tag: 'ark-tags-input-item-delete-trigger',
  root,
  target: wrappedButton,
  props: (api, el) => api.getItemDeleteTriggerProps(itemOf(el)),
  state: (api, el) => api.getItemState(itemOf(el)),
})
