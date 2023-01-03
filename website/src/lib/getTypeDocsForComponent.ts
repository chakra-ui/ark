import fs from 'fs-extra'

/**
 * Prerequisite:
 * Run `pnpm run typedocs` in the mono repo root first
 * to generate the json files which contain the type information
 */
export async function getTypeDocsForComponent(framework: string, component: string) {
  const type = {
    accordion: 'AccordionProps',
    checkbox: 'CheckboxProps',
    dialog: 'DialogProps',
    editable: 'EditableProps',
    'hover-card': 'HoverCardProps',
    'number-input': 'NumberInputProps',
    menu: 'MenuProps',
    pagination: 'PaginationProps',
    'pin-input': 'PinInputProps',
    pressable: 'PressableProps',
    popover: 'PopoverProps',
    'radio-group': 'RadioGroupProps',
    'range-slider': 'RangeSliderProps',
    'rating-group': 'RatingGroupProps',
    slider: 'SliderProps',
    tabs: 'TabsProps',
    'tags-input': 'TagsInputProps',
    toast: 'ToastProps',
    tooltip: 'TooltipProps',
  }[component]

  if (!type) {
    return []
  }

  try {
    const file = await fs.readFile(`../packages/${framework}/generated-type-docs/${type}.json`)
    const data: Record<string, { type: string; defaultValue?: string; description?: string }> =
      JSON.parse(file.toString())
    return Object.entries(data).map(([name, value]) => ({ name, ...value }))
  } catch (e) {
    console.error(
      "Couldn't find type docs for component %s/%s",
      framework,
      component,
      (e as any).path,
    )
    return []
  }
}
