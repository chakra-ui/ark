import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  booleanAttribute,
  computed,
  forwardRef,
  inject,
  input,
  type InputSignal,
  type InputSignalWithTransform,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type { SplitterResizeTriggerId } from './splitter.types'
import { injectArkSplitterContext } from './use-splitter-context'
import {
  ARK_SPLITTER_RESIZE_TRIGGER_CONTEXT,
  type ArkSplitterResizeTriggerContext,
} from './use-splitter-resize-trigger-context'

@Directive({
  selector: '[arkSplitterResizeTrigger]',
  standalone: true,
  exportAs: 'arkSplitterResizeTrigger',
  providers: [
    {
      provide: ARK_SPLITTER_RESIZE_TRIGGER_CONTEXT,
      useFactory: (trigger: ArkSplitterResizeTrigger) => trigger.getResizeTriggerContext(),
      deps: [forwardRef(() => ArkSplitterResizeTrigger)],
    },
  ],
})
export class ArkSplitterResizeTrigger {
  /** The id of the resize trigger in the form "before:after". */
  readonly id: InputSignal<SplitterResizeTriggerId> = input.required<SplitterResizeTriggerId>()
  /** Whether the resize trigger is disabled. */
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })

  private readonly root = injectArkSplitterContext()
  private readonly resizeTriggerContext: ArkSplitterResizeTriggerContext = {
    id: computed(() => this.id()),
    disabled: computed(() => this.disabled()),
    state: computed(() => this.root.api().getResizeTriggerState({ id: this.id(), disabled: this.disabled() })),
  }

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () =>
        this.root.api().getResizeTriggerProps({
          id: this.id(),
          disabled: this.disabled(),
        }),
    })
  }

  /** @internal Exposed for indicator directives via ARK_SPLITTER_RESIZE_TRIGGER_CONTEXT. */
  getResizeTriggerContext(): ArkSplitterResizeTriggerContext {
    return this.resizeTriggerContext
  }
}
