import { describe, expect, it } from 'vitest'
import * as anatomy from './anatomy'

describe('package anatomy aggregate', () => {
  it('re-exports avatarAnatomy', async () => {
    expect(anatomy.avatarAnatomy).toBeDefined()
  })

  it('re-exports collapsibleAnatomy', async () => {
    expect(anatomy.collapsibleAnatomy).toBeDefined()
  })

  it('re-exports Batch 4 anatomies', async () => {
    expect(anatomy.colorPickerAnatomy).toBeDefined()
    expect(anatomy.dateInputAnatomy).toBeDefined()
    expect(anatomy.datePickerAnatomy).toBeDefined()
    expect(anatomy.imageCropperAnatomy).toBeDefined()
    expect(anatomy.qrCodeAnatomy).toBeDefined()
    expect(anatomy.signaturePadAnatomy).toBeDefined()
    expect(anatomy.treeViewAnatomy).toBeDefined()
  })

  it('re-exports menuAnatomy', async () => {
    expect(anatomy.menuAnatomy).toBeDefined()
  })

  it('re-exports navigationMenuAnatomy', async () => {
    expect(anatomy.navigationMenuAnatomy).toBeDefined()
  })

  it('re-exports progressAnatomy', async () => {
    expect(anatomy.progressAnatomy).toBeDefined()
  })

  it('re-exports toggleAnatomy', async () => {
    expect(anatomy.toggleAnatomy).toBeDefined()
  })

  it('re-exports tooltipAnatomy', async () => {
    expect(anatomy.tooltipAnatomy).toBeDefined()
  })
})
