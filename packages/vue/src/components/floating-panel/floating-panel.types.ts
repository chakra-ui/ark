import type * as floatingPanel from '@zag-js/floating-panel'
import type { Point, Size } from '@zag-js/types'

export interface RootProps {
  /**
   * Whether the panel should be strictly contained within the boundary when dragging
   * @default true
   */
  allowOverflow?: boolean
  /**
   * Whether the panel should close when the escape key is pressed
   */
  closeOnEscape?: boolean
  /**
   * The initial open state of the panel when rendered.
   * Use when you don't need to control the open state of the panel.
   * @default false
   */
  defaultOpen?: boolean
  /**
   * The initial position of the panel when rendered.
   * Use when you don't need to control the position of the panel.
   */
  defaultPosition?: Point
  /**
   * The default size of the panel
   */
  defaultSize?: Size
  /**
   * The document's text/writing direction.
   * @default "ltr"
   */
  dir?: 'ltr' | 'rtl'
  /**
   *  Whether the panel is disabled
   */
  disabled?: boolean
  /**
   * Whether the panel is draggable
   * @default true
   */
  draggable?: boolean
  /**
   * Function that returns the initial position of the panel when it is opened.
   * If provided, will be used instead of the default position.
   */
  getAnchorPosition?: (details: floatingPanel.AnchorPositionDetails) => Point
  /**
   * The boundary of the panel. Useful for recalculating the boundary rect when
   * the it is resized.
   */
  getBoundaryEl?: () => HTMLElement | null
  /**
   * The snap grid for the panel
   * @default 1
   */
  gridSize?: number
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the floating panel. Useful for composition.
   */
  ids?: Partial<{ trigger: string; positioner: string; content: string; title: string; header: string }>
  /**
   * Whether the panel is locked to its aspect ratio
   */
  lockAspectRatio?: boolean
  /**
   * The maximum size of the panel
   */
  maxSize?: Size
  /**
   * The minimum size of the panel
   */
  minSize?: Size
  /**
   * The controlled open state of the panel
   */
  open?: boolean
  /**
   * Whether the panel size and position should be preserved when it is closed
   */
  persistRect?: boolean
  /**
   * The controlled position of the panel
   */
  position?: Point
  /**
   * Whether the panel is resizable
   * @default true
   */
  resizable?: boolean
  /**
   * The size of the panel
   */
  size?: Size
  /**
   * The strategy to use for positioning
   * @default "absolute"
   */
  strategy?: 'absolute' | 'fixed'
  /**
   * The translations for the floating panel.
   */
  translations?: floatingPanel.IntlTranslations
}

export type RootEmits = {
  /**
   * Function called when the panel is opened or closed
   */
  openChange: [details: floatingPanel.OpenChangeDetails]
  /**
   * Function called when the panel is opened or closed
   */
  'update:open': [open: boolean]
  /**
   * Function called when the position of the panel changes via dragging
   */
  positionChange: [details: floatingPanel.PositionChangeDetails]
  /**
   * Function called when the position of the panel changes via dragging
   */
  'update:position': [details: floatingPanel.PositionChangeDetails['position']]
  /**
   * Function called when the position of the panel changes via dragging ends
   */
  positionChangeEnd: [details: floatingPanel.PositionChangeDetails]
  /**
   * Function called when the size of the panel changes via resizing
   */
  sizeChange: [details: floatingPanel.SizeChangeDetails]
  /**
   * Function called when the size of the panel changes via resizing
   */
  'update:size': [details: floatingPanel.SizeChangeDetails['size']]
  /**
   * Function called when the size of the panel changes via resizing ends
   */
  sizeChangeEnd: [details: floatingPanel.SizeChangeDetails]
  /**
   * Function called when the stage of the panel changes
   */
  stageChange: [details: floatingPanel.StageChangeDetails]
}
