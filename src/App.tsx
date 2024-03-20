import React from 'react';
import './App.css';
import NavBar from './common/navbar';
import PageBodyWrapper from './common/pageBodyWrapper';
import MainPanel from './common/MainPanel';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from './base/auth/signIn';
import Dashboard from './base/admin/dashboard';
import SignUp from './base/auth/signup';

const App: React.FC = () => {
  return (
    <Router>
      <div className="container-scroller">
        <Routes>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          {/* <Route element={<></>}>
              <NavBar />
              <PageBodyWrapper>
                <MainPanel>
                  <Route path="/admin">
                    <Route path="/" element={<Dashboard/>}></Route>
                  </Route>
                </MainPanel>
              </PageBodyWrapper>
            </Route> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
