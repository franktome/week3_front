import React from 'react';
import Profile from './Profile';
import Project_detail from './Project_detail';
import axios from 'axios'; 
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Dashboard_detail = ({ route }) => {
  const location = useLocation();
  const { state } = location;
  const {userData, index} = state;


  return (
    <div style={{ display: 'flex', height: '100vh',overflow: 'hidden' }}>
      {/* 프로젝트 목록 */}
      <div style={{ flex: '3', padding: '20px', borderRight: '1px solid #ddd',overflow: 'auto' }}>
        <Project_detail userData ={userData} index  = {index}/>
      </div>
      
      {/* 프로필 영역 */}
      <div style={{ flex: '1', padding: '20px', overflow: 'hidden', background:'#03C75A' }}>
        <Profile userData = {userData} />
      </div>
    </div>
  );
};

export default Dashboard_detail;