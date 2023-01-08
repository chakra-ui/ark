import { css } from '@/panda/css'
import { panda } from '@/panda/jsx'
import { checkbox } from '@/panda/recipes'
import { Checkbox, CheckboxControl, CheckboxInput, CheckboxLabel } from '@ark-ui/react'
import { useState } from 'react'

export const DemoCheckbox = () => {
  const [checked, setChecked] = useState(true)
  return (
    <Checkbox
      className={checkbox()}
      checked={checked}
      onChange={(e) => setChecked(e.checked === true)}
    >
      {(state) => (
        <>
          <CheckboxInput data-peer />
          <CheckboxControl className={css({ mt: '0.5' })}>
            {state.isChecked && <CheckIcon />}
            {state.isIndeterminate && <MinusIcon />}
          </CheckboxControl>
          <CheckboxLabel>
            <panda.span fontWeight="medium">Label</panda.span>
          </CheckboxLabel>
        </>
      )}
    </Checkbox>
  )
}

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2.91675 7H11.0834"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
