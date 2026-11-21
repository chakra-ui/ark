import { waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import '@ark-ui/web/file-upload'

const user = userEvent.setup()

test('async transformers preserve promises and custom validation returns file errors', async () => {
  document.body.innerHTML = /* html */ `<ark-file-upload><ark-file-upload-hidden-input></ark-file-upload-hidden-input></ark-file-upload>`

  const upload = document.querySelector('ark-file-upload')!
  const accepted: string[] = []
  const rejected: string[] = []

  upload.validate = (file) => (file.name === 'reject.txt' ? ['FILE_INVALID'] : null)
  upload.transformFiles = async (files) => {
    await new Promise((resolve) => setTimeout(resolve, 20))
    return files.map((file) => new File([file], `processed-${file.name}`, { type: file.type }))
  }

  upload.addEventListener('filechange', (event) =>
    accepted.push(...event.detail.acceptedFiles.map((file) => file.name)),
  )
  upload.addEventListener('filereject', (event) => rejected.push(...event.detail.files.map((entry) => entry.file.name)))

  const input = await waitFor(() => {
    const el = document.querySelector<HTMLInputElement>('input[type=file]')
    expect(el).not.toBeNull()
    return el!
  })

  await user.upload(input, new File(['hello'], 'hello.txt', { type: 'text/plain' }))
  await waitFor(() => expect(accepted).toContain('processed-hello.txt'))

  await user.upload(input, new File(['reject'], 'reject.txt', { type: 'text/plain' }))
  await waitFor(() => expect(rejected).toContain('reject.txt'))
})
