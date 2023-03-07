import React from 'react';
import NoteForm from "../NoteForm/NoteForm";
import {NoteData, Tag} from "../../App";
import {useNote} from "../../hooks/useNote";
type EditNodeProps={
    onSubmit:(id:string,data:NoteData)=>void
    onAddTag:(tag:Tag)=>void
    availableTags:Tag[]
}

const EditNode = ({onSubmit,onAddTag,availableTags}:EditNodeProps) => {
    const note = useNote()
    return (
        <div>
            <NoteForm
                title={note.title}
                tags={note.tags}
                markdown={note.markdown}
                onSubmit={data=>onSubmit(note.id,data)}
                onAddTag={onAddTag}
                availableTags={availableTags}/>
        </div>
    );
};

export default EditNode;