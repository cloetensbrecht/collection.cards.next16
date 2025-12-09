import {Config, Field, Infer} from 'alinea'
import {defaultBlocks} from '../blocks/Blocks.schema'

export type Pokemon = Infer<typeof Pokemon>

export const Pokemon = Config.type('Pokémon', {
  fields: {
    title: Field.text('Title'),
    path: Field.path('Path', {hidden: true}),
    number: Field.number('Number', {width: 0.2, required: true}),
    icon: Field.image('Icon', {width: 0.8}),
    evolvesFrom: Field.entry('Evolves from', {
      location: {
        workspace: 'main',
        root: 'pages',
        parentId: '36cjRyzFa6sfGCDv5vTu8DBs8vK'
      },
      condition: {_type: 'Pokemon'},
      enableNavigation: false,
      pickChildren: false,
      width: 0.5
    }),
    evolvesTo: Field.entry('Evolves to', {
      location: {
        workspace: 'main',
        root: 'pages',
        parentId: '36cjRyzFa6sfGCDv5vTu8DBs8vK'
      },
      condition: {_type: 'Pokemon'},
      enableNavigation: false,
      pickChildren: false,
      width: 0.5
    }),
    blocks: Field.list('Blocks', {
      schema: defaultBlocks
    })
  },
  insertOrder: 'first'
})
