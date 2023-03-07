import React from 'react';
import {Note} from "../../App";
import {Navigate, Outlet, useParams} from "react-router-dom";

type NoteLayoutProps = {
    notes: Note[]
}
const NoteLayout = ({notes}: NoteLayoutProps) => {
    const {id} = useParams()
    const note = notes.find(note => note.id === id)
    if (note == null) {
        return <Navigate to={'/'} replace/>
    }
    return (
        <div>
            <Outlet context={note}/>
        </div>
    );
};

export default NoteLayout;