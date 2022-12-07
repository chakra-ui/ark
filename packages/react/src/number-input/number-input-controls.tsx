import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useNumberInputContext } from './number-input-context'

export type NumberInputControlsProps = HTMLArkProps<'div'>

export const NumberInputControls = forwardRef<'div', NumberInputControlsProps>((props, ref) => {
  const { groupProps } = useNumberInputContext()
  const mergedProps = mergeProps(groupProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
