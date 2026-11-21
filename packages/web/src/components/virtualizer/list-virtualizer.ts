import type { ListVirtualizerOptions } from '@zag-js/virtualizer'

import { createListVirtualizer, type CreateListVirtualizerReturn } from './create.js'
import { ListLikeVirtualizerElement } from './list-like.js'

export class ListVirtualizerElement extends ListLikeVirtualizerElement<
  CreateListVirtualizerReturn,
  ListVirtualizerOptions
> {
  protected contentTag = 'ark-list-virtualizer-content'
  protected itemTag = 'ark-list-virtualizer-item'

  protected create(options: ListVirtualizerOptions) {
    return createListVirtualizer({ observeScrollElementSize: true, ...options })
  }
}
