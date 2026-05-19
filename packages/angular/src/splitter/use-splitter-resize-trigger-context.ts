import { InjectionToken, type Signal, inject } from '@angular/core'
import type { SplitterResizeTriggerId, SplitterResizeTriggerState } from './splitter.types'

export interface ArkSplitterResizeTriggerContext {
  readonly id: Signal<SplitterResizeTriggerId>
  readonly disabled: Signal<boolean | undefined>
  readonly state: Signal<SplitterResizeTriggerState>
}

export const ARK_SPLITTER_RESIZE_TRIGGER_CONTEXT = new InjectionToken<ArkSplitterResizeTriggerContext>(
  'ARK_SPLITTER_RESIZE_TRIGGER_CONTEXT',
)

export function injectArkSplitterResizeTriggerContext(): ArkSplitterResizeTriggerContext {
  return inject(ARK_SPLITTER_RESIZE_TRIGGER_CONTEXT)
}
