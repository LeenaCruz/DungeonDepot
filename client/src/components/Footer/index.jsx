import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  // const location = useLocation();
  // const navigate = useNavigate();
  return (
    <footer className="w-100 mt-auto bg-primary p-4">
      <div className="container text-center mb-5">
        {/* {location.pathname !== '/' && (
          <button
            className="btn btn-dark mb-3"
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </button>
        )} */}
        <h5 className='footer-style'>
          Made by Julianah, Leena, Charles and Kelsey.
        </h5>
      </div>
    </footer>
  );
};

export default Footer;
