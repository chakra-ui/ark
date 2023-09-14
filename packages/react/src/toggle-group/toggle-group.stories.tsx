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
      <ToggleGroup.Toggle value="a">A</ToggleGroup.Toggle>
      <ToggleGroup.Toggle value="b">B</ToggleGroup.Toggle>
      <ToggleGroup.Toggle value="c">C</ToggleGroup.Toggle>
    </ToggleGroup.Root>
  )
}
export const Initialvalue = () => {
  return (
    <ToggleGroup.Root defaultValue={['b']}>
      <ToggleGroup.Toggle value="a">A</ToggleGroup.Toggle>
      <ToggleGroup.Toggle value="b">B</ToggleGroup.Toggle>
      <ToggleGroup.Toggle value="c">C</ToggleGroup.Toggle>
    </ToggleGroup.Root>
  )
}

export const Multiple = () => {
  return (
    <ToggleGroup.Root multiple>
      <ToggleGroup.Toggle value="a">A</ToggleGroup.Toggle>
      <ToggleGroup.Toggle value="b">B</ToggleGroup.Toggle>
      <ToggleGroup.Toggle value="c">C</ToggleGroup.Toggle>
    </ToggleGroup.Root>
  )
}
