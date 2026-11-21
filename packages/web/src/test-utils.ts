export function mount(example: (root: HTMLElement) => void) {
  const root = document.createElement('div')
  example(root)
  document.body.append(root)

  return root
}

interface ObserverStub {
  callback: IntersectionObserverCallback
  targets: Set<Element>
}

/** Fires the stubbed `IntersectionObserver` callbacks watching `target`. */
export function intersect(target: Element) {
  const instances = (IntersectionObserver as unknown as { instances: Set<ObserverStub> }).instances

  for (const observer of instances) {
    if (!observer.targets.has(target)) continue

    const entry = { isIntersecting: true, target } as IntersectionObserverEntry
    observer.callback([entry], observer as unknown as IntersectionObserver)
  }
}

/** Elements watched by the stubbed `IntersectionObserver`. */
export function observedTargets() {
  const instances = (IntersectionObserver as unknown as { instances: Set<ObserverStub> }).instances
  return Array.from(instances, (observer) => Array.from(observer.targets)).flat()
}
