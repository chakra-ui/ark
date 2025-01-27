import { getComputedStyle, getEventTarget, raf, setStyle } from '@zag-js/dom-query'
import type { PropTypes } from '@zag-js/react'
import * as React from 'react'
import { callAll } from '../../utils/call-all'
import { flush } from '../../utils/flush'
import type { RenderStrategyProps } from '../../utils/render-strategy'
import { useEvent } from '../../utils/use-event'
import { useRefs, useStateEffect, useStateValue, useUnmount } from '../../utils/use-state-value'
import { useUpdateEffect } from '../../utils/use-update-effect'

export function usePresence(props: UsePresenceProps = {}): UsePresenceReturn {
  // Refs
  const refs = useRefs<PresenceRefs>({
    node: null,
    styles: null,
    unmountAnimationName: null,
    prevAnimationName: null,
  })

  // State
  const state = useStateValue<PresenceState>(props.present ? 'mounted' : 'unmounted')

  // Context
  const ctx = useStateValue({ initial: false })

  // Actions
  const setInitial = useEvent(() => ctx.set({ initial: true }))
  const clearInitial = useEvent(() => ctx.set({ initial: false }))
  const cleanupNode = useEvent(() => {
    refs.set({ node: null, styles: null })
  })
  const invokeOnExitComplete = useEvent(() => props.onExitComplete?.())
  const setPrevAnimationName = useEvent(() => {
    const exec = props.immediate ? flush : raf
    exec(() => {
      refs.set({ prevAnimationName: getAnimationName(refs.get('styles')) })
    })
  })
  const clearPrevAnimationName = useEvent(() => {
    refs.set({ prevAnimationName: null })
  })
  const syncPresence = useEvent(() => {
    const node = refs.get('node')

    if (props.present) {
      return send({ type: 'MOUNT', src: 'presence.changed' })
    }

    if (!props.present && node?.ownerDocument.visibilityState === 'hidden') {
      return send({ type: 'UNMOUNT', src: 'visibilitychange' })
    }

    const exec = props.immediate ? flush : raf

    exec(() => {
      const styles = refs.get('styles')
      const animationName = getAnimationName(styles)
      refs.set({ unmountAnimationName: animationName })
      if (
        animationName === 'none' ||
        animationName === refs.get('prevAnimationName') ||
        styles?.display === 'none' ||
        styles?.animationDuration === '0s'
      ) {
        send({ type: 'UNMOUNT', src: 'presence.changed' })
      } else {
        send({ type: 'UNMOUNT.SUSPEND' })
      }
    })
  })

  // Activities
  const trackAnimationEvents = useEvent(() => {
    const node = refs.get('node')
    if (!node) return

    const onStart = (event: AnimationEvent) => {
      const target = getEventTarget(event)
      if (target === node) {
        const animationName = getAnimationName(refs.get('styles'))
        refs.set({ prevAnimationName: animationName })
      }
    }

    const onEnd = (event: AnimationEvent) => {
      const animationName = getAnimationName(refs.get('styles'))
      const target = getEventTarget(event)
      if (target === node && animationName === refs.get('unmountAnimationName')) {
        send({ type: 'UNMOUNT' })
      }
    }

    node.addEventListener('animationstart', onStart)
    node.addEventListener('animationcancel', onEnd)
    node.addEventListener('animationend', onEnd)
    const cleanupStyles = setStyle(node, { animationFillMode: 'forwards' })

    return () => {
      node.removeEventListener('animationstart', onStart)
      node.removeEventListener('animationcancel', onEnd)
      node.removeEventListener('animationend', onEnd)
      cleanupStyles()
    }
  })
  const waitForAnimationEnd = useEvent(() => {
    const ms = getAnimationDuration(refs.get('styles'))
    const id = setTimeout(() => send({ type: 'UNMOUNT' }), ms)
    return () => clearTimeout(id)
  })

  // Sender
  const send = useEvent((event: PresenceEvent) => {
    if (event.type === 'NODE.SET') {
      refs.set({ node: event.node, styles: getComputedStyle(event.node) })
      return
    }

    switch (state.ref.current) {
      case 'mounted':
        switch (event.type) {
          case 'UNMOUNT': {
            state.set('unmounted')
            invokeOnExitComplete()
            break
          }
          case 'UNMOUNT.SUSPEND': {
            state.set('unmountSuspended')
            break
          }
        }
        break
      case 'unmountSuspended':
        switch (event.type) {
          case 'UNMOUNT': {
            state.set('unmounted')
            invokeOnExitComplete()
            break
          }
          case 'MOUNT': {
            state.set('mounted')
            setPrevAnimationName()
            break
          }
        }
        break
      case 'unmounted':
        switch (event.type) {
          case 'MOUNT': {
            state.set('mounted')
            setPrevAnimationName()
            break
          }
        }
        break
    }
  })

  // State Watchers
  useStateEffect(state, 'unmountSuspended', callAll(trackAnimationEvents, waitForAnimationEnd))
  useStateEffect(state, 'unmounted', clearPrevAnimationName)

  // Context watchers
  useUpdateEffect(callAll(setInitial, syncPresence), [props.present])

  // Exit effects
  useUnmount(callAll(clearInitial, cleanupNode))

  const present = state.matches('mounted', 'unmountSuspended')

  const api: PresenceApi = {
    skip: !ctx.get('initial') && present,
    present,
    setNode(node: HTMLElement | null) {
      if (!node) return
      send({ type: 'NODE.SET', node })
    },
    unmount() {
      send({ type: 'UNMOUNT' })
    },
  }

  // Render strategy
  const wasEverPresent = React.useRef(false)
  if (api.present) wasEverPresent.current = true
  const unmounted =
    (!api.present && !wasEverPresent.current && props.lazyMount) ||
    (props.unmountOnExit && !api.present && wasEverPresent.current)

  const getPresenceProps = () => ({
    'data-state': props.present ? 'open' : 'closed',
    hidden: !api.present,
  })

  return {
    ref: api.setNode,
    getPresenceProps,
    present: !!api.present,
    unmounted: !!unmounted,
  }
}

