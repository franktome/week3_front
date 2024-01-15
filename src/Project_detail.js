import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Project_detail.css'; // Stylesheet
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const ProjectDetail = ({userData, index}) => {
  console.log("ProjectDetail :"+userData)
  const project_id = userData.project[index].project_id;
  const leader = userData.project[index].project_leader;

  // State variables
  const [projectName, setProjectName] = useState(userData.project[index].project_name);
  const [projectParticipation, setProjectParticipation] = useState(userData.project[index].team.join(","));
  const [projectDescription, setProjectDescription] = useState(userData.project[index].project_description);
  const [todos, setTodos] = useState(
    userData.project[index].todo
  );
  const [appointments, setAppointments] = useState(
    userData.project[index].appointment
  );
  const [newTodo, setNewTodo] = useState(''); // New To-do
  const [newAppointment, setNewAppointment] = useState(''); // New Appointment
  const [newParticipant, setNewParticipant] = useState(''); // New Participant

  // Function to add new To-do
  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { text: newTodo, isChecked: false }]);
      setNewTodo(''); // Reset input
    };
  };

  // Function to delete To-do
  const deleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  // Function to toggle To-do completion
  const toggleTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].isChecked = !updatedTodos[index].isChecked;
    setTodos(updatedTodos);
    console.log(todos);
  };

  // Function to add new Appointment
  const addAppointments = () => {
    if (newAppointment.trim() !== '') {
      setAppointments([...appointments, { text: newAppointment, isChecked: false }]);
      setNewAppointment(''); // Reset input
    }
  };

  // Function to delete new Appointment
  const deleteAppointment = (index) => {
    const updatedAppointment = [...appointments];
    updatedAppointment.splice(index, 1);
    setAppointments(updatedAppointment);
  };

  // Function to toggle Appointment completion
  const toggleAppointment = (index) => {
    const updatedAppointment = [...appointments];
    updatedAppointment[index].isChecked = !updatedAppointment[index].isChecked;
    setAppointments(updatedAppointment);
  };

  // Function to add new Participant
  const addParticipant = () => {
    if (newParticipant.trim() !== '') {
      setProjectParticipation((prevParticipants) => prevParticipants + `, ${newParticipant}`);
      setNewParticipant(''); // Reset input
    }
  };
  
  // Function to delete Participant
  const deleteParticipant = (index) => {
    const participantsArray = projectParticipation.split(',').map(participant => participant.trim());
    participantsArray.splice(index, 1);
    setProjectParticipation(participantsArray.join(', '));
  };

  // check if there is user in database
  const handleCheckUser = async() => {
    const response = await axios.get("http://172.10.7.46:80/user", {params: { 'user_id' :newParticipant}});
    if(response.data === "True"){
      addParticipant();
    } else {
      alert("해당 아이디를 가진 유저가 존재하지 않습니다.");
    }
  }

  const handleSaveProjectDetail = async () => {
    // Check if userData.user_id is equal to userData.project[index].project_leader
    if (userData.user_id === leader) {
      // Assuming project_detail is an object containing project details
      const projectDetailData = {user_id: userData.user_id,
        project_id: project_id,
        project_name: projectName,
        description: projectDescription, 
        participants: projectParticipation, 
        todo: todos,
        appointment: appointments,  
        };

      try {
        // Send the project_detail data to the server
        const response = await axios.post("http://172.10.7.46:80/alert_project", projectDetailData);
        // Handle the response from the server if needed
        alert('저장되었습니다');

      } catch (error) {
        // Handle errors, if any
        console.error('Error saving project detail:', error);
      }
    } else {
      // If userData.user_id is not equal to userData.project[index].project_leader
      alert('You do not have permission to save the project detail.');
    }
  };

  // JSX structure
  return (
    <div className="project-detail-container" style={{ textAlign: 'left' }}>
      {/* Project Name */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="project-input"
          style={{ background: '#fff', flex: '1', marginRight: '0px', padding: '8px',border: '1px solid #fff',fontWeight: 'bold', fontSize: '35px', }}
        />
        <button onClick={handleSaveProjectDetail} style={{ padding: '8px', fontSize: '14px', cursor: 'pointer', background: '#4CAF50', color: '#fff', border: '0px solid #fff', marginLeft: '8px' }}>저장</button>
        <button onClick={() => window.history.back()} style={{ marginLeft: '8px', padding: '8px', fontSize: '14px', cursor: 'pointer', background: '#2196F3', color: '#fff', border: '0px solid #fff' }}>뒤로가기</button>
      </div>
      <hr className="divider" />

      {/* Project Description */}
      <div>
        <p className="label" style={{ textAlign: 'left', fontSize: '20px' }}>프로젝트 설명</p>
        <input
          type="text"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          className="project-input"
          style={{ background: '#fff', flex: '1', marginRight: '0px', padding: '8px',border: '1px solid #fff', fontSize: '15px', }}
        />
      </div>

      {/* Project Participation */}
      <div>
      <p className="label" style={{ textAlign: 'left', fontSize: '20px' }}>참여자들</p>
        <ul>
          {projectParticipation.split(',').map((participant, index) => (
          <li key={index}>
              {participant.trim()} 
              <button onClick={() => deleteParticipant(index)} style={{marginLeft: '8px',background: 'red',color: 'white',border: 'none',cursor: 'pointer',padding: '4px 7px', fontSize: '15px',borderRadius: '20%',}}>x</button>
          </li>
          ))}
        </ul>
        {/* New Participant Input and Button */}
        <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '8px' }}>
          <input
            type="text"
            value={newParticipant}
            onChange={(e) => setNewParticipant(e.target.value)}
            className="participation-input"
            style={{ background: '#fff',marginRight: '4px' }}
            />
          <button onClick={handleCheckUser} className="add-button">+</button>
        </div>
      </div>

      {/* To-do List */}
      <div>
        <p className="label" style={{ textAlign: 'left', fontSize: '20px' }}>To do list</p>
        <ul>
          {todos.map((todo, index) => (
            <li key={index} style={{ listStyle: 'none', margin: '0', padding: '0' }} className="list-item">
              <input
                type="checkbox"
                checked={todo.isChecked}
                onChange={() => toggleTodo(index)}
                style={{ background: '#fff', }}
              />
              <span
                style={{
                  marginLeft: '8px',
                  color: todo.isChecked ? 'gray' : 'black',
                  textDecoration: todo.isChecked ? 'line-through' : 'none'
                }}
              >
                {todo.text}
              </span>
              <button onClick={() => deleteTodo(index)} style={{marginLeft: '8px',background: 'red',color: 'white',border: 'none',cursor: 'pointer',padding: '4px 7px', fontSize: '15px',borderRadius: '20%',}}>x</button>
            </li>
          ))}
        </ul>
        {/* New To-do Input and Button */}
        <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '8px' }}>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value.slice(0,50))}
            className="project-input"
            style={{ background: '#fff',marginRight: '4px'}}
          />
          <button onClick={addTodo} className="add-button" >+</button>
        </div>
      </div>

      {/* 24*7 Table (Placeholder) */}
      <div>
        <p className="label" style={{ textAlign: 'left', fontSize: '20px' }}>일정표</p>
        <table className="time-table" border="1">
          <thead>
            <tr>
              <th>시간</th>
              <th>월</th>
              {/* ... Days of the week */}
            </tr>
          </thead>
          <tbody>
            {/* Data for each time slot */}
          </tbody>
        </table>
      </div>

      {/* Appointments List */}
      <div>
        <p className="label" style={{ textAlign: 'left', fontSize: '20px' }}>약속잡기</p>
        <ul>
          {appointments.map((appointment, index) => (
            <li key={index} style={{ listStyle: 'none', margin: '0', padding: '0' }} className="list-item">

              <input
                type="checkbox"
                checked={appointment.isChecked}
                onChange={() => toggleAppointment(index)}
                style={{ background: '#fff'}}
              />
              <span
                style={{
                  marginLeft: '8px',
                  color: appointment.isChecked ? 'gray' : 'black',
                  textDecoration: appointment.isChecked ? 'line-through' : 'none'
                }}
              >
                {appointment.text}
              </span>
              <button onClick={() => deleteAppointment(index)} style={{marginLeft: '8px',background: 'red',color: 'white',border: 'none',cursor: 'pointer',padding: '4px 7px', fontSize: '15px',borderRadius: '20%',}}>x</button>
            </li>
          ))}
        </ul>
        {/* New Appointment Input and Button */}
        <div style={{ display: 'flex',alignItems: 'baseline', marginBottom: '8px' }}>
          <input
            type="text"
            value={newAppointment}
            onChange={(e) => setNewAppointment(e.target.value.slice(0,50))}
            className="project-input"
            style={{ background: '#fff', marginRight: '4px'}}
          />
          <button onClick={addAppointments} className="add-button">+</button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
