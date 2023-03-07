import React, { useMemo} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navigate, Route, Routes} from "react-router-dom";
import NewNote from "./components/NewNote/NewNote";
import {Container} from "react-bootstrap";
import { useLocalStorage} from "./hooks/useLocalStorage";
import {v4} from "uuid"
import NoteList from "./components/NoteList/NoteList";
import NoteLayout from "./components/NoteLayout/NoteLayout";
import Note from './components/Note/Note';
import EditNode from "./components/EditNote/EditNode";

export type Note = {
    id: string
} & NoteData

export type RawNote = {
    id: string
} & RawNoteData

export type RawNoteData = {
    title: string
    markdown: string
    tagIds: string[]
}

export type NoteData = {
    title: string
    markdown: string
    tags: Tag[]
}

export type Tag = {
    id: string
    label: string
}

function App() {
    const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', [])
    const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', [])

    const notesWithTags = useMemo(() => {
        return notes.map((note:RawNote) => {
            return { ...note, tags: tags.filter(tag => {return (note.tagIds || []).includes(tag.id)}) }
        })
    }, [notes, tags])
    const onCreateNote = ({tags, ...data}: NoteData) => {
         setNotes(prevNotes => {
            return [
                ...prevNotes,
                {...data, id: v4(), tagIds: tags.map(tag => tag.id)},
            ]
        })
    }
    const onDeleteNote = (id:string) => {
        setNotes(prevNotes => {
            return prevNotes.filter(note=>note.id !== id)
        })
    }
    const onUpdateNote = (id:string,{tags, ...data}: NoteData) => {
        setNotes(prevNotes =>{
            return prevNotes.map(note=>{
                if (note.id === id){
                  return   {...note,...data,tagIds:tags.map(tag=>tag.id)}
                }else {
                    return note
                }
            })
        })

        setNotes(prevNotes => {
            return [
                ...prevNotes,
                {...data, id: v4(), tagIds: tags.map(tag => tag.id)},
            ]
        })
    }
    const addTag = (tag: Tag) => {
        setTags((prev: Tag[]) => [...prev, tag])
    }
    const deleteTag = (id:string) => {
        setTags(prevTags =>prevTags.filter(tag=>tag.id !== id))
    }
    const updateTag = (id:string,label:string) => {
        setTags(prevTags =>prevTags.map(tag=>{
            if (tag.id === id){
                return {...tag,label}
            }else {
                return  tag
            }
            })

        )
    }
    return (
        <Container className={'my-4'}>
            <Routes>
                <Route path={'/'} element={<NoteList
                    onDeleteTag={deleteTag}
                    onUpdateTag={updateTag}
                    availableTags={tags} notes={notesWithTags}
                />}/>
                <Route path={'/new'} element={<NewNote onSubmit={onCreateNote}
                                                       onAddTag={addTag}
                                                       availableTags={tags}
                />}/>
                <Route path={'/:id'} element={<NoteLayout notes={notesWithTags}/>}>
                    <Route index element={<Note onDelete={onDeleteNote}/>}/>
                    <Route path={'edit'} element={<EditNode availableTags={tags} onSubmit={onUpdateNote} onAddTag={addTag}/>}/>
                </Route>
                <Route path={'*'} element={<Navigate to={'/'}/>}/>
            </Routes>
        </Container>
    );
}

export default App;
