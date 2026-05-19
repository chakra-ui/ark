import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  computed,
  forwardRef,
  inject,
  input,
  type InputSignal,
  type Signal,
} from '@angular/core'
import type * as splitter from '@zag-js/splitter'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { ARK_SPLITTER_CONTEXT } from './use-splitter-context'
import type { UseSplitterReturn } from './use-splitter'

@Directive({
  selector: '[arkSplitterRootProvider]',
  standalone: true,
  exportAs: 'arkSplitterRootProvider',
  providers: [{ provide: ARK_SPLITTER_CONTEXT, useExisting: forwardRef(() => ArkSplitterRootProvider) }],
})
export class ArkSplitterRootProvider implements UseSplitterReturn {
  /** The splitter machine returned by useSplitter(). */
  readonly value: InputSignal<UseSplitterReturn> = input.required<UseSplitterReturn>()
  readonly state: Signal<splitter.Service['state']> = computed(() => this.value().state())
  readonly api: Signal<splitter.Api> = computed(() => this.value().api())
  readonly send: splitter.Service['send'] = (event) => this.value().send(event)

  get service(): splitter.Service {
    return this.value().service
  }

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.api().getRootProps(),
    })
  }
}
