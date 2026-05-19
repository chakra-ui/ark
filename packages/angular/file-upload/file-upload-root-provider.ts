import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  type InputSignal,
  type Signal,
  computed,
  forwardRef,
  inject,
  input,
} from '@angular/core'
import type * as fileUpload from '@zag-js/file-upload'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { ARK_FILE_UPLOAD_CONTEXT } from './use-file-upload-context'
import type { UseFileUploadReturn } from './use-file-upload'

@Directive({
  selector: '[arkFileUploadRootProvider]',
  standalone: true,
  exportAs: 'arkFileUploadRootProvider',
  providers: [{ provide: ARK_FILE_UPLOAD_CONTEXT, useExisting: forwardRef(() => ArkFileUploadRootProvider) }],
})
export class ArkFileUploadRootProvider implements UseFileUploadReturn {
  /** The file-upload machine returned by useFileUpload(). */
  readonly value: InputSignal<UseFileUploadReturn> = input.required<UseFileUploadReturn>()
  readonly state: Signal<fileUpload.Service['state']> = computed(() => this.value().state())
  readonly api: Signal<fileUpload.Api> = computed(() => this.value().api())
  readonly send: fileUpload.Service['send'] = (event) => this.value().send(event)

  get service(): fileUpload.Service {
    return this.value().service
  }

  resolveValue(): UseFileUploadReturn {
    return this.value()
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
