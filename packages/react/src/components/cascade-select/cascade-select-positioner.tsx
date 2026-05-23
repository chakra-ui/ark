import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useCascadeSelectContext } from './use-cascade-select-context'

export interface CascadeSelectPositionerBaseProps extends PolymorphicProps {}
export interface CascadeSelectPositionerProps extends HTMLProps<'div'>, CascadeSelectPositionerBaseProps {}

export const CascadeSelectPositioner = forwardRef<HTMLDivElement, CascadeSelectPositionerProps>((props, ref) => {
  const cascadeSelect = useCascadeSelectContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(cascadeSelect.getPositionerProps(), props)

  if (presence.unmounted) {
    return null
  }

  return <ark.div {...mergedProps} ref={ref} />
})

CascadeSelectPositioner.displayName = 'CascadeSelectPositioner'
