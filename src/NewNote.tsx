import React from 'react';
import NoteForm from "./NoteForm";
import {NoteData, Tag} from "./App";
type NewNoteProps={
    onSubmit:(data:NoteData)=>void
    onAddTag:(tag:Tag)=>void
    availableTags:Tag[]
}

const NewNote = ({onSubmit,onAddTag,availableTags}:NewNoteProps) => {
    return (
        <div>
            <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags}/>
        </div>
    );
};

export default NewNote;