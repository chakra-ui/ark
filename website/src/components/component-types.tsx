import { Fragment } from 'react'
import { Heading } from '~/components/ui/heading'
import { getFramework } from '~/lib/frameworks'
import { DataAttrTable } from './data-attr-table'
import { EmitsTable } from './emits-table'
import { PropsTable } from './props-table'
import { types } from '.velite'

interface Props {
  id: string
  replace?: Record<string, string>
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
        <Heading as="h3">{key}</Heading>
        <PropsTable properties={types.props} framework={framework} replace={props.replace} />
        <EmitsTable emits={types.emits} />
        <DataAttrTable component={props.id} part={key} replace={props.replace} />
      </Fragment>
    ))
}
