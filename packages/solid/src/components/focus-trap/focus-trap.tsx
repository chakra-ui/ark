import { type FocusTrapOptions, trapFocus } from '@zag-js/focus-trap'
import { createEffect, onCleanup } from 'solid-js'
import type { Assign } from '../../types'
import { composeRefs } from '../../utils/compose-refs'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'

export interface TrapOptions extends Omit<FocusTrapOptions, 'document' | 'trapStack'> {
  disabled?: boolean
}

export interface FocusTrapBaseProps extends PolymorphicProps<'div'>, TrapOptions {}
export interface FocusTrapProps extends Assign<HTMLProps<'div'>, FocusTrapBaseProps> {}

export const FocusTrap = (props: FocusTrapProps) => {
  let localNode!: HTMLDivElement

  const [trapProps, localProps] = createSplitProps<TrapOptions>()(props, [
    'disabled',
    'onActivate',
    'onPostActivate',
    'onPause',
    'onPostPause',
    'onUnpause',
    'onPostUnpause',
    'checkCanFocusTrap',
    'onDeactivate',
    'onPostDeactivate',
    'checkCanReturnFocus',
    'initialFocus',
    'fallbackFocus',
    'returnFocusOnDeactivate',
    'setReturnFocus',
    'escapeDeactivates',
    'clickOutsideDeactivates',
    'allowOutsideClick',
    'preventScroll',
    'delayInitialFocus',
    'isKeyForward',
    'isKeyBackward',
  ])

  createEffect(() => {
    if (!localNode || trapProps.disabled) return
    const autoFocusNode = localNode.querySelector<HTMLElement>('[autofocus], [data-autofocus]')
    trapProps.initialFocus ||= autoFocusNode ?? undefined
    onCleanup(trapFocus(localNode, trapProps))
  })

  // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
  return <ark.div {...localProps} ref={composeRefs((el) => (localNode = el), props.ref)} />
}
