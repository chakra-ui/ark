import { fileUploadAnatomy } from '@ark-ui/anatomy'
import { render } from '@solidjs/testing-library'
import { getParts } from '../../setup-test'
import { ComponentUnderTest } from './basic'

describe('FileUpload', () => {
  it.each(getParts(fileUploadAnatomy))('should render part! %s', async (part) => {
    render(() => <ComponentUnderTest />)
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(part)).toBeInTheDocument()
  })
})
