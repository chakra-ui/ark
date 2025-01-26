import { getComputedStyle, getEventTarget, raf, setStyle } from '@zag-js/dom-query'
import { normalizeProps as normalize, type PropTypes } from '@zag-js/react'
import { useRef } from 'react'
import { flushSync } from 'react-dom'
import { callAll } from '../../utils/call-all'
import type { RenderStrategyProps } from '../../utils/render-strategy'
import { useEvent } from '../../utils/use-event'
import {
  useElementScope,
  useRefs,
  useStateEffect,
  useStateValue,
  useUnmount,
} from '../../utils/use-state-value'
import { useUpdateEffect } from '../../utils/use-update-effect'
import { collapsibleAnatomy } from './collapsible.anatomy'

const parts = collapsibleAnatomy.build()

export function useCollapsible(props: UseCollapsibleProps = {}): UseCollapsibleReturn {
  // Refs
  const refs = useRefs<CollapsibleRefs>({
    stylesRef: null,
    unmountAnimationName: null,
  })

  // State
  const state = useStateValue<CollapsibleState>(props.defaultOpen || props.open ? 'open' : 'closed')
  const initial = useStateValue(false)
  const dimensions = useStateValue({ height: 0, width: 0 })

  // Dom utils
  const scope = useElementScope(props.id)
  const getRootId = () => props.ids?.root ?? `collapsible:root:${scope.id}`
  const getContentId = () => props.ids?.content ?? `collapsible:content:${scope.id}`
  const getTriggerId = () => props.ids?.trigger ?? `collapsible:trigger:${scope.id}`
  const getContentEl = () => scope.getById(getContentId())

  // Actions
  const setInitial = useEvent(() => initial.set(true))
  const clearInitial = useEvent(() => raf(() => initial.set(false)))
  const cleanupNode = useEvent(() => refs.set({ stylesRef: null }))
  const invokeOnOpen = useEvent(() => props.onOpenChange?.({ open: true }))
  const invokeOnClose = useEvent(() => props.onOpenChange?.({ open: false }))
  const invokeOnExitComplete = useEvent(() => props.onExitComplete?.())
  const toggleVisibility = useEvent(() => {
    flushSync(() => {
      send({ type: props.open ? 'CONTROLLED.OPEN' : 'CONTROLLED.CLOSE' })
    })
  })

  const measureSize = useEvent(() => {
    const contentEl = getContentEl()
    if (!contentEl) return
    const rect = contentEl.getBoundingClientRect()
    flushSync(() => {
      dimensions.set({ height: rect.height, width: rect.width })
    })
  })

  const computeSize = useEvent(() => {
    refs.get('rafCleanup')?.()

    const cleanup = raf(() => {
      const contentEl = getContentEl()
      if (!contentEl) return

      if (!refs.get('stylesRef')) {
        refs.set({
          stylesRef: {
            animationName: contentEl.style.animationName,
            animationDuration: contentEl.style.animationDuration,
          },
        })
      }

      if (state.matches('closing') || !props.open) {
        refs.set({
          unmountAnimationName: getComputedStyle(contentEl).animationName,
        })
      }

      const hidden = contentEl.hidden

      contentEl.style.animationName = 'none'
      contentEl.style.animationDuration = '0s'
      contentEl.hidden = false

      const rect = contentEl.getBoundingClientRect()

      flushSync(() => {
        dimensions.set({ height: rect.height, width: rect.width })
      })

      if (initial.ref.current) {
        const stylesRef = refs.get('stylesRef')
        contentEl.style.animationName = stylesRef?.animationName ?? ''
        contentEl.style.animationDuration = stylesRef?.animationDuration ?? ''
      }

      contentEl.hidden = hidden
    })

    refs.set({ rafCleanup: cleanup })
  })

  // Activities
  const trackEnterAnimation = useEvent(() => {
    let cleanup: VoidFunction | undefined

    const rafCleanup = raf(() => {
      const contentEl = getContentEl()
      if (!contentEl) return

      const animationName = getComputedStyle(contentEl).animationName
      const hasNoAnimation = !animationName || animationName === 'none'

      if (hasNoAnimation) {
        send({ type: 'ANIMATION.END' })
        return
      }

      const onEnd = (event: AnimationEvent) => {
        const target = getEventTarget<Element>(event)
        if (target === contentEl) {
          send({ type: 'ANIMATION.END' })
        }
      }

      contentEl.addEventListener('animationend', onEnd)
      cleanup = () => contentEl.removeEventListener('animationend', onEnd)
    })

    return () => {
      rafCleanup()
      cleanup?.()
    }
  })

  const trackExitAnimation = useEvent(() => {
    let cleanup: VoidFunction | undefined

    const rafCleanup = raf(() => {
      const contentEl = getContentEl()
      if (!contentEl) return

      const animationName = getComputedStyle(contentEl).animationName
      const hasNoAnimation = !animationName || animationName === 'none'

      if (hasNoAnimation) {
        send({ type: 'ANIMATION.END' })
        return
      }

      const onEnd = (event: AnimationEvent) => {
        const target = getEventTarget<Element>(event)
        if (target === contentEl) {
          const animationName = getComputedStyle(contentEl).animationName
          if (animationName === refs.get('unmountAnimationName')) {
            send({ type: 'ANIMATION.END' })
          }
        }
      }

      contentEl.addEventListener('animationend', onEnd)
      const cleanupStyles = setStyle(contentEl, { animationFillMode: 'forwards' })

      cleanup = () => {
        contentEl.removeEventListener('animationend', onEnd)
        cleanupStyles()
      }
    })

    return () => {
      rafCleanup()
      cleanup?.()
    }
  })

  // Sender
  const send = useEvent((event: CollapsibleEvent) => {
    switch (state.ref.current) {
      case 'closed':
        switch (event.type) {
          case 'CONTROLLED.OPEN':
            state.set('open')
            break
          case 'OPEN':
            if (props.open !== undefined) {
              invokeOnOpen()
            } else {
              state.set('open')
              setInitial()
              computeSize()
              invokeOnOpen()
            }
            break
        }
        break

      case 'closing':
        switch (event.type) {
          case 'CONTROLLED.CLOSE':
            state.set('closed')
            break
          case 'CONTROLLED.OPEN':
            state.set('open')
            break
          case 'OPEN':
            if (props.open !== undefined) {
              invokeOnOpen()
            } else {
              state.set('open')
              setInitial()
              invokeOnOpen()
            }
            break
          case 'CLOSE':
            if (props.open !== undefined) {
              invokeOnExitComplete()
            } else {
              state.set('closed')
              setInitial()
              computeSize()
              invokeOnExitComplete()
            }
            break
          case 'ANIMATION.END':
            state.set('closed')
            invokeOnExitComplete()
            clearInitial()
            break
        }
        break

      case 'open':
        switch (event.type) {
          case 'CONTROLLED.CLOSE':
            state.set('closing')
            break
          case 'CLOSE':
            if (props.open !== undefined) {
              invokeOnClose()
            } else {
              state.set('closing')
              setInitial()
              computeSize()
              invokeOnClose()
            }
            break
          case 'SIZE.MEASURE':
            measureSize()
            break
          case 'ANIMATION.END':
            clearInitial()
            break
        }
        break
    }
  })

  // State watchers
  useStateEffect(state, 'open', trackEnterAnimation)
  useStateEffect(state, 'closing', trackExitAnimation)

  // Context watchers
  useUpdateEffect(callAll(setInitial, computeSize, toggleVisibility), [props.open])

  // Exit effects
  useUnmount(callAll(clearInitial, cleanupNode))

  const visible = state.matches('open', 'closing')
  const open = state.matches('open')
  const skip = !initial.value && open

  const wasVisible = useRef(false)
  if (visible) wasVisible.current = true
  const isUnmounted =
    (!visible && !wasVisible.current && props.lazyMount) ||
    (props.unmountOnExit && !visible && wasVisible.current)

  return {
    isUnmounted: !!isUnmounted,
    disabled: !!props.disabled,
    visible,
    open,
    measureSize() {
      send({ type: 'SIZE.MEASURE' })
    },
    setOpen(nextOpen) {
      if (nextOpen === open) return
      send({ type: nextOpen ? 'OPEN' : 'CLOSE' })
    },
    getRootProps: () =>
      normalize.element({
        ...parts.root.attrs,
        'data-state': open ? 'open' : 'closed',
        dir: scope.dir,
        id: getRootId(),
      }),
    getContentProps: () =>
      normalize.element({
        ...parts.content.attrs,
        'data-collapsible': '',
        'data-state': skip ? undefined : open ? 'open' : 'closed',
        id: getContentId(),
        'data-disabled': props.disabled ? '' : undefined,
        hidden: !visible,
        style: {
          '--height': px(dimensions.value.height),
          '--width': px(dimensions.value.width),
        },
      }),
    getTriggerProps: () =>
      normalize.button({
        ...parts.trigger.attrs,
        id: getTriggerId(),
        dir: scope.dir,
        type: 'button',
        'data-state': open ? 'open' : 'closed',
        'data-disabled': props.disabled ? '' : undefined,
        'aria-controls': getContentId(),
        'aria-expanded': visible || false,
        onClick(event) {
          if (event.defaultPrevented) return
          if (props.disabled) return
          send({ type: open ? 'CLOSE' : 'OPEN', src: 'trigger.click' })
        },
      }),
  }
}

const px = (v?: number) => (v != null ? `${v}px` : undefined)

export type ElementIds = Partial<{
  root: string
  content: string
  trigger: string
}>

export interface OpenChangeDetails {
  open: boolean
}

export interface UseCollapsibleProps extends RenderStrategyProps {
  /**
   * The id of the collapsible
   */
  id?: string | undefined
  /**
   * Whether the collapsible is open
   */
  open?: boolean | undefined
  /**
   * The initial open state of the collapsible when it is first rendered.
   * Use when you do not need to control its open state.
   */
  defaultOpen?: boolean | undefined
  /**
   * Whether the collapsible is disabled
   */
  disabled?: boolean | undefined
  /**
   * Callback when open state changes
   */
  onOpenChange?: ((details: OpenChangeDetails) => void) | undefined
  /**
   * Callback when exit animation completes
   */
  onExitComplete?: (() => void) | undefined
  /**
   * Custom ids for elements
   */
  ids?: ElementIds | undefined
}

type CollapsibleState = 'open' | 'closed' | 'closing'
type CollapsibleRefs = {
  stylesRef: { animationName: string; animationDuration: string } | null
  unmountAnimationName: string | null
  rafCleanup?: VoidFunction
}

type CollapsibleEvent =
  | { type: 'CONTROLLED.OPEN' }
  | { type: 'CONTROLLED.CLOSE' }
  | { type: 'OPEN'; src?: string }
  | { type: 'CLOSE'; src?: string }
  | { type: 'SIZE.MEASURE' }
  | { type: 'ANIMATION.END' }

export interface UseCollapsibleReturn {
  /**
   * Whether the collapsible is unmounted
   */
  isUnmounted: boolean
  /**
   * Whether the collapsible is open.
   */
  open: boolean
  /**
   * Whether the collapsible is visible (open or closing)
   */
  visible: boolean
  /**
   * Whether the collapsible is disabled
   */
  disabled: boolean
  /**
   * Function to open or close the collapsible.
   */
  setOpen(open: boolean): void
  /**
   * Function to measure the size of the content.
   */
  measureSize(): void

  getRootProps(): PropTypes['element']
  getTriggerProps(): PropTypes['button']
  getContentProps(): PropTypes['element']
}
