import {
  Portal,
  Select,
  SelectContent,
  SelectOption,
  SelectPositioner,
  SelectTrigger,
} from '@ark-ui/react'
import { select } from '../../../panda/recipes'
import { Input } from '../shared/Input'

export const DemoSelect = () => (
  <Select positioning={{ gutter: 4 }}>
    {({ selectedOption }) => (
      <>
        <SelectTrigger>
          <Input
            variant="outline"
            size="md"
            width="xs"
            cursor="pointer"
            value={selectedOption?.label ?? 'Select option'}
          />
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
