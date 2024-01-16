import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AddProjectPopup from './AddProjectPopup';
import axios from 'axios';

const Projects = ({ userData, onProjectCreated }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const navigate = useNavigate();

  const handleAddProject = async ({ projectName, description, participants }) => {
    participants.push(userData.user_id);

    const response = await axios.post("http://172.10.7.46:80/create_project", {
      'name': projectName,
      'leader':userData.user_id,
      'description': description,
      'team': participants
    });

    if (response.data === 'True') {
      alert("프로젝트 생성 완료");
      onProjectCreated();
    } else {
      alert("프로젝트 생성에 실패했습니다.");
    }
  };

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  const handleLogout = () => {
    navigate('../Login', { replace: true });
    alert("로그아웃 완료되었습니다.");
  };

  const handleDeleteProject = async (index) => {
    if (index !== null) {
      const projectId = userData.project[index].project_id;

      if (!window.confirm("삭제하시겠습니까?")) {
        return;
      }

      const response = await axios.post(`http://172.10.7.46:80/delete_project`, {
        'project_id': projectId,
      });

      if (response.data === 'True') {
        alert("프로젝트 삭제 완료");
        onProjectCreated();
        console.log("실행되었다"+userData.project);
      } else {
        alert("프로젝트 삭제에 실패했습니다.");
      }
    }
  };

  const handlepassusername=(index)=> {
    if (userData.user_id === userData.project[index].project_leader){
      navigate('../Dashboard_detail', {replace: false, state:{userData: userData, index: index}, callback: onProjectCreated} );
    }
    else {
      navigate('../Noleader_Dash', {replace: false, state:{userData: userData, index: index}});
    }
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
      {userData.project && userData.project.length > 0 ? (
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', listStyleType: 'none' }}>
          {userData.project.map((project, index) => (
            <li key={index} style={{ position: 'relative', border: '1px solid #ddd', padding: '16px', textAlign: 'center', cursor: 'pointer' }}>
              <div style={{padding: '8px 8px', position: 'absolute', top: '5px', right: '5px', cursor: 'pointer', padding: '5px', background: '#fff', border: '1px solid #ddd', borderRadius: '0%' }} onClick={() => handleDeleteProject(index)}>
                x
              </div>

              {/* 클릭 시 프로젝트 세부 정보 페이지로 이동 */}
              <div onClick={()=>handlepassusername(index)} style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ background: '#eee', padding: '8px', borderRadius: '4px', marginBottom: '8px' }}>
                  <p style={{ fontWeight: 'bold' }}> {project.project_name} </p>
                </div>
                <div style={{ background: '#eee', padding: '8px', borderRadius: '4px' }}>
                  <p> 설명: {project.project_description}</p>
                  <p> 팀장: {project.project_leader}</p>
                  <p> 멤버: {project.team.join(', ')}</p>
                </div>
              </div>
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