import { addDomEvent, dataAttr, getOverflowAncestors, isComposingEvent } from '@zag-js/dom-query'
import { isFocusVisible, trackFocusVisible } from '@zag-js/focus-visible'
import type { Placement, PositioningOptions } from '@zag-js/popper'
import { getPlacement, getPlacementStyles } from '@zag-js/popper'
import { normalizeProps as normalize } from '@zag-js/react'
import { callAll } from '../../utils/call-all'
import { useEvent } from '../../utils/use-event'
import { useSafeLayoutEffect } from '../../utils/use-safe-layout-effect'
import { useElementScope, useStateEffect, useStateValue } from '../../utils/use-state-value'
import { useUpdateEffect } from '../../utils/use-update-effect'
import { tooltipAnatomy } from './tooltip.anatomy'

export interface UseTooltipProps {
  id?: string
  openDelay?: number
  closeDelay?: number
  closeOnPointerDown?: boolean
  closeOnEscape?: boolean
  closeOnScroll?: boolean
  closeOnClick?: boolean
  interactive?: boolean
  onOpenChange?(details: { open: boolean }): void
  'aria-label'?: string
  positioning?: PositioningOptions
  disabled?: boolean
  open?: boolean
  defaultOpen?: boolean
  ids?: {
    trigger?: string
    content?: string
    arrow?: string
    positioner?: string
  }
}

type TooltipState = 'opening' | 'open' | 'closing' | 'closed'
type TooltipRefs = {
  currentPlacement?: Placement
  hasPointerMoveOpened: boolean
}
type TooltipEvent =
  | { type: 'CONTROLLED.OPEN' | 'CONTROLLED.CLOSE'; previousEvent?: TooltipEvent | null }
  | { type: 'POINTER_MOVE' | 'POINTER_LEAVE' | 'CONTENT.POINTER_MOVE' | 'CONTENT.POINTER_LEAVE' }
  | { type: 'OPEN' | 'CLOSE'; src?: string }
  | { type: 'POSITIONING.SET'; options?: Partial<PositioningOptions> }

const store = {
  id: null as string | null,
  prevId: null as string | null,
  listeners: new Set<() => void>(),
  subscribe(listener: () => void) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  },
  getSnapshot() {
    return { id: this.id, prevId: this.prevId }
  },
  setId(val: string | null) {
    if (val === store.id) return
    this.prevId = this.id
    this.id = val
    for (const listener of this.listeners) {
      listener()
    }
  },
}

const parts = tooltipAnatomy.build()

