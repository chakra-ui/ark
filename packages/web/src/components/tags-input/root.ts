import * as tagsInput from '@zag-js/tags-input'
import { num, str } from '../../utils/attrs.js'
import { defineRoot } from '../../utils/define.js'
import type { TagsInputElement } from './index.js'
import { listOf, root } from './shared.js'
import { withField } from '../../utils/field.js'

defineRoot<tagsInput.Api>({
  properties: ['validate', 'sanitizeValue', 'ids', 'translations', 'delimiter'],

  tag: root,
  machine: tagsInput.machine,
  connect: tagsInput.connect,
  attributes: [
    'value',
    'default-value',
    'input-value',
    'default-input-value',
    'max',
    'max-length',
    'delimiter',
    'allow-duplicates',
    'allow-overflow',
    'add-on-paste',
    'blur-behavior',
    'editable',
    'auto-focus',
    'disabled',
    'readonly',
    'invalid',
    'required',
    'name',
    'form',
    'placeholder',
  ],
  state: {
    value: {
      get: (api) => api.value,
      set: (api, value) => api.setValue(value),
    },
    inputValue: {
      get: (api) => api.inputValue,
      set: (api, value) => api.setInputValue(value),
    },
  },
  props: (el) => {
    const { validate, sanitizeValue, delimiter, translations } = el as TagsInputElement
    return withField(el, 'hiddenInput', {
      value: listOf(el, 'value'),
      defaultValue: listOf(el, 'default-value'),
      inputValue: str(el, 'input-value'),
      defaultInputValue: str(el, 'default-input-value'),
      max: num(el, 'max'),
      maxLength: num(el, 'max-length'),
      delimiter: delimiter ?? str(el, 'delimiter'),
      allowDuplicates: el.hasAttribute('allow-duplicates'),
      allowOverflow: el.hasAttribute('allow-overflow'),
      addOnPaste: el.hasAttribute('add-on-paste'),
      blurBehavior: str<tagsInput.Props['blurBehavior'] & string>(el, 'blur-behavior'),
      editable: el.hasAttribute('editable'),
      autoFocus: el.hasAttribute('auto-focus'),
      disabled: el.hasAttribute('disabled'),
      readOnly: el.hasAttribute('readonly'),
      invalid: el.hasAttribute('invalid'),
      required: el.hasAttribute('required'),
      name: str(el, 'name'),
      form: str(el, 'form'),
      placeholder: str(el, 'placeholder'),
      validate,
      sanitizeValue,
      translations,
    })
  },
  events: {
    onValueChange: 'valuechange',
    onInputValueChange: 'inputvaluechange',
    onHighlightChange: 'highlightchange',
    onValueInvalid: 'valueinvalid',
    onPointerDownOutside: 'pointerdownoutside',
    onFocusOutside: 'focusoutside',
    onInteractOutside: 'interactoutside',
  },
  rootProps: (api) => api.getRootProps(),
})
