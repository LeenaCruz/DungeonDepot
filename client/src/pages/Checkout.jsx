import { useMutation } from "@apollo/client";
import CartItemsComponent from "../components/CartItemsComponent";
import Wallet from "../components/GamingWallet";
import { useCartContext } from "../utils/context";
import { PURCHASE_ITEMS } from "../utils/mutations";
import { QUERY_ME, QUERY_USER } from "../utils/queries";

const CheckoutPage = () => {
    const [purchaseItems, {error}] = useMutation(PURCHASE_ITEMS, {
        refetchQueries: [QUERY_ME]
    })
    const {cart, setCart} = useCartContext()
    async function submitPurchase() {
        await purchaseItems({
            variables: {
                items: cart
            }
        })
        if (!error) {
            setCart([])
        }
    }

    return (
    <> 
    <div className="checkout-page">
        <div className="tHeader"> Items in your Cart </div> 
        <CartItemsComponent />
        <Wallet />

        <button className="purchase-btn" onClick={submitPurchase}>Purchase Items</button>
    </div>
    </>
)
}

export default CheckoutPage;

