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

export const Basic = () => (
  <Select>
    {({ selectedOption }) => (
      <>
        <SelectLabel>Framework:</SelectLabel>
        <SelectTrigger>
          <button>{selectedOption?.label ?? 'Select option'}</button>
        </SelectTrigger>
        <Portal>
          <SelectPositioner>
            <SelectContent>
              <SelectOptionGroup id="framework">
                <SelectOptionGroupLabel htmlFor="framework">Frameworks</SelectOptionGroupLabel>
                <SelectOption value="react" label="React">
                  React
                </SelectOption>
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
