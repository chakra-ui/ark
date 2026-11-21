import '../menu/index.js'
import './root.js'
import type { Api, Props } from '@zag-js/menubar'

import type { RootElement } from '../../utils/define.js'

export type { Api as MenubarApi, MenubarMenuContext } from '@zag-js/menubar'
export type MenubarElement = RootElement<Api, Props> & Pick<Props, 'ids'>

declare global {
  interface HTMLElementTagNameMap {
    'ark-menubar': MenubarElement
  }
}
