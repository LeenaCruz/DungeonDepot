// import Header from "../components/Header";

import CartItemsComponent from "../components/CartItemsComponent";
import Wallet from "../components/GamingWallet";


const CheckoutPage = () => {
    return (
    <> 
    <div className="checkout-page">
        <CartItemsComponent />
        <Wallet />
    </div>
    </>
)
}


export default CheckoutPage;

