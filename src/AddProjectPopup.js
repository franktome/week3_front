import React, { useState } from 'react';

const AddProjectPopup = ({ onClose, onAddProject }) => {
  const [projectName, setProjectName] = useState('');
  const [participants, setParticipants] = useState(['']);
  const [description, setDescription] = useState('');

  const handleAddParticipant = () => {
    setParticipants([...participants, '']);
  };

  const handleRemoveParticipant = (index) => {
    const updatedParticipants = participants.filter((_, i) => i !== index);
    setParticipants(updatedParticipants);
  };

  const handleInputChange = (index, value) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index] = value;
    setParticipants(updatedParticipants);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value.slice(0, 100)); // Limit to 100 characters
  };

  const handleAddProject = () => {
    // Perform validation or additional checks if needed
    onAddProject({
      projectName,
      participants,
      description,
    });

    // Clear the input fields
    setProjectName('');
    setParticipants(['']);
    setDescription('');

    // Close the popup
    onClose();
  };

  return (
    <div style={popupStyle}>
      <h2 style={{ marginBottom: '16px', borderBottom: '2px solid #333' }}>New Project</h2>
      
      <div style={inputContainerStyle}>
        <label style={labelStyle}>Project Name:</label>
        <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} style={inputStyle} />
      </div>

      <div style={inputContainerStyle}>
        <label style={labelStyle}>Participants:</label>
        {participants.map((participant, index) => (
          <div key={index} style={{ display: 'flex', marginBottom: '8px' }}>
            <input type="text" value={participant} onChange={(e) => handleInputChange(index, e.target.value)} style={inputStyle} />
            {index > 0 && (
              <button onClick={() => handleRemoveParticipant(index)} style={buttonStyle}>-</button>
            )}
          </div>
        ))}
        <button onClick={handleAddParticipant} style={buttonStyle}>+</button>
      </div>

      <div style={inputContainerStyle}>
        <label style={labelStyle}>Description (max 100 characters):</label>
        <textarea value={description} onChange={handleDescriptionChange} style={inputStyle} />
      </div>

      <div style={{ marginTop: '16px' }}>
        <button onClick={handleAddProject} style={actionButtonStyle}>Add Project</button>
        <button onClick={onClose} style={{ ...actionButtonStyle, marginLeft: '8px', background: '#ccc', color: '#333' }}>Cancel</button>
      </div>
    </div>
  );
};

// Styles
const popupStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '20px',
  background: '#fff',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  zIndex: 999,
  width: '450px', // 조절된 가로 길이
  textAlign: 'center',
};

const inputContainerStyle = {
  marginBottom: '16px',
  alignItems: 'center',
};

const labelStyle = {
  display: 'inline-block',
  marginBottom: '8px',
  fontSize: '14px',
  fontWeight: 'bold',
  textAlign: 'left',
  width: '100%',
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  fontSize: '14px',
};

const buttonStyle = {
  marginLeft: '8px',
  padding: '6px',
  fontSize: '12px',
  cursor: 'pointer',
};

const actionButtonStyle = {
  padding: '10px',
  fontSize: '16px',
  background: '#4CAF50',
  color: '#fff',
  cursor: 'pointer',
};

export default AddProjectPopup;