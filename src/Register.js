import './Register.css';
import {HmacSHA256, SHA156} from 'crypto-js';
import { useState } from 'react';
import axios from 'axios';

function Register(){
    const [username, setUsername] = useState('');
    const [belong, setBelong] = useState('');
    const [user_id, setUser_id] = useState('');
    const [password, setPassword] = useState('');
    const [check_password, setCheckPassword] = useState('');
    const [isDuplicated, setIsDuplicated] = useState(false);
    const [isPasswordSame, setIsPasswordSame] = useState(true);
    
    const setUsernameText = (e) => {
        setUsername(e.target.value)
    }

    const setBelongText = (e) => {
        setBelong(e.target.value)
    }

    const setId = (e) => {
    setUser_id(e.target.value);
    setIsDuplicated(false); // 입력이 변경되면 중복 상태 초기화
    };

    const checkPassword1 = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        if(newPassword === check_password){
            setIsPasswordSame(true);
        } else{
            setIsPasswordSame(false);
        }
    }
    
    const checkPassword2 = (e) => {
        const newPassword = e.target.value;
        setCheckPassword(newPassword);
        if(password === newPassword){
            setIsPasswordSame(true);
        } else{
            setIsPasswordSame(false);
        }
    }

    const handleDuplicate = async() => {
        if(user_id === ""){
            alert("아이디를 입력해주세요.");
            return;
        }
        try{
            const response = await axios.get("http://172.10.7.46:80/duplicate", 
            {params: { 
                'user_id' : user_id,
                }
            });
            if (response.data === "True"){
                // 중복 확인 성공 
                setIsDuplicated(true);
            }
            else{
                setIsDuplicated(false);
                alert("이미 존재하는 아이디입니다.");
            } 
        }
        catch (error){
            console.error("Error in handlerDuplicate : ", error);
        } 
    }

    const submitRegister = async() =>{
        if(!isPasswordSame){
            alert("비밀번호가 일치하지 않습니다.")
            return;
        } else if(password.length <= 5){
            alert("비밀번호는 6자리 이상으로 설정해주세요.");
            return;
        } 
        try{
            const key = "jongmohyeonseo";
            const hash_password = HmacSHA256(password,key).toString() ;
            const response = await axios.post("http://172.10.7.46:80/register", 
            {
                'user_id' : user_id,
                'password' : hash_password,
                'name' : username,
                'belong' : belong,
            });
            alert("새 계정이 등록되었습니다.");
            if (response.data === "True") {
                alert("새 계정이 등록되었습니다.");
            }
        } 
        catch(error){
            console.error("Error in submitRegister : ", error);
        }
    }
    
    return (
        <div className='Register'>
            <h2> App name 회원가입</h2>
            <div className="name_input_class">
                <label htmlFor="register_name_input">이름</label>
                <input type="text" id="register_name_input" onChange={setUsernameText} />
                <div className='blank'></div>
            </div>
            <div className="belong_input_class">
                <label htmlFor="register_belong_input">소속</label>
                <input type="text" id="register_belong_input" onChange={setBelongText} />
                <div className='blank'></div>
            </div>
            <div className="id_input_class">
                <label htmlFor="register_id_input">아이디</label>
                <input type="text" id="register_id_input" onChange={setId}/>
                <button type="submit" onClick={handleDuplicate} disabled={isDuplicated}
                style={{background : isDuplicated ? '#D9D9D9':'#4CAF50'}}>중복확인</button>

            </div>
            <div className="password_input_class">
                <label htmlFor="register_password_input">비밀번호</label>
                <input type="password" id="register_password_input" onChange={checkPassword1}/>
                <div className='blank'></div>
            </div>
            <div className="register_password_re_input">
                <label htmlFor="text1">비밀번호 확인</label>
                <input type="password" id="register_password_re_input" onChange={checkPassword2} />
                <div className='blank'></div>
            </div>

            <button className="submit_register" type="submit" onClick={submitRegister}>제출</button>
        </div>
    );
}
export default Register; 