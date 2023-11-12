import { Checkbox, type CheckboxProps } from '~/components/ui'

export const Demo = (props: CheckboxProps) => {
  return (
    <Checkbox.Root defaultChecked {...props}>
      {(state) => (
        <>
          <Checkbox.Control>
            {state.isChecked && <CheckIcon />}
            {state.isIndeterminate && <MinusIcon />}
          </Checkbox.Control>
          <Checkbox.Label>Label</Checkbox.Label>
        </>
      )}
    </Checkbox.Root>
  )
}

const CheckIcon = () => (
  <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const MinusIcon = () => (
  <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2.91675 7H11.0834"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
