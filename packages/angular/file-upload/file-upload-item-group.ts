import {
  DestroyRef,
  Directive,
  ElementRef,
  InjectionToken,
  Renderer2,
  computed,
  forwardRef,
  inject,
  input,
  type InputSignal,
  type Signal,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type { FileUploadItemType } from './file-upload.types'
import { injectArkFileUploadContext } from './use-file-upload-context'

export interface ArkFileUploadItemGroupContext {
  type: Signal<FileUploadItemType | undefined>
}

export const ARK_FILE_UPLOAD_ITEM_GROUP_CONTEXT = new InjectionToken<ArkFileUploadItemGroupContext>(
  'ARK_FILE_UPLOAD_ITEM_GROUP_CONTEXT',
)

export function injectArkFileUploadItemGroupContextOptional(): ArkFileUploadItemGroupContext | null {
  return inject(ARK_FILE_UPLOAD_ITEM_GROUP_CONTEXT, { optional: true })
}

@Directive({
  selector: '[arkFileUploadItemGroup]',
  standalone: true,
  exportAs: 'arkFileUploadItemGroup',
  providers: [{ provide: ARK_FILE_UPLOAD_ITEM_GROUP_CONTEXT, useExisting: forwardRef(() => ArkFileUploadItemGroup) }],
})
export class ArkFileUploadItemGroup implements ArkFileUploadItemGroupContext {
  /** The item type that this group renders. */
  readonly type: InputSignal<FileUploadItemType | undefined> = input<FileUploadItemType | undefined>(undefined)

  constructor() {
    const context = injectArkFileUploadContext()
    const typeSignal: Signal<FileUploadItemType | undefined> = computed(() => this.type())
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getItemGroupProps({ type: typeSignal() }),
    })
  }
}
