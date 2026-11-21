import * as progress from '@zag-js/progress'
import { num, str } from '../../utils/attrs.js'
import { defineRoot } from '../../utils/define.js'
import { root } from './shared.js'

// An empty value attribute means indeterminate (null)
const nullable = (el: Element, name: string) => {
  if (!el.hasAttribute(name)) return undefined
  const value = el.getAttribute(name)
  return value === '' || value === 'null' ? null : Number(value)
}

defineRoot<progress.Api>({
  properties: ['ids', 'translations'],

  tag: root,
  machine: progress.machine,
  connect: progress.connect,
  attributes: ['value', 'default-value', 'min', 'max', 'orientation', 'locale'],
  props: (el) => ({
    value: nullable(el, 'value'),
    defaultValue: nullable(el, 'default-value'),
    min: num(el, 'min'),
    max: num(el, 'max'),
    orientation: str<'horizontal' | 'vertical'>(el, 'orientation') ?? 'horizontal',
    locale: str(el, 'locale'),
  }),
  events: { onValueChange: 'valuechange' },
  rootProps: (api) => api.getRootProps(),
})
