'use client'
import {
  accordionAnatomy,
  checkboxAnatomy,
  dialogAnatomy,
  editableAnatomy,
  hoverCardAnatomy,
  menuAnatomy,
  numberInputAnatomy,
  paginationAnatomy,
  pinInputAnatomy,
  popoverAnatomy,
  radioGroupAnatomy,
  rangeSliderAnatomy,
  ratingGroupAnatomy,
  selectAnatomy,
  sliderAnatomy,
  tabsAnatomy,
  tagsInputAnatomy,
  toastAnatomy,
  tooltipAnatomy,
} from '@ark-ui/react'

const anatomyMap = {
  accordion: accordionAnatomy,
  checkbox: checkboxAnatomy,
  dialog: dialogAnatomy,
  editable: editableAnatomy,
  hoverCard: hoverCardAnatomy,
  menu: menuAnatomy,
  numberInput: numberInputAnatomy,
  pagination: paginationAnatomy,
  pinInput: pinInputAnatomy,
  popover: popoverAnatomy,
  radioGroup: radioGroupAnatomy,
  rangeSlider: rangeSliderAnatomy,
  ratingGroup: ratingGroupAnatomy,
  select: selectAnatomy,
  slider: sliderAnatomy,
  tabs: tabsAnatomy,
  toast: toastAnatomy,
  tagsInput: tagsInputAnatomy,
  tooltip: tooltipAnatomy,
}
function getAnatomyStyles(anatomy: keyof typeof anatomyMap) {
  const anatomyBuilder = anatomyMap[anatomy]
  if (!anatomyBuilder) {
    return ''
  }
  const partEntries = Object.entries(anatomyBuilder.build())
  return partEntries.reduce((prev, [partName, part]) => {
    const { selector } = part
    return `${prev}${prev ? '\n' : ''}${selector} {\n  /* add ${partName} styles */\n}\n`
  }, '')
}

interface AnatomyStyleguideProps {
  component: keyof typeof anatomyMap
}

export const AnatomyStyleguide = (props: AnatomyStyleguideProps) => {
  const { component } = props
  const anatomyStyles = getAnatomyStyles(component)

  // how can we render the prism code highlighter here?
  return <pre className="language-css">{anatomyStyles}</pre>
}
