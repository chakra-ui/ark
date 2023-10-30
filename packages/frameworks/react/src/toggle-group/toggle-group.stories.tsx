import type { Meta } from '@storybook/react'
import { ToggleGroup } from './'
import './toggle-group.css'

type ToggleGroupType = typeof ToggleGroup

const meta: Meta<ToggleGroupType> = {
  title: 'ToggleGroup',
  component: ToggleGroup,
}

export default meta

export const Basic = () => {
  return (
    <ToggleGroup.Root>
      <ToggleGroup.Item value="a">A</ToggleGroup.Item>
      <ToggleGroup.Item value="b">B</ToggleGroup.Item>
      <ToggleGroup.Item value="c">C</ToggleGroup.Item>
    </ToggleGroup.Root>
  )
}
export const InitialValue = () => {
  return (
    <ToggleGroup.Root defaultValue={['b']}>
      <ToggleGroup.Item value="a">A</ToggleGroup.Item>
      <ToggleGroup.Item value="b">B</ToggleGroup.Item>
      <ToggleGroup.Item value="c">C</ToggleGroup.Item>
    </ToggleGroup.Root>
  )
}

export const Multiple = () => {
  return (
    <ToggleGroup.Root multiple>
      <ToggleGroup.Item value="a">A</ToggleGroup.Item>
      <ToggleGroup.Item value="b">B</ToggleGroup.Item>
      <ToggleGroup.Item value="c">C</ToggleGroup.Item>
    </ToggleGroup.Root>
  )
}
