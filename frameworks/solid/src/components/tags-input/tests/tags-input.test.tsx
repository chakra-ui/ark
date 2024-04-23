import { tagsInputAnatomy } from '@ark-ui/anatomy'
import { render, screen } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { TagsInput } from '../'
import { getExports, getParts } from '../../../setup-test'
import { ComponentUnderTest } from './basic'

describe('TagsInput', () => {
  it.each(getParts(tagsInputAnatomy))('should render part! %s', async (part) => {
    render(() => <ComponentUnderTest />)

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

    expect(await screen.findByText('angular')).toHaveAttribute('data-scope', 'tags-input')

    await user.type(input, '[ArrowLeft]')
    await user.type(input, '[ArrowLeft]')
    await user.keyboard('[Delete]')

    expect(screen.queryByText('angular')).not.toBeInTheDocument()
  })

  it('should allow to modify an added item', async () => {
    render(() => <ComponentUnderTest />)

    const input = screen.getByPlaceholderText('Add tag')
    await user.type(input, 'angular[enter]')

    expect(screen.getByText('angular')).toBeInTheDocument()

    expect(await screen.findByText('angular')).toHaveAttribute('data-scope', 'tags-input')

    await user.type(input, '[ArrowLeft]')
    await user.type(input, '[ArrowLeft]')
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
