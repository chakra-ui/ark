import { DestroyRef, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'

type ProgressPartProps = Record<string, unknown>

export function applyProgressPartProps(props: () => ProgressPartProps | undefined): void {
  applyArkProps({
    elementRef: inject(ElementRef),
    renderer: inject(Renderer2),
    destroyRef: inject(DestroyRef),
    props,
  })
}
