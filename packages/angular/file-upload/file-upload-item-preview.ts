import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  computed,
  inject,
  input,
  type InputSignal,
  type Signal,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkFileUploadContext } from './use-file-upload-context'
import { injectArkFileUploadItemContext } from './use-file-upload-item-context'

@Directive({
  selector: '[arkFileUploadItemPreview]',
  standalone: true,
  exportAs: 'arkFileUploadItemPreview',
})
export class ArkFileUploadItemPreview {
  /** The file type to match against. Matches all file types by default. */
  readonly type: InputSignal<string | undefined> = input<string | undefined>(undefined)

  private readonly context = injectArkFileUploadContext()
  private readonly item = injectArkFileUploadItemContext()

  readonly matches: Signal<boolean> = computed(() => {
    const pattern = this.type()
    if (!pattern || pattern === '*/*') return true
    const mimeType = this.item.file().type
    if (pattern.endsWith('/*')) {
      return mimeType.startsWith(pattern.slice(0, -1))
    }
    if (/[\^$*?()[\]{}|\\]/.test(pattern)) {
      try {
        return new RegExp(pattern).test(mimeType)
      } catch {
        return false
      }
    }
    return mimeType === pattern
  })

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.context.api().getItemPreviewProps({ file: this.item.file(), type: this.item.type() }),
    })
  }
}
