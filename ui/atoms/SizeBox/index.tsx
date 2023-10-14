type SizeBoxProps = {
  width?: string | number;
  height?: string | number;
};
const SizeBox = ({ width, height }: SizeBoxProps) => {
  return <div style={{ width, height }} />;
};

export default SizeBox;
