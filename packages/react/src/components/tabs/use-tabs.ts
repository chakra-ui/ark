import {
  clickIfLink,
  dataAttr,
  getEventKey,
  getFocusables,
  isAnchorElement,
  isComposingEvent,
  isSafari,
  isSelfTarget,
  nextById,
  nextTick,
  prevById,
  raf,
} from '@zag-js/dom-query'
import { trackElementRect } from '@zag-js/element-rect'
import { type PropTypes, normalizeProps as normalize } from '@zag-js/react'
import type { EventKeyMap } from '@zag-js/types'
import { first, last } from '@zag-js/utils'
import { useRef } from 'react'
import { callAll } from '../../utils/call-all'
import { useEvent } from '../../utils/use-event'
import { useSafeLayoutEffect } from '../../utils/use-safe-layout-effect'
import { useElementScope, useStateValue, useUnmount } from '../../utils/use-state-value'
import { useUpdateEffect } from '../../utils/use-update-effect'
import { tabsAnatomy } from './tabs.anatomy'

const parts = tabsAnatomy.build()

export function useTabs(props: UseTabsProps = {}): UseTabsReturn {
  const {
    orientation = 'horizontal',
    activationMode = 'automatic',
    composite = true,
    loopFocus = true,
    navigate = ({ node }) => {
      clickIfLink(node)
    },
  } = props

  // Context
  const initialValue = props.defaultValue || props.value || null
  const selectedValue = useStateValue<string | null>(initialValue)
  const focusedValue = useStateValue<string | null>(initialValue)

  const indicatorCleanupRef = useRef<VoidFunction | undefined>(undefined)
  const ctx = useStateValue<TabsContext>({
    indicatorRect: { left: '0px', top: '0px', width: '0px', height: '0px' },
    indicatorTransition: false,
    ssr: true,
  })
  const set = {
    value: (nextValue: string | null) => {
      if (nextValue === selectedValue.ref.current) return
      selectedValue.set(nextValue)
      if (nextValue != null) {
        props.onValueChange?.({ value: nextValue })
      }
    },
    focusedValue: (nextValue: string | null) => {
      if (nextValue === focusedValue.ref.current) return
      focusedValue.set(nextValue)
      if (nextValue != null) {
        props.onFocusChange?.({ focusedValue: nextValue })
      }
    },
  }

  // State
  const state = useStateValue<TabsState>('idle')

  // Dom utils
  const scope = useElementScope(props.id)
  const getRootId = () => props.ids?.root ?? `tabs:${scope.id}`
  const getListId = () => props.ids?.list ?? `tabs:${scope.id}:list`
  const getContentId = (id: string) => props.ids?.content ?? `tabs:${scope.id}:content-${id}`
  const getTriggerId = (id: string) => props.ids?.trigger ?? `tabs:${scope.id}:trigger-${id}`
  const getIndicatorId = () => props.ids?.indicator ?? `tabs:${scope.id}:indicator`

  const getElements = () => {
    const ownerId = CSS.escape(getListId())
    const selector = `[role=tab][data-ownedby='${ownerId}']:not([disabled])`
    const list = scope.getById(getListId())
    return Array.from(list?.querySelectorAll<HTMLElement>(selector) ?? [])
  }

  const getFirstTriggerEl = () => first(getElements())
  const getLastTriggerEl = () => last(getElements())
  const getIndicatorEl = () => scope.getById(getIndicatorId())

  const getNextTriggerEl = (id: string | null) => {
    if (!id) return null
    const elements = getElements()
    return nextById(elements, getTriggerId(id), loopFocus)
  }
  const getPrevTriggerEl = (id: string | null) => {
    if (!id) return null
    const elements = getElements()
    return prevById(elements, getTriggerId(id), loopFocus)
  }
  const getSelectedContentEl = () => {
    const value = selectedValue.ref.current
    if (!value) return null
    return scope.getById(getContentId(value))
  }
  const getSelectedTriggerEl = () => {
    const value = selectedValue.ref.current
    if (!value) return null
    return scope.getById(getTriggerId(value))
  }
  const getOffsetRect = (el: HTMLElement | null) => ({
    left: el?.offsetLeft ?? 0,
    top: el?.offsetTop ?? 0,
    width: el?.offsetWidth ?? 0,
    height: el?.offsetHeight ?? 0,
  })
  const resolveRect = (rect: Record<'width' | 'height' | 'left' | 'top', number>) => ({
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    left: `${rect.left}px`,
    top: `${rect.top}px`,
  })

  // Actions
  const selectFocusedTab = useEvent(() => {
    raf(() => {
      const value = focusedValue.ref.current
      if (!value) return
      const nullable = props.deselectable && selectedValue.ref.current === value
      setValue(nullable ? null : value)
    })
  })
  const setFocusedValue = useEvent((nextValue: string | null) => {
    if (focusedValue.ref.current === nextValue) return
    focusedValue.set(nextValue)
  })
  const clearFocusedValue = useEvent(() => {
    set.focusedValue(null)
  })
  const setValue = useEvent((nextValue: string | null) => {
    const nullable = props.deselectable && selectedValue.ref.current === focusedValue.ref.current
    const value = nullable ? null : nextValue
    set.value(value)
  })
  const clearValue = useEvent(() => {
    set.value(null)
  })
  const focusFirstTab = useEvent(() => {
    raf(() => {
      getFirstTriggerEl()?.focus()
    })
  })
  const focusLastTab = useEvent(() => {
    raf(() => {
      getLastTriggerEl()?.focus()
    })
  })
  const focusNextTab = useEvent(() => {
    const _value = focusedValue.ref.current
    if (!_value) return
    const triggerEl = getNextTriggerEl(_value)
    raf(() => {
      // biome-ignore lint/complexity/useLiteralKeys: <explanation>
      const triggerValue = triggerEl?.dataset['value']
      if (composite) {
        triggerEl?.focus()
      } else if (triggerValue != null) {
        setFocusedValue(triggerValue)
      }
    })
  })
  const focusPrevTab = useEvent(() => {
    const _value = focusedValue.ref.current
    if (!_value) return
    const triggerEl = getPrevTriggerEl(_value)
    raf(() => {
      // biome-ignore lint/complexity/useLiteralKeys: <explanation>
      const triggerValue = triggerEl?.dataset['value']
      if (composite) {
        triggerEl?.focus()
      } else if (triggerValue != null) {
        setFocusedValue(triggerValue)
      }
    })
  })
  const syncTabIndex = useEvent(() => {
    raf(() => {
      const contentEl = getSelectedContentEl()
      if (!contentEl) return
      const focusables = getFocusables(contentEl)
      if (focusables.length > 0) {
        contentEl.removeAttribute('tabindex')
      } else {
        contentEl.setAttribute('tabindex', '0')
      }
    })
  })
  const allowIndicatorTransition = useEvent(() => {
    ctx.set({ indicatorTransition: true })
  })

  const setIndicatorRect = useEvent((id?: string) => {
    const targetValue = id ?? selectedValue.ref.current
    const indicatorEl = getIndicatorEl()
    if (!indicatorEl || !targetValue) return

    const triggerEl = scope.getById(getTriggerId(targetValue))
    if (!triggerEl) return

    const rect = getOffsetRect(triggerEl)
    ctx.set({ indicatorRect: resolveRect(rect) })

    nextTick(() => {
      ctx.set({ indicatorTransition: false })
    })
  })

  const syncIndicatorRect = useEvent(() => {
    indicatorCleanupRef.current?.()

    const currentValue = selectedValue.ref.current
    const indicatorEl = getIndicatorEl()
    if (!indicatorEl || !currentValue) return

    const triggerEl = getSelectedTriggerEl()
    if (!triggerEl) return

    indicatorCleanupRef.current = trackElementRect(triggerEl, {
      getRect(el) {
        return getOffsetRect(el)
      },
      onChange(rect) {
        ctx.set({ indicatorRect: resolveRect(rect) })
        nextTick(() => {
          ctx.set({ indicatorTransition: false })
        })
      },
    })
  })

  const navigateIfNeeded = useEvent(() => {
    const triggerEl = getSelectedTriggerEl()
    if (!isAnchorElement(triggerEl)) return
    navigate({ value: selectedValue.ref.current, node: triggerEl })
  })
  const cleanupObserver = useEvent(() => {
    indicatorCleanupRef.current?.()
  })
  const syncSsr = useEvent(() => {
    ctx.set({ ssr: false })
  })

  // Guards
  const selectOnFocus = () => activationMode === 'automatic'

  // Sender
  const send = useEvent((event: TabsEvent) => {
    switch (event.type) {
      case 'SET_VALUE':
        return setValue(event.value)
      case 'CLEAR_VALUE':
        return clearValue()
      case 'SET_INDICATOR_RECT':
        return setIndicatorRect(event.id)
      case 'SYNC_TAB_INDEX':
        return syncTabIndex()
    }

    switch (state.ref.current) {
      case 'idle':
        switch (event.type) {
          case 'TAB_FOCUS':
            state.set('focused')
            setFocusedValue(event.value)
            break
          case 'TAB_CLICK':
            state.set('focused')
            setFocusedValue(event.value)
            setValue(event.value)
            break
        }
        break

      case 'focused':
        switch (event.type) {
          case 'TAB_CLICK':
            setFocusedValue(event.value)
            setValue(event.value)
            break
          case 'ARROW_PREV':
            if (selectOnFocus()) {
              focusPrevTab()
              selectFocusedTab()
            } else {
              focusPrevTab()
            }
            break
          case 'ARROW_NEXT':
            if (selectOnFocus()) {
              focusNextTab()
              selectFocusedTab()
            } else {
              focusNextTab()
            }
            break
          case 'HOME':
            if (selectOnFocus()) {
              focusFirstTab()
              selectFocusedTab()
            } else {
              focusFirstTab()
            }
            break
          case 'END':
            if (selectOnFocus()) {
              focusLastTab()
              selectFocusedTab()
            } else {
              focusLastTab()
            }
            break
          case 'ENTER':
            if (!selectOnFocus()) {
              selectFocusedTab()
            }
            break
          case 'TAB_FOCUS':
            setFocusedValue(event.value)
            break
          case 'TAB_BLUR':
            state.set('idle')
            clearFocusedValue()
            break
        }
        break
    }
  })

  const _selectedValue = selectedValue.value
  const _focusedValue = focusedValue.value

  // Context watchers
  useUpdateEffect(
    callAll(allowIndicatorTransition, syncIndicatorRect, syncTabIndex, navigateIfNeeded),
    [_selectedValue],
  )
  useUpdateEffect(syncIndicatorRect, [scope.dir, orientation])
  useUnmount(cleanupObserver)
  useSafeLayoutEffect(callAll(syncIndicatorRect, syncTabIndex, syncSsr), [])

  useUpdateEffect(() => {
    if (typeof props.value === 'undefined') return
    set.value(props.value || null)
  }, [props.value, selectedValue.value])

  const isVertical = orientation === 'vertical'
  const isHorizontal = orientation === 'horizontal'

  function getTriggerState(props: TriggerProps) {
    return {
      selected: _selectedValue === props.value,
      focused: _focusedValue === props.value,
      disabled: !!props.disabled,
    }
  }

  const focused = state.matches('focused')
  const indicatorRect = ctx.get('indicatorRect')
  const indicatorTransition = ctx.get('indicatorTransition')

  return {
    value: _selectedValue,
    focusedValue: _focusedValue,
    setValue(nextValue) {
      send({ type: 'SET_VALUE', value: nextValue })
    },
    clearValue() {
      send({ type: 'CLEAR_VALUE' })
    },
    setIndicatorRect(value) {
      const id = getTriggerId(value)
      send({ type: 'SET_INDICATOR_RECT', id })
    },
    syncTabIndex() {
      send({ type: 'SYNC_TAB_INDEX' })
    },
    selectNext(fromValue) {
      send({ type: 'TAB_FOCUS', value: fromValue || null, src: 'selectNext' })
      send({ type: 'ARROW_NEXT', src: 'selectNext' })
    },
    selectPrev(fromValue) {
      send({ type: 'TAB_FOCUS', value: fromValue || null, src: 'selectPrev' })
      send({ type: 'ARROW_PREV', src: 'selectPrev' })
    },
    focus() {
      getSelectedTriggerEl()?.focus()
    },

    getRootProps() {
      return normalize.element({
        ...parts.root.attrs,
        id: getRootId(),
        'data-orientation': orientation,
        'data-focus': dataAttr(focused),
        dir: scope.dir,
      })
    },

    getListProps() {
      return normalize.element({
        ...parts.list.attrs,
        id: getListId(),
        role: 'tablist',
        dir: scope.dir,
        'data-focus': dataAttr(focused),
        'aria-orientation': orientation,
        'data-orientation': orientation,
        'aria-label': props.translations?.listLabel,
        onKeyDown(event) {
          if (event.defaultPrevented) return

          if (!isSelfTarget(event)) return
          if (isComposingEvent(event)) return

          const keyMap: EventKeyMap = {
            ArrowDown() {
              if (isHorizontal) return
              send({ type: 'ARROW_NEXT', key: 'ArrowDown' })
            },
            ArrowUp() {
              if (isHorizontal) return
              send({ type: 'ARROW_PREV', key: 'ArrowUp' })
            },
            ArrowLeft() {
              if (isVertical) return
              send({ type: 'ARROW_PREV', key: 'ArrowLeft' })
            },
            ArrowRight() {
              if (isVertical) return
              send({ type: 'ARROW_NEXT', key: 'ArrowRight' })
            },
            Home() {
              send({ type: 'HOME' })
            },
            End() {
              send({ type: 'END' })
            },
            Enter() {
              send({ type: 'ENTER' })
            },
          }

          const key = getEventKey(event, { dir: scope.dir, orientation })
          const exec = keyMap[key]

          if (exec) {
            event.preventDefault()
            exec(event)
          }
        },
      })
    },

    getTriggerState,

    getTriggerProps(props) {
      const { value, disabled } = props
      const triggerState = getTriggerState(props)

      return normalize.button({
        ...parts.trigger.attrs,
        role: 'tab',
        type: 'button',
        disabled,
        dir: scope.dir,
        'data-orientation': orientation,
        'data-disabled': dataAttr(disabled),
        'aria-disabled': disabled,
        'data-value': value,
        'aria-selected': triggerState.selected,
        'data-selected': dataAttr(triggerState.selected),
        'data-focus': dataAttr(triggerState.focused),
        'aria-controls': triggerState.selected ? getContentId(value) : undefined,
        'data-ownedby': getListId(),
        'data-ssr': dataAttr(ctx.get('ssr')),
        id: getTriggerId(value),
        tabIndex: triggerState.selected && composite ? 0 : -1,
        onFocus() {
          send({ type: 'TAB_FOCUS', value })
        },
        onBlur(event) {
          const target = event.relatedTarget as HTMLElement | null
          if (target?.getAttribute('role') !== 'tab') {
            send({ type: 'TAB_BLUR' })
          }
        },
        onClick(event) {
          if (event.defaultPrevented) return
          if (disabled) return
          if (isSafari()) {
            event.currentTarget.focus()
          }
          send({ type: 'TAB_CLICK', value })
        },
      })
    },

    getContentProps(props) {
      const selected = _selectedValue === props.value
      return normalize.element({
        ...parts.content.attrs,
        dir: scope.dir,
        id: getContentId(props.value),
        tabIndex: composite ? 0 : -1,
        'aria-labelledby': getTriggerId(props.value),
        role: 'tabpanel',
        'data-ownedby': getListId(),
        'data-selected': dataAttr(selected),
        'data-orientation': orientation,
        hidden: !selected,
      })
    },

    getIndicatorProps() {
      return normalize.element({
        id: getIndicatorId(),
        ...parts.indicator.attrs,
        dir: scope.dir,
        'data-orientation': orientation,
        style: {
          '--transition-property': 'left, right, top, bottom, width, height',
          '--left': indicatorRect?.left,
          '--top': indicatorRect?.top,
          '--width': indicatorRect?.width,
          '--height': indicatorRect?.height,
          position: 'absolute',
          willChange: 'var(--transition-property)',
          transitionProperty: 'var(--transition-property)',
          transitionDuration: indicatorTransition ? 'var(--transition-duration, 150ms)' : '0ms',
          transitionTimingFunction: 'var(--transition-timing-function)',
          [isHorizontal ? 'left' : 'top']: isHorizontal ? 'var(--left)' : 'var(--top)',
        },
      })
    },
  }
}

