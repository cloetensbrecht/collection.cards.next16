import {Pokemon} from '@/alinea/schemas/Pokemon'
import {cms} from '@/cms'
import {Query} from 'alinea'

export default async function PokedexPage() {
  const pokemon = await cms.find({
    type: Pokemon,
    select: {
      title: Query.title,
      number: Pokemon.number
    }
  })
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Number</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {pokemon.map(p => (
            <tr key={p.number}>
              <td>#{p.number}</td>
              <td>{p.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
