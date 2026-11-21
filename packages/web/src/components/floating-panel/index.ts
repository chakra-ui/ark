import type { CallbackEvents, FunctionProperties } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/floating-panel'
import type { ActionMethods, RootElement, StateProperties } from '../../utils/define.js'
import type {
  FloatingPanelBody,
  FloatingPanelCloseTrigger,
  FloatingPanelContent,
  FloatingPanelControl,
  FloatingPanelDragTrigger,
  FloatingPanelHeader,
  FloatingPanelPositioner,
  FloatingPanelResizeTrigger,
  FloatingPanelStageTrigger,
  FloatingPanelTitle,
  FloatingPanelTrigger,
} from './parts.js'

export type { Api as FloatingPanelApi } from '@zag-js/floating-panel'
export interface FloatingPanelElement
  extends
    ActionMethods<Api, 'minimize' | 'maximize' | 'restore'>,
    RootElement<Api, Props>,
    FunctionProperties<Props>,
    Pick<
      Props,
      'ids' | 'translations' | 'size' | 'defaultSize' | 'minSize' | 'maxSize' | 'position' | 'defaultPosition'
    >,
    StateProperties<Props, 'open'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-floating-panel': FloatingPanelElement
    'ark-floating-panel-trigger': InstanceType<typeof FloatingPanelTrigger>
    'ark-floating-panel-positioner': InstanceType<typeof FloatingPanelPositioner>
    'ark-floating-panel-content': InstanceType<typeof FloatingPanelContent>
    'ark-floating-panel-drag-trigger': InstanceType<typeof FloatingPanelDragTrigger>
    'ark-floating-panel-header': InstanceType<typeof FloatingPanelHeader>
    'ark-floating-panel-title': InstanceType<typeof FloatingPanelTitle>
    'ark-floating-panel-control': InstanceType<typeof FloatingPanelControl>
    'ark-floating-panel-body': InstanceType<typeof FloatingPanelBody>
    'ark-floating-panel-close-trigger': InstanceType<typeof FloatingPanelCloseTrigger>
    'ark-floating-panel-stage-trigger': InstanceType<typeof FloatingPanelStageTrigger>
    'ark-floating-panel-resize-trigger': InstanceType<typeof FloatingPanelResizeTrigger>
  }
}

export type FloatingPanelEventMap = CallbackEvents<Props>
