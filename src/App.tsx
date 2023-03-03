import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navigate, Route, Routes} from "react-router-dom";
function App() {
  return (
    <div className="App">
     <Routes>
       <Route path={'/'} element={<h1>Hi</h1>}/>
       <Route path={'/new'} element={<h1>New</h1>}/>
         <Route path={'/:id'}>
             <Route index element={<h1>Id</h1>}/>
             <Route path={'edit'} element={<h1>Edit</h1>}/>
         </Route>
       <Route path={'*'} element={<Navigate to={'/'}/>}/>
     </Routes>
    </div>
  );
}

export default App;
