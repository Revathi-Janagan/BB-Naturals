import { createContext, useEffect, useState } from "react";
import "./App.css";
import ClassComponent from "./components/front/classComponent";
import FormComponent from "./components/front/formComponent";
import FormComponentMain from "./components/front/form";
import TodoComponent from "./components/Todo/todoComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./components/ReactRoute/Menu";
import Home from "./components/ReactRoute/Home";
import AboutUs from "./components/ReactRoute/AboutUs";
import ContactUs from "./components/ReactRoute/ContactUs";
import Login from "./components/ReactRoute/Login";
import UserList from "./components/ReactRoute/User-List";
import UserInfo from "./components/ReactRoute/User-Info";
import UserPost from "./components/ReactRoute/User-Post";
import PostList from "./components/ReactRoute/User-Post_List";
import NewLogin from "./components/ReactRoute/newLogin";
import Crud from "./components/ReactRoute/crud";
import Signup from "./components/ReactRoute/signup";
import Sidebar from "./components/ReactRoute/Sidebar";
import ProtectedRoutes from "./components/ReactRoute/ProtectedRoutes";
import setAuthToken from "./components/ReactRoute/setAuthToken";
import axios from "axios";

const UserContext = createContext();

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (localStorage.todoapp) {      
      axios.get("/api/user/getuserinfo").then((res) => {
        console.log(res.data.data);
        setUser(res?.data?.data);
      });
    }
  },[]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
        {/* <ClassComponent /> */}
        {/* <FormComponent /> */}
        {/* <FormComponentMain /> */}
        <div className="container">
          <BrowserRouter>
            <div className="sidebar">
              {/* <Menu /> */}
              <Sidebar />
            </div>
            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/sign-in" element={<Login />} />
                <Route path="/user-list" element={<UserList />} />
                <Route path="/user-info/:userid" element={<UserInfo />} />
                {/* <Route path='/user-post' element={<PostList />} /> */}
                <Route path="/user-postWithId/:userid" element={<UserPost />} />
                <Route path="/new-login" element={<NewLogin />} />
                <Route path="/crud" element={<Crud />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                  path="/todoComponent"
                  element={
                    <ProtectedRoutes>
                      <TodoComponent />
                    </ProtectedRoutes>
                  }
                />
              </Routes>
              {/* <TodoComponent /> */}
            </div>
          </BrowserRouter>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
export { UserContext };
