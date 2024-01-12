import React, { useState } from 'react';
import axios from 'axios'; 
import {HmacSHA256, SHA156} from 'crypto-js'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const key = "jongmohyeonseo";

  const handleLogin = async() => {
    if (username === '' || password === '') {
      alert('Please enter both username and password.');
    } else {
        try {
            const response = await axios.get("http://172.10.7.46:80/login", 
            {params: { 
                'user_id' : username,
                'user_pw' : HmacSHA256(password,key).toString() 
            }
        });
            if (response.data === "True") {
                // 로그인 성공 처리
                alert('로그인 성공!');
                // 다른 처리 로직을 추가하십시오.
        
              } else {
                // 로그인 실패 처리
                alert('로그인 실패: 서버에서 "True"를 반환하지 않았습니다.');
                // 다른 처리 로직을 추가하십시오.
              }
            // const responseData = response.data;
            
        } catch(error) {
            //console.error("Login" + error);
            alert('실패했습니다 안돼');
        }
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div id="loginForm" style={{ textAlign: 'center', width: '100%', maxWidth: '400px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2 style={{ margin: '0 0 20px' }}>로그인 하기</h2>
        <label style={{ display: 'block', marginBottom: '10px', width: '100%', textAlign: 'left' }}>
          아이디 
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', marginBottom: '10px', fontSize: '16px' }}
          />
        </label>
        <label style={{ display: 'block', marginBottom: '20px', width: '100%', textAlign: 'left' }}>
          비밀번호
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', marginBottom: '20px', fontSize: '16px' }}
          />
        </label>
        <button onClick={handleLogin} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>Login</button>
      </div>
    </div>
  );
};

export default Login;