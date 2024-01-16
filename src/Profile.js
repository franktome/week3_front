import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './Profile.css';

function Profile({userData, onProjectCreated}) {

  console.log(userData);
  const [gridItems, setGridItems] = useState(Array(168).fill(0));
  const gridRef = useRef(null);
  const [gridPosition, setGridPosition] = useState({left:0, top:0, right:0, bottom:0, w:0, h:0});
  const [planname, setPlanName] = useState('');
  const [plantime, setPlanTime] = useState(0);
  const [blockList, setBlockList] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [trashHover, setTrashHover] = useState(false);
  console.log(userData.schedule);
  const limitPlanTime = (e) =>{
    const value = parseInt(e.target.value);
    if (isNaN(value) || value < 0) {
      setPlanTime(0);
    } else if (value > 24) {
      setPlanTime(24);
    } else {
      setPlanTime(value);
    }
  }


  const get_block = (block, index) => {
    return <div
      id={index}
      key = {index}
      className = "rectangle"
      onDragStart={(e)=>drag(e,index)}
      draggable = 'true'
      style = {{
        position : 'absolute',
        gridColumn: block.left_index + 1,
        gridRow : block.top_index + 1,
        width : gridPosition.w,
        height : gridPosition.h * block.plan_time
      }}
      >
      {block.plan_name}
    </div>
  }
  const initialize_block = () => {
    return blockList.map((block, index)=>get_block(block, index))
  }

  const createBlock = () => {
    if(plantime <= 0){
      alert("일정의 시간을 입력해주세요.");
      return;
    }
    setPlanName('');
    setPlanTime(0);
    const new_block = {
      left_index: 0,
      top_index: 0,
      plan_name: planname,
      plan_time: plantime
    }
    const updatedblockList = [...blockList, new_block];
    setBlockList(updatedblockList);
  }

  useEffect(() => {

    setProjectList(userData && userData.project ? userData.project : []);
    setBlockList(userData && userData.schedule ? userData.schedule : []);

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
  }, [userData]);


  // ##################### Drag 처리 부분 #######################

  const [draggedElement, setDraggedElement] = useState(null);
  const [offset, setOffset] = useState({left:0, top:0});

  const allowDrop = (event) => {
    event.preventDefault();
  };

  const drag = (event, index) => {
    setDraggedElement({id : event.target.id, index : index});
    setOffset({
      left: event.clientX - event.target.getBoundingClientRect().left,
      top: event.clientY - event.target.getBoundingClientRect().top,
    });
  };

  const drop = (event) => {
    event.preventDefault();
    if (!draggedElement) return;

    const left = event.clientX - offset.left;
    const top = event.clientY - offset.top;
    
    const index_left = Math.round((left -gridPosition.left) / gridPosition.w);
    const index_top = Math.round((top - gridPosition.top) / gridPosition.h);

    if (trashHover) {
      removeBlock(draggedElement.index);
    } else {
      updateDraggedBlock(draggedElement.index, { left_index: index_left, top_index: index_top });
    }
    setDraggedElement(null);
    setTrashHover(false);
  };

  const updateDraggedBlock = (index, info) => {
    // 격자 밖으로 나가는지 확인
    const time_len = blockList[index].plan_time;
    if(info.left_index > 6 || info.left_index < 0 || info.top_index < 0 || info.top_index + time_len > 24){
      return;
    }
    const updatedblockList = [...blockList];
    updatedblockList[index].left_index = info.left_index;
    updatedblockList[index].top_index = info.top_index;
    setBlockList(updatedblockList);
  };

  const dragOverTrash = (event) => {
    event.preventDefault();
    setTrashHover(true);
  };

  const dragLeaveTrash = () => {
    setTrashHover(false);
  };

  const removeBlock = (index) => {
    const updatedblockList = [...blockList];
    updatedblockList.splice(index, 1);
    setBlockList(updatedblockList);
  }

  //###########################################3
  // 스케쥴 정보를 서버로 전달
  const saveScheduleHandler = async() => {
    const schedule_list= [];
    blockList.forEach((block, index) => {
      schedule_list.push({
          user_id : userData.user_id, 
          schedule_info: block.plan_name,
          dayofweek: block.left_index,
          start_time : block.top_index,
          length : block.plan_time
      });
  });
    //console.log(schedule_list);
    try{
      const response = await axios.post("http://172.10.7.46:80/set_schedule", 
      {
          'user_id' : userData.user_id,
          'schedule_list' : schedule_list
      });
      if (response.data === "True") {
          onProjectCreated();
          //alert("스케줄 저장 완료했습니다.");
          

      } else{
          alert("스케줄 저장에 실패했습니다.");
      }
    } 
    catch(error){
        console.error("Error in setting schedule : ", error);
    }
  };

  const create_appointment = (text) => {
    return (<div className='appointment_view'>
            {text}
    </div>)
  }
  const view_appointment= () => {
    return projectList.map((project)=>{
      return project.appointment.map((item)=>{
        if(item.isChecked) return null;
        else return create_appointment(item.text);
      })
    })
  };

  return (
    <div className='profile_wrapper'>
      <div className='user_info_wrapper'>
        <p>{userData.user_name}님</p>
      </div>
      <div className='schedule_manager_wrapper'>
        <div className='date_wrapper'></div> 
        <div ref={gridRef} className='schedule_wrapper' onDrop={drop} onDragOver={allowDrop}>
          {gridItems.map((item, index) => (
            <div
              key={index}
              className='grid_item'
              draggable="false"
              style={{ backgroundColor: item === 1 ? '#4CAF50' : '#D9D9D9' }}
            ></div>
          ))}

          {initialize_block()}
        
        </div>
      </div>
      <div className="trash" onDrop={drop} onDragOver={dragOverTrash} onDragLeave={dragLeaveTrash}>
        <div className="create_box_input" >
          <input type='text' className='plan_name' onChange={(e)=> setPlanName(e.target.value.slice(0,5))} value = {planname}></input>
          <input type='number' className='plan_len' onChange={(e)=> limitPlanTime(e)} value = {plantime}></input>
          <button type="button" onClick={createBlock}>+</button>
        </div>
        <button className="save_schedule_button" onClick={saveScheduleHandler}>저장</button>
      </div>
      <div className='todo_wrapper'>

        {view_appointment()}

      </div>
    </div>

  );
}

export default Profile;