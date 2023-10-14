import {
  ForwardRefRenderFunction,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { Drawer, DrawerProps } from "antd";

const SDrawer: ForwardRefRenderFunction<{ toggle: () => void }, DrawerProps> = (
  props: DrawerProps,
  ref
) => {
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    toggle() {
      setOpen(!open);
    },
  }));

  return (
    <Drawer
      {...props}
      open={open}
      onClose={(e) => {
        setOpen(false);
        props?.onClose?.(e);
      }}
    />
  );
};

export default forwardRef(SDrawer);
