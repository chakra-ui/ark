import type { Assign } from '@polymorphic-factory/solid'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import { RadioContext, RadioProvider } from './radio-context'
import { useRadioGroupContext } from './radio-group-context'

export type RadioProps = Assign<HTMLArkProps<'label'>, RadioContext>

export const Radio = (props: RadioProps) => {
  const [contextProps, labelProps] = createSplitProps<RadioContext>()(props, [
    'value',
    'disabled',
    'invalid',
    'readOnly',
  ])
  const radioGroup = useRadioGroupContext()

  return (
    <RadioProvider value={contextProps}>
      <ark.label
        {...radioGroup().getRadioProps({
          value: contextProps.value,
          disabled: contextProps.disabled,
        })}
        {...labelProps}
      />
    </RadioProvider>
  )
}
