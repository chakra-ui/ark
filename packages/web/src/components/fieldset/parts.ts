import { definePart } from '../../utils/define.js'
import { type FieldsetApi, root } from './shared.js'

const renderRoot = (_el: HTMLElement, rootEl: { render(): void }) => {
  queueMicrotask(() => rootEl.render())
  return () => queueMicrotask(() => rootEl.render())
}

definePart<FieldsetApi>({
  tag: 'ark-fieldset-legend',
  root,
  props: (api) => api.getLegendProps(),
})

definePart<FieldsetApi>({
  tag: 'ark-fieldset-helper-text',
  root,
  props: (api) => api.getHelperTextProps(),
  setup: renderRoot,
})

definePart<FieldsetApi>({
  tag: 'ark-fieldset-error-text',
  root,
  props: (api) => api.getErrorTextProps(),
  setup: renderRoot,
})
