import type * as scrollArea from '@zag-js/scroll-area'
import type { PropTypes as ZagPropTypes } from '@zag-js/types'

type AngularPropTypes = ZagPropTypes<Record<string, unknown>>

export type ScrollAreaApi = scrollArea.Api<AngularPropTypes>
export type ScrollAreaElementIds = scrollArea.ElementIds
export type ScrollAreaMachine = scrollArea.Machine
export type ScrollAreaMachineProps = scrollArea.Props
export type ScrollAreaScrollEasingFunction = scrollArea.ScrollEasingFunction
export type ScrollAreaScrollRecord<T> = scrollArea.ScrollRecord<T>
export type ScrollAreaScrollbarEasing = scrollArea.ScrollbarEasing
export type ScrollAreaScrollbarHiddenState = scrollArea.ScrollbarHiddenState
export type ScrollAreaScrollbarProps = scrollArea.ScrollbarProps
export type ScrollAreaScrollbarState = scrollArea.ScrollbarState
export type ScrollAreaScrollToDetails = scrollArea.ScrollToDetails
export type ScrollAreaScrollToEdge = scrollArea.ScrollToEdge
export type ScrollAreaScrollToEdgeDetails = scrollArea.ScrollToEdgeDetails
export type ScrollAreaService = scrollArea.Service
export type ScrollAreaThumbProps = scrollArea.ThumbProps
