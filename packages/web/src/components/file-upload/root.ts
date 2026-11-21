import * as fileUpload from '@zag-js/file-upload'
import { num, str } from '../../utils/attrs.js'
import { defineRoot } from '../../utils/define.js'
import type { FileUploadElement } from './index.js'
import { root } from './shared.js'
import { withField } from '../../utils/field.js'

defineRoot<fileUpload.Api>({
  properties: ['validate', 'transformFiles', 'ids', 'translations', 'acceptedFiles', 'defaultAcceptedFiles'],

  tag: root,
  machine: fileUpload.machine,
  connect: fileUpload.connect,
  attributes: [
    'accept',
    'max-files',
    'max-file-size',
    'min-file-size',
    'allow-drop',
    'prevent-document-drop',
    'capture',
    'directory',
    'disabled',
    'readonly',
    'invalid',
    'required',
    'name',
    'locale',
  ],

  actions: {
    clearFiles: (api) => api.clearFiles(),
    openFilePicker: (api) => api.openFilePicker(),
  },

  props: (el) => {
    const { acceptedFiles, defaultAcceptedFiles, validate, transformFiles, translations } = el as FileUploadElement
    return withField(el, 'hiddenInput', {
      accept: str(el, 'accept'),
      maxFiles: num(el, 'max-files'),
      maxFileSize: num(el, 'max-file-size'),
      minFileSize: num(el, 'min-file-size'),
      allowDrop: el.getAttribute('allow-drop') !== 'false',
      preventDocumentDrop: el.getAttribute('prevent-document-drop') !== 'false',
      capture: str<fileUpload.Props['capture'] & string>(el, 'capture'),
      directory: el.hasAttribute('directory'),
      disabled: el.hasAttribute('disabled'),
      readOnly: el.hasAttribute('readonly'),
      invalid: el.hasAttribute('invalid'),
      required: el.hasAttribute('required'),
      name: str(el, 'name'),
      locale: str(el, 'locale'),
      acceptedFiles,
      defaultAcceptedFiles,
      validate,
      transformFiles,
      translations,
    })
  },
  events: { onFileChange: 'filechange', onFileAccept: 'fileaccept', onFileReject: 'filereject' },
  rootProps: (api) => api.getRootProps(),
})
