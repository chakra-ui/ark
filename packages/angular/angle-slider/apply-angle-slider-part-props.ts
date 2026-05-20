import { DestroyRef, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'

type AngleSliderPartProps = Record<string, unknown>

export function applyAngleSliderPartProps(props: () => AngleSliderPartProps | undefined): void {
  applyArkProps({
    elementRef: inject(ElementRef),
    renderer: inject(Renderer2),
    destroyRef: inject(DestroyRef),
    props,
  })
}
