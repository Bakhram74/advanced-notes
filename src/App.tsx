import React, {useCallback, useMemo} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navigate, Route, Routes} from "react-router-dom";
import NewNote from "./NewNote";
import {Container} from "react-bootstrap";
import { useLocalStorage} from "./hooks/useLocalStorage";
import {v4, v4 as uuidV4} from "uuid"
import NoteList from "./NoteList";

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
    console.log(notesWithTags)
    const onCreateNote = ({tags, ...data}: NoteData) => {
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
    return (
        <Container className={'my-4'}>
            <Routes>
                <Route path={'/'} element={<NoteList availableTags={tags} notes={notesWithTags  }/>}/>
                <Route path={'/new'} element={<NewNote onSubmit={onCreateNote}
                                                       onAddTag={addTag}
                                                       availableTags={tags}
                />}/>
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
