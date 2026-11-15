import type * as splitter from '@zag-js/splitter'

export interface RootProps {
  /**
   * The initial size of the panels when rendered.
   * Use when you don't need to control the size of the panels.
   */
  defaultSize?: splitter.PanelSize[]
  /**
   * Whether resizing is disabled for the whole splitter
   */
  disabled?: boolean
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the splitter. Useful for composition.
   */
  ids?: splitter.ElementIds
  /**
   * The percentage to resize the panel by when an arrow key is pressed.
   * @default 1
   */
  keyboardResizeBy?: number | null
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
   * The splitter registry to use for multi-drag support.
   * When provided, enables dragging at the intersection of multiple splitters.
   */
  registry?: splitter.SplitterRegistry
  /**
   * The controlled size data of the panels
   */
  size?: splitter.PanelSize[]
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
