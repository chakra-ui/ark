import type * as toggleGroup from '@zag-js/toggle-group'
import { definePart, wrappedButton } from '../../utils/define.js'
import { root } from './shared.js'

definePart<toggleGroup.Api>({
  tag: 'ark-toggle-group-item',
  root,
  target: wrappedButton,
  props: (api, el) =>
    api.getItemProps({ value: el.getAttribute('value') ?? '', disabled: el.hasAttribute('disabled') }),
})
