// `import { useQuery } from '@apollo/client';

// import ThoughtList from '../components/ThoughtList';
// // import LandingPage from '../components/LandingPageForm';

// import { QUERY_THOUGHTS } from '../utils/queries'`;
import LandingPage from '../components/LandingPageForm';

const Home = () => {
  // const { loading, data } = useQuery(QUERY_THOUGHTS);
  // const thoughts = data?.thoughts || [];

  return (

    <main>
      <div>
        <LandingPage />
      </div>

    </main>
  )
};

export default Home;
