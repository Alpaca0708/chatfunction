"use client"
import Image from 'next/image';
import React, {useState,useEffect} from 'react';
import { auth, db } from '../firebaseConfig';
import { space } from 'postcss/lib/list';
import { collection, addDoc, updateDoc, doc, deleteDoc, } from "firebase/firestore";


export default function Home() {
  const [chatWindow, setChatWindow]= useState(false);
  const openChat = () => {
    setChatWindow(!chatWindow);
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState([]);
  const [send, setSend] = useState([])
  const [name, setName] = useState('')
  const [putname, setPutName] = useState('')

  const inputMessage = (event) => { 
    setMessage(event.target.value) 
    } 
  // const sendButton = () => {
  //   setSend([...send,message],[...putname,name])
  //   setMessage([])
  //   // send: ['hello','h2'] => 'hello','h2' => ['hello','h2',message]    
  // }

  const sendButton = () => {
    if (message.trim() !== '') { // 確保輸入的信息不是空白
      const fullMessage = `${putname}: ${message}`; // 合併 putname 和 message
      setSend([...send, fullMessage]); // 將合併後的消息添加到 send 陣列中
      setMessage(''); // 清空輸入框
    }
  };

  const nameing = (e) =>{
    setName(e.target.value)
  }
  const inputName =() => {
    setPutName(name)
    setName('')
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

const saveIntoFirestore = async(content) =>  {  

    try {
      console.log(123456)
    await addDoc(collection(db, "chat-content"), {
      gender:'male',
      mbti:'entp',
      content:content
    });
    console.log(123)
    } catch (err) {
      console.log('err:::',err)
    }
}

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

        

        <div style={{
          display:'flex',  
          alignItems:'center',
          
          }}>

            <div style={{flexDirection:'column',
                         }}>
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
          
          <Image
          src="/ENFP-DALL.png" 
          alt="Ellie"
          width={120}
          height={120}
          style={{ objectFit: 'cover',
          objectPosition: 'left',
          transform: 'translate(-10%, -5%)' }} 
          ></Image>
          
        </button>
        <p>ENFP</p>

        </div>
        <Image    src="/male.svg" 
                  alt='male'
                  width={70}
                  height={70}
                  style={{margin:'40px',top:'5px'}}></Image>
        <Image    src="/female.svg" 
                  alt='female'
                  width={70}
                  height={70}
                  style={{}}></Image>
        
        </div>

        <h3>MBTI</h3><input value={name} onChange={nameing}></input>
        <button onClick={inputName}>comfirm</button>

       
        
        
        
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

                <div style={{ flex:'reverse', overflowY: 'auto', margin:'2px'}}>
                      {/* <div>{putname}</div> */}
                         {/* {send.map((mes,i)=>
                             (<div className={'bg-green-500 m-2'} key={i}>{mes}</div>
                             ))} */}
                      {send.map((mes, i) => (
                          <div className={'bg-skyblue-500 m-2'} key={i}>{mes}</div>
                        ))}
                                      
                </div>
                
                <div style={{display:'flex', alignItems:'center', width:'100%',height:'30px' }}>

                  <div style={{
                    backgroundColor: 'skyblue',
                    borderRadius:'5px',
                    padding:'3px 5px 3px 5px '
                }}>{putname}</div>

                  <input value={message} onChange={inputMessage} style={{
                
                  width:'calc(100% - 30px)',
                  height:'20px',                  
                  border:'1px solid #ccc',
                  borderRadius:'5px',
                  padding:'3px',
                  margin:'5px'
                }}>                  
                </input>

                <div>
                <Image onClick={sendButton}
                  src="/send-alt-svgrepo-com.svg" 
                  alt='send'
                  width={0}
                  height={0}                  
                  style={{
                    width: '20px', // 适当设置图标大小
                    height: '20px',
                    cursor: 'pointer' // 更改鼠标样式为手指形状
                  }}
                  ></Image>
                  </div>
                  </div>
             </div>                  
      )}



    </div>
  )
}
