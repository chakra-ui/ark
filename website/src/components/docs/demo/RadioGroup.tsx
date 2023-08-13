import { radioGroup } from '@/panda/recipes'
import { Radio, RadioControl, RadioGroup, RadioLabel } from '@ark-ui/react'

const options = [
  { id: 'react', label: 'React' },
  { id: 'solid', label: 'Solid' },
  { id: 'vue', label: 'Vue' },
]

export const DemoRadioGroup = () => {
  return (
    <RadioGroup className={radioGroup()} defaultValue="react">
      {options.map((option, id) => (
        <Radio key={id} value={option.id}>
          <RadioControl />
          <RadioLabel>{option.label}</RadioLabel>
        </Radio>
      ))}
    </RadioGroup>
  )
}