export interface UseTabsReturn {
  /**
   * The current value of the tabs.
   */
  value: string | null
  /**
   * The value of the tab that is currently focused.
   */
  focusedValue: string | null
  /**
   * Sets the value of the tabs.
   */
  setValue(value: string): void
  /**
   * Clears the value of the tabs.
   */
  clearValue(): void
  /**
   * Sets the indicator rect to the tab with the given value
   */
  setIndicatorRect(value: string): void
  /**
   * Synchronizes the tab index of the content element.
   * Useful when rendering tabs within a select or combobox
   */
  syncTabIndex(): void
  /**
   * Set focus on the selected tab trigger
   */
  focus(): void
  /**
   * Selects the next tab
   */
  selectNext(fromValue?: string): void
  /**
   * Selects the previous tab
   */
  selectPrev(fromValue?: string): void
  /**
   * Returns the state of the trigger with the given props
   */
  getTriggerState(props: TriggerProps): TriggerState

  getRootProps(): PropTypes['element']
  getListProps(): PropTypes['element']
  getTriggerProps(props: TriggerProps): PropTypes['button']
  getContentProps(props: ContentProps): PropTypes['element']
  getIndicatorProps(): PropTypes['element']
}

export interface ValueChangeDetails {
  value: string
}

export interface FocusChangeDetails {
  focusedValue: string
}

