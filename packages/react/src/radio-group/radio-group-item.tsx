import { atlas, HTMLAtlasProps } from '../factory'
import { forwardRef } from '../forwardRef'
import { useRadioGroupContext } from './radio-group-context'
import { RadioGroupItemContext, RadioGroupItemProvider } from './radio-group-item-context'

export type RadioGroupItemProps = Omit<HTMLAtlasProps<'label'>, keyof RadioGroupItemContext> &
  RadioGroupItemContext

export const RadioGroupItem = forwardRef<'label', RadioGroupItemProps>((props, ref) => {
  const { value, disabled, invalid, readonly, ...htmlProps } = props
  const { getItemProps } = useRadioGroupContext()

  return (
    <RadioGroupItemProvider value={{ value, disabled, invalid, readonly }}>
      <atlas.label {...htmlProps} {...getItemProps({ value, disabled })} ref={ref} />
    </RadioGroupItemProvider>
  )
})
