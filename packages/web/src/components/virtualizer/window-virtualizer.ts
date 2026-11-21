import type { WindowVirtualizerOptions } from '@zag-js/virtualizer'

import { createWindowVirtualizer, type CreateWindowVirtualizerReturn } from './create.js'
import { ListLikeVirtualizerElement } from './list-like.js'

export class WindowVirtualizerElement extends ListLikeVirtualizerElement<
  CreateWindowVirtualizerReturn,
  WindowVirtualizerOptions
> {
  protected contentTag = 'ark-window-virtualizer-content'
  protected itemTag = 'ark-window-virtualizer-item'

  protected create(options: WindowVirtualizerOptions) {
    return createWindowVirtualizer(options)
  }
}
