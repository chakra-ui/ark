import type { Meta } from '@storybook/react'
import { Portal } from '@zag-js/react'
import {
  Select,
  SelectContent,
  SelectLabel,
  SelectOption,
  SelectOptionGroup,
  SelectOptionGroupLabel,
  SelectPositioner,
  SelectTrigger,
} from './'

type SelectType = typeof Select

const meta: Meta<SelectType> = {
  title: 'Select',
  component: Select,
}

export default meta

export const Basic = () => (
  <Select defaultValue={{ label: 'React', value: 'react' }}>
    {({ selectedOption }) => (
      <>
        <SelectLabel>Framework:</SelectLabel>
        <SelectTrigger>{selectedOption?.label ?? 'Select option'}</SelectTrigger>
        <Portal>
          <SelectPositioner>
            <SelectContent>
              <SelectOptionGroup id="framework">
                <SelectOptionGroupLabel htmlFor="framework">Frameworks</SelectOptionGroupLabel>
                <SelectOption value="react" label="React" />
                <SelectOption value="solid" label="Solid">
                  Solid
                </SelectOption>
                <SelectOption value="vue" label="Vue">
                  Vue
                </SelectOption>
              </SelectOptionGroup>
            </SelectContent>
          </SelectPositioner>
        </Portal>
      </>
    )}
  </Select>
)
