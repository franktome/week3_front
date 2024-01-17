import React, { useState} from 'react';
import axios from 'axios';
import { HmacSHA256 } from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import './Login.css';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const key = 'jongmohyeonseo';
  const navigate = useNavigate();



  const handleLogin = async () => {
    // ... (이전과 동일한 코드)
    if (username === '' || password === '') {
      alert('Please enter both username and password.');
    } else {
        try {
            const response = await axios.post("http://172.10.7.46:80/login", 
             { 
                'user_id' : username,
                'user_pw' : HmacSHA256(password,key).toString()
            }
        );
            if (response.data === "True") {
                // 로그인 성공 처리
                alert(username + ' 로그인 성공!');
                // 다른 처리 로직을 추가하십시오.
                navigate('../Dashboard',{replace: true, state:{user_id: username}});
              } else {
                // 로그인 실패 처리
                alert('로그인 실패!');
                // 다른 처리 로직을 추가하십시오.
              }
            
        } catch(error) {
            //console.error("Login" + error);
            alert('로그인에 실패했습니다');
        }
    }
    
  };

  const handleSignUp = () => {
    //alert('회원가입 페이지로 이동합니다.');
    // 여기에 회원가입 페이지로 이동하는 로직을 추가하세요.
    navigate("../Register",{replace: false});
    
  };

  const buttonStyle = {
    background: '#FFC300',
    color: 'black',
    fontWeight: 'bold',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '15px',
    height: '50px', // 높이를 원하는 값으로 설정
  };

  const upperHalfStyle = {
    flex: 2,
    background: '#535353',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  };

  const lowerHalfStyle = {
    flex: 5,
    background: '#FFC300',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const titleStyle = {
    fontSize: '55px',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '20px',
    display: 'block'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={upperHalfStyle}>
        {/* Upper half content */}
        <div style={titleStyle}>BUSBOY</div>
        <div style={{ textAlign: 'center',color:'white' }}>
          "To allow you to focus on the core aspects, we take responsibility for less critical tasks"
        </div>
        {/* ... */}
      </div>
      <div style={lowerHalfStyle}>
        {/* Lower half content */}
        <div id="loginForm" style={{ background: "white", textAlign: 'center', width: '100%', maxWidth: '400px', padding: '20px', border: '1px solid #000', borderRadius: '8px' }}>
        <h2 style={{ margin: '0 0 20px' }}>로그인</h2>
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
        <button className="button" onClick={handleLogin} style={{ ...buttonStyle, marginRight: '8px' }}>Login</button>
        <button className="button" onClick={handleSignUp} style={buttonStyle}>회원가입</button>
      </div>
      </div>
    </div>
  );
};

export default Login;