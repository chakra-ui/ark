import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { ComponentUnderTest } from './basic.tsx'
import { ComponentUnderTest as LinkComponentUnderTest } from './link.tsx'

describe('Pagination', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(<ComponentUnderTest count={100} pageSize={10} />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should update page when item is clicked', async () => {
    render(<ComponentUnderTest count={100} pageSize={10} />)

    const pageTwoLink = screen.getByLabelText('page 2')
    expect(pageTwoLink).not.toHaveAttribute('aria-current', 'page')

    await user.click(pageTwoLink)
    expect(pageTwoLink).toHaveAttribute('aria-current', 'page')
  })

  it('should update page when next button is clicked', async () => {
    render(<ComponentUnderTest count={100} pageSize={10} />)

    const pageOneLink = screen.getByLabelText('page 1')
    expect(pageOneLink).toHaveAttribute('aria-current', 'page')

    const nextPageLink = screen.getByText(/next/i)
    await user.click(nextPageLink)

    const pageTwoLink = screen.getByLabelText('page 2')
    expect(pageTwoLink).toHaveAttribute('aria-current', 'page')
  })

  it('should update page when prev button is clicked', async () => {
    render(<ComponentUnderTest count={100} pageSize={10} />)

    const pageTwoLink = screen.getByLabelText('page 2')

    await user.click(pageTwoLink)
    expect(pageTwoLink).toHaveAttribute('aria-current', 'page')

    const prevPageLink = screen.getByText(/prev/i)
    await user.click(prevPageLink)

    const pageOneLink = screen.getByLabelText('page 1')
    expect(pageOneLink).toHaveAttribute('aria-current', 'page')
  })

  it('should render items and triggers as buttons by default', async () => {
    render(<ComponentUnderTest count={100} pageSize={10} />)

    expect(screen.getByLabelText('page 2')).toHaveProperty('tagName', 'BUTTON')
    expect(screen.getByText(/next/i)).toHaveProperty('tagName', 'BUTTON')
  })

  it('should render items and triggers as links when type is link', async () => {
    render(<LinkComponentUnderTest count={100} pageSize={10} page={2} />)

    const pageThree = screen.getByLabelText('page 3')
    expect(pageThree).toHaveProperty('tagName', 'A')
    expect(pageThree).toHaveAttribute('href', '/page/3')

    for (const [label, href] of [
      ['first page', '/page/1'],
      ['previous page', '/page/1'],
      ['next page', '/page/3'],
      ['last page', '/page/10'],
    ]) {
      const trigger = screen.getByLabelText(label)
      expect(trigger).toHaveProperty('tagName', 'A')
      expect(trigger).toHaveAttribute('href', href)
    }
  })

  it('should accept anchor attributes on a link-typed trigger', async () => {
    render(<LinkComponentUnderTest count={100} pageSize={10} page={2} />)

    const nextTrigger = screen.getByLabelText('next page')
    expect(nextTrigger).toHaveAttribute('target', '_blank')
    expect(nextTrigger).toHaveAttribute('rel', 'noreferrer')
  })

  it('should have no a11y violations when type is link', async () => {
    const { container } = render(<LinkComponentUnderTest count={100} pageSize={10} page={2} />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
