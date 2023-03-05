import React from 'react';
import NoteForm from "./NoteForm";
import {NoteData} from "./App";
type NewNoteProps={
    onSubmit:(data:NoteData)=>void
}

const NewNote = ({onSubmit}:NewNoteProps) => {
    return (
        <div>
            <NoteForm onSubmit={onSubmit}/>
        </div>
    );
};

export default NewNote;