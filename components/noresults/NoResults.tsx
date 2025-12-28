import {Title} from '../title/Title'

type NoResultsProps = {
  title?: string
  description?: string
}

const NoResults: React.FC<NoResultsProps> = ({title, description}) => {
  return (
    <div className="m-auto flex max-w-xl flex-1 flex-col items-center gap-6 text-center lg:gap-8 pt-10">
      <div className="section-title-gap-xl flex flex-col items-center text-center">
        <Title.H2>{title || 'No results found'}</Title.H2>
        <p className="text-muted-foreground text-base whitespace-pre">
          {description ||
            'It looks like no cards match your current filter settings. Try adjusting or removing some filters to see more results.'}
        </p>
      </div>
    </div>
  )
}

export default NoResults
