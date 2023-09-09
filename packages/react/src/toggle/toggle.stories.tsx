import type { Meta } from '@storybook/react'
import { Toggle } from './toggle'
import './toggle.css'

type ToggleType = typeof Toggle

const meta: Meta<ToggleType> = {
  title: 'Toggle',
  component: Toggle,
}

export default meta

export const Basic = () => {
  return <Toggle onChange={(e) => console.log('e', e)}>B</Toggle>
}
