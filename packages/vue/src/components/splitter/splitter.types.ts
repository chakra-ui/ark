import type * as splitter from '@zag-js/splitter'

export interface RootProps {
  /**
   * The initial size of the panels when rendered.
   * Use when you don't need to control the size of the panels.
   */
  defaultSize?: number[]
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
   * The number of pixels to resize the panel by when the keyboard is used.
   */
  keyboardResizeBy?: number
  /**
   * The nonce for the injected splitter cursor stylesheet.
   */
  nonce?: string
  /**
   * The orientation of the splitter. Can be `horizontal` or `vertical`
   * @default "horizontal"
   */
  orientation?: 'horizontal' | 'vertical'
  /**
   * The size constraints of the panels.
   */
  panels: splitter.PanelData[]
  /**
   * The controlled size data of the panels
   */
  size?: number[]
}

export type RootEmits = {
  /**
   * Function called when a panel is collapsed.
   */
  collapse: [details: splitter.ExpandCollapseDetails]
  /**
   * Function called when a panel is expanded.
   */
  expand: [details: splitter.ExpandCollapseDetails]
  /**
   * Function called when the splitter is resized.
   */
  resize: [details: splitter.ResizeDetails]
  /**
   * Function called when the splitter resize ends.
   */
  resizeEnd: [details: splitter.ResizeEndDetails]
  /**
   * Function called when the splitter resize starts.
   */
  resizeStart: []
  /**
   * The callback fired when the model value changes.
   */
  'update:size': [size: number[]]
}
