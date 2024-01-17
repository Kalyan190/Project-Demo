// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes ,Navigate} from 'react-router-dom';
import FirstPage from './FirstPage';
import SecondPage from './SecondPage';



const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        {/* Add other routes as needed */}
        
        <Route path="/second-page" element={<SecondPage/>}/>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes> 
    </Router>
  );
};

export default App;

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import FirstPage from './FirstPage';
// import SecondPage from './SecondPage';

// const App : React.FC = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<FirstPage/>} />
//         <Route path="/second" element={<SecondPage/>} />
//         <Navigate to="/" />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
