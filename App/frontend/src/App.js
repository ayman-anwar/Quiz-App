import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Quiz from './components/Quiz';
import LanguageSelection from './components/LanguageSelection';
import AdminPanel from './components/AdminPanel';
import Home from './components/Home';
// import UpdateQuestion from './components/UpdateQuestion';
// import DeleteQuestion from './components/DeleteQuestion';
import AdminLogin from './components/AdminLogin';
// import AddQuestion from './components/AddQuestion';
import LoginPage from  './components/LoginPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/quiz" element={<LanguageSelection />} />
      <Route path="/take-quiz/:language" element={<Quiz />} />
      <Route path="/admin-login" element={<AdminLogin/>} />
      <Route path="/admin" element={<AdminPanel/>} />
      <Route path="/loginpage" element={<LoginPage/>} />
      {/* <Route path="/admin/add-question" element={<AddQuestion />} />
      <Route path="/admin/update-question" element={<UpdateQuestion />} />
      <Route path="/admin/delete-question" element={<DeleteQuestion />} /> */}
    </Routes>
  );
}

export default App;
