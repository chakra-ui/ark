import type * as splitter from '@zag-js/splitter'

export interface RootProps {
  /**
   * The initial size of the panels when rendered.
   * Use when you don't need to control the size of the panels.
   */
  defaultSize?: splitter.PanelSizeData[]
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
   * @default "horizontal"
   */
  orientation?: 'horizontal' | 'vertical'
  /**
   * The controlled size data of the panels
   */
  size?: splitter.PanelSizeData[]
}

export type RootEmits = {
  /**
   * Function called when the splitter is resized.
   */
  sizeChange: [details: splitter.SizeChangeDetails]
  /**
   * Function called when the splitter resize ends.
   */
  sizeChangeEnd: [details: splitter.SizeChangeDetails]
  /**
   * The callback fired when the model value changes.
   */
  'update:size': [size: splitter.PanelSizeData[]]
}
