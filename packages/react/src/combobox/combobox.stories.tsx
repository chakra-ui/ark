import type { Meta } from '@storybook/react'
import { collection } from '@zag-js/combobox'
import { Portal } from '..'
import {
  Combobox,
  ComboboxClearTrigger,
  ComboboxContent,
  ComboboxControl,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemGroup,
  ComboboxItemGroupLabel,
  ComboboxLabel,
  ComboboxPositioner,
  ComboboxTrigger,
} from './'
import './combobox.css'

type ComboboxType = typeof Combobox

const meta: Meta<ComboboxType> = {
  title: 'Combobox',
  component: Combobox,
}

export default meta

export const Basic = () => {
  // const [options, setItems] = useState(comboboxData)

  // const handleInputChange: ComboboxProps['onInputChange'] = ({ value }) => {
  //   const filtered = comboboxData.filter((item) =>
  //     item.label.toLowerCase().includes(value.toLowerCase()),
  //   )
  //   setItems(filtered.length > 0 ? filtered : comboboxData)
  // }

  const frameworks = collection({
    items: [{ value: 'React' }, { value: 'Solid' }, { value: 'Vue' }],
  })

  return (
    <Combobox collection={frameworks}>
      {({ isInputValueEmpty, isOpen }) => (
        <>
          <ComboboxLabel>JS Frameworks</ComboboxLabel>
          <ComboboxControl>
            <ComboboxInput />
            <ComboboxTrigger>▼</ComboboxTrigger>
            <ComboboxClearTrigger>Clear</ComboboxClearTrigger>
          </ComboboxControl>
          {isInputValueEmpty && !isOpen && <div>Give me you favorite framework!</div>}
          <Portal>
            <ComboboxPositioner>
              <ComboboxContent>
                <ComboboxItemGroup id="framework">
                  <ComboboxItemGroupLabel htmlFor="framework">Frameworks</ComboboxItemGroupLabel>
                  {frameworks.toArray().map((item) => (
                    <ComboboxItem key={item.value} item={item}>
                      {item.value}
                    </ComboboxItem>
                  ))}
                </ComboboxItemGroup>
              </ComboboxContent>
            </ComboboxPositioner>
          </Portal>
        </>
      )}
    </Combobox>
  )
}
