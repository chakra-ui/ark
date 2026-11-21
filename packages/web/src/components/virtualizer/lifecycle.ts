interface VirtualizerLike {
  init: (scrollElement: HTMLElement) => void
  destroy: () => void
  getScrollHandler: () => (event: Event) => void
}

export interface VirtualizerLifecycle {
  /** Connects the virtualizer to its root element and returns a function that disconnects it. */
  attach: (scrollElement: HTMLElement) => VoidFunction
  /** Disconnects the virtualizer and releases its observers and timers. */
  destroy: VoidFunction
}

export function withLifecycle<T extends VirtualizerLike>(virtualizer: T): T & VirtualizerLifecycle {
  const destroyVirtualizer = virtualizer.destroy.bind(virtualizer)
  let detach: VoidFunction | undefined

  const attach = (scrollElement: HTMLElement) => {
    detach?.()

    const onScroll = virtualizer.getScrollHandler()
    scrollElement.addEventListener('scroll', onScroll, { passive: true })
    virtualizer.init(scrollElement)

    const cleanup = () => {
      if (detach !== cleanup) return
      detach = undefined
      scrollElement.removeEventListener('scroll', onScroll)
      destroyVirtualizer()
    }

    detach = cleanup
    return cleanup
  }

  const destroy = () => {
    if (detach) detach()
    else destroyVirtualizer()
  }

  return Object.assign(virtualizer, { attach, destroy })
}
