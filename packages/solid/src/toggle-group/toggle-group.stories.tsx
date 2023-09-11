import type { Meta } from 'storybook-solidjs'
import { Toggle, ToggleGroup } from './'
import './toggle-group.css'

type ToggleGroupType = typeof ToggleGroup

const meta: Meta<ToggleGroupType> = {
  title: 'ToggleGroup',
  component: ToggleGroup,
}

export default meta

export const Basic = () => {
  return (
    <ToggleGroup>
      <Toggle value="a">A</Toggle>
      <Toggle value="b">B</Toggle>
      <Toggle value="c">C</Toggle>
    </ToggleGroup>
  )
}

export const Multiple = () => {
  return (
    <ToggleGroup multiple>
      <Toggle value="a">A</Toggle>
      <Toggle value="b">B</Toggle>
      <Toggle value="c">C</Toggle>
    </ToggleGroup>
  )
}

export const Initialvalue = () => {
  return (
    <ToggleGroup value={['b']}>
      <Toggle value="a">A</Toggle>
      <Toggle value="b">B</Toggle>
      <Toggle value="c">C</Toggle>
    </ToggleGroup>
  )
}
