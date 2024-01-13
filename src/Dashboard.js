import React from 'react';
import Profile from './Profile';
import Projects from './Projects';

const Dashboard = () => {

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* 프로젝트 목록 */}
      <div style={{ flex: '3', padding: '20px', borderRight: '1px solid #ddd' }}>
        <Projects/>
      </div>
      
      {/* 프로필 영역 */}
      <div style={{ flex: '1', padding: '20px', overflow: 'hidden' }}>
        <Profile/>
      </div>
    </div>
  );
};

export default Dashboard;