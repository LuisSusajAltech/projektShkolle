import React from "react";
import { Route, Routes, useNavigate ,} from "react-router-dom";

//import { registerWithEmailAndPassword } from "components/firebase/firebase-config";
// import Sidebar from "components/SideBar/sideBar";
// import PrivatePages from "pages/PrivatePages/PrivatePages";
// import Sidebar from "components/SideBar/sideBar";
// import SignUp from "pages/LoggingIn/signUp";
// import Projects from "pages/Projects/project";

import Home from "pages/Home";
import NotFound from "pages/NotFound";
import SignIn from "pages/LoggingIn/signIn";
import ForgetPass from "pages/LoggingIn/ForgotPassword";
import Clubs from "pages/Clubs/Clubs";
import { useState , useEffect} from "react";
import { auth, db} from 'components/firebase/firebase-config';
import { query , collection, getDocs 
  // , where 
} from "firebase/firestore";
import Loading from "components/Loading/Loading";
import Club from "pages/Club/Club";
import NavBar from "components/NavBar/NavBar";
import Dashboard from "pages/Dashboard/dashboard";
import AddCreds from "pages/LoggingIn/AddCreds";
import CreateUser from "pages/CreateUser/CreateUser";
import PrivateRoute from "components/PrivateRoutes/privateRoutes";
import Settings from "pages/Settings/Settings";

export default function App() {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clubs, setClubs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const [user, setUser] = useState('');
  const [userData, setUserData] = useState([]);
  // const signUp = ()=>{registerWithEmailAndPassword(auth, 'Deivis', "" , "deivisgmail@gmail.com" , "test123!")}
  // useEffect(()=>{
  //   signUp();
  // },[])
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(()=>{
    setLoading(true);
    auth.onAuthStateChanged(async (user) => {
      if(user){
        setUser(user)
        await getDocs(query(collection(db, "Users"))).then(res=>{
          if(res.docs.length === 0){
            navigate("/signIn/addCreds")
            setLoading(false);
          }else{
            let userResArr = [];
            res.docs.map(doc=>{if(doc.data().uid === user.uid){userResArr.push(doc.data())}});
            if(!(userResArr.length)){
              navigate("/signIn/addCreds")
              setLoading(false);
            }else{
              setUserData(userResArr);
              setIsLogged(true)
              setLoading(false)
            }
          }
        }).catch(err=>{
          console.log(err)
        })
      }else{
        setIsLogged(false)
        setLoading(false)
      }
    });
  }, [isLogged])
  useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);

const isMobile = width < 768;
  return (
    <>{
      loading == true ? <Loading /> : <>
      <NavBar isLogged={isLogged} isMobile={isMobile}/>
      <Routes>
        <Route path="/" exact element={<Home isLogged={isLogged} isMobile={isMobile}/>} />
        <Route path="/clubs" exact element={<Clubs clubs={clubs} setClubs={setClubs} userData={userData}/>} />
        <Route path="/clubs/:clubsId" exact element={<Club clubs={clubs} isLogged={isLogged} setClubs={setClubs} projects={projects} setProjects={setProjects} userData={userData}/>} />
        <Route path="/projects/:projectId" exact element={<NotFound />} />
        <Route path="/signIn" exact element={<SignIn setLogged={setIsLogged} isLogged={isLogged} setLoading={setLoading}/>} />
        <Route path="/signIn/addCreds" exact element={user && !isLogged ? <AddCreds setLoading={setLoading} user={user} setLogged={setIsLogged} /> : <NotFound />}/>
        <Route path="/forgetPass" element={<ForgetPass />} />
        <Route path="/dashboard/home" exact element={
          <PrivateRoute isAuth={isLogged} isMobile={isMobile} userData={userData}>
            <Dashboard screenWidth={width}/>
          </PrivateRoute>
        }>
        </Route>
        <Route path="/dashboard/createUser" exact element={
          <PrivateRoute isAuth={isLogged} isMobile={isMobile} userData={userData}>
            {userData.length && userData[0].type == "admin" ? <CreateUser /> : <NotFound/>}
          </PrivateRoute>
          }>
        </Route>
        <Route path="/dashboard/settings" exact element={
          <PrivateRoute isAuth={isLogged} isMobile={isMobile} userData={userData}>
            <Settings />
          </PrivateRoute>
          }>
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
      </>
    }
    </>
  );
}
