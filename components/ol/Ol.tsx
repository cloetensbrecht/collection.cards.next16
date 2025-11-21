type OlProps = {
  children: React.ReactNode
} & React.HTMLAttributes<HTMLOListElement>

const Ol: React.FC<OlProps> = ({children, ...props}) => {
  return (
    <ol
      className="[&_li]:list-decimal [&_li]:list-outside [&_li]:ml-6 [&_li]:[&_p]:inline pb-3 last:pb-0"
      {...props}
    >
      {children}
    </ol>
  )
}

export default Ol
