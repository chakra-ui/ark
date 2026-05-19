import { Directive, TemplateRef, ViewContainerRef, effect, inject } from '@angular/core'
import type { UseImageCropperReturn } from './use-image-cropper'
import { injectArkImageCropperContext } from './use-image-cropper-context'

export interface ImageCropperContextTemplate {
  $implicit: UseImageCropperReturn['api']
  api: UseImageCropperReturn['api']
}

@Directive({
  selector: '[arkImageCropperContext]',
  standalone: true,
  exportAs: 'arkImageCropperContext',
})
export class ArkImageCropperContext {
  static ngTemplateContextGuard(
    _directive: ArkImageCropperContext,
    context: unknown,
  ): context is ImageCropperContextTemplate {
    return true
  }

  private readonly imageCropper = injectArkImageCropperContext()
  private readonly templateRef = inject<TemplateRef<ImageCropperContextTemplate>>(TemplateRef)
  private readonly viewContainer = inject(ViewContainerRef)

  constructor() {
    const view = this.viewContainer.createEmbeddedView(this.templateRef, {
      $implicit: this.imageCropper.api,
      api: this.imageCropper.api,
    })

    effect(() => {
      this.imageCropper.api()
      view.detectChanges()
    })
  }
}
