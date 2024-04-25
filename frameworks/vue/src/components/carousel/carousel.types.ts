import type * as carousel from '@zag-js/carousel'

export interface RootProps {
  /**
   * The alignment of the slides in the carousel.
   */
  align?: 'start' | 'center' | 'end'
  /**
   * The document's text/writing direction.
   * @default "ltr"
   */
  dir?: 'ltr' | 'rtl'
  /**
   * A root node to correctly resolve document in custom environments. E.x.: Iframes, Electron.
   */
  getRootNode?: () => ShadowRoot | Node | Document
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the carousel. Useful for composition.
   */
  ids?: Partial<{
    root: string
    viewport: string
    slide(index: number): string
    slideGroup: string
    nextSlideTrigger: string
    prevSlideTrigger: string
    indicatorGroup: string
    indicator(index: number): string
  }>
  /**
   * The current slide index.
   */
  index?: number
  /**
   * Whether the carousel should loop around.
   */
  loop?: boolean
  /**
   * The orientation of the carousel.
   * @default "horizontal"
   */
  orientation?: 'horizontal' | 'vertical'
  /**
   * The number of slides to show at a time.
   */
  slidesPerView?: number | 'auto'
  /**
   * The amount of space between slides.
   */
  spacing?: string
}

export type RootEmits = {
  /**
   * Function called when the slide changes.
   */
  indexChange: [details: carousel.SlideChangeDetails]
}
