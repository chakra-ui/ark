import { Portal } from '@ark-ui/react'
import { FiChevronDown } from 'react-icons/fi'
import { HStack } from 'styled-system/jsx'
import { Button } from '~/components/ui/button'
import {
  Select,
  SelectContent,
  SelectOption,
  SelectPositioner,
  SelectTrigger,
  type SelectProps,
} from '~/components/ui/select'

export const SelectDemo = (props: SelectProps) => {
  return (
    <Select positioning={{ sameWidth: true }} {...props}>
      {({ selectedOption, isOpen }) => (
        <>
          <SelectTrigger asChild>
            <Button variant="secondary" minW="252px">
              <HStack justify="space-between" flex="1" fontWeight="medium">
                {selectedOption?.label ?? 'Select Framework'}
                <SelectIcon isOpen={isOpen} />
              </HStack>
            </Button>
          </SelectTrigger>
          <Portal>
            <SelectPositioner>
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
}

const SelectIcon = (props: { isOpen: boolean }) => {
  const iconStyles = {
    transform: props.isOpen ? 'rotate(-180deg)' : undefined,
    transition: 'transform 0.2s',
    transformOrigin: 'center',
    fontSize: '18px',
  }
  return <FiChevronDown style={iconStyles} />
}
