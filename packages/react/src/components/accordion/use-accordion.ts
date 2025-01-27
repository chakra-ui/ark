import { dataAttr, getEventKey, isSafari, nextById, prevById, queryAll } from '@zag-js/dom-query'
import type { PropTypes } from '@zag-js/react'
import { normalizeProps as normalize } from '@zag-js/react'
import type { EventKeyMap } from '@zag-js/types'
import { add, first, last, remove, warn } from '@zag-js/utils'
import { useControllableState } from '../../utils/use-controllable-state'
import { useEvent } from '../../utils/use-event'
import { useSafeLayoutEffect } from '../../utils/use-safe-layout-effect'
import { useElementScope, useStateValue } from '../../utils/use-state-value'
import { useUpdateEffect } from '../../utils/use-update-effect'
import { accordionAnatomy } from './accordion.anatomy'
import { flush } from '../../utils/flush'

const parts = accordionAnatomy.build()

export function useAccordion(props: UseAccordionProps = {}): UseAccordionReturn {
  const {
    multiple = false,
    collapsible = false,
    orientation = 'vertical',
    disabled = false,
  } = props

  // State
  const state = useStateValue<AccordionState>('idle')
  const [focusedValue, setFocusedValue] = useControllableState<string | null>({
    defaultValue: null,
    onChange(value) {
      props.onFocusChange?.({ value })
    },
  })
  const [value, setValue] = useControllableState<string[]>({
    defaultValue: props.defaultValue || [],
    value: props.value,
    onChange(value) {
      props.onValueChange?.({ value })
    },
  })

  // Dom utils
  const scope = useElementScope(props.id)
  const getRootId = () => props.ids?.root ?? `accordion:${scope.id}`
  const getItemId = (val: string) => props.ids?.item?.(val) ?? `accordion:${scope.id}:item:${val}`
  const getItemContentId = (val: string) =>
    props.ids?.itemContent?.(val) ?? `accordion:${scope.id}:content:${val}`
  const getItemTriggerId = (val: string) =>
    props.ids?.itemTrigger?.(val) ?? `accordion:${scope.id}:trigger:${val}`

  const getRootEl = () => scope.getById<HTMLElement>(getRootId())
  const getTriggerEls = () => {
    const ownerId = CSS.escape(getRootId())
    const selector = `[aria-controls][data-ownedby='${ownerId}']:not([disabled])`
    return queryAll(getRootEl(), selector)
  }
  const getFirstTriggerEl = () => first(getTriggerEls())
  const getLastTriggerEl = () => last(getTriggerEls())
  const getNextTriggerEl = (itemValue: string) => {
    return nextById(getTriggerEls(), getItemTriggerId(itemValue))
  }
  const getPrevTriggerEl = (itemValue: string) => {
    return prevById(getTriggerEls(), getItemTriggerId(itemValue))
  }

  const collapse = useEvent((itemValue: string) => {
    const next = multiple ? remove(value, itemValue) : []
    setValue(next)
  })
  const expand = useEvent((itemValue: string) => {
    const next = multiple ? add(value, itemValue) : [itemValue]
    setValue(next)
  })
  const focusFirstTrigger = useEvent(() => {
    getFirstTriggerEl()?.focus()
  })
  const focusLastTrigger = useEvent(() => {
    getLastTriggerEl()?.focus()
  })
  const focusNextTrigger = useEvent(() => {
    if (!focusedValue) return
    getNextTriggerEl(focusedValue)?.focus()
  })
  const focusPrevTrigger = useEvent(() => {
    if (!focusedValue) return
    getPrevTriggerEl(focusedValue)?.focus()
  })

  // Guards
  const isExpanded = (itemValue: string) => value.includes(itemValue)
  const canToggle = () => collapsible || multiple

  // Sender
  const send = useEvent((event: AccordionEvent) => {
    const transitions: AccordionTransitionMap = {
      on: {
        'VALUE.SET': (event) => {
          setValue(event.value)
        },
      },
      states: {
        idle: {
          on: {
            'TRIGGER.FOCUS': (event) => {
              state.set('focused')
              setFocusedValue(event.value)
            },
          },
        },
        focused: {
          on: {
            'GOTO.NEXT': () => {
              focusNextTrigger()
            },
            'GOTO.PREV': () => {
              focusPrevTrigger()
            },
            'TRIGGER.CLICK': (event) => {
              if (isExpanded(event.value) && canToggle()) {
                collapse(event.value)
              } else if (!isExpanded(event.value)) {
                expand(event.value)
              }
            },
            'GOTO.FIRST': () => {
              focusFirstTrigger()
            },
            'GOTO.LAST': () => {
              focusLastTrigger()
            },
            'TRIGGER.BLUR': () => {
              state.set('idle')
              setFocusedValue(null)
            },
          },
        },
      },
    }

    const handler =
      transitions.on?.[event.type] ?? transitions.states?.[state.ref.current]?.on?.[event.type]
    // @ts-expect-error
    handler?.(event)
  })

  // Coarse value watcher
  const coarseValue = useEvent(() => {
    if (!multiple && value.length > 1) {
      warn('The value of accordion should be a single value when multiple is false.')
      setValue([value[0]])
    }
  })

  // Value watchers
  useUpdateEffect(coarseValue, [value, multiple])
  useSafeLayoutEffect(coarseValue, [])

  function getItemState(props: ItemProps): ItemState {
    return {
      expanded: value.includes(props.value),
      focused: focusedValue === props.value,
      disabled: Boolean(props.disabled ?? disabled),
    }
  }

  const isHorizontal = orientation === 'horizontal'

  return {
    focusedValue,
    value,
    setValue(nextValue) {
      let next = nextValue
      if (multiple && next.length > 1) next = [next[0]]
      setValue(next)
    },
    getItemState,

    getRootProps: () =>
      normalize.element({
        ...parts.root.attrs,
        dir: scope.dir,
        id: getRootId(),
        'data-orientation': orientation,
      }),

    getItemProps: (props) => {
      const itemState = getItemState(props)
      return normalize.element({
        ...parts.item.attrs,
        dir: scope.dir,
        id: getItemId(props.value),
        'data-state': itemState.expanded ? 'open' : 'closed',
        'data-focus': dataAttr(itemState.focused),
        'data-disabled': dataAttr(itemState.disabled),
        'data-orientation': orientation,
      })
    },

    getItemContentProps: (props) => {
      const itemState = getItemState(props)
      return normalize.element({
        ...parts.itemContent.attrs,
        dir: scope.dir,
        role: 'region',
        id: getItemContentId(props.value),
        'aria-labelledby': getItemTriggerId(props.value),
        hidden: !itemState.expanded,
        'data-state': itemState.expanded ? 'open' : 'closed',
        'data-disabled': dataAttr(itemState.disabled),
        'data-focus': dataAttr(itemState.focused),
        'data-orientation': orientation,
      })
    },

    getItemIndicatorProps: (props) => {
      const itemState = getItemState(props)
      return normalize.element({
        ...parts.itemIndicator.attrs,
        dir: scope.dir,
        'aria-hidden': true,
        'data-state': itemState.expanded ? 'open' : 'closed',
        'data-disabled': dataAttr(itemState.disabled),
        'data-focus': dataAttr(itemState.focused),
        'data-orientation': orientation,
      })
    },

    getItemTriggerProps: (props) => {
      const { value: itemValue } = props
      const itemState = getItemState(props)

      return normalize.button({
        ...parts.itemTrigger.attrs,
        type: 'button',
        dir: scope.dir,
        id: getItemTriggerId(itemValue),
        'aria-controls': getItemContentId(itemValue),
        'aria-expanded': itemState.expanded,
        disabled: itemState.disabled,
        'data-orientation': orientation,
        'aria-disabled': itemState.disabled,
        'data-state': itemState.expanded ? 'open' : 'closed',
        'data-ownedby': getRootId(),
        onFocus() {
          flush(() => {
            if (itemState.disabled) return
            send({ type: 'TRIGGER.FOCUS', value: itemValue })
          })
        },
        onBlur() {
          if (itemState.disabled) return
          send({ type: 'TRIGGER.BLUR', value: itemValue })
        },
        onClick(event) {
          flush(() => {
            if (itemState.disabled) return
            if (isSafari()) {
              event.currentTarget.focus()
            }
            send({ type: 'TRIGGER.CLICK', value: itemValue })
          })
        },
        onKeyDown(event) {
          if (event.defaultPrevented) return
          if (itemState.disabled) return

          const keyMap: EventKeyMap = {
            ArrowDown() {
              if (isHorizontal) return
              send({ type: 'GOTO.NEXT', value: itemValue })
            },
            ArrowUp() {
              if (isHorizontal) return
              send({ type: 'GOTO.PREV', value: itemValue })
            },
            ArrowRight() {
              if (!isHorizontal) return
              send({ type: 'GOTO.NEXT', value: itemValue })
            },
            ArrowLeft() {
              if (!isHorizontal) return
              send({ type: 'GOTO.PREV', value: itemValue })
            },
            Home() {
              send({ type: 'GOTO.FIRST', value: itemValue })
            },
            End() {
              send({ type: 'GOTO.LAST', value: itemValue })
            },
          }

          const key = getEventKey(event, {
            dir: scope.dir,
            orientation,
          })

          const exec = keyMap[key]

          if (exec) {
            exec(event)
            event.preventDefault()
          }
        },
      })
    },
  }
}

