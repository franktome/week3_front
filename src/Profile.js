import React, { useEffect, useRef, useState } from 'react';
import { Resizable, ResizableBox } from 'react-resizable';
import './Profile.css';

function Profile({userData}) {
  
  //const [isDragging, setIsDragging] = useState(false);
  const [gridItems, setGridItems] = useState(Array(168).fill(0));
  //const [sx, setsx] = useState(0)
  //const [sy, setsy] = useState(0)
  //const [ex, setex] = useState(0)
  //const [ey, setey] = useState(0)
  //const [state, setstate] = useState(1)

  const gridRef = useRef(null);
  const [gridPosition, setGridPosition] = useState({left:0, top:0, right:0, bottom:0, w:0, h:0});

  useEffect(() => {
    const updateGridPosition = () => {
      const rect = gridRef.current.getBoundingClientRect();
      setGridPosition({
        left: rect.left,
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        w: (rect.right - rect.left) / 7,
        h: (rect.bottom - rect.top) / 24
      });
    };
    updateGridPosition();
    // 윈도우 리사이즈 등에 대응하여 그리드 위치를 업데이트하는 이벤트 리스너 등록
    window.addEventListener('resize', updateGridPosition);
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', updateGridPosition);
    };
  }, []);

  const [draggedElement, setDraggedElement] = useState(null);
  const [offset, setOffset] = useState({left:0, top:0, right:0, bottom:0});
  const [index, setIndex] = useState({left_index:0, top_index:0});
  const [rectangleSize, setRectangleSize] = useState({ width: 50, height: 50 });



  const allowDrop = (event) => {
    event.preventDefault();
  };

  const drag = (event) => {
    setDraggedElement(event.target.id);
    setOffset({
      left: event.clientX - event.target.getBoundingClientRect().left,
      top: event.clientY - event.target.getBoundingClientRect().top,
      right:  event.target.getBoundingClientRect().right- event.clientX,
      bottom : event.target.getBoundingClientRect().bottom - event.clientY
    });
  };

  const drop = (event) => {
    event.preventDefault();
    if (!draggedElement) return;

    const left = event.clientX - offset.left;
    const top = event.clientY - offset.top;
    const right = event.clientX + offset.right;
    const bottom = event.clientY + offset.bottom;
    
    const index_left = Math.round((left -gridPosition.left) / gridPosition.w);
    const index_top = Math.round((top - gridPosition.top) / gridPosition.h);
    const index_right = (right - gridPosition.left) / gridPosition.w;
    const index_bottom = (bottom - gridPosition.top) / gridPosition.h;

    setIndex({left_index : index_left, top_index : index_top});
    setDraggedElement(null);
  };

  const resize = (event, { size }) => {
    setRectangleSize(size);
  };
  /*
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
  */

  return (
    <div className='profile_wrapper'>
      <div className='user_info_wrapper'>
        <p>{userData.user_name}님</p>
      </div>
      <div className='todo_wrapper'></div>
      <div className='date_wrapper'></div>
      <div ref={gridRef} className='schedule_wrapper' onDrop={drop} onDragOver={allowDrop}>
        {gridItems.map((item, index) => (
          <div
            key={index}
            className='grid_item'
            draggable="false"
            style={{ backgroundColor: item === 1 ? '#4CAF50' : '#D9D9D9' }}
            //onMouseDown={() => handleMouseDown(index)}
            //onMouseUp={() => handleMouseUp(index)}
            //onMouseEnter={() => handleMouseEnter(index)}
          ></div>
        ))}
      </div>
      <Resizable
       onResize={resize}
       axis='y'
       style={{ 
       width: rectangleSize.width,
       height: rectangleSize.height
      }}>
      <div  
      id="rectangle"
       className="rectangle"
       onDragStart={drag} draggable = 'true' style={{ position: 'absolute',
       left:gridPosition.left + index.left_index  * gridPosition.w + 'px', 
       top: gridPosition.top + index.top_index * gridPosition.h + 'px', 
       width: '100%', 
       height: '100%' }}>가</div>
     </Resizable>
    
    </div>

  );
}

export default Profile;