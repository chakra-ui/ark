import { waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount } from '../../../test-utils.js'
import '@ark-ui/web/file-upload'

const user = userEvent.setup()

const someAsyncWork = () => new Promise((resolve) => setTimeout(resolve))

const textFile = (name: string) => new File([name], name, { type: 'text/plain' })

test('accepted files go through an async transform and custom validation can reject a file', async () => {
  mount((root) => {
    root.innerHTML = /* html */ `<ark-file-upload><ark-file-upload-hidden-input></ark-file-upload-hidden-input></ark-file-upload>`
  })
  const upload = document.querySelector('ark-file-upload')!
  upload.validate = (file) => (file.name === 'reject.txt' ? ['FILE_INVALID'] : null)
  upload.transformFiles = async (files) => {
    await someAsyncWork()
    return files.map((file) => new File([file], `processed-${file.name}`, { type: file.type }))
  }
  const accepted: string[] = []
  const rejected: string[] = []
  upload.addEventListener('filechange', (event) =>
    accepted.push(...event.detail.acceptedFiles.map((file) => file.name)),
  )
  upload.addEventListener('filereject', (event) => rejected.push(...event.detail.files.map((entry) => entry.file.name)))
  await waitFor(() => expect(document.querySelector('input[type=file]')).toBeInTheDocument())
  const input = document.querySelector<HTMLInputElement>('input[type=file]')!

  await user.upload(input, textFile('hello.txt'))

  await waitFor(() => expect(accepted).toContain('processed-hello.txt'))

  await user.upload(input, textFile('reject.txt'))

  await waitFor(() => expect(rejected).toContain('reject.txt'))
})
