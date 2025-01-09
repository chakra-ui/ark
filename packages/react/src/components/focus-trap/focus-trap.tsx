import { forwardRef, useRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { trapFocus, type FocusTrapOptions } from '@zag-js/focus-trap'
import { useSafeLayoutEffect } from '../../utils/use-safe-layout-effect'
import { composeRefs } from '../../utils/compose-refs'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'

export interface TrapOptions extends Omit<FocusTrapOptions, 'document' | 'trapStack'> {
  disabled?: boolean
}

export interface FocusTrapBaseProps extends PolymorphicProps, TrapOptions {}

export interface FocusTrapProps extends Assign<HTMLProps<'div'>, FocusTrapBaseProps> {}

export const FocusTrap = forwardRef<HTMLDivElement, FocusTrapProps>((props, ref) => {
  const localRef = useRef<HTMLDivElement | null>(null)
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

  useSafeLayoutEffect(() => {
    const node = localRef.current
    if (!node || trapProps.disabled) return
    return trapFocus(node, trapProps)
  }, [ref, trapProps])

  return <ark.div ref={composeRefs(localRef, ref)} {...localProps} />
})
