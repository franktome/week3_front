import React from 'react';
import Profile from './Profile';
import Noleader_Detail from './Noleader_Detail';
import axios from 'axios'; 
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


const Noleader_Dash = () => {
  const location = useLocation();
  const { state } = location;
  const {userData, index} = state;

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden'}}>
      {/* 프로젝트 목록 */}
      <div style={{ flex: '3', padding: '20px', borderRight: '1px solid #ddd',overflow: 'scroll' }}>
        <Noleader_Detail userData ={userData} index = {index} />
      </div>
      
      {/* 프로필 영역 */}
      <div style={{ flex: '1', padding: '20px', overflow: 'hidden' }}>
        <Profile userData = {userData}  />
      </div>
    </div>
  );
};

export default Noleader_Dash;