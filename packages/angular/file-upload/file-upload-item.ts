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
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type { FileUploadItemType } from './file-upload.types'
import { injectArkFileUploadContext } from './use-file-upload-context'
import { injectArkFileUploadItemGroupContextOptional } from './file-upload-item-group'
import { ARK_FILE_UPLOAD_ITEM_CONTEXT, type ArkFileUploadItemContext } from './use-file-upload-item-context'

@Directive({
  selector: '[arkFileUploadItem]',
  standalone: true,
  exportAs: 'arkFileUploadItem',
  providers: [{ provide: ARK_FILE_UPLOAD_ITEM_CONTEXT, useExisting: forwardRef(() => ArkFileUploadItem) }],
})
export class ArkFileUploadItem implements ArkFileUploadItemContext {
  /** The file represented by this item. */
  readonly file: InputSignal<File> = input.required<File>()

  private readonly group = injectArkFileUploadItemGroupContextOptional()
  readonly type: Signal<FileUploadItemType | undefined> = computed(() => this.group?.type())

  constructor() {
    const context = injectArkFileUploadContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getItemProps({ file: this.file(), type: this.type() }),
    })
  }
}
