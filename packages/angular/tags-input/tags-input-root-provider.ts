import type * as tagsInput from '@zag-js/tags-input'
import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  forwardRef,
  inject,
  input,
  type InputSignal,
  type Signal,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { ARK_TAGS_INPUT_CONTEXT } from './use-tags-input-context'
import type { UseTagsInputReturn } from './use-tags-input'

@Directive({
  selector: '[arkTagsInputRootProvider]',
  standalone: true,
  exportAs: 'arkTagsInputRootProvider',
  providers: [{ provide: ARK_TAGS_INPUT_CONTEXT, useExisting: forwardRef(() => ArkTagsInputRootProvider) }],
})
export class ArkTagsInputRootProvider implements UseTagsInputReturn {
  /** The tags input primitive returned by useTagsInput(). */
  readonly value: InputSignal<UseTagsInputReturn> = input.required<UseTagsInputReturn>()

  get state(): Signal<tagsInput.Service['state']> {
    return this.value().state
  }
  get api(): Signal<tagsInput.Api> {
    return this.value().api
  }
  get service(): tagsInput.Service {
    return this.value().service
  }
  get send(): tagsInput.Service['send'] {
    return this.value().send
  }

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.value().api().getRootProps(),
    })
  }
}
