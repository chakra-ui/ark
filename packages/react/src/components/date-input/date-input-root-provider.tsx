'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import type { UseDateInputReturn } from './use-date-input.ts'
import { DateInputProvider } from './use-date-input-context.ts'
import type { RootState } from '@zag-js/date-input'

interface RootProviderProps {
  value: UseDateInputReturn
}

export interface DateInputRootProviderState extends RootState {}

export interface DateInputRootProviderBaseProps
  extends RootProviderProps, PolymorphicProps<DateInputRootProviderState> {}
export interface DateInputRootProviderProps extends HTMLProps<'div'>, DateInputRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const DateInputRootProvider = forwardRef<HTMLDivElement, DateInputRootProviderProps>((props, ref) => {
  const [{ value: dateInput }, localProps] = splitRootProviderProps(props, ['value'])
  const mergedProps = mergeProps(dateInput.getRootProps(), localProps)

  return (
    <DateInputProvider value={dateInput}>
      <ark.div {...mergedProps} ref={ref} state={dateInput.getRootState()} />
    </DateInputProvider>
  )
})

DateInputRootProvider.displayName = 'DateInputRootProvider'
