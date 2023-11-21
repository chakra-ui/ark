import { fileUploadAnatomy } from '@ark-ui/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

export const fileUpload = defineSlotRecipe({
  className: 'fileUpload',
  slots: fileUploadAnatomy.keys(),
  base: {
    root: {
      background: 'bg.default',
      display: 'flex',
      flexDirection: 'column',
      gap: '4',
      width: '100%',
      maxW: 'lg',
    },
    label: {
      fontWeight: 'medium',
      textStyle: 'sm',
    },
    dropzone: {
      alignItems: 'center',
      borderRadius: 'l3',
      borderWidth: '1px',
      display: 'flex',
      flexDirection: 'column',
      gap: '2',
      justifyContent: 'center',
      minH: '40',
      px: '6',
      py: '4',
    },
    item: {
      animation: 'fadeIn 0.25s ease-out',
      background: 'bg.default',
      borderRadius: 'l3',
      borderWidth: '1px',
      columnGap: '3',
      display: 'grid',
      gridTemplateColumns: 'auto 1fr auto',
      gridTemplateAreas: `
        "preview name delete"
        "preview size delete"
        `,
      p: '4',
    },
    itemGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '3',
    },
    itemName: {
      color: 'fg.default',
      fontWeight: 'medium',
      gridArea: 'name',
      textStyle: 'sm',
    },
    itemSizeText: {
      color: 'fg.muted',
      gridArea: 'size',
      textStyle: 'sm',
    },
    itemDeleteTrigger: {
      alignSelf: 'start',
      gridArea: 'delete',
    },
    itemPreview: {
      aspectRatio: '1',
      gridArea: 'preview',
      height: '10',
      objectFit: 'scale-down',
      width: '10',
    },
  },
})
