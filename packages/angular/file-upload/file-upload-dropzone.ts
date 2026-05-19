import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  booleanAttribute,
  inject,
  input,
  type InputSignalWithTransform,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkFileUploadContext } from './use-file-upload-context'

@Directive({
  selector: '[arkFileUploadDropzone]',
  standalone: true,
  exportAs: 'arkFileUploadDropzone',
})
export class ArkFileUploadDropzone {
  /** Whether to disable the click event on the dropzone. */
  readonly disableClick: InputSignalWithTransform<boolean | undefined, unknown> = input<boolean | undefined, unknown>(
    undefined,
    { transform: (value: unknown) => (value === undefined || value === null ? undefined : booleanAttribute(value)) },
  )

  constructor() {
    const context = injectArkFileUploadContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getDropzoneProps({ disableClick: this.disableClick() }),
    })
  }
}
