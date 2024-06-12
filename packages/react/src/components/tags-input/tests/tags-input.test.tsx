import { tagsInputAnatomy } from '@ark-ui/anatomy'
import { cleanup, render, screen, waitFor } from '@testing-library/react/pure'
import user from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { TagsInput } from '../'
import { getExports, getParts } from '../../../setup-test'
import { ComponentUnderTest } from './basic'

describe('TagsInput / Parts & Exports', () => {
  afterAll(() => {
    cleanup()
  })

  render(<ComponentUnderTest />)

  it.each(getParts(tagsInputAnatomy))('should render part! %s', async (part) => {
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(tagsInputAnatomy))('should export %s', async (part) => {
    expect(TagsInput[part]).toBeDefined()
  })
})

describe('TagsInput', () => {
  afterEach(() => {
    cleanup()
  })

  it('should have no a11y violations', async () => {
    const { container } = render(<ComponentUnderTest />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should allow to add a new item', async () => {
    render(<ComponentUnderTest />)

    const input = screen.getByPlaceholderText('Add tag')

    await user.type(input, 'angular')
    await user.keyboard('[Enter]')

    expect(screen.getByText('angular')).toBeInTheDocument()
  })

  it('should allow to add and delete a new item', async () => {
    render(<ComponentUnderTest />)
    const input = screen.getByPlaceholderText('Add tag')
    await user.type(input, 'angular[enter]')

    expect(screen.queryByText('angular')).toHaveAttribute('data-part', 'item-text')

    await user.type(input, '[ArrowLeft]', { delay: 10 })
    await waitFor(() => expect(screen.getByText('angular')).toHaveAttribute('data-highlighted', ''))

    await user.type(input, '[Delete]')
    expect(screen.queryByText('angular')).not.toBeInTheDocument()
  })

  it('should allow to modify an added item', async () => {
    render(<ComponentUnderTest />)

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
    render(<ComponentUnderTest />)

    expect(screen.getByText('react')).toBeInTheDocument()
    expect(screen.getByText('solid')).toBeInTheDocument()
    expect(screen.getByText('vue')).toBeInTheDocument()
    await user.click(screen.getByText('Clear all'))

    expect(screen.queryByText('react')).not.toBeInTheDocument()
    expect(screen.queryByText('solid')).not.toBeInTheDocument()
    expect(screen.queryByText('vue')).not.toBeInTheDocument()
  })
})
