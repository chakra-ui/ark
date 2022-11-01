import { atlas, HTMLAtlasProps } from '../factory'
import { splitProps, type Assign } from '../split-props'
import { RadioGroupProvider } from './radio-group-context'
import { useRadioGroup, UseRadioGroupProps } from './use-radio-group'

export type RadioGroupProps = Assign<HTMLAtlasProps<'div'>, UseRadioGroupProps>

export const RadioGroup = (props: RadioGroupProps) => {
  const [useRadioGroupProps, htmlProps] = splitProps(props, [
    'defaultValue',
    'dir',
    'disabled',
    'getRootNode',
    'ids',
    'name',
    'onChange',
    'orientation',
    'readonly',
    'value',
  ])
  const radioGroup = useRadioGroup(useRadioGroupProps)

  return (
    <RadioGroupProvider value={radioGroup}>
      <atlas.div {...htmlProps} />
    </RadioGroupProvider>
  )
}
