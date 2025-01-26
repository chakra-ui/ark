import { expect, test } from '@playwright/test'
import { gotoStory, testA11yWithAttachedResults } from '../utils'

// Basic variant tests
test.describe('basic variant', () => {
  test.beforeEach(async ({ page }) => {
    await gotoStory('accordion', 'basic', page)
    await page.getByRole('button', { name: 'What is React?' }).waitFor()
  })
  test('has first item content about React open', async ({ page }) => {
    expect(page.getByRole('button', { name: 'What is React?' })).toHaveAttribute(
      'data-state',
      'open',
    )
    expect(page.getByText('React is a JavaScript library for building user interfaces.')).toBeVisible()
    expect(page).toHaveScreenshot()
  })
  test('has no a11y violations', async ({ page }, testInfo) => {
    const accessibilityScanResults = await testA11yWithAttachedResults(page, testInfo, 'accordion')
    expect(accessibilityScanResults.violations).toEqual([])
  })
  test('toggles content when clicking on another accordion item', async ({ page }) => {
    await page.getByRole('button', { name: 'What is Vue?' }).click()
    expect(page.getByRole('button', { name: 'What is React?' })).toHaveAttribute(
      'data-state',
      'closed',
    )
    expect(page.getByRole('button', { name: 'What is Vue?' })).toHaveAttribute(
      'data-state',
      'open',
    )
    expect(page.getByText('React is a JavaScript library for building user interfaces.')).not.toBeVisible()
    expect(page.getByText('Vue is a JavaScript library for building user interfaces.')).toBeVisible()
    expect(page).toHaveScreenshot()
  })
})

// Render prop variant tests
test.describe('render prop variant', () => {
  test.beforeEach(async ({ page }) => {
    await gotoStory('accordion', 'render-prop', page)
    await page.getByRole('button', { name: 'Closed React' }).waitFor()
  })
  test('has first item content about React closed', async ({ page }) => {
    expect(page.getByRole('button', { name: 'Closed React' })).toHaveAttribute(
      'data-state',
      'closed',
    )
    expect(page).toHaveScreenshot()
  })
  test('has no a11y violations in closed state', async ({ page }, testInfo) => {
    const accessibilityScanResults = await testA11yWithAttachedResults(page, testInfo, 'accordion')
    expect(accessibilityScanResults.violations).toEqual([])
  })
  test('has no a11y violations in open state', async ({ page }, testInfo) => {
    await page.getByRole('button', { name: 'Closed React' }).click()
    const accessibilityScanResults = await testA11yWithAttachedResults(page, testInfo, 'accordion')
    expect(accessibilityScanResults.violations).toEqual([])
  })
  test('toggles content when clicking on the accordion item trigger', async ({ page }) => {
    await page.getByRole('button', { name: 'Closed React' }).click()
    expect(page.getByRole('button', { name: 'Expanded React' })).toHaveAttribute(
      'data-state',
      'open',
    )
    expect(page.getByText('React content')).toBeVisible()
    expect(page).toHaveScreenshot()
  })
  test('toggles content when clicking on another accordion item trigger', async ({ page }) => {
    await page.getByRole('button', { name: 'Closed React' }).click()
    await page.getByRole('button', { name: 'Closed Solid' }).click()
    expect(page.getByRole('button', { name: 'Closed' }).first()).toHaveAttribute(
      'data-state',
      'closed',
    )
    expect(page.getByRole('button', { name: 'Expanded' })).toHaveAttribute(
      'data-state',
      'open',
    )
    expect(page.getByText('React content')).not.toBeVisible()
    expect(page.getByText('Solid content')).toBeVisible()
    expect(page).toHaveScreenshot()
  })
})

// Collapsible variant tests
test.describe('collapsible variant', () => {
  test.beforeEach(async ({ page }) => {
    await gotoStory('accordion', 'collapsible', page)
    await page.getByRole('button', { name: 'What is React?' }).waitFor()
  })
  test('has first item content about React closed', async ({ page }) => {
    expect(page.getByRole('button', { name: 'What is React?' })).toHaveAttribute(
      'data-state',
      'closed',
    )
    expect(page).toHaveScreenshot()
  })
  test('has no a11y violations in closed state', async ({ page }, testInfo) => {
    const accessibilityScanResults = await testA11yWithAttachedResults(page, testInfo, 'accordion')
    expect(accessibilityScanResults.violations).toEqual([])
  })
  test('has no a11y violations in open state', async ({ page }, testInfo) => {
    await page.getByRole('button', { name: 'What is React?' }).click()
    const accessibilityScanResults = await testA11yWithAttachedResults(page, testInfo, 'accordion')
    expect(accessibilityScanResults.violations).toEqual([])
  })
  test('opens the content of the first item when clicking on the accordion item trigger', async ({ page }) => {
    await page.getByRole('button', { name: 'What is React?' }).click()
    expect(page.getByRole('button', { name: 'What is React?' })).toHaveAttribute(
      'data-state',
      'open',
    )
    expect(page.getByText('React is a JavaScript library for building user interfaces.')).toBeVisible()
    expect(page).toHaveScreenshot()
  })
  test('closes the content of the first item when clicking on the accordion item trigger again', async ({ page }) => {
    await page.getByRole('button', { name: 'What is React?' }).click()
    expect(page.getByRole('button', { name: 'What is React?' })).toHaveAttribute(
      'data-state',
      'open',
    )
    await page.getByRole('button', { name: 'What is React?' }).click()
    expect(page.getByRole('button', { name: 'What is React?' })).toHaveAttribute(
      'data-state',
      'closed',
    )
    expect(page.getByText('React is a JavaScript library for building user interfaces.')).not.toBeVisible()
    expect(page).toHaveScreenshot()
  })
  test('closes the content of the first item when clicking on the accordion item trigger of the second item', async ({ page }) => {
    await page.getByRole('button', { name: 'What is React?' }).click()
    expect(page.getByRole('button', { name: 'What is React?' })).toHaveAttribute(
      'data-state',
      'open',
    )
    await page.getByRole('button', { name: 'What is Solid?' }).click()
    expect(page.getByRole('button', { name: 'What is React?' })).toHaveAttribute(
      'data-state',
      'closed',
    )
    expect(page.getByText('React is a JavaScript library for building user interfaces.')).not.toBeVisible()
    expect(page.getByRole('button', { name: 'What is Solid?' })).toHaveAttribute(
      'data-state',
      'open',
    )
    expect(page.getByText('Solid is a JavaScript library for building user interfaces.')).toBeVisible()
    expect(page).toHaveScreenshot()
  })
})

// Multiple items variant tests
test.describe('multiple variant', () => {
  test.beforeEach(async ({ page }) => {
    await gotoStory('accordion', 'multiple', page)
    await page.getByRole('button', { name: 'What is React?' }).waitFor()
  })
  test('has first item content about React closed', async ({ page }) => {
    expect(page.getByRole('button', { name: 'What is React?' })).toHaveAttribute(
      'data-state',
      'closed',
    )
    expect(page).toHaveScreenshot()
  })
  test('has no a11y violations in closed state', async ({ page }, testInfo) => {
    const accessibilityScanResults = await testA11yWithAttachedResults(page, testInfo, 'accordion')
    expect(accessibilityScanResults.violations).toEqual([])
  })
  test('has no a11y violations in open state', async ({ page }, testInfo) => {
    await page.getByRole('button', { name: 'What is React?' }).click()
    const accessibilityScanResults = await testA11yWithAttachedResults(page, testInfo, 'accordion')
    expect(accessibilityScanResults.violations).toEqual([])
  })
  test('opens the content of the first item when clicking on the accordion item trigger', async ({ page }) => {
    await page.getByRole('button', { name: 'What is React?' }).click()
    expect(page.getByRole('button', { name: 'What is React?' })).toHaveAttribute(
      'data-state',
      'open',
    )
    expect(page.getByText('React is a JavaScript library for building user interfaces.')).toBeVisible()
    expect(page).toHaveScreenshot()
  })
  test('closes the content of the first item when clicking on the accordion item trigger again', async ({ page }) => {
    await page.getByRole('button', { name: 'What is React?' }).click()
    expect(page.getByRole('button', { name: 'What is React?' })).toHaveAttribute(
      'data-state',
      'open',
    )
    await page.getByRole('button', { name: 'What is React?' }).click()
    expect(page.getByRole('button', { name: 'What is React?' })).toHaveAttribute(
      'data-state',
      'closed',
    )
    expect(page.getByText('React is a JavaScript library for building user interfaces.')).not.toBeVisible()
    expect(page).toHaveScreenshot()
  })
  test('opens multiple content items of the accordion', async ({ page }) => {
    await page.getByRole('button', { name: 'What is React?' }).click()
    await page.getByRole('button', { name: 'What is Solid?' }).click()

    expect(page.getByRole('button', { name: 'What is React?' })).toHaveAttribute(
      'data-state',
      'open',
    )
    expect(page.getByRole('button', { name: 'What is Solid?' })).toHaveAttribute(
      'data-state',
      'open',
    )
    expect(page.getByText('React is a JavaScript library for building user interfaces.')).toBeVisible()
    expect(page.getByText('Solid is a JavaScript library for building user interfaces.')).toBeVisible()
    expect(page).toHaveScreenshot()
  })
})

// Controlled variant tests
test.describe('controlled variant', () => {
  test.beforeEach(async ({ page }) => {
    await gotoStory('accordion', 'controlled', page)
    await page.getByRole('button', { name: 'React trigger' }).waitFor()
  })
  test('has first item content about React open', async ({ page }) => {
    expect(page.getByRole('button', { name: 'React trigger' })).toHaveAttribute(
      'data-state',
      'open',
    )
    expect(page.getByText('React content')).toBeVisible()
    expect(page).toHaveScreenshot()
  })
  test('has no a11y violations', async ({ page }, testInfo) => {
    const accessibilityScanResults = await testA11yWithAttachedResults(page, testInfo, 'accordion')
    expect(accessibilityScanResults.violations).toEqual([])
  })
  test('toggles content when clicking on another accordion item', async ({ page }) => {
    await page.getByRole('button', { name: 'Vue trigger' }).click()
    expect(page.getByRole('button', { name: 'React trigger' })).toHaveAttribute(
      'data-state',
      'closed',
    )
    expect(page.getByRole('button', { name: 'Vue trigger' })).toHaveAttribute(
      'data-state',
      'open',
    )
    expect(page.getByText('React content')).not.toBeVisible()
    expect(page.getByText('Vue content')).toBeVisible()
    expect(page).toHaveScreenshot()
  })
})

// Vertical variant tests
test.describe('Vertical variant', () => {
  test.beforeEach(async ({ page }) => {
    await gotoStory('accordion', 'vertical', page)
    await page.getByRole('button', { name: 'React trigger' }).waitFor()
  })
  test('has data orientation attribute set to vertical', async ({ page }) => {
    expect(page.getByRole('button', { name: 'React trigger' })).toHaveAttribute(
      'data-orientation',
      'vertical',
    )
    expect(page).toHaveScreenshot()
  })
  test('has no a11y violations', async ({ page }, testInfo) => {
    const accessibilityScanResults = await testA11yWithAttachedResults(page, testInfo, 'accordion')
    expect(accessibilityScanResults.violations).toEqual([])
  })
})

// Horizontal variant tests
test.describe('Horizontal variant', () => {
  test.beforeEach(async ({ page }) => {
    await gotoStory('accordion', 'horizontal', page)
    await page.getByRole('button', { name: 'What is React?' }).waitFor()
  })
  test('has data orientation attribute set to horizontal', async ({ page }) => {
    expect(page.getByRole('button', { name: 'What is React?' })).toHaveAttribute(
      'data-orientation',
      'horizontal',
    )
    expect(page).toHaveScreenshot()
  })
  test('has no a11y violations', async ({ page }, testInfo) => {
    const accessibilityScanResults = await testA11yWithAttachedResults(page, testInfo, 'accordion')
    expect(accessibilityScanResults.violations).toEqual([])
  })
})

// Disabled variant tests
test.describe('disabled variant', () => {
  test.beforeEach(async ({ page }) => {
    await gotoStory('accordion', 'disabled', page)
    await page.getByRole('button', { name: 'React trigger' }).waitFor()
  })
  test('has no a11y violations', async ({ page }, testInfo) => {
    const accessibilityScanResults = await testA11yWithAttachedResults(page, testInfo, 'accordion')
    expect(accessibilityScanResults.violations).toEqual([])
  })
  test('second trigger item for Solid is disabled', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Solid trigger' })).toBeDisabled()
    expect(page.getByRole('button', { name: 'Solid trigger' })).toHaveAttribute(
      'disabled',
    )
    expect(page.getByRole('button', { name: 'Solid trigger' })).toHaveAttribute(
      'aria-disabled',
      'true',
    )
    expect(page).toHaveScreenshot()
  })
})

// Closed variant tests
test.describe('closed variant', () => {
  test.beforeEach(async ({ page }) => {
    await gotoStory('accordion', 'closed', page)
    await page.getByRole('button', { name: 'What is React?' }).waitFor()
  })
  test('has first item content about React closed', async ({ page }) => {
    expect(page.getByRole('button', { name: 'What is React?' })).toHaveAttribute(
      'data-state',
      'closed',
    )
    expect(page).toHaveScreenshot()
  })
  test('has no a11y violations', async ({ page }, testInfo) => {
    const accessibilityScanResults = await testA11yWithAttachedResults(page, testInfo, 'accordion')
    expect(accessibilityScanResults.violations).toEqual([])
  })
})

// Root provider variant tests
test.describe('Root provider variant', () => {
  test.beforeEach(async ({ page }) => {
    await gotoStory('accordion', 'root-provider', page)
    await page.getByRole('button', { name: 'What is React?' }).waitFor()
  })
  test('has first item content about React open', async ({ page }) => {
    expect(page.getByRole('button', { name: 'What is React?' })).toHaveAttribute(
      'data-state',
      'open',
    )
    expect(page).toHaveScreenshot()
  })
  test('should open the Vue item content when the set value button is clicked', async ({ page }) => {
    await page.getByRole('button', { name: 'Set to Vue' }).click()
    expect(page.getByRole('button', { name: 'What is React?' })).toHaveAttribute(
      'data-state',
      'closed',
    )
    expect(page.getByRole('button', { name: 'What is Vue?' })).toHaveAttribute(
      'data-state',
      'open',
    )
    expect(page.getByText('React is a JavaScript library for building user interfaces.')).not.toBeVisible()
    expect(page.getByText('Vue is a JavaScript library for building user interfaces.')).toBeVisible()
    expect(page).toHaveScreenshot()
  })
  test('has no a11y violations', async ({ page }, testInfo) => {
    const accessibilityScanResults = await testA11yWithAttachedResults(page, testInfo, 'accordion')
    expect(accessibilityScanResults.violations).toEqual([])
  })
})

// Context focusedValue variant tests
test.describe('Context focusedValue variant', () => {
  test.beforeEach(async ({ page }) => {
    await gotoStory('accordion', 'context-focusedValue', page)
    await page.getByRole('button', { name: 'What is React?' }).waitFor()
  })
  test('has first item content about React open and focused item empty', async ({ page }) => {
    expect(page.getByRole('button', { name: 'What is React?' })).toHaveAttribute(
      'data-state',
      'open',
    )
    expect(page.getByText('Focused item:')).toBeVisible()
    expect(page).toHaveScreenshot()
  })
  test('has no a11y violations', async ({ page }, testInfo) => {
    const accessibilityScanResults = await testA11yWithAttachedResults(page, testInfo, 'accordion')
    expect(accessibilityScanResults.violations).toEqual([])
  })
  test('has first item content about React focused and focused item set to React', async ({ page }) => {
    await page.getByRole('button', { name: 'What is React?' }).focus()
    expect(page.getByText('Focused item: React')).toBeVisible()
    expect(page).toHaveScreenshot()
  })
})

// Context value variant tests
test.describe('Context value variant', () => {
  test.beforeEach(async ({ page }) => {
    await gotoStory('accordion', 'context-value', page)
    await page.getByRole('button', { name: 'What is React?' }).waitFor()
  })
  test('has first item content about React open and context value set to React', async ({ page }) => {
    expect(page.getByRole('button', { name: 'What is React?' })).toHaveAttribute(
      'data-state',
      'open',
    )
    expect(page.getByText('Selected items: React')).toBeVisible()
    expect(page).toHaveScreenshot()
  })
  test('has no a11y violations', async ({ page }, testInfo) => {
    const accessibilityScanResults = await testA11yWithAttachedResults(page, testInfo, 'accordion')
    expect(accessibilityScanResults.violations).toEqual([])
  })
  test('has item content about Vue clicked and context value set to Vue', async ({ page }) => {
    await page.getByRole('button', { name: 'What is Vue?' }).click()
    expect(page.getByText('Selected items: Vue')).toBeVisible()
    expect(page).toHaveScreenshot()
  })
})

// Context set value variant tests
test.describe('Context set value variant', () => {
  test.beforeEach(async ({ page }) => {
    await gotoStory('accordion', 'context-set-value', page)
    await page.getByRole('button', { name: 'What is React?' }).waitFor()
  })
  test('has first item content about React open', async ({ page }) => {
    expect(page.getByRole('button', { name: 'What is React?' })).toHaveAttribute(
      'data-state',
      'open',
    )
    expect(page).toHaveScreenshot()
  })
  test('should open the Vue item content when the set value button is clicked', async ({ page }) => {
    await page.getByRole('button', { name: 'Select Vue' }).click()
    expect(page.getByRole('button', { name: 'What is React?' })).toHaveAttribute(
      'data-state',
      'closed',
    )
    expect(page.getByRole('button', { name: 'What is Vue?' })).toHaveAttribute(
      'data-state',
      'open',
    )
    expect(page.getByText('React is a JavaScript library for building user interfaces.')).not.toBeVisible()
    expect(page.getByText('Vue is a JavaScript library for building user interfaces.')).toBeVisible()
    expect(page).toHaveScreenshot()
  })
  test('has no a11y violations', async ({ page }, testInfo) => {
    const accessibilityScanResults = await testA11yWithAttachedResults(page, testInfo, 'accordion')
    expect(accessibilityScanResults.violations).toEqual([])
  })
})

// Context get item state value variant tests
test.describe('Context get item state value variant', () => {
  test.beforeEach(async ({ page }) => {
    await gotoStory('accordion', 'context-get-item-state', page)
    await page.getByRole('button', { name: 'What is React?' }).waitFor()
  })
  test('has first item content about React open and Vue item state to not disabled, not expanded and not focused', async ({ page }) => {
    expect(page.getByRole('button', { name: 'What is React?' })).toHaveAttribute(
      'data-state',
      'open',
    )
    expect(page.getByText('Vue State:Disabled: NExpanded: NFocused: N')).toBeVisible()
    expect(page).toHaveScreenshot()
  })
  test('has no a11y violations', async ({ page }, testInfo) => {
    const accessibilityScanResults = await testA11yWithAttachedResults(page, testInfo, 'accordion')
    expect(accessibilityScanResults.violations).toEqual([])
  })
  test('has item content about Vue clicked and Vue item state to expanded and focussed', async ({ page }) => {
    await page.getByRole('button', { name: 'What is Vue?' }).click()
    expect(page.getByText('Vue State:Disabled: NExpanded: YFocused: Y')).toBeVisible()
    expect(page).toHaveScreenshot()
  })
  test('has item trigger about Vue focused and Vue item state to expanded and focussed', async ({ page }) => {
    await page.getByRole('button', { name: 'What is Vue?' }).focus()
    expect(page.getByText('Vue State:Disabled: NExpanded: NFocused: Y')).toBeVisible()
    expect(page).toHaveScreenshot()
  })
})