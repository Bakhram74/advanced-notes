import React, {useCallback, useMemo, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import NewNote from "./NewNote";
import {Container} from "react-bootstrap";
import {useLocalStorage} from "./hooks/useLocalStorage";
import {v4} from 'uuid';
export type Note = {
    id:string
}& NoteData

export type RowNote={
id:string
}& RowNoteData
export type RowNoteData = {
    title:string
    markdown:string
    tagIds:string[]
}
export type NoteData = {
    title:string
    markdown:string
    tags:Tag[]
}

export type Tag = {
    id:string
    label:string
}

function App() {
    const [notes,setNotes] = useLocalStorage<RowNote[]>('NOTES',[])
    const [tags,setTags] = useLocalStorage<Tag[]>('TAGS',[])
const notesWithTags = useCallback(()=>{
    return notes.map((note: { tagIds: string | any[]; })=>{
        return {...note,tagIds:tags.filter((tag: { id: any; })=>note.tagIds.includes(tag.id))}
    })
},[notes,tags])///todo
    const onCreateNote=({tags,...data}:NoteData)=>{
        return setNotes((prevNotes: RowNote[])=>{
            return [
                ...prevNotes,
                {...data,id:v4(),tagsId:tags.map(tag=>tag.id)},
            ]
        })
    }
    return (
    <Container className={'my-4'}>
     <Routes>
       <Route path={'/'} element={<h1>Hi</h1>}/>
       <Route path={'/new'} element={<NewNote onSubmit={onCreateNote}/>}/>
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
