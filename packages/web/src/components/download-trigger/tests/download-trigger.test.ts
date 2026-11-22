import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../../../../examples/download-trigger/basic.js'
import { mount } from '../../../test-utils.js'

import '@ark-ui/web/download-trigger'

const user = userEvent.setup()

let controller = new AbortController()

function captureDownloads() {
  const downloads: { name: string; blob: Blob }[] = []
  const blobs = new Map<string, Blob>()

  vi.spyOn(URL, 'createObjectURL').mockImplementation((blob) => {
    const url = `blob:${blobs.size}`
    blobs.set(url, blob as Blob)
    return url
  })
  vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {})

  document.addEventListener(
    'click',
    (event) => {
      if (!(event.target instanceof HTMLAnchorElement) || !event.target.download) return
      event.preventDefault()
      downloads.push({ name: event.target.download, blob: blobs.get(event.target.href)! })
    },
    { capture: true, signal: controller.signal },
  )

  return downloads
}

afterEach(() => {
  controller.abort()
  controller = new AbortController()
  vi.restoreAllMocks()
})

test('clicking the button downloads the data with its file name and type', async () => {
  const downloads = captureDownloads()
  mount(Basic)

  await user.click(screen.getByRole('button', { name: 'Download txt' }))

  await vi.waitFor(() => expect(downloads).toHaveLength(1))
  expect(downloads[0].name).toBe('hello.txt')
  expect(downloads[0].blob.type).toBe('text/plain')
  expect(await downloads[0].blob.text()).toBe('Hello, World! This is a sample text file.')
})

test('data from an async function is awaited before downloading', async () => {
  const downloads = captureDownloads()
  document.body.innerHTML = /* html */ `
    <ark-download-trigger file-name="report.csv" mime-type="text/csv"><button>Export</button></ark-download-trigger>`
  document.querySelector('ark-download-trigger')!.data = async () => 'a,b\n1,2'

  await user.click(screen.getByRole('button', { name: 'Export' }))

  await vi.waitFor(() => expect(downloads).toHaveLength(1))
  expect(downloads[0].name).toBe('report.csv')
  expect(await downloads[0].blob.text()).toBe('a,b\n1,2')
})

test('a click handler can prevent the download', async () => {
  const downloads = captureDownloads()
  mount(Basic)
  screen.getByRole('button').addEventListener('click', (event) => event.preventDefault())

  await user.click(screen.getByRole('button', { name: 'Download txt' }))

  expect(downloads).toEqual([])
  expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
})
