import React, { useState } from 'react';
import './Profile.css';

function Profile() {
  const [isDragging, setIsDragging] = useState(false);
  const [gridItems, setGridItems] = useState(Array(168).fill(0));
  const [sx, setsx] = useState(0)
  const [sy, setsy] = useState(0)
  const [ex, setex] = useState(0)
  const [ey, setey] = useState(0)
  const [state, setstate] = useState(1)


  const handleMouseDown = (index) => {
    setIsDragging(true);
    setstate(1 - gridItems[index]);
    setsx(index % 7);
    setsy((index - (index % 7)) / 7);
    setex(index % 7);
    setey((index - (index % 7)) / 7);
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
    updateSelectedArea();
  };
  
  const handleMouseEnter = (index) => {
    if (isDragging) {
      setex(index % 7);
      setey((index - (index % 7)) / 7);
    }
  };
  

  const updateSelectedArea = () => {
    const updatedGridItems = [...gridItems];
  
    for (let i = Math.min(sy, ey); i <= Math.max(sy, ey); i++) {
      for (let j = Math.min(sx, ex); j <= Math.max(sx, ex); j++) {
        const index = i * 7 + j;
        updatedGridItems[index] = state;
      }
    }
  
    setGridItems(updatedGridItems);
  };

  const renderPreviewBox = () => {
    if (isDragging) {
      const minRow = Math.min(sy, ey);
      const maxRow = Math.max(sy, ey);
      const minCol = Math.min(sx, ex);
      const maxCol = Math.max(sx, ex);
  
      const style = {
        gridRowStart: minRow + 1,
        gridRowEnd: maxRow + 2,
        gridColumnStart: minCol + 1,
        gridColumnEnd: maxCol + 2
      };
  
      return (
        <div className='preview_box' style={style}></div>
      );
    }
    return null;
  };

  return (
    <div className='profile_wrapper'>
      <div className='user_info_wrapper'>
        <p>박종모님</p>
      </div>
      <div className='todo_wrapper'></div>
      <div className='date_wrapper'></div>
      <div className='schedule_wrapper'>
        {gridItems.map((item, index) => (
          <div
            key={index}
            className='grid_item'
            style={{ backgroundColor: item === 1 ? '#4CAF50' : '#D9D9D9' }}
            onMouseDown={() => handleMouseDown(index)}
            onMouseUp={() => handleMouseUp(index)}
            onMouseEnter={() => handleMouseEnter(index)}
          ></div>
        ))}
        {renderPreviewBox()}
      </div>
    </div>
  );
}

export default Profile;