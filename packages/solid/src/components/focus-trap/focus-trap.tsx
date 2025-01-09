import { type FocusTrapOptions, trapFocus } from '@zag-js/focus-trap'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { createEffect } from 'solid-js'
import { composeRefs } from '../../utils/compose-refs'

export interface TrapOptions extends Omit<FocusTrapOptions, 'document' | 'trapStack'> {
  disabled?: boolean
}

export interface FocusTrapBaseProps extends PolymorphicProps<'div'>, TrapOptions {}
export interface FocusTrapProps extends Assign<HTMLProps<'div'>, FocusTrapBaseProps> {}

export const FocusTrap = (props: FocusTrapProps) => {
  let localRef: HTMLDivElement | undefined

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
    if (!localRef || trapProps.disabled) return
    return trapFocus(localRef, trapProps)
  })

  return <ark.div ref={composeRefs(localRef, props.ref)} {...localProps} />
}
