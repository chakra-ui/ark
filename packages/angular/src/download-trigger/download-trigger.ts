import { Directive, input } from '@angular/core'
import { downloadFile } from '@zag-js/file-utils'
import { type EnvironmentContext, injectArkEnvironment } from '../providers/environment/environment'

export type DownloadableData = string | Blob | File

export type DownloadData = DownloadableData | (() => DownloadableData | Promise<DownloadableData>)

@Directive({
  selector: '[arkDownloadTrigger]',
  standalone: true,
  host: { '(click)': 'onClick()' },
})
export class ArkDownloadTriggerDirective {
  readonly fileName = input<string>('download')
  readonly mimeType = input<string>('application/octet-stream')
  readonly data = input<DownloadData | undefined>(undefined)

  private readonly environment: EnvironmentContext = injectArkEnvironment()

  onClick(): void {
    const root = this.environment.getRootNode()
    if (!root) return
    const win = resolveWindow(root)
    if (!win) return
    const source = this.data()
    if (source === undefined) return

    const saveToDisk = (value: DownloadableData): void => {
      downloadFile({
        file: value,
        name: this.fileName(),
        type: this.mimeType(),
        win,
      })
    }

    if (typeof source === 'function') {
      const result = source()
      if (result instanceof Promise) {
        result.then(saveToDisk)
        return
      }
      saveToDisk(result)
      return
    }

    saveToDisk(source)
  }
}

function resolveWindow(root: Document | ShadowRoot): (Window & typeof globalThis) | null {
  if (root instanceof ShadowRoot) {
    return root.ownerDocument.defaultView as (Window & typeof globalThis) | null
  }
  return root.defaultView as (Window & typeof globalThis) | null
}
