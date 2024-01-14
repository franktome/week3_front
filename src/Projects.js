import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AddProjectPopup from './AddProjectPopup';
import axios from 'axios';

const Projects = ({userData}) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const navigate = useNavigate();
  const handleAddProject = async({projectName, description, participants}) => {
    participants.push(userData.user_id);
    //console.log('New Project name:', projectName);
    //console.log('New Project description:', description);
    //console.log('New Project teammates:', participants);

    const response = await axios.post("http://172.10.7.46:80/create_project", 
    {
        'name':projectName,
        'description':description,
        'team': participants
    });
    console.log(response.data);
    if(response.data === 'True'){
      alert("프로젝트 생성 완료");
    } else{
      alert("프로젝트 생성에 실패했습니다.");
    }
  };

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  const handleLogout = () => {
    navigate('../Login',{replace: true});
    alert("로그아웃 완료되었습니다.");
  }

  return (
    <div>
    <h1 style={{ textAlign: 'center', fontSize: '2em', marginBottom: '16px' }}>나의 프로젝트</h1>

    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
      <button onClick={togglePopup} style={{ padding: '0.5em', fontSize: '1em' }}>프로젝트 추가하기</button>
      {isPopupOpen && (<AddProjectPopup onClose={togglePopup} onAddProject={handleAddProject} />)}

      <button style={{ padding: '0.5em', fontSize: '1em' }} onClick={handleLogout}>로그아웃</button>
    </div>

    <hr style={{ marginBottom: '16px' }} />

      <h2>프로젝트 목록</h2>

      {userData.project && userData.project.length > 0 ? (
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', listStyleType: 'none' }}>
          {userData.project.map((project, index) => (
            <li key={index} style={{ border: '1px solid #ddd', padding: '16px', textAlign: 'center', cursor: 'pointer' }}>
              <Link to={`/item/${project.project_name}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
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
