import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useCascadeSelectContext } from './use-cascade-select-context'

export interface CascadeSelectTriggerBaseProps extends PolymorphicProps {}
export interface CascadeSelectTriggerProps extends HTMLProps<'button'>, CascadeSelectTriggerBaseProps {}

export const CascadeSelectTrigger = forwardRef<HTMLButtonElement, CascadeSelectTriggerProps>((props, ref) => {
  const cascadeSelect = useCascadeSelectContext()
  const mergedProps = mergeProps(cascadeSelect.getTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
})

CascadeSelectTrigger.displayName = 'CascadeSelectTrigger'
