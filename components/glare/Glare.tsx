const Glare: React.FC = () => (
  <div
    className="glare w-full h-full mix-blend-overlay will-change-[background-image]"
    style={{
      backgroundImage:
        "radial-gradient(farthest-corner circle at var(--pointer-x) var(--pointer-y), hsla(0, 0%, 100%, .8) 10%, hsla(0, 0%, 100%, .65) 20%, hsla(0, 0%, 0%, .5) 90%)",
    }}
  />
);

export default Glare;
