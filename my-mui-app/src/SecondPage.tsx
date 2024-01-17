import React ,{useEffect,useRef} from "react";
import SecondPageComponent1 from "./SecondPageComponent1";
import DepartmentTree from "./SecondPageComponent2";
import {useNavigate} from 'react-router-dom';


const SecondPage: React.FC = () => {
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      // Cleanup function: runs on unmount
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const userDetailsString = localStorage.getItem('userDetails');

    if (!userDetailsString && isMounted.current) {
      console.log('Redirecting to the first page');
      alert('Please enter your details before accessing the second page.');
      navigate('/');
    }
  }, [navigate]);

      return (
          <div>
            <SecondPageComponent1/>
           <DepartmentTree/>
          </div>
           
      )
};
export default SecondPage;