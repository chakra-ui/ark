import type * as splitter from '@zag-js/splitter'

export interface SplitterRootProps {
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
   * The ids of the elements in the splitter. Useful for composition.
   */
  ids?: Partial<{
    root: string
    resizeTrigger(id: string): string
    label(id: string): string
    panel(id: string | number): string
  }>
  /**
   * The orientation of the splitter. Can be `horizontal` or `vertical`
   */
  orientation?: 'horizontal' | 'vertical'
  /**
   * The size data of the panels
   */
  size?: splitter.PanelSizeData[]
}

export type SplitterRootEmits = {
  /**
   * Function called when the splitter is resized.
   */
  sizeChange: [details: splitter.SizeChangeDetails]
  /**
   * Function called when the splitter resize ends.
   */
  sizeChangeEnd: [details: splitter.SizeChangeDetails]
}
