"use client"
import Image from 'next/image';
import React, {useState} from 'react';
import { auth, db } from '../firebaseConfig';


export default function Home() {
  const [chatWindow, setChatWindow]= useState(false);
  const openChat = () => {
    setChatWindow(!chatWindow);
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [send, setSend] = useState('')

  const inputMessage = (event) => { 
    setMessage(event.target.value) 
    } 
  const sendButton = () => {
    setSend(message)
  }

   const handleLogin = () => {
    setError('');
    // 使用导入的 auth 实例进行认证
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // 登录成功
      })
      .catch((error) => {
        // 处理错误
      });
  };

  return (
     <div>

        <form style={{
          flexDirection:'column'
        }}onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="输入邮箱"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="输入密码"
          />
          <button type="submit">登录</button>
        </form>

        {error && <p style={{ color: 'red' }}>错误：{error}</p>}
      
      <div style={{
        display:'flex', 
        justifyContent:'center', 
        alignItems:'center',
        flexDirection:'column',
        height: '100vh',
        textAlign:'center' }}>

        <h1>16 Personality Debate World</h1>
        <button onClick={openChat} 
        style={{
          width:'90px',
          height:'90px',
          borderRadius:'50%',
          overflow: 'hidden',
          padding:'none',
          cursor: 'pointer',  
          alignItems:'center'        
        }} >
          <div style={{
                        width:'90px',
                        height:'90px',
                        borderRadius:'50%',
                        overflow: 'hidden',
                        position: 'absolute', // 设置容器为绝对定位
                        left: '50%', // 向右移动 50% 的宽度
                        
                        transform: 'translate(-50%, -50%)' // 向左和向上各偏移自身 50% 的宽度和高度
                      }}>
          <Image
          src="/ENFP-DALL.png" 
          alt="Ellie"
          width={110}
          height={110}
          style={{ objectFit: 'cover',
          objectPosition: 'left' }} 
          ></Image>
          </div>
        </button>
        
      </div>
      
      {chatWindow &&(
            <div style={{
                  position: 'absolute',
                  left: 0, // 在屏幕的左侧显示
                  top: 0,
                  width: '400px', // 根据需要调整宽度
                  height: '100%', // 占满整个屏幕的高度
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  padding: '20px',
                  boxSizing: 'border-box',
                  zIndex: 1000,
                  display:'flex',
                  justifyContent: 'flex-end',
                  flexDirection: 'column',
                  overflowY: 'scroll', 
                }}> 

                <div style={{ flex: 1, overflowY: 'auto' }}>
                       {/* {messages.map((message, index) => (
                      <div key={index} style={{ margin: '10px 0' }}>
                        {message}
                       </div>
                          ))} */}
                          {send}

                </div>
                
                <div style={{ position: 'relative', width:'100%',height:'30px' }}>
                  <input onChange={inputMessage} style={{
                  position: 'absolute',                  
                  button:'20px',
                  width:'calc(100% - 30px)',
                  height:'20px',                  
                  border:'1px solid #ccc',
                  borderRadius:'5px'
                }}>
                </input>
                <Image onClick={sendButton}
                  src="/send-alt-svgrepo-com.svg" 
                  alt='send'
                  width={0}
                  height={0}
                  type="submit"
                  style={{
                    position: 'absolute',
                    right: '1px',
                    bottom: '8px',
                    width: '20px', // 适当设置图标大小
                    height: '20px',
                    cursor: 'pointer' // 更改鼠标样式为手指形状
                  }}
                  ></Image>
                  </div>
             </div>                  
      )}



    </div>
  )
}
