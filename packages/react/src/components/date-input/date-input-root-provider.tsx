'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import type { UseDateInputReturn } from './use-date-input.ts'
import { DateInputProvider } from './use-date-input-context.ts'

interface RootProviderProps {
  value: UseDateInputReturn
}

export interface DateInputRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface DateInputRootProviderProps extends HTMLProps<'div'>, DateInputRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const DateInputRootProvider = forwardRef<HTMLDivElement, DateInputRootProviderProps>((props, ref) => {
  const [{ value: dateInput }, localProps] = splitRootProviderProps(props, ['value'])
  const mergedProps = mergeProps(dateInput.getRootProps(), localProps)

  return (
    <DateInputProvider value={dateInput}>
      <ark.div {...mergedProps} ref={ref} />
    </DateInputProvider>
  )
})

DateInputRootProvider.displayName = 'DateInputRootProvider'
