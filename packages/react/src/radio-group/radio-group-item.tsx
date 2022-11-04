import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useRadioGroupContext } from './radio-group-context'
import { RadioContext, RadioProvider } from './radio-group-item-context'

export type RadioProps = Omit<HTMLAtlasProps<'label'>, keyof RadioContext> & RadioContext

export const Radio = forwardRef<'label', RadioProps>((props, ref) => {
  const { value, disabled, invalid, readonly, ...htmlProps } = props
  const { getItemProps } = useRadioGroupContext()

  return (
    <RadioProvider value={{ value, disabled, invalid, readonly }}>
      <atlas.label {...htmlProps} {...getItemProps({ value, disabled })} ref={ref} />
    </RadioProvider>
  )
})
