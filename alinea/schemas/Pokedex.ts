import {Config, Field, Infer} from 'alinea'
import {defaultBlocks} from '../blocks/Blocks.schema'
import {Pokemon} from './Pokemon'

export type Pokedex = Infer<typeof Pokedex>

export const Pokedex = Config.type('Pokédex', {
  fields: {
    title: Field.text('Title'),
    path: Field.path('Path', {hidden: true}),
    blocks: Field.list('Blocks', {
      schema: defaultBlocks
    })
  },
  contains: ['Pokemon'],
  orderChildrenBy: {desc: Pokemon.number}
})
