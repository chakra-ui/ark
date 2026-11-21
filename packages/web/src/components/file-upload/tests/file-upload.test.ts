import { expect, test } from '@playwright/test'
import type {} from '../../../index.js'

test.beforeEach(async ({ page }) => {
  await page.goto('/test-fixtures/index.html')
})

test('async transformers preserve promises and custom validation returns file errors', async ({ page }) => {
  await page.setContent(
    /* html */ `<ark-file-upload><ark-file-upload-hidden-input></ark-file-upload-hidden-input></ark-file-upload>`,
  )
  await page.evaluate(() => {
    const upload = document.querySelector('ark-file-upload')!
    upload.validate = (file) => (file.name === 'reject.txt' ? ['FILE_INVALID'] : null)
    upload.transformFiles = async (files) => {
      await new Promise((resolve) => setTimeout(resolve, 20))
      return files.map((file) => new File([file], `processed-${file.name}`, { type: file.type }))
    }
    const accepted: string[] = []
    const rejected: string[] = []
    upload.addEventListener('filechange', (event) =>
      accepted.push(...event.detail.acceptedFiles.map((file) => file.name)),
    )
    upload.addEventListener('filereject', (event) =>
      rejected.push(...event.detail.files.map((entry) => entry.file.name)),
    )
    Object.assign(window, { accepted, rejected })
  })
  await page
    .locator('input[type=file]')
    .setInputFiles({ name: 'hello.txt', mimeType: 'text/plain', buffer: Buffer.from('hello') })
  await expect.poll(() => page.evaluate(() => (window as any).accepted)).toContain('processed-hello.txt')
  await page
    .locator('input[type=file]')
    .setInputFiles({ name: 'reject.txt', mimeType: 'text/plain', buffer: Buffer.from('reject') })
  await expect.poll(() => page.evaluate(() => (window as any).rejected)).toContain('reject.txt')
})
