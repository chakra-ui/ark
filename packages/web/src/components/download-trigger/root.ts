import { downloadFile } from '@zag-js/file-utils'

export type DownloadableData = string | Blob | File

export type DownloadTriggerData = DownloadableData | (() => DownloadableData | Promise<DownloadableData>)

export class DownloadTriggerElement extends HTMLElement {
  static observedAttributes = ['file-name', 'mime-type', 'data']

  static meta = {
    kind: 'element',
    attributes: DownloadTriggerElement.observedAttributes,
    properties: ['data'],
    methods: ['download'],
  }

  #data: DownloadTriggerData | undefined

  get data(): DownloadTriggerData | undefined {
    return this.#data ?? this.getAttribute('data') ?? undefined
  }

  set data(data: DownloadTriggerData | undefined) {
    this.#data = data
  }

  get fileName(): string {
    return this.getAttribute('file-name') ?? ''
  }

  set fileName(name: string) {
    this.setAttribute('file-name', name)
  }

  get mimeType(): string {
    return this.getAttribute('mime-type') ?? ''
  }

  set mimeType(type: string) {
    this.setAttribute('mime-type', type)
  }

  async download() {
    const data = this.data
    if (data == null) return

    const file = typeof data === 'function' ? await data() : data

    downloadFile({
      file,
      name: this.fileName,
      type: this.mimeType,
      win: this.ownerDocument.defaultView ?? window,
    })
  }

  connectedCallback() {
    this.addEventListener('click', this.#onClick)
    this.querySelector('button')?.setAttribute('type', 'button')
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.#onClick)
  }

  #onClick = (event: MouseEvent) => {
    if (event.defaultPrevented) return
    void this.download()
  }
}

if (!customElements.get('ark-download-trigger')) customElements.define('ark-download-trigger', DownloadTriggerElement)
