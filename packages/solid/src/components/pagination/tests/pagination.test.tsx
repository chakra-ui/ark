import { render, screen } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { ComponentUnderTest } from './basic.tsx'
import { ComponentUnderTest as LinkComponentUnderTest } from './link.tsx'

describe('Pagination', () => {
  it('should update page when item is clicked', async () => {
    render(() => <ComponentUnderTest count={100} pageSize={10} />)
    expect(screen.getByLabelText('page 2')).not.toHaveAttribute('aria-current', 'page')

    await user.click(screen.getByLabelText('page 2'))
    expect(screen.getByLabelText('page 2')).toHaveAttribute('aria-current', 'page')
  })

  it('should update page when next button is clicked', async () => {
    render(() => <ComponentUnderTest count={100} pageSize={10} />)
    expect(screen.getByLabelText('page 1')).toHaveAttribute('aria-current', 'page')

    await user.click(screen.getByText(/next/i))
    expect(screen.getByLabelText('page 2')).toHaveAttribute('aria-current', 'page')
  })

  it('should update page when prev button is clicked', async () => {
    render(() => <ComponentUnderTest count={100} pageSize={10} />)

    await user.click(screen.getByLabelText('page 2'))
    expect(screen.getByLabelText('page 2')).toHaveAttribute('aria-current', 'page')

    await user.click(screen.getByText(/prev/i))
    expect(screen.getByLabelText('page 1')).toHaveAttribute('aria-current', 'page')
  })

  it('should render items and triggers as buttons by default', async () => {
    render(() => <ComponentUnderTest count={100} pageSize={10} />)

    expect(screen.getByLabelText('page 2')).toHaveProperty('tagName', 'BUTTON')
    expect(screen.getByText(/next/i)).toHaveProperty('tagName', 'BUTTON')
  })

  it('should render items and triggers as links when type is link', async () => {
    render(() => <LinkComponentUnderTest count={100} pageSize={10} page={2} />)

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
    render(() => <LinkComponentUnderTest count={100} pageSize={10} page={2} />)

    const nextTrigger = screen.getByLabelText('next page')
    expect(nextTrigger).toHaveAttribute('target', '_blank')
    expect(nextTrigger).toHaveAttribute('rel', 'noreferrer')
  })
})
