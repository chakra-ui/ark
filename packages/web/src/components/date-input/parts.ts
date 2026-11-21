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

export const DateInputLabel = definePart<Api>({
  tag: 'ark-date-input-label',
  root,
  attributes: ['index'],
  props: (api, el) => api.getLabelProps({ index: num(el, 'index') }),
})

export const DateInputControl = definePart<Api>({
  tag: 'ark-date-input-control',
  root,
  props: (api) => api.getControlProps(),
})

export const DateInputSegmentGroup = definePart<Api, dateInput.SegmentGroupState>({
  tag: segmentGroupTag,
  root,
  attributes: ['index'],
  props: (api, el) => api.getSegmentGroupProps({ index: num(el, 'index') }),
  state: (api, el) => api.getSegmentGroupState({ index: num(el, 'index') }),
  render: (api, el) => {
    repeat(segmentTemplateOf(el), api.getSegments({ index: num(el, 'index') }), segmentKey, (node, segment) =>
      segments.set(node, segment),
    )
  },
})

const segmentOf = (el: HTMLElement): dateInput.SegmentProps | undefined => {
  const segment = segments.get(el)
  return segment ? { segment, index: groupIndexOf(el) } : undefined
}

export const DateInputSegment = definePart<Api, dateInput.SegmentState | undefined>({
  tag: segmentTag,
  root,
  display: 'inline',
  props: (api, el) => {
    const segment = segmentOf(el)
    return segment ? api.getSegmentProps(segment) : {}
  },
  state: (api, el) => {
    const segment = segmentOf(el)
    return segment ? api.getSegmentState(segment) : undefined
  },
  render: (_api, el) => {
    const text = segments.get(el)?.text
    if (text != null && el.textContent !== text) el.textContent = text
  },
})

export const DateInputClearTrigger = definePart<Api>({
  tag: 'ark-date-input-clear-trigger',
  root,
  target: wrappedButton,
  props: (api) => clearTriggerProps(api),
})

export const DateInputHiddenInput = definePart<Api>({
  tag: 'ark-date-input-hidden-input',
  root,
  attributes: ['index', 'name'],
  target: ownInput,
  props: (api, el) => api.getHiddenInputProps({ index: num(el, 'index'), name: str(el, 'name') }),
})
