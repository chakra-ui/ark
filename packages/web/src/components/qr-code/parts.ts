import type * as qrCode from '@zag-js/qr-code'

import { num, str } from '../../utils/attrs.js'
import { definePart, wrappedButton } from '../../utils/define.js'
import { frame, ownPath, ownSvg, root } from './shared.js'

type MimeType = qrCode.DownloadTriggerProps['mimeType']

const createdPaths = new WeakMap<HTMLElement, SVGPathElement>()

const downloadOptions = (el: HTMLElement): qrCode.DownloadTriggerProps => ({
  fileName: str(el, 'file-name') ?? 'qr-code.png',
  mimeType: str<MimeType>(el, 'mime-type') ?? 'image/png',
  quality: num(el, 'quality'),
})

definePart<qrCode.Api>({
  tag: frame,
  root,
  target: (el) => ownSvg(el) as unknown as HTMLElement,
  props: (api) => api.getFrameProps(),
})

// Custom elements can't live inside <svg>, so the pattern sits beside it and props the svg's <path>
definePart<qrCode.Api>({
  tag: 'ark-qr-code-pattern',
  root,
  setup: (el) => {
    const hadPath = !!el.parentElement?.querySelector(':scope > svg > path')
    const path = ownPath(el)
    if (path && !hadPath) createdPaths.set(el, path)
    return () => {
      createdPaths.get(el)?.remove()
      createdPaths.delete(el)
    }
  },
  target: (el) => ownPath(el) as unknown as HTMLElement | null,
  props: (api) => api.getPatternProps(),
})

definePart<qrCode.Api>({
  tag: 'ark-qr-code-overlay',
  root,
  props: (api) => api.getOverlayProps(),
})

definePart<qrCode.Api>({
  tag: 'ark-qr-code-download-trigger',
  root,
  target: wrappedButton,
  props: (api, el) => api.getDownloadTriggerProps(downloadOptions(el)),
})
