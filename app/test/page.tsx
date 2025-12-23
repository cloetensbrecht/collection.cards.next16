import Book from '@/components/book/Book'

const samplePages = [
  {
    title: 'Chapter 1',
    content:
      'Welcome to the magical world of page flip animations. This component uses framer-motion to create smooth, realistic 3D transitions between pages.',
    color: '#6366f1'
  },
  {
    title: 'Chapter 2',
    content:
      "The animation uses CSS perspective and transform properties combined with framer-motion's spring animations to create a natural, book-like flipping effect.",
    color: '#8b5cf6'
  },
  {
    title: 'Chapter 3',
    content:
      'You can customize the colors, content, and even the animation timing to match your specific needs. The component accepts an array of pages with titles and content.',
    color: '#ec4899'
  },
  {
    title: 'Chapter 4',
    content:
      'The flip direction is tracked to ensure pages always flip in the correct direction - forward pages flip one way, creating a natural reading experience.',
    color: '#f59e0b'
  },
  {
    title: 'Chapter 5',
    content:
      'Notice how you can see two pages at once, just like a real book. The right page flips over to reveal the next spread of pages.',
    color: '#14b8a6'
  },
  {
    title: 'Chapter 6',
    content:
      'Notice how you can see two pages at once, just like a real book. This is just the beginning! You can extend this component with more features like swipe gestures, auto-play, bookmarks, or integrate it with real content from your API.  Notice how you can see two pages at once, just like a real book. This is just the beginning! You can extend this component with more features like swipe gestures, auto-play, bookmarks, or integrate it with real content from your API. Notice how you can see two pages at once, just like a real book. This is just the beginning! You can extend this component with more features like swipe gestures, auto-play, bookmarks, or integrate it with real content from your API.',
    color: '#10b981'
  },
  {
    title: 'The End',
    content:
      'This is just the beginning! You can extend this component with more features like swipe gestures, auto-play, bookmarks, or integrate it with real content from your API.',
    color: '#10b981'
  }
]

export default function Home() {
  return (
    <div className="max-w-6xl w-full">
      <Book
        pages={samplePages.map((p, index) => (
          <div
            key={index}
            className="w-full h-full p-12 flex gap-8 flex-col justify-between"
          >
            <div>
              <h2 className="text-4xl font-bold mb-6">{p.title}</h2>
              <p className="text-lg leading-relaxed">{p.content}</p>
            </div>
            <div className={'flex group-[.is-right]/page:justify-end'}>
              <span className="text-sm">Page {index + 1}</span>
            </div>
          </div>
        ))}
      />
    </div>
  )
}
