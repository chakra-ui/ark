import type { RecipeConfig, RecipeVariantRecord, SlotRecipeConfig } from '@pandacss/dev'
import { accordion } from './accordion'
import { alert } from './alert'
import { avatar } from './avatar'
import { badge } from './badge'
import { button } from './button'
import { card } from './card'
import { carousel } from './carousel'
import { checkbox } from './checkbox'
import { clipboard } from './clipboard'
import { code } from './code'
import { collapsible } from './collapsible'
import { colorPicker } from './color-picker'
import { combobox } from './combobox'
import { datePicker } from './date-picker'
import { dialog } from './dialog'
import { drawer } from './drawer'
import { editable } from './editable'
import { field } from './field'
import { fieldset } from './fieldset'
import { fileUpload } from './file-upload'
import { formLabel } from './form-label'
import { hoverCard } from './hover-card'
import { icon } from './icon'
import { input } from './input'
import { kbd } from './kbd'
import { layout } from './layout'
import { link } from './link'
import { menu } from './menu'
import { numberInput } from './number-input'
import { pagination } from './pagination'
import { pinInput } from './pin-input'
import { popover } from './popover'
import { progress } from './progress'
import { qrCode } from './qr-code'
import { radioButtonGroup } from './radio-button-group'
import { radioGroup } from './radio-group'
import { ratingGroup } from './rating-group'
import { segmentGroup } from './segment-group'
import { select } from './select'
import { signaturePad } from './signature-pad'
import { skeleton } from './skeleton'
import { slider } from './slider'
import { spinner } from './spinner'
import { splitter } from './splitter'
import { switchRecipe } from './switch'
import { table } from './table'
import { tabs } from './tabs'
import { tagsInput } from './tags-input'
import { text } from './text'
import { textarea } from './textarea'
import { toast } from './toast'
import { toggleGroup } from './toggle-group'
import { tooltip } from './tooltip'
import { tour } from './tour'
import { treeView } from './tree-view'

export const recipes: Record<string, Partial<RecipeConfig<RecipeVariantRecord>>> = {
  badge,
  button,
  code,
  formLabel,
  icon,
  input,
  kbd,
  link,
  skeleton,
  spinner,
  textarea,
  text,
}

export const slotRecipes: Record<string, Partial<SlotRecipeConfig>> = {
  accordion,
  alert,
  avatar,
  card,
  carousel,
  checkbox,
  clipboard,
  collapsible,
  colorPicker,
  combobox,
  datePicker,
  dialog,
  drawer,
  editable,
  field,
  fieldset,
  fileUpload,
  hoverCard,
  layout,
  menu,
  numberInput,
  pagination,
  pinInput,
  popover,
  progress,
  radioButtonGroup,
  radioGroup,
  ratingGroup,
  segmentGroup,
  select,
  signaturePad,
  slider,
  splitter,
  switchRecipe,
  table,
  tabs,
  tagsInput,
  toast,
  toggleGroup,
  tooltip,
  tour,
  treeView,
  qrCode,
}