export function useTooltip(props: UseTooltipProps = {}) {
  const {
    openDelay = 1000,
    closeDelay = 500,
    closeOnPointerDown = true,
    closeOnEscape = true,
    closeOnScroll = true,
    closeOnClick = true,
    interactive = false,
    disabled = false,
    positioning = { placement: 'bottom' },
  } = props

  // Context
  const ctx = useStateValue<TooltipRefs>({
    currentPlacement: undefined,
    hasPointerMoveOpened: false,
  })

  // State
  const state = useStateValue<TooltipState>(props.defaultOpen || props.open ? 'open' : 'closed')
  const hasAriaLabel = !!props['aria-label']
  const _event = useStateValue<TooltipEvent | null>(null)

  // Dom utils
  const scope = useElementScope(props.id)
  const getTriggerId = () => props.ids?.trigger ?? `tooltip:${scope.id}:trigger`
  const getContentId = () => props.ids?.content ?? `tooltip:${scope.id}:content`
  const getArrowId = () => props.ids?.arrow ?? `tooltip:${scope.id}:arrow`
  const getPositionerId = () => props.ids?.positioner ?? `tooltip:${scope.id}:positioner`
  const getTriggerEl = () => scope.getById(getTriggerId())
  const getPositionerEl = () => scope.getById(getPositionerId())

  // Actions
  const setGlobalId = useEvent(() => {
    store.setId(scope.id)
  })
  const clearGlobalId = useEvent(() => {
    if (scope.id === store.id) {
      store.setId(null)
    }
  })
  const invokeOnOpen = useEvent(() => {
    props.onOpenChange?.({ open: true })
  })
  const invokeOnClose = useEvent(() => {
    props.onOpenChange?.({ open: false })
  })
  const closeIfDisabled = useEvent(() => {
    if (!disabled) return
    send({ type: 'CLOSE', src: 'disabled.change' })
  })
  const setOpen = useEvent((nextOpen: boolean) => {
    const open = state.matches('open', 'closing')
    if (nextOpen === open) return
    state.set(nextOpen ? 'open' : 'closed')
    props.onOpenChange?.({ open: nextOpen })
  })
  const toggleVisibility = useEvent(() => {
    queueMicrotask(() => {
      send({
        type: props.open ? 'CONTROLLED.OPEN' : 'CONTROLLED.CLOSE',
        previousEvent: _event.previousValue,
      })
    })
  })
  const setPointerMoveOpened = useEvent(() => {
    ctx.set({ hasPointerMoveOpened: true })
  })
  const clearPointerMoveOpened = useEvent(() => {
    ctx.set({ hasPointerMoveOpened: false })
  })
  const reposition = useEvent((options: Partial<PositioningOptions> = {}) => {
    const triggerEl = getTriggerEl()
    const positionerEl = getPositionerEl()
    if (!triggerEl || !positionerEl) return
    getPlacement(triggerEl, positionerEl, {
      ...positioning,
      ...options,
      defer: true,
      listeners: false,
      onComplete(data) {
        ctx.set({ currentPlacement: data.placement })
      },
    })
  })

  // Activities
  const trackFocusVisibleFn = useEvent(() => {
    return trackFocusVisible({ root: scope.getRootNode() })
  })
  const trackPositioning = useEvent(() => {
    if (!ctx.get('currentPlacement')) {
      ctx.set({ currentPlacement: props.positioning?.placement })
    }
    return getPlacement(getTriggerEl, getPositionerEl, {
      ...props.positioning,
      defer: true,
      onComplete(data) {
        ctx.set({ currentPlacement: data.placement })
      },
    })
  })
  const trackPointerlockChange = useEvent(() => {
    const onChange = () => send({ type: 'CLOSE', src: 'pointerlock:change' })
    return addDomEvent(scope.getDoc(), 'pointerlockchange', onChange, false)
  })
  const trackScroll = useEvent(() => {
    if (!closeOnScroll) return

    const triggerEl = getTriggerEl()
    if (!triggerEl) return

    const overflowParents = getOverflowAncestors(triggerEl)

    const cleanups = overflowParents.map((overflowParent) => {
      const onScroll = () => {
        send({ type: 'CLOSE', src: 'scroll' })
      }
      return addDomEvent(overflowParent, 'scroll', onScroll, { passive: true, capture: true })
    })

    return callAll(...cleanups)
  })
  const trackStore = useEvent(() => {
    return store.subscribe(() => {
      if (store.id !== scope.id) {
        send({ type: 'CLOSE', src: 'id.change' })
      }
    })
  })
  const trackEscapeKey = useEvent(() => {
    if (!closeOnEscape) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (isComposingEvent(event)) return
      if (event.key !== 'Escape') return
      event.stopPropagation()
      send({ type: 'CLOSE', src: 'keydown.escape' })
    }

    return addDomEvent(scope.getDoc(), 'keydown', onKeyDown, true)
  })

  // Guards
  const isOpenControlled = () => props.open !== undefined
  const noVisibleTooltip = () => store.id == null
  const hasPointerMoveOpened = () => ctx.get('hasPointerMoveOpened')
  const isVisible = () => store.id === scope.id

  // Sender
  const send = useEvent((event: TooltipEvent) => {
    _event.set(event)
    switch (state.ref.current) {
      case 'closed': {
        switch (event.type) {
          case 'CONTROLLED.OPEN':
            state.set('open')
            break
          case 'OPEN': {
            if (isOpenControlled()) {
              invokeOnOpen()
            } else {
              state.set('open')
              invokeOnOpen()
            }
            break
          }
          case 'POINTER_LEAVE':
            clearPointerMoveOpened()
            break
          case 'POINTER_MOVE': {
            if (noVisibleTooltip() && !hasPointerMoveOpened()) {
              state.set('opening')
            } else if (!hasPointerMoveOpened()) {
              state.set('open')
              setPointerMoveOpened()
              invokeOnOpen()
            }
            break
          }
        }
        break
      }

      case 'opening': {
        switch (event.type) {
          case 'CONTROLLED.OPEN':
            state.set('open')
            break
          case 'CONTROLLED.CLOSE':
            state.set('closed')
            break
          case 'OPEN': {
            if (isOpenControlled()) {
              invokeOnOpen()
            } else {
              state.set('open')
              invokeOnOpen()
            }
            break
          }
          case 'POINTER_LEAVE': {
            if (isOpenControlled()) {
              clearPointerMoveOpened()
              invokeOnClose()
              toggleVisibility()
            } else {
              state.set('closed')
              clearPointerMoveOpened()
              invokeOnClose()
            }
            break
          }
          case 'CLOSE': {
            if (isOpenControlled()) {
              invokeOnClose()
              toggleVisibility()
            } else {
              state.set('closed')
              invokeOnClose()
            }
            break
          }
        }
        break
      }

      case 'open': {
        switch (event.type) {
          case 'CONTROLLED.CLOSE':
            state.set('closed')
            break
          case 'CLOSE': {
            if (isOpenControlled()) {
              invokeOnClose()
            } else {
              state.set('closed')
              invokeOnClose()
            }
            break
          }
          case 'POINTER_LEAVE': {
            if (isVisible()) {
              state.set('closing')
              clearPointerMoveOpened()
            } else if (isOpenControlled()) {
              clearPointerMoveOpened()
              invokeOnClose()
            } else {
              state.set('closed')
              clearPointerMoveOpened()
              invokeOnClose()
            }
            break
          }
          case 'CONTENT.POINTER_LEAVE': {
            if (interactive) {
              state.set('closing')
            }
            break
          }
          case 'POSITIONING.SET': {
            reposition(event.options)
            break
          }
        }
        break
      }

      case 'closing': {
        switch (event.type) {
          case 'CONTROLLED.CLOSE':
            state.set('closed')
            break
          case 'CONTROLLED.OPEN':
            state.set('open')
            break
          case 'CLOSE': {
            if (isOpenControlled()) {
              invokeOnClose()
            } else {
              state.set('closed')
              invokeOnClose()
            }
            break
          }
          case 'POINTER_MOVE': {
            if (isOpenControlled()) {
              setPointerMoveOpened()
              invokeOnOpen()
              toggleVisibility()
            } else {
              state.set('open')
              setPointerMoveOpened()
              invokeOnOpen()
            }
            break
          }
          case 'CONTENT.POINTER_MOVE': {
            if (interactive) {
              state.set('open')
            }
            break
          }
          case 'POSITIONING.SET': {
            reposition(event.options)
            break
          }
        }
        break
      }
    }
  })
  const waitForOpenDelay = useEvent(() => {
    const id = setTimeout(() => {
      if (isOpenControlled()) {
        setPointerMoveOpened()
        invokeOnOpen()
      } else {
        state.set('open')
        setPointerMoveOpened()
        invokeOnOpen()
      }
    }, openDelay)
    return () => clearTimeout(id)
  })
  const waitForCloseDelay = useEvent(() => {
    const id = setTimeout(() => {
      if (isOpenControlled()) {
        invokeOnClose()
      } else {
        state.set('closed')
        invokeOnClose()
      }
    }, closeDelay)
    return () => clearTimeout(id)
  })

  // State Effects
  useSafeLayoutEffect(callAll(trackFocusVisibleFn, trackStore), [])

  useStateEffect(state, 'closed', clearGlobalId)
  useStateEffect(
    state,
    'opening',
    callAll(trackScroll, trackPointerlockChange, waitForOpenDelay, setGlobalId),
  )
  useStateEffect(
    state,
    'open',
    callAll(trackEscapeKey, trackScroll, trackPointerlockChange, trackPositioning, setGlobalId),
  )
  useStateEffect(state, 'closing', callAll(trackPositioning, waitForCloseDelay))

  // Context watchers
  useUpdateEffect(toggleVisibility, [props.open])
  useUpdateEffect(closeIfDisabled, [disabled])

  // External API
  const popperStyles = getPlacementStyles({
    ...positioning,
    placement: ctx.get('currentPlacement'),
  })

  const open = state.matches('open', 'closing')

  return {
    open,
    setOpen,
    reposition,

    getTriggerProps: () =>
      normalize.button({
        ...parts.trigger.attrs,
        id: getTriggerId(),
        dir: scope.dir,
        'data-expanded': dataAttr(open),
        'data-state': open ? 'open' : 'closed',
        'aria-describedby': open ? getContentId() : undefined,
        onClick(event) {
          if (event.defaultPrevented) return
          if (disabled) return
          if (!closeOnClick) return
          send({ type: 'CLOSE', src: 'trigger.click' })
        },
        onFocus(event) {
          if (event.defaultPrevented) return
          if (disabled) return
          // @ts-ignore
          if (event.src === 'trigger.pointerdown') return
          if (!isFocusVisible()) return
          send({ type: 'OPEN', src: 'trigger.focus' })
        },
        onBlur(event) {
          if (event.defaultPrevented) return
          if (disabled) return
          if (scope.id === store.id) {
            send({ type: 'CLOSE', src: 'trigger.blur' })
          }
        },
        onPointerDown(event) {
          if (event.defaultPrevented) return
          if (disabled) return
          if (!closeOnPointerDown) return
          if (scope.id === store.id) {
            send({ type: 'CLOSE', src: 'trigger.pointerdown' })
          }
        },
        onPointerMove(event) {
          if (event.defaultPrevented) return
          if (disabled) return
          if (event.pointerType === 'touch') return
          send({ type: 'POINTER_MOVE' })
        },
        onPointerLeave() {
          if (disabled) return
          send({ type: 'POINTER_LEAVE' })
        },
        onPointerCancel() {
          if (disabled) return
          send({ type: 'POINTER_LEAVE' })
        },
      }),

    getArrowProps: () =>
      normalize.element({
        id: getArrowId(),
        ...parts.arrow.attrs,
        dir: scope.dir,
        style: popperStyles.arrow,
      }),

    getArrowTipProps: () =>
      normalize.element({
        ...parts.arrowTip.attrs,
        dir: scope.dir,
        style: popperStyles.arrowTip,
      }),

    getPositionerProps: () =>
      normalize.element({
        id: getPositionerId(),
        ...parts.positioner.attrs,
        dir: scope.dir,
        style: popperStyles.floating,
      }),

    getContentProps: () =>
      normalize.element({
        ...parts.content.attrs,
        dir: scope.dir,
        hidden: !open,
        'data-state': open ? 'open' : 'closed',
        role: hasAriaLabel ? undefined : 'tooltip',
        id: hasAriaLabel ? undefined : getContentId(),
        'data-placement': ctx.get('currentPlacement'),
        onPointerEnter() {
          send({ type: 'CONTENT.POINTER_MOVE' })
        },
        onPointerLeave() {
          send({ type: 'CONTENT.POINTER_LEAVE' })
        },
        style: {
          pointerEvents: interactive ? 'auto' : 'none',
        },
      }),
  }
}

export type UseTooltipReturn = ReturnType<typeof useTooltip>