export interface NavigateDetails {
  value: string | null
  node: HTMLAnchorElement
}

export interface TriggerProps {
  /**
   * The value of the tab
   */
  value: string
  /**
   * Whether the tab is disabled
   */
  disabled?: boolean
}

export interface TriggerState {
  /**
   * Whether the tab is selected
   */
  selected: boolean
  /**
   * Whether the tab is focused
   */
  focused: boolean
  /**
   * Whether the tab is disabled
   */
  disabled: boolean
}

export interface ContentProps {
  /**
   * The value of the tab
   */
  value: string
}

interface IntlTranslations {
  listLabel?: string | undefined
}

type ElementIds = Partial<{
  root: string
  trigger: string
  list: string
  content: string
  indicator: string
}>

export interface UseTabsProps {
  /**
   * The id of the tabs
   */
  id?: string
  /**
   * The localized strings for accessibility
   */
  translations?: IntlTranslations
  /**
   * Whether keyboard navigation loops from last to first
   * @default true
   */
  loopFocus?: boolean
  /**
   * The selected tab value
   */
  value?: string | null
  /**
   * Default value for uncontrolled usage
   */
  defaultValue?: string | null
  /**
   * Tab orientation
   * @default "horizontal"
   */
  orientation?: 'horizontal' | 'vertical'
  /**
   * How tabs are activated
   * @default "automatic"
   */
  activationMode?: 'manual' | 'automatic'
  /**
   * Whether tabs use composite widget pattern
   * @default true
   */
  composite?: boolean
  /**
   * Whether active tab can be deselected
   */
  deselectable?: boolean
  /**
   * Called when selected tab changes
   */
  onValueChange?(details: ValueChangeDetails): void
  /**
   * Called when focused tab changes
   */
  onFocusChange?(details: FocusChangeDetails): void
  /**
   * Navigation handler for anchor tabs
   */
  navigate?(details: NavigateDetails): void
  /**
   * Custom ids for elements
   */
  ids?: ElementIds
}

type TabsState = 'idle' | 'focused'
type TabsContext = {
  indicatorRect: Partial<{ left: string; top: string; width: string; height: string }>
  indicatorTransition: boolean
  ssr: boolean
}

type TabsEvent =
  | { type: 'SET_VALUE'; value: string | null }
  | { type: 'CLEAR_VALUE' }
  | { type: 'SET_INDICATOR_RECT'; id: string }
  | { type: 'SYNC_TAB_INDEX' }
  | { type: 'TAB_FOCUS'; value: string | null; src?: string }
  | { type: 'TAB_CLICK'; value: string }
  | { type: 'TAB_BLUR' }
  | { type: 'ARROW_PREV'; key?: string; src?: string }
  | { type: 'ARROW_NEXT'; key?: string; src?: string }
  | { type: 'HOME' }
  | { type: 'END' }
  | { type: 'ENTER' }
