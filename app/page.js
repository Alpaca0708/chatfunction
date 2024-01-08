"use client"
import Image from 'next/image';
import React, {useState} from 'react';
import { auth, db } from '../firebaseConfig';


export default function Home() {
  const [chatWindow, setChatWindow]= useState(false);
  const openChat = () => {
    setChatWindow(!chatWindow);
  };

   const handleLogin = () => {
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
      
      <div style={{
        display:'flex', 
        justifyContent:'center', 
        alignItems:'center',
        flexDirection:'column',
        height: '100vh',
        textAlign:'center' }}>

        <h1>hello world</h1>
        <button onClick={openChat} 
        style={{
          width:'80px',
          height:'80px',
          borderRadius:'50%',
          overflow: 'hidden',
          padding:'none'          
        }} >
          <Image
          src="/17255380140992.jpg" 
          alt="Ellie"
          width={80}
          height={80}
          style={{ objectFit: 'cover',
          objectPosition: 'left' }} 
          ></Image>
        </button>
        
      </div>
      
      {chatWindow &&(
                <div style={{
                  position: 'absolute',
                  left: 0, // 在屏幕的左侧显示
                  top: 0,
                  width: '300px', // 根据需要调整宽度
                  height: '100%', // 占满整个屏幕的高度
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  padding: '20px',
                  boxSizing: 'border-box',
                  zIndex: 1000 
                }}> 
                <div style={{ position: 'relative', height:'100%' }}>
                  <input style={{
                  position: 'absolute',
                  bottom:0,
                  width:'100%',
                  height:'20px',                  
                  border:'1px solid #ccc',
                  borderRadius:'5px'
                }}></input>
                  </div>
                  </div>                  
      )}



    </div>
  )
}
