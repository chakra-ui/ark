import type { SizerResizeDetails, UseSizerProps } from './use-sizer'

export interface RootProps extends UseSizerProps {}

export interface RootEmits {
  /**
   * Callback when the size changes
   */
  sizeChange: [details: SizerResizeDetails]
}
