'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import type { HTMLProps, PolymorphicProps } from '../factory.ts'
import { ark } from '../factory.ts'
import { type UseToggleProps, useToggle } from './use-toggle.ts'
import { ToggleProvider } from './use-toggle-context.ts'

export interface ToggleRootBaseProps extends UseToggleProps, PolymorphicProps {}

export interface ToggleRootProps extends HTMLProps<'button'>, ToggleRootBaseProps {}

const splitRootProps = createSplitProps<UseToggleProps>()

export const ToggleRoot = forwardRef<HTMLButtonElement, ToggleRootProps>((props, ref) => {
  const [useToggleProps, localProps] = splitRootProps(props, [
    'pressed',
    'defaultPressed',
    'disabled',
    'onPressedChange',
  ])

  const toggle = useToggle(useToggleProps)
  const mergedProps = mergeProps(toggle.getRootProps(), localProps)

  return (
    <ToggleProvider value={toggle}>
      <ark.button {...mergedProps} ref={ref} />
    </ToggleProvider>
  )
})

ToggleRoot.displayName = 'ToggleRoot'