type AccordionState = 'idle' | 'focused'

type AccordionEvent =
  | { type: 'TRIGGER.FOCUS'; value: string }
  | { type: 'TRIGGER.BLUR'; value: string }
  | { type: 'GOTO.NEXT'; value?: string }
  | { type: 'GOTO.PREV'; value?: string }
  | { type: 'GOTO.FIRST'; value?: string }
  | { type: 'GOTO.LAST'; value?: string }
  | { type: 'TRIGGER.CLICK'; value: string }
  | { type: 'VALUE.SET'; value: string[] }

type EventHandler<E extends AccordionEvent['type']> = (
  event: Extract<AccordionEvent, { type: E }>,
) => void

type EventHandlerMap = {
  on?: { [E in AccordionEvent['type']]?: EventHandler<E> }
}

type AccordionTransitionMap = EventHandlerMap & {
  states?: {
    [K in AccordionState]?: EventHandlerMap
  }
}

export interface ValueChangeDetails {
  value: string[]
}

export interface FocusChangeDetails {
  value: string | null
}

export type ElementIds = Partial<{
  root: string
  item(value: string): string
  itemContent(value: string): string
  itemTrigger(value: string): string
}>

export interface UseAccordionProps {
  /**
   * The id of the accordion
   */
  id?: string
  /**
   * Whether multiple accordion items can be expanded at the same time.
   * @default false
   */
  multiple?: boolean
  /**
   * Whether an accordion item can be closed after it has been expanded.
   * @default false
   */
  collapsible?: boolean
  /**
   * The `value` of the accordion items that are currently being expanded.
   */
  value?: string[]
  /**
   * The initial value when uncontrolled
   */
  defaultValue?: string[]
  /**
   * Whether the accordion items are disabled
   */
  disabled?: boolean
  /**
   * The callback fired when the state of expanded/collapsed accordion items changes.
   */
  onValueChange?(details: ValueChangeDetails): void
  /**
   * The callback fired when the focused accordion item changes.
   */
  onFocusChange?(details: FocusChangeDetails): void
  /**
   * The orientation of the accordion items.
   * @default "vertical"
   */
  orientation?: 'horizontal' | 'vertical'
  /**
   * Custom ids for elements
   */
  ids?: ElementIds
}

export interface ItemProps {
  /**
   * The value of the accordion item.
   */
  value: string
  /**
   * Whether the accordion item is disabled.
   */
  disabled?: boolean
}

export interface ItemState {
  /**
   * Whether the accordion item is expanded.
   */
  expanded: boolean
  /**
   * Whether the accordion item is focused.
   */
  focused: boolean
  /**
   * Whether the accordion item is disabled.
   */
  disabled: boolean
}

export interface UseAccordionReturn {
  /**
   * The value of the focused accordion item.
   */
  focusedValue: string | null
  /**
   * The value of the accordion
   */
  value: string[]
  /**
   * Sets the value of the accordion.
   */
  setValue: (value: string[]) => void
  /**
   * Gets the state of an accordion item.
   */
  getItemState(props: ItemProps): ItemState

  getRootProps(): PropTypes['element']
  getItemProps(props: ItemProps): PropTypes['element']
  getItemContentProps(props: ItemProps): PropTypes['element']
  getItemTriggerProps(props: ItemProps): PropTypes['button']
  getItemIndicatorProps(props: ItemProps): PropTypes['element']
}
