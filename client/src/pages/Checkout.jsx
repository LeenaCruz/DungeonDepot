// import Header from "../components/Header";

import CartItemsComponent from "../components/CartItemsComponent";
import Wallet from "../components/GamingWallet";


const CheckoutPage = () => {
    return (
    <> 
    {/* <Link className="btn btn-lg btn-info m-2" to="/checkout"></Link> */}
    <div className="checkout-page">
        <CartItemsComponent />
        <Wallet />
    </div>
    </>
)
}


export default CheckoutPage;

// How to get the checkout button to link to the checkout component page 
// how to get the add to cart button to link to each individual item and update the cart 
// 
