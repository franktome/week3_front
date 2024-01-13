import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddProjectPopup from './AddProjectPopup';

const Projects = (props) => {
  const [userData, setUserData] = useState({});
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleAddProject = (newProject) => {
    console.log('New Project:', newProject);
  };

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://172.10.7.46:80/profile", {
          params: {
            'user_id': "qkrwhdah03",
          },
        });
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
    <h1 style={{ textAlign: 'center', fontSize: '2em', marginBottom: '16px' }}>나의 프로젝트</h1>

    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
      <button onClick={togglePopup} style={{ padding: '0.5em', fontSize: '1em' }}>프로젝트 추가하기</button>
      {isPopupOpen && (<AddProjectPopup onClose={togglePopup} onAddProject={handleAddProject} />)}

      <button style={{ padding: '0.5em', fontSize: '1em' }}>로그아웃</button>
    </div>

    <hr style={{ marginBottom: '16px' }} />

      <h2>프로젝트 목록</h2>

      {userData.project && userData.project.length > 0 ? (
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', listStyleType: 'none' }}>
          {userData.project.map((project, index) => (
            <li key={index} style={{ border: '1px solid #ddd', padding: '16px', textAlign: 'center', cursor: 'pointer' }}>
              <Link to={`/item/${project}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ background: '#eee', padding: '8px', borderRadius: '4px', marginBottom: '8px' }}>
                    <p style={{ fontWeight: 'bold' }}> {project.project_name} </p>
                  </div>
                  <div style={{ background: '#eee', padding: '8px', borderRadius: '4px' }}>
                    <p> 설명: {project.project_description}</p>
                    <p> 멤버: {project.team.join(', ')}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No project available.</p>
      )}
    </div>
  );
};

export default Projects;
