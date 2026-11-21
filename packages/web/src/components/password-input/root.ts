import * as passwordInput from '@zag-js/password-input'

import { controlled, str } from '../../utils/attrs.js'
import { defineRoot } from '../../utils/define.js'
import { root } from './shared.js'

type AutoComplete = NonNullable<passwordInput.Props['autoComplete']>

defineRoot<passwordInput.Api>({
  tag: root,
  machine: passwordInput.machine,
  connect: passwordInput.connect,

  attributes: [
    'visible',
    'default-visible',
    'disabled',
    'invalid',
    'readonly',
    'required',
    'name',
    'autocomplete',
    'ignore-password-managers',
  ],
  properties: ['ids', 'translations'],
  state: {
    visible: {
      get: (api) => api.visible,
      set: (api, value) => api.setVisible(!!value),
    },
  },
  props: (el) => ({
    visible: controlled(el, 'visible'),
    defaultVisible: el.hasAttribute('default-visible'),
    disabled: el.hasAttribute('disabled'),
    invalid: el.hasAttribute('invalid'),
    readOnly: el.hasAttribute('readonly'),
    required: el.hasAttribute('required'),
    name: str(el, 'name'),
    autoComplete: str<AutoComplete>(el, 'autocomplete'),
    ignorePasswordManagers: el.hasAttribute('ignore-password-managers'),
  }),

  events: {
    onVisibilityChange: 'visibilitychange',
  },

  rootProps: (api) => api.getRootProps(),
})
