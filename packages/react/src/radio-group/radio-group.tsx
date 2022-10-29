import { atlas, HTMLAtlasProps } from '../factory'
import { RadioGroupProvider } from './radio-group-context'
import { useRadioGroup, UseRadioGroupProps } from './use-radio-group'

export type RadioGroupProps = Omit<HTMLAtlasProps<'div'>, keyof UseRadioGroupProps> &
  UseRadioGroupProps

export const RadioGroup = (props: RadioGroupProps) => {
  const { api, htmlProps } = useRadioGroup(props)
  return (
    <RadioGroupProvider value={api}>
      <atlas.div {...htmlProps} />
    </RadioGroupProvider>
  )
}
