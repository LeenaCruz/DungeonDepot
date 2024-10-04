import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
// const axios = require('axios');

// api  
import { useEffect, useState } from "react";
import { getAllSpells } from './api';
import SpellCard from './pages/spellCard';


// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});



function App() {

  const [spells, setSpells] = useState([]);
    useEffect(() => {
    getAllSpells().then(setSpells);
    }, []);

  return (
    <ApolloProvider client={client}>
      <div className="flex-column justify-flex-start min-100-vh">
        <Header />
        <div className="container">
          <Outlet />
        </div>
        <Footer />
      </div>

       
    <div className="inv-items-div">
      <ul className="spell-list">
        {spells.map((spell) => (
          <div className='atc-div'>
          <SpellCard key={spell.index} spell={spell} />
          <button className='ATC-btn-pos'>Add To Cart</button>
          </div>
          ))}
          </ul>
    </div>

    </ApolloProvider>
  );
}

export default App;
