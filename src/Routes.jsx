/* eslint-disable react/prop-types */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EC2 from './features/EC2/EC2';
import { S3 } from './features/S3/S3';
import EC2_Instances_List from './features/EC2/EC2_Instances_List';
import { EC2_Instances_Detail } from './features/EC2/EC2_Instance_Detail';
import LaunchEC2 from './features/EC2/LaunchEC2/LaunchEC2';
import PageNotFound from './PageNotFound';
import AllServices from './features/home/AllServices';
import HomePage from '../common/HomePage';
import Profile from './Auth/Profile';

function Routes({ user, signOut }) {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route
          path="/"
          element={<HomePage user={user.username} signOut={signOut} />}
        />
        <Route path="s3" element={<S3 />} />
        <Route path="console/services" element={<AllServices />} />
        <Route path="account">
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="ec2_instance">
          {/* <Route path="*" element={<PageNotFound />} /> */}
          <Route path="dashboard" index element={<EC2 />} />
          <Route path="instances" element={<EC2_Instances_List />} />
          <Route path="LaunchInstances" element={<LaunchEC2 />} />
          <Route path=":id" element={<EC2_Instances_Detail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default Routes;
