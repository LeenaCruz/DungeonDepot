// import { Navigate, useParams } from 'react-router-dom';
// import { useQuery } from '@apollo/client';

// import BeginForm from '../components/LandingPageForm';
// import ThoughtList from '../components/ThoughtList';

// import { QUERY_USER, QUERY_ME } from '../utils/queries';

// import Auth from '../utils/auth';
// We didnt have bootstrap installed
// import 'bootstrap/dist/css/bootstrap.min.css';

const homePage = () => {
  return (
    <div className="container">
      <div className="row mb-3">
        <div className="col-md-3 col-sm-12" >
          {/* Side box define style  */}
          <div className="sideBox"> <h4> User Inventory or Current Shop</h4>
            <div> Wallet:</div>
            <div>$000</div>
          </div>
        </div>
        <div className=" col-md-6 col-sm-12">
  <div className="contentBox">
    <div> "Name of the GameMaster's" Shop</div>
    <div> Stores </div>
  </div>
</div>
<div className="col-md-3 col-sm-12"> 
  <div className="sideBox"> 
    <h4>Cart</h4> 
  <div> Item List Component?</div>
     <button>Checkout</button>
    
  </div>
</div>
      </div>

<div className="row"> 
  <div className="col-12">
    <div className="itemDescription"> 
      <h4>Item Description </h4> 
    <div> Item Details Component?</div></div> 
  
  </div>
</div>

    </div>


  );
}

// const Profile = () => {
//   const { username: userParam } = useParams();

//   const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
//     variables: { username: userParam },
//   });

//   const user = data?.me || data?.user || {};
//   if (
//     Auth.loggedIn() && 
//     /* Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username, and compare it to the userParam variable */
//     Auth.getProfile().authenticatedPerson.username === userParam
//   ) {
//     return <Navigate to="/me" />;
//   }

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!user?.username) {
//     return (
//       <h4>
//         You need to be logged in to see this. Use the navigation links above to
//         sign up or log in!
//       </h4>
//     );
//   }

//   return (
//     <div>
//       <div className="flex-row justify-center mb-3">
//         <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
//           Viewing {userParam ? `${user.username}'s` : 'your'} profile.
//         </h2>

//         <div className="col-12 col-md-10 mb-5">
//           <ThoughtList
//             thoughts={user.thoughts}
//             title={`${user.username}'s thoughts...`}
//             showTitle={false}
//             showUsername={false}
//           />
//         </div>
//         {!userParam && (
//           <div
//             className="col-12 col-md-10 mb-3 p-3"
//             style={{ border: '1px dotted #1a1a1a' }}
//           >
//             <BeginForm />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;

export default homePage;
