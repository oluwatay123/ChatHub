import React, { useContext, useState } from 'react'
import { collection, query, where,getDocs, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { doc , getDoc} from 'firebase/firestore';
// import "../style.scss"
const Search = () => {

  const [userName, setUserName] = useState('')
  const [user, setUser] = useState(null)
  const [error, setError] = useState(false)

  const {currentUser} = useContext(AuthContext)

const handleSearch = async()=> {
const q = query(collection(db, 'users') ,where ("displayName", "==", userName))


try {
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    setUser(doc.data())
  });

  console.log(q)
} catch (error) {
  setError(true)
}


}

  const handleKey = e => {
    e.code === "Enter" && handleSearch()
  }


  const handleSelect =  async()=> {
    const combinedId =  currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    try {

    
      const res =  await getDoc(doc(db, 'chats',combinedId))
      
      if(!res.exists()){
        // create a chat 
        await setDoc(doc(db, 'chats',combinedId),{messages: []})

        //create user chat 
 await updateDoc(doc(db, "userChats" , currentUser.uid), {
      [combinedId+".userInfo"]:{
        uid:user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL
      },
      [combinedId+ ".date"]: serverTimestamp()
 })

 await updateDoc(doc(db, "userChats" , user.uid), {
  [combinedId+".userInfo"]:{
    uid:currentUser.uid,
    displayName: currentUser.displayName,
    photoURL: currentUser.photoURL
  },
  [combinedId+ ".date"]: serverTimestamp()
})
     
      }
      console.log(res) 
    } catch (error) {
      
    }
   
    setUser(null)
    setUserName("")
  }

  return (

    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder='Find and chat' onKeyDown={handleKey} onChange={e => setUserName(e.target.value)}  value={userName}/>
      </div>  
{error&& <span>user not found!</span>}
    {  user && <div className="userChat" onClick={handleSelect}>
        <img src={user.photoURL}alt="img" />
        <div className="userChatInfo">
          <span>{user.displayName}</span>

          <p>Hello</p>
      </div>
        </div>}



    </div>
  )
}

export default Search