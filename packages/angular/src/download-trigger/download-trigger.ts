import { Directive, ErrorHandler, inject, input } from '@angular/core'
import { type EnvironmentContext, injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { type FileMimeType, downloadFile } from '@zag-js/file-utils'

export type DownloadableData = string | Blob | File

export type DownloadData = DownloadableData | (() => DownloadableData | Promise<DownloadableData>)

@Directive({
  selector: '[arkDownloadTrigger]',
  standalone: true,
  host: { type: 'button', '(click)': 'onClick($event)' },
})
export class ArkDownloadTriggerDirective {
  readonly fileName = input.required<string>()
  readonly mimeType = input.required<FileMimeType>()
  readonly data = input.required<DownloadData>()

  private readonly environment: EnvironmentContext = injectArkEnvironment()
  private readonly errorHandler = inject(ErrorHandler)

  onClick(event: MouseEvent): void {
    if (event.defaultPrevented) return

    const root = this.environment.getRootNode()
    if (!root) return
    const win = resolveWindow(root)
    if (!win) return
    const source = this.data()

    const saveToDisk = (value: DownloadableData): void => {
      downloadFile({
        file: value,
        name: this.fileName(),
        type: this.mimeType(),
        win: win as Window & typeof globalThis,
      })
    }

    if (typeof source === 'function') {
      const result = source()
      if (result instanceof Promise) {
        result.then(saveToDisk).catch((error: unknown) => {
          this.errorHandler.handleError(error)
        })
        return
      }
      saveToDisk(result)
      return
    }

    saveToDisk(source)
  }
}

function resolveWindow(root: Document | ShadowRoot): Window | null {
  if ('defaultView' in root) return root.defaultView
  return root.ownerDocument.defaultView
}
