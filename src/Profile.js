import React from 'react';

const Profile = () => {
  return (
    <div>
      {/* 프로필 사진과 닉네임 */}
      <div style={{ marginBottom: '20px' }}>
        <img src="프로필_사진_URL" alt="프로필 사진" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
        <div style={{ marginTop: '10px' }}>닉네임</div>
      </div>
      
      {/* 이전 일정 및 새로운 일정 추가 폼 */}
      <div>
        <h3>이전 일정</h3>
        {/* 이전 일정 표시 */}
        
        <h3>새로운 일정 추가</h3>
        {/* 새로운 일정 입력 폼 */}
      </div>
    </div>
  );
};

export default Profile;