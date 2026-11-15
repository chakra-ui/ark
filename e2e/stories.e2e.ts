import { expect, test } from '@playwright/test'

interface StoryEntry {
  id: string
  type: 'story' | 'docs'
}

// Stories that render nothing on purpose (code-only snippets)
const EMPTY_STORIES = new Set(['utilities-locale--setup'])

// Failed requests come from stories that fetch remote data; they are not render errors
const IGNORED_CONSOLE = [/Failed to load resource/]

// Tests are collected before Storybook starts, so the stories are split into fixed slices
const SLICES = 4

for (let slice = 0; slice < SLICES; slice++) {
  test(`stories render without errors (${slice + 1}/${SLICES})`, async ({ page, request }) => {
    test.setTimeout(20 * 60_000)

    const index = await (await request.get('/index.json')).json()
    const stories = Object.values(index.entries as Record<string, StoryEntry>)
      .filter((entry) => entry.type === 'story')
      .filter((_, i) => i % SLICES === slice)
    expect(stories.length).toBeGreaterThan(0)

    const failures: string[] = []
    let errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('console', (message) => {
      if (message.type() !== 'error') return
      const text = message.text()
      if (!IGNORED_CONSOLE.some((pattern) => pattern.test(text))) errors.push(text)
    })

    for (const story of stories) {
      await test.step(story.id, async () => {
        errors = []
        await page.goto(`/iframe.html?id=${story.id}&viewMode=story`)
        await page
          .waitForFunction(
            () =>
              document.querySelector('#storybook-root')?.children.length ||
              document.body.classList.contains('sb-show-errordisplay'),
            undefined,
            { timeout: 10_000 },
          )
          .catch(() => {})
        await page.waitForTimeout(250)
        const empty = await page.evaluate(() => !document.querySelector('#storybook-root')?.children.length)
        if (errors.length) failures.push(`${story.id}: ${errors[0].split('\n')[0]}`)
        else if (empty && !EMPTY_STORIES.has(story.id)) failures.push(`${story.id}: rendered nothing`)
      })
    }

    expect(failures, `${failures.length} of ${stories.length} stories failed`).toEqual([])
  })
}
