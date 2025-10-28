type UlProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLUListElement>;

const Ul: React.FC<UlProps> = ({ children, ...props }) => {
  return (
    <ul
      className="[&_li]:list-disc [&_li]:list-outside [&_li]:ml-6 [&_li]:[&_p]:inline pb-3 last:pb-0"
      {...props}
    >
      {children}
    </ul>
  );
};

export default Ul;
