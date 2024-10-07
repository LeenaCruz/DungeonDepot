import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Inventory  from '../components/InventoryList'

import Auth from '../utils/auth';
import Wallet from '../components/GamingWallet';

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
        // clear form values
    setFormState({
      email: '',
      password: '',
    });
    } catch (e) {
      console.error(e);
    }

  
  };


// Add the inventory list data to have the loading component show when data is pending 
  // const { loading, data } = useQuery(QUERY_SINGLE_THOUGHT, {
  //   // pass URL parameter
  //   variables: { thoughtId: thoughtId },
  // });
  // const thought = data?.thought || {};

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="login-card-header-style">Welcome back</h4>
          <div className="card-body">
            {data ? (
              <p>
                <h3 className='welcome-message'>Check your gaming wallet and add items to your cart!</h3>
                <h4 className='message-pos'> Check the inventory below!</h4> 
                <div> {' '} </div>
                <Link to="/me" className='dashboard-pos'>Open your Dashboard.</Link>


                <div className="col-12 col-lg-10">
                  <div className="card-bord inventory-list">
                    <h4 className="login-card-header-style inv-header">Inventory</h4>
                      <div className="card-body all-inv">

                        <Inventory />
                        
                    </div>
                  </div>
                </div>

                <Wallet />
              </p>



            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-block btn-primary"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
