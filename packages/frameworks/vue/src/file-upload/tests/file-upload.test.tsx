import { fileUploadAnatomy } from '@ark-ui/anatomy'
import { render } from '@testing-library/vue'
import { FileUpload } from '../'
import { getExports, getParts } from '../../setup-test'
import ComponentUnderTest from './file-upload.test.vue'

describe('FileUpload', () => {
  it.skip.each(getParts(fileUploadAnatomy))('should render part %s', async (part) => {
    render(ComponentUnderTest)
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(fileUploadAnatomy))('should export %s', async (part) => {
    expect(FileUpload[part]).toBeDefined()
  })
})
