import React from 'react';
import './App.css';
import NavBar from './common/navbar';
import MainPanel from './common/MainPanel';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from './base/auth/signIn';
import Dashboard from './base/admin/dashboard';
import SignUp from './base/auth/signup';
import { UserTypes } from 'enum/userTypes';
import Authmiddleware from 'middleware/authMiddleware';
import WebTemp from 'base/web';

const App: React.FC = () => {
  return (
    <Router>
      <React.Fragment>
        <Routes>
          <Route path="/" element={<WebTemp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route element={<Authmiddleware allowed={UserTypes.SUPER_ADMIN} />}>
            <Route path="/super_admin" element={<React.Fragment>
              <NavBar /> {/* NavBar is always rendered */}
              <MainPanel>
                {/* Nested route for dashboard */}
                <Route path="/dashboard" element={<Dashboard />} />
              </MainPanel>
            </React.Fragment>} />
          </Route>
        </Routes>
      </React.Fragment>
    </Router>
  );
}

export default App;
