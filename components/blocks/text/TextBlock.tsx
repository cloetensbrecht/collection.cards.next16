import {TextBlock as TextBlockSchema} from '@/alinea/blocks/text/TextBlock.schema'
import Ol from '@/components/ol/Ol'
import Paragraph from '@/components/paragraph/Paragraph'
import {Title} from '@/components/title/Title'
import Ul from '@/components/ul/Ul'
import {RichText} from 'alinea/ui'
import Link from 'next/link'
import React from 'react'

const TextBlock: React.FC<TextBlockSchema> = ({text}) => {
  return (
    <div className="max-w-4xl [&_p:has(+h1)]:pb-6 [&_p:has(+h2)]:pb-6 [&_p:has(+h3)]:pb-6 [&_ul:has(+h1)]:pb-6 [&_ul:has(+h2)]:pb-6 [&_ul:has(+h3)]:pb-6 [&_ol:has(+h1)]:pb-6 [&_ol:has(+h2)]:pb-6 [&_ol:has(+h3)]:pb-6">
      <RichText
        doc={text}
        h1={Title.H1}
        h2={Title.H2}
        h3={Title.H3}
        p={Paragraph}
        ul={Ul}
        ol={Ol}
        a={Link}
      />
    </div>
  )
}

export default TextBlock
