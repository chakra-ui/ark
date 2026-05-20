import { DestroyRef, Directive, ElementRef, Renderer2, effect, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkSegmentGroupContext } from './use-segment-group-context'
import { injectArkSegmentGroupItemPropsContext } from './use-segment-group-item-context'

@Directive({
  selector: '[arkSegmentGroupItemHiddenInput]',
  standalone: true,
  exportAs: 'arkSegmentGroupItemHiddenInput',
})
export class ArkSegmentGroupItemHiddenInput {
  constructor() {
    const segmentGroup = injectArkSegmentGroupContext()
    const itemProps = injectArkSegmentGroupItemPropsContext()
    const elementRef = inject<ElementRef<HTMLInputElement>>(ElementRef)
    const renderer = inject(Renderer2)
    applyArkProps({
      elementRef,
      renderer,
      destroyRef: inject(DestroyRef),
      props: () => {
        const { form: _form, ...props } = segmentGroup.api().getItemHiddenInputProps(itemProps()) as Record<
          string,
          unknown
        >
        return props
      },
    })
    effect(() => {
      const form = (segmentGroup.api().getItemHiddenInputProps(itemProps()) as Record<string, unknown>)['form']
      if (form == null || form === false) {
        renderer.removeAttribute(elementRef.nativeElement, 'form')
        return
      }
      renderer.setAttribute(elementRef.nativeElement, 'form', String(form))
    })
  }
}
