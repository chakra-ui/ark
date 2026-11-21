import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/combobox'
import type { RootElement } from '../../utils/define.js'
import type { FunctionProperties } from '../../utils/events.js'
import type { Item, ItemInput } from '../../utils/collection.js'
import type { CommandFilter } from './shared.js'

export type { Api as CommandApi } from '@zag-js/combobox'
export type { CommandFilter } from './shared.js'

export interface CommandPageChangeDetails {
  page: string | null
  item: Item | null
}

type CommandProps = Props & { onPageChange?: ((details: CommandPageChangeDetails) => void) | undefined }

export type CommandEventMap = Pick<
  CallbackEvents<CommandProps>,
  'inputvaluechange' | 'highlightchange' | 'itemselect' | 'pagechange'
>

export type CommandElement = RootElement<Api, CommandProps> &
  Pick<FunctionProperties<Props>, 'navigate' | 'scrollToIndexFn'> &
  Pick<Props, 'ids' | 'translations'> & { items?: ItemInput[]; filter?: CommandFilter; page?: string | null }

declare global {
  interface HTMLElementTagNameMap {
    'ark-command': CommandElement
  }
}
