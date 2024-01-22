import type { AnatomyInstance } from '@ark-ui/anatomy'
import ResizeObserver from 'resize-observer-polyfill'

export const getParts = (anatomy: AnatomyInstance<string>) => {
  return Object.values(anatomy.build()).map(
    (x) => `[data-scope="${x.attrs['data-scope']}"][data-part="${x.attrs['data-part']}"]`,
  )
}

export const getExports = <T extends string>(anatomy: AnatomyInstance<T>) => {
  return anatomy.keys().map((x) => (x.charAt(0).toUpperCase() + x.slice(1)) as Capitalize<T>)
}

global.ResizeObserver = ResizeObserver
global.URL.createObjectURL = () => 'https://i.pravatar.cc/300'
global.Element.prototype.scrollIntoView = () => {
  // no-op
}
