import { Fragment } from 'react'
import { Code } from '~/components/ui/code'
import { Heading } from '~/components/ui/heading'
import { Text } from '~/components/ui/text'
import { getFramework } from '~/lib/frameworks'
import { CssVarTable } from './css-var-table'
import { DataAttrTable } from './data-attr-table'
import { EmitsTable } from './emits-table'
import { PropsTable } from './props-table'
import { types } from '.velite'

interface Props {
  id: string
  replace?: Record<string, string>
}

const elementToTag = (element: string): string => {
  const tagMap: Record<string, string> = {
    HTMLDivElement: 'div',
    HTMLButtonElement: 'button',
    HTMLInputElement: 'input',
    HTMLLabelElement: 'label',
    HTMLSpanElement: 'span',
    HTMLHeadingElement: 'h2',
    HTMLParagraphElement: 'p',
    HTMLTableElement: 'table',
    HTMLFormElement: 'form',
    HTMLSelectElement: 'select',
    HTMLTextAreaElement: 'textarea',
    HTMLAnchorElement: 'a',
    HTMLImageElement: 'img',
    HTMLCanvasElement: 'canvas',
    HTMLVideoElement: 'video',
    HTMLAudioElement: 'audio',
    HTMLIFrameElement: 'iframe',
    HTMLUListElement: 'ul',
    HTMLOListElement: 'ol',
    HTMLLIElement: 'li',
    HTMLTableRowElement: 'tr',
    HTMLTableCellElement: 'td',
    HTMLTableSectionElement: 'tbody',
    HTMLOptionElement: 'option',
    HTMLOutputElement: 'output',
    SVGSVGElement: 'svg',
  }
  return tagMap[element] || element.replace('HTML', '').replace('Element', '').toLowerCase()
}

export const ComponentTypes = async (props: Props) => {
  const framework = await getFramework()
  const api = types.find((type) => type.component === props.id && type.framework === framework)

  if (!api) {
    return null
  }

  return Object.entries(api.parts)
    .sort(([key]) => (key === 'Root' ? -1 : 1))
    .map(([key, types]) => (
      <Fragment key={key}>
        <Heading as="h3" size="xl">
          {key}
        </Heading>
        {types.element && (
          <Text color="fg.muted">
            Renders a <Code size="sm">{`<${elementToTag(types.element)}>`}</Code> element.
          </Text>
        )}
        <PropsTable properties={types.props} framework={framework} replace={props.replace} />
        <EmitsTable emits={types.emits} />
        <DataAttrTable component={props.id} part={key} replace={props.replace} />
        <CssVarTable component={props.id} part={key} replace={props.replace} />
      </Fragment>
    ))
}
