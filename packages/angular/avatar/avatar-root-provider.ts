import {
  DestroyRef,
  Directive,
  ElementRef,
  Injector,
  Renderer2,
  type InputSignal,
  forwardRef,
  inject,
  input,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag/apply-ark-props'
import { ARK_AVATAR_CONTEXT } from './use-avatar-context'
import type { UseAvatarReturn } from './use-avatar'

@Directive({
  selector: '[arkAvatarRootProvider]',
  standalone: true,
  exportAs: 'arkAvatarRootProvider',
  providers: [
    {
      provide: ARK_AVATAR_CONTEXT,
      useFactory: (injector: Injector) => injector.get(forwardRef(() => ArkAvatarRootProvider)).resolveValue(),
      deps: [Injector],
    },
  ],
})
export class ArkAvatarRootProvider {
  readonly value: InputSignal<UseAvatarReturn> = input.required<UseAvatarReturn>()

  resolveValue(): UseAvatarReturn {
    return this.value()
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
