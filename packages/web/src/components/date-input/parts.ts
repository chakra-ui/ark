import type * as dateInput from '@zag-js/date-input'

import { num, str } from '../../utils/attrs.js'
import { definePart, ownInput, wrappedButton } from '../../utils/define.js'
import { repeat, templateOf } from '../../utils/repeat.js'
import { type Api, groupIndexOf, root, segments, segmentGroupTag, segmentTag } from './shared.js'

const segmentKey = (segment: dateInput.DateSegment, index: number) => `${segment.type}-${index}`

function createSegmentTemplate(el: HTMLElement) {
  const template = el.ownerDocument.createElement('template')
  template.content.append(el.ownerDocument.createElement(segmentTag))
  el.prepend(template)
  return template
}

const segmentTemplateOf = (el: HTMLElement) => templateOf(el) ?? createSegmentTemplate(el)

const clearTriggerProps = (api: Api) => {
  const { disabled, readOnly } = api.getRootState()

  return {
    'data-scope': 'date-input',
    'data-part': 'clear-trigger',
    type: 'button',
    disabled: disabled || readOnly,
    onClick: (event: MouseEvent) => {
      if (event.defaultPrevented) return
      api.clearValue()
      api.focus()
    },
  }
}

definePart<Api>({
  tag: 'ark-date-input-label',
  root,
  props: (api, el) => api.getLabelProps({ index: num(el, 'index') }),
})

definePart<Api>({
  tag: 'ark-date-input-control',
  root,
  props: (api) => api.getControlProps(),
})

definePart<Api>({
  tag: segmentGroupTag,
  root,
  props: (api, el) => api.getSegmentGroupProps({ index: num(el, 'index') }),
  render: (api, el) => {
    repeat(segmentTemplateOf(el), api.getSegments({ index: num(el, 'index') }), segmentKey, (node, segment) =>
      segments.set(node, segment),
    )
  },
})

definePart<Api>({
  tag: segmentTag,
  root,
  display: 'inline',
  props: (api, el) => {
    const segment = segments.get(el)
    return segment ? api.getSegmentProps({ segment, index: groupIndexOf(el) }) : {}
  },
  render: (_api, el) => {
    const text = segments.get(el)?.text
    if (text != null && el.textContent !== text) el.textContent = text
  },
})

definePart<Api>({
  tag: 'ark-date-input-clear-trigger',
  root,
  target: wrappedButton,
  props: (api) => clearTriggerProps(api),
})

definePart<Api>({
  tag: 'ark-date-input-hidden-input',
  root,
  target: ownInput,
  props: (api, el) => api.getHiddenInputProps({ index: num(el, 'index'), name: str(el, 'name') }),
})
