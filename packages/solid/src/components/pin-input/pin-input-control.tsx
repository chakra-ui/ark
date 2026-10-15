import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useFieldContext } from '../field/index.tsx'
import { usePinInputContext } from './use-pin-input-context.ts'

export interface PinInputControlBaseProps extends PolymorphicProps<'div'> {}
export interface PinInputControlProps extends HTMLProps<'div'>, PinInputControlBaseProps {}

export const PinInputControl = (props: PinInputControlProps) => {
  const api = usePinInputContext()
  const mergedProps = mergeProps(() => api().getControlProps(), props)
  const field = useFieldContext()

  return (
    <ark.div
      role="group"
      aria-labelledby={field?.().ids.label}
      aria-describedby={field?.().ariaDescribedby}
      {...mergedProps}
    />
  )
}
