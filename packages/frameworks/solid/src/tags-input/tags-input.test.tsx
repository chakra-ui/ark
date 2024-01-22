import { tagsInputAnatomy } from '@ark-ui/anatomy'
import { render, screen } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { Index } from 'solid-js'
import { getExports, getParts } from '../setup-test'
import { TagsInput, type TagsInputRootProps } from './'

const ComponentUnderTest = (props: TagsInputRootProps) => {
  return (
    <TagsInput.Root value={['react', 'solid', 'vue']} {...props}>
      {(api) => (
        <>
          <TagsInput.Label>Frameworks</TagsInput.Label>
          <TagsInput.Control>
            <Index each={api().value}>
              {(value, index) => (
                <TagsInput.Item index={index} value={value()}>
                  <TagsInput.ItemInput />
                  <TagsInput.ItemText>{value()}</TagsInput.ItemText>
                  <TagsInput.ItemDeleteTrigger>Delete</TagsInput.ItemDeleteTrigger>
                </TagsInput.Item>
              )}
            </Index>
          </TagsInput.Control>
          <TagsInput.Input placeholder="Add tag" />
          <TagsInput.ClearTrigger>Clear all</TagsInput.ClearTrigger>
        </>
      )}
    </TagsInput.Root>
  )
}

describe('TagsInput', () => {
  it.each(getParts(tagsInputAnatomy))('should render part! %s', async (part) => {
    render(() => <ComponentUnderTest />)
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(tagsInputAnatomy))('should export %s', async (part) => {
    expect(TagsInput[part]).toBeDefined()
  })

  it('should allow to add a new item', async () => {
    render(() => <ComponentUnderTest />)
    const input = screen.getByPlaceholderText('Add tag')
    await user.type(input, 'angular')
    await user.keyboard('[Enter]')

    expect(screen.getByText('angular')).toBeInTheDocument()
  })

  it('should allow to add and delete a new item', async () => {
    render(() => <ComponentUnderTest />)
    const input = screen.getByPlaceholderText('Add tag')
    await user.type(input, 'angular')
    await user.keyboard('[Enter]')

    expect(screen.getByText('angular')).toBeInTheDocument()

    await user.keyboard('[ArrowLeft]')
    await user.keyboard('[Delete]')

    expect(screen.queryByText('angular')).not.toBeInTheDocument()
  })

  it('should allow to modify an added item', async () => {
    render(() => <ComponentUnderTest />)
    await user.type(screen.getByPlaceholderText('Add tag'), 'angular')
    await user.keyboard('[Enter]')

    expect(screen.getByText('angular')).toBeInTheDocument()

    await user.keyboard('[ArrowLeft]')
    await user.keyboard('[Enter]')
    await user.keyboard('[Backspace]')

    const input = screen.getByLabelText(
      'Editing tag angular. Press enter to save or escape to cancel.',
    )
    await user.clear(input)
    await user.type(input, 'svelte')
    await user.keyboard('[Enter]')

    expect(await screen.findByText('svelte')).toBeInTheDocument()
  })

  it('should clear all item when clear all button is clicked', async () => {
    render(() => <ComponentUnderTest />)
    expect(screen.getByText('react')).toBeInTheDocument()
    expect(screen.getByText('solid')).toBeInTheDocument()
    expect(screen.getByText('vue')).toBeInTheDocument()
    await user.click(screen.getByText('Clear all'))

    expect(screen.queryByText('react')).not.toBeInTheDocument()
    expect(screen.queryByText('solid')).not.toBeInTheDocument()
    expect(screen.queryByText('vue')).not.toBeInTheDocument()
  })
})
