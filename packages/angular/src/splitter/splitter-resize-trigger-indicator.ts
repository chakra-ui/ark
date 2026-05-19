import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkSplitterContext } from './use-splitter-context'
import { injectArkSplitterResizeTriggerContext } from './use-splitter-resize-trigger-context'

@Directive({
  selector: '[arkSplitterResizeTriggerIndicator]',
  standalone: true,
  exportAs: 'arkSplitterResizeTriggerIndicator',
})
export class ArkSplitterResizeTriggerIndicator {
  constructor() {
    const context = injectArkSplitterContext()
    const trigger = injectArkSplitterResizeTriggerContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () =>
        context.api().getResizeTriggerIndicator({
          id: trigger.id(),
          disabled: trigger.disabled(),
        }),
    })
  }
}
