type Property = {
  name: string
  type: String
  default: string
  description: string
}

type TableProps = {
  properties: Property[]
}

export const Table = (props: TableProps) => {
  const { properties } = props

  return (
    <table>
      <thead>
        <tr>
          {['Name', 'Type', 'Default', 'Description'].map((title) => (
            <th key={title}>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {properties.map((property) => (
          <tr key={property.name}>
            <td>{property.name}</td>
            <td>{property.type}</td>
            <td>{property.default}</td>
            <td>{property.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
