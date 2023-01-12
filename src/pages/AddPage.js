import React from "react";
import { addNote } from "../utils/network-data";
import { useNavigate } from "react-router-dom";
import NewNote from "../components/NewNote";

function AddPage() {
    const navigate = useNavigate()

    function onAddNoteHandler(note) {
        addNote(note);
        navigate('/');
    }

    return (
        <section>
            <NewNote addNote={onAddNoteHandler}/>
        </section>
    )
}

export default AddPage;