import type * as tour from '@zag-js/tour'
import { spreadProps } from '@zag-js/vanilla'

import { definePart, rootOf, wrappedButton, type RootElement } from '../../utils/define.js'
import { definePresencePart } from '../../utils/presence.js'
import { repeat, templateOf } from '../../utils/repeat.js'
import { fillText, markAuthored, root } from './shared.js'

export const TourBackdrop = definePresencePart<tour.Api, tour.BackdropState>({
  tag: 'ark-tour-backdrop',
  root,
  present: (api) => api.open,
  props: (api) => api.getBackdropProps(),
  state: (api) => api.getBackdropState(),
})

export const TourSpotlight = definePresencePart<tour.Api, tour.SpotlightState>({
  tag: 'ark-tour-spotlight',
  root,
  present: (api) => api.open,
  props: (api) => api.getSpotlightProps(),
  state: (api) => api.getSpotlightState(),
})

export const TourPositioner = definePresencePart<tour.Api, tour.PositionerState>({
  tag: 'ark-tour-positioner',
  root,
  animates: false,
  props: (api) => api.getPositionerProps(),
  state: (api) => api.getPositionerState(),
})

export const TourContent = definePresencePart<tour.Api, tour.ContentState>({
  tag: 'ark-tour-content',
  root,
  props: (api) => api.getContentProps(),
  state: (api) => api.getContentState(),
})

export const TourArrow = definePart<tour.Api>({ tag: 'ark-tour-arrow', root, props: (api) => api.getArrowProps() })

export const TourArrowTip = definePart<tour.Api>({
  tag: 'ark-tour-arrow-tip',
  root,
  props: (api) => api.getArrowTipProps(),
})

export const TourTitle = definePart<tour.Api>({
  tag: 'ark-tour-title',
  root,
  props: (api) => api.getTitleProps(),
  setup: markAuthored,
  render: (api, el) => fillText(el, api.step?.title),
})

export const TourDescription = definePart<tour.Api>({
  tag: 'ark-tour-description',
  root,
  props: (api) => api.getDescriptionProps(),
  setup: markAuthored,
  render: (api, el) => fillText(el, api.step?.description),
})

export const TourProgressText = definePart<tour.Api>({
  tag: 'ark-tour-progress-text',
  root,
  props: (api) => api.getProgressTextProps(),
  setup: markAuthored,
  render: (api, el) => fillText(el, api.getProgressText()),
})

export const TourCloseTrigger = definePart<tour.Api>({
  tag: 'ark-tour-close-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getCloseTriggerProps(),
})

export const TourControl = definePart<tour.Api>({
  tag: 'ark-tour-control',
  root,
  props: () => ({ 'data-tour-control': '' }),
})

export const TourActions = definePart<tour.Api>({
  tag: 'ark-tour-actions',
  root,
  display: 'contents',
  props: () => ({}),
  render: (api, el) => {
    const template = templateOf(el)
    if (!template) return
    const id = rootOf<RootElement<tour.Api> & HTMLElement>(el, root)?.machineId ?? ''
    repeat(
      template,
      api.step?.actions ?? [],
      (action) => action.label,
      (node, action) => {
        spreadProps(node, api.getActionTriggerProps({ action }), id)
        if (node.textContent !== action.label) node.textContent = action.label
      },
    )
  },
})
