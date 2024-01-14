import React from 'react';
import Profile from './Profile';
import Projects from './Projects';
import axios from 'axios'; 
import { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
  const { state } = location;
  const user_id = state?.user_id;

  const [userData, setUserData] = useState({});
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://172.10.7.46:80/profile", {
          params: {
            'user_id': user_id,
          },
        });
        setUserData(response.data);
        //console.log(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* 프로젝트 목록 */}
      <div style={{ flex: '3', padding: '20px', borderRight: '1px solid #ddd' }}>
        <Projects userData ={userData}/>
      </div>
      
      {/* 프로필 영역 */}
      <div style={{ flex: '1', padding: '20px', overflow: 'hidden' }}>
        <Profile userData = {userData} />
      </div>
    </div>
  );
};

export default Dashboard;