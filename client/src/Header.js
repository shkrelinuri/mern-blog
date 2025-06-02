import { Link } from "react-router-dom";
import { useContext, useEffect, useState} from "react";
import { UserContext } from "./UserContext";

export default function Header() {
   const { setUserInfo, userInfo } = useContext(UserContext);
   useEffect(() => {
      fetch('http://localhost:4000/profile', {
         credentials: 'include',
      }).then(response => {
         response.json().then(userInfo => {
            setUserInfo(userInfo);
         });
      });
   }, []);

   function logout() {
      fetch('http://localhost:4000/logout', {
         credentials: 'include',
         method: 'Post'
      });
      setUserInfo(null);
   }

   const username = userInfo?.username;
   
   return (
      <header>
         <Link to="/" className="logo">AGS</Link>
         <nav>
            {username && (
               <>
                  <span>Hi, {username}</span>
                  <Link to="/create">Shkruaj produkt te ri</Link>
                  <Link to="/profile">Profili i perdoruesit</Link>
               <a onClick={logout}>Dil</a>
            </>
            )}
            {!username && (
            <>
               <Link to="/login">Futu</Link>
               <Link to="/register">Regjistrohu</Link>
            </>
            )}
         </nav>
      </header>
   );
}