function getAnimationName(styles?: CSSStyleDeclaration | null) {
  return styles?.animationName || 'none'
}

function parseMs(value: string | undefined) {
  return Number.parseFloat(value || '0') * 1000
}

// Extra frame margin to account for event loop slowdowns
const ANIMATION_TIMEOUT_MARGIN = 16.667
function getAnimationDuration(styles?: CSSStyleDeclaration | null) {
  return (
    parseMs(styles?.animationDuration) + parseMs(styles?.animationDelay) + ANIMATION_TIMEOUT_MARGIN
  )
}

interface PresenceApi {
  /**
   * Whether the animation should be skipped.
   */
  skip: boolean
  /**
   * Whether the node is present in the DOM.
   */
  present?: boolean
  /**
   * Function to set the node (as early as possible)
   */
  setNode(node: HTMLElement | null): void
  /**
   * Function to programmatically unmount the node
   */
  unmount(): void
}

export interface UsePresenceProps extends RenderStrategyProps {
  /**
   * Whether the node is present (controlled by the user)
   */
  present?: boolean
  /**
   * Function called when the animation ends in the closed state
   */
  onExitComplete?(): void
  /**
   * Whether to synchronize the present change immediately or defer it to the next frame
   */
  immediate?: boolean | undefined
}

type PresenceState = 'mounted' | 'unmountSuspended' | 'unmounted'
type PresenceRefs = {
  node: HTMLElement | null
  styles: CSSStyleDeclaration | null
  unmountAnimationName: string | null
  prevAnimationName: string | null
}
type PresenceEvent =
  | { type: 'NODE.SET'; node: HTMLElement }
  | { type: 'UNMOUNT'; src?: string }
  | { type: 'UNMOUNT.SUSPEND' }
  | { type: 'MOUNT'; src?: string }

export type UsePresenceReturn = {
  /**
   * Ref to set the node (as early as possible)
   */
  ref: React.RefCallback<HTMLElement | null>
  /**
   * Whether the node is present in the DOM
   */
  present: boolean
  /**
   * Whether the node is unmounted
   */
  unmounted: boolean
  /**
   * Props to set the node
   */
  getPresenceProps: () => PropTypes['element']
}
