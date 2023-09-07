import { render } from '@testing-library/react'
import { Portal } from '@zag-js/react'
import type { Optional } from '../types'
import {
  Select,
  SelectClearTrigger,
  SelectContent,
  SelectItem,
  SelectItemGroup,
  SelectItemGroupLabel,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPositioner,
  SelectTrigger,
  SelectValue,
  type SelectProps,
} from './'
import { SelectControl } from './select-control'

const ComponentUnderTest = (props: Optional<SelectProps, 'items'>) => {
  const items = [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte', disabled: true },
  ]
  return (
    <Select items={items} {...props}>
      <SelectLabel>Framework:</SelectLabel>
      <SelectControl>
        <SelectControl>
          <SelectTrigger>
            <SelectValue placeholder="Select a Framework" />
          </SelectTrigger>
          <SelectClearTrigger>Clear</SelectClearTrigger>
        </SelectControl>
        <SelectClearTrigger>Clear</SelectClearTrigger>
      </SelectControl>
      <Portal>
        <SelectPositioner>
          <SelectContent>
            <SelectItemGroup id="framework">
              <SelectItemGroupLabel htmlFor="framework">Frameworks</SelectItemGroupLabel>
              {items.map((item) => (
                <SelectItem key={item.value} item={item}>
                  <SelectItemText>{item.label}</SelectItemText>
                  <SelectItemIndicator>✓</SelectItemIndicator>
                </SelectItem>
              ))}
            </SelectItemGroup>
          </SelectContent>
        </SelectPositioner>
      </Portal>
    </Select>
  )
}

describe('Select', () => {
  it('should render', async () => {
    render(<ComponentUnderTest />)
  })
})
