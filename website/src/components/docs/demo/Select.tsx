import { select } from '@/panda/recipes'
import {
  Portal,
  Select,
  SelectContent,
  SelectOption,
  SelectPositioner,
  SelectTrigger,
} from '@ark-ui/react'

export const DemoSelect = () => (
  <Select positioning={{ gutter: 4 }}>
    {({ selectedOption }) => (
      <>
        <SelectTrigger>
          <button className={select()}>{selectedOption?.label ?? 'Select option'}</button>
        </SelectTrigger>
        <Portal>
          <SelectPositioner className={select()}>
            <SelectContent>
              <SelectOption value="react" label="React" />
              <SelectOption value="solid" label="Solid">
                Solid
              </SelectOption>
              <SelectOption value="vue" label="Vue">
                Vue
              </SelectOption>
            </SelectContent>
          </SelectPositioner>
        </Portal>
      </>
    )}
  </Select>
)
