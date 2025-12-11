import {Pokemon} from '@/alinea/schemas/Pokemon'
import {cms} from '@/cms'
import {Query} from 'alinea'
import Link from 'next/link'

export default async function PokedexPage() {
  const pokemon = await cms.find({
    type: Pokemon,
    select: {
      number: Pokemon.number,
      title: Query.title,
      url: Query.url
    },
    orderBy: {
      asc: Pokemon.number
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
              <td>
                <Link href={p.url}>{p.title}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
