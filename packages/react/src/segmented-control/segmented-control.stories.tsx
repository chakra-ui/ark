import { useState } from 'react'
// import { RadioGroup } from './radio-group'

// type RadioGroupType = typeof RadioGroup

// const meta: Meta<RadioGroupType> = {
//   title: 'RadioGroup',
//   component: RadioGroup,
// }

// export default meta

const options = [
  { id: 'apple', label: 'Apples' },
  { id: 'orange', label: 'Oranges' },
  { id: 'mango', label: 'Mangoes' },
  { id: 'grape', label: 'Grapes' },
]

export const Basic = () => {
  const [value, setValue] = useState('apple')
  return <div />
}
