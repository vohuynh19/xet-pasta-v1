import { Button } from "ui/atoms";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { theme } from "styles";

interface CartProps {
  cartItemNumber: number;
}

const Cart = ({ cartItemNumber }: CartProps) => {
  return (
    <Button style={{ padding: 4 }} type="text" icon={<ShoppingCartIcon />}>
      ({cartItemNumber})
    </Button>
  );
};

export default Cart;
