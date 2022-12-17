import { useState } from 'react'
import { Checkbox, CheckboxControl, CheckboxInput, CheckboxLabel } from '.'
import './checkbox.css'

export const Basic = () => (
  <Checkbox>
    <CheckboxLabel>Checkbox</CheckboxLabel>
    <CheckboxInput />
    <CheckboxControl />
  </Checkbox>
)

export const IndeterminateExample = () => {
  const [checkedItems, setCheckedItems] = useState([false, false])

  const allChecked = checkedItems.every(Boolean)
  const someChecked = checkedItems.some(Boolean) && !allChecked

  return (
    <>
      <Checkbox
        checked={allChecked}
        indeterminate={someChecked}
        onChange={(e) => setCheckedItems([e.checked === true, e.checked === true])}
      >
        <CheckboxLabel>Parent Checkbox</CheckboxLabel>
        <CheckboxInput />
        <CheckboxControl />
      </Checkbox>
      <div>
        <Checkbox
          checked={checkedItems[0]}
          onChange={(e) => setCheckedItems([e.checked === true, checkedItems[1]])}
        >
          <CheckboxLabel>Child Checkbox 1</CheckboxLabel>
          <CheckboxInput />
          <CheckboxControl />
        </Checkbox>
        <Checkbox
          checked={checkedItems[1]}
          onChange={(e) => setCheckedItems([checkedItems[0], e.checked === true])}
        >
          <CheckboxLabel>Child Checkbox 2</CheckboxLabel>
          <CheckboxInput />
          <CheckboxControl />
        </Checkbox>
      </div>
    </>
  )
}
