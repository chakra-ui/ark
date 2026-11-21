import type * as scrollArea from '@zag-js/scroll-area'

export type Api = ReturnType<typeof scrollArea.connect>

type Orientation = NonNullable<scrollArea.ScrollbarProps['orientation']>

export const root = 'ark-scroll-area'

export const scrollbarTag = 'ark-scroll-area-scrollbar'

export const orientationOf = (el: Element | null | undefined): Orientation => {
  return el?.getAttribute('orientation') === 'horizontal' ? 'horizontal' : 'vertical'
}
