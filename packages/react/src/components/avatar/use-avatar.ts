import { observeAttributes, observeChildren } from '@zag-js/dom-query'
import { normalizeProps as normalize } from '@zag-js/react'
import type { PropTypes } from '@zag-js/types'
import { callAll } from '../../utils/call-all'
import { useEvent } from '../../utils/use-event'
import { useSafeLayoutEffect } from '../../utils/use-safe-layout-effect'
import { useElementScope, useStateValue } from '../../utils/use-state-value'
import { avatarAnatomy } from './avatar.anatomy'

const parts = avatarAnatomy.build()

export function useAvatar(props: UseAvatarProps = {}): UseAvatarReturn {
  // State
  const state = useStateValue<AvatarState>('loading')

  // Dom utils
  const scope = useElementScope(props.id)
  const getRootId = () => props.ids?.root ?? `avatar:${scope.id}`
  const getImageId = () => props.ids?.image ?? `avatar:${scope.id}:image`
  const getFallbackId = () => props.ids?.fallback ?? `avatar:${scope.id}:fallback`
  const getRootEl = () => scope.getById<HTMLElement>(getRootId())
  const getImageEl = () => scope.getById<HTMLImageElement>(getImageId())

  // Actions
  const invokeOnLoad = useEvent(() => {
    props.onStatusChange?.({ status: 'loaded' })
  })

  const invokeOnError = useEvent(() => {
    props.onStatusChange?.({ status: 'error' })
  })

  const checkImageStatus = useEvent(() => {
    const imageEl = getImageEl()
    if (imageEl?.complete) {
      const hasLoaded = imageEl.naturalWidth !== 0 && imageEl.naturalHeight !== 0
      send({ type: hasLoaded ? 'IMG.LOADED' : 'IMG.ERROR', src: 'ssr' })
    }
  })

  // Activities
  const trackSrcChange = useEvent(() => {
    const imageEl = getImageEl()
    return observeAttributes(imageEl, {
      attributes: ['src', 'srcset'],
      callback() {
        send({ type: 'SRC.CHANGE' })
      },
    })
  })

  const trackImageRemoval = useEvent(() => {
    const rootEl = getRootEl()
    return observeChildren(rootEl, {
      callback(records) {
        const removedNodes = Array.from(records[0].removedNodes) as HTMLElement[]
        const removed = removedNodes.find(
          (node) =>
            node.nodeType === Node.ELEMENT_NODE &&
            node.matches('[data-scope=avatar][data-part=image]'),
        )
        if (removed) {
          send({ type: 'IMG.UNMOUNT' })
        }
      },
    })
  })

  // Sender
  const send = useEvent((event: AvatarEvent) => {
    switch (event.type) {
      case 'SRC.CHANGE': {
        state.set('loading')
        checkImageStatus()
        return
      }
      case 'SRC.SET': {
        const imageEl = getImageEl()
        if (imageEl) imageEl.src = event.value
        return
      }
      case 'IMG.UNMOUNT':
        state.set('error')
        return
      default:
        break
    }

    switch (state.ref.current) {
      case 'loading':
        switch (event.type) {
          case 'IMG.LOADED':
            state.set('loaded')
            invokeOnLoad()
            break
          case 'IMG.ERROR':
            state.set('error')
            invokeOnError()
            break
        }
        break

      case 'error':
        switch (event.type) {
          case 'IMG.LOADED':
            state.set('loaded')
            invokeOnLoad()
            break
        }
        break

      case 'loaded':
        switch (event.type) {
          case 'IMG.ERROR':
            state.set('error')
            invokeOnError()
            break
        }
        break
    }
  })

  // Setup activities
  useSafeLayoutEffect(callAll(trackSrcChange, trackImageRemoval), [])

  const loaded = state.matches('loaded')

  return {
    loaded,
    setSrc(src) {
      send({ type: 'SRC.SET', value: src })
    },
    setLoaded() {
      send({ type: 'IMG.LOADED', src: 'api' })
    },
    setError() {
      send({ type: 'IMG.ERROR', src: 'api' })
    },

    getRootProps: () =>
      normalize.element({
        ...parts.root.attrs,
        dir: scope.dir,
        id: getRootId(),
      }),

    getImageProps: () =>
      normalize.img({
        ...parts.image.attrs,
        hidden: !loaded,
        dir: scope.dir,
        id: getImageId(),
        'data-state': loaded ? 'visible' : 'hidden',
        onLoad() {
          send({ type: 'IMG.LOADED', src: 'element' })
        },
        onError() {
          send({ type: 'IMG.ERROR', src: 'element' })
        },
      }),

    getFallbackProps: () =>
      normalize.element({
        ...parts.fallback.attrs,
        dir: scope.dir,
        id: getFallbackId(),
        hidden: loaded,
        'data-state': loaded ? 'hidden' : 'visible',
      }),
  }
}

/* -----------------------------------------------------------------------------
 * Callback details
 * -----------------------------------------------------------------------------*/

export type LoadStatus = 'error' | 'loaded'

export interface StatusChangeDetails {
  status: LoadStatus
}

export type ElementIds = Partial<{
  root: string
  image: string
  fallback: string
}>

export interface UseAvatarProps {
  /**
   * The id of the avatar
   */
  id?: string
  /**
   * Function called when the image loading status changes.
   */
  onStatusChange?(details: StatusChangeDetails): void
  /**
   * Custom ids for elements
   */
  ids?: ElementIds
}

type AvatarEvent =
  | { type: 'SRC.CHANGE' }
  | { type: 'SRC.SET'; value: string }
  | { type: 'IMG.UNMOUNT' }
  | { type: 'IMG.LOADED'; src?: string }
  | { type: 'IMG.ERROR'; src?: string }

type AvatarState = 'loading' | 'error' | 'loaded'

export interface UseAvatarReturn {
  /**
   * Whether the image is loaded.
   */
  loaded: boolean
  /**
   * Function to set new src.
   */
  setSrc(src: string): void
  /**
   * Function to set loaded state.
   */
  setLoaded(): void
  /**
   * Function to set error state.
   */
  setError(): void

  getRootProps(): PropTypes['element']
  getImageProps(): PropTypes['img']
  getFallbackProps(): PropTypes['element']
}
