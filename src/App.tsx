import React from 'react';
import './App.css';
import NavBar from './common/navbar';
import PageBodyWrapper from './common/pageBodyWrapper';
import MainPanel from './common/MainPanel';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from './base/auth/signIn';
import Dashboard from './base/admin/dashboard';
import SignUp from './base/auth/signup';
import { UserTypes } from 'enum/userTypes';
import Authmiddleware from 'middleware/authMiddleware';

const App: React.FC = () => {
  return (
    <Router>
      <div className="container-scroller">
        <Routes>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>

          <Route element={<Authmiddleware allowed={UserTypes.SUPER_ADMIN} />}>
            <Route element={<NavBar />}/> {/* NavBar wrapped with a Route */}
            <Route path="/admin" element={
              <React.Fragment>
                <MainPanel>
                  <Route path="/" element={<Dashboard />}></Route>
                </MainPanel>
              </React.Fragment>
            }/>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
