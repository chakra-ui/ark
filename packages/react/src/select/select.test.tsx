import { render } from '@testing-library/react'
import { Portal } from '@zag-js/react'
import { collection } from '@zag-js/select'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectPositioner,
  SelectTrigger,
  type SelectProps,
} from './'

const ComponentUnderTest = (props: Omit<SelectProps, 'collection'>) => {
  const items = collection({ items: [{ value: 'React' }, { value: 'Solid' }, { value: 'Vue' }] })

  return (
    <Select collection={items} {...props}>
      {(api) => (
        <>
          <SelectLabel>Framework:</SelectLabel>
          <SelectTrigger>{api.hasSelectedItems ? '' : 'Select option'}</SelectTrigger>
          <Portal>
            <SelectPositioner>
              <SelectContent>
                {items.toArray().map((item, id) => (
                  <SelectItem key={id} item={item}>
                    {item.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectPositioner>
          </Portal>
        </>
      )}
    </Select>
  )
}

describe('Select', () => {
  it('should render', async () => {
    render(<ComponentUnderTest />)
  })

  // it('should show options on click', async () => {
  //   render(<ComponentUnderTest />)
  //   expect(screen.getByRole('option', { hidden: true, name: 'Angular' })).not.toBeVisible()
  //   await user.click(screen.getByText('Select option'))
  //   expect(screen.getByRole('option', { name: 'Angular' })).toBeVisible()
  // })

  // it('should allow to select a option', async () => {
  //   render(<ComponentUnderTest />)
  //   expect(screen.getByRole('option', { hidden: true, name: 'Angular' })).not.toBeVisible()
  //   await user.click(screen.getByText('Select option'))
  //   await user.click(screen.getByRole('option', { name: 'Angular' }))

  //   expect(screen.queryByText('Select option')).not.toBeInTheDocument()
  // })
})
