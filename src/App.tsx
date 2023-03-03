import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navigate, Route, Routes} from "react-router-dom";
import NewNote from "./NewNote";
import {Container} from "react-bootstrap";
function App() {
  return (
    <Container className={'my-4'}>
     <Routes>
       <Route path={'/'} element={<h1>Hi</h1>}/>
       <Route path={'/new'} element={<NewNote/>}/>
         <Route path={'/:id'}>
             <Route index element={<h1>Id</h1>}/>
             <Route path={'edit'} element={<h1>Edit</h1>}/>
         </Route>
       <Route path={'*'} element={<Navigate to={'/'}/>}/>
     </Routes>
    </Container>
  );
}

export default App;
