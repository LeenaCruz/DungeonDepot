// `import { useQuery } from '@apollo/client';

// import ThoughtList from '../components/ThoughtList';
// // import LandingPage from '../components/LandingPageForm';

// import { QUERY_THOUGHTS } from '../utils/queries'`;
import LandingPage from '../components/LandingPageForm';
import homePage from '../pages/Dashboard';
import { useCartContext } from '../utils/context';
// import homePage from './Dashboard';
// import {useOutletContext} from 'react-router-dom'

const Home = () => {
  // const { loading, data } = useQuery(QUERY_THOUGHTS);
  // const thoughts = data?.thoughts || [];
const {cart, setCart} = useCartContext()
// console.log('aaaaaaa', cartItems, setCartItems)
  return (
    <main>
      <div>
        <homePage />
      </div>

    </main>
  )
};

export default Home;
