import type * as checkbox from '@zag-js/checkbox'
import { definePart, ownInput } from '../../utils/define.js'
import { root } from './shared.js'
import { describedBy } from '../../utils/field.js'

export const CheckboxLabel = definePart<checkbox.Api>({
  tag: 'ark-checkbox-label',
  root,
  props: (api) => api.getLabelProps(),
})

export const CheckboxControl = definePart<checkbox.Api>({
  tag: 'ark-checkbox-control',
  root,
  props: (api) => api.getControlProps(),
})

export const CheckboxIndicator = definePart<checkbox.Api>({
  tag: 'ark-checkbox-indicator',
  root,
  attributes: ['indeterminate'],
  props: (api, el) => ({
    ...api.getIndicatorProps(),
    hidden: el.hasAttribute('indeterminate') ? !api.indeterminate : !api.checked,
  }),
})

export const CheckboxHiddenInput = definePart<checkbox.Api>({
  tag: 'ark-checkbox-hidden-input',
  root,
  target: ownInput,
  props: (api, el) => ({ ...describedBy(el), ...api.getHiddenInputProps() }),
})
