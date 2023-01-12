import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useNavigate, useParams } from "react-router-dom";
import DetailItem from "../components/DetailItem";
import { archiveNote, deleteNote, getNote, unarchiveNote } from "../utils/network-data";
import NotFoundPage from "./NotFoundPage";

export default function DetailPage() {
    const { id } = useParams();
    const [note, setNote] = useState(null); 
    const navigate = useNavigate();

    useEffect(() => {
        getNote(id).then( ({data}) => {
            setNote(data);
        })
    }, [id])

    async function onArchiveHandler(id) {
        await archiveNote(id);
        navigate('/');
    }

    async function onUnarchiveHandler(id) {
        await unarchiveNote(id);
        navigate('/')
    }
    async function onDeleteHandler(id) {
        await deleteNote(id);
        navigate('/')
    }

    return (
        <>
            {
                note === null ? (<NotFoundPage/>):(<DetailItem {...note} onDelete={onDeleteHandler} onArchive={onArchiveHandler} inArchive={onUnarchiveHandler}/>)
            }
        </>
    )
}

DetailItem.propTypes = {
    id: PropTypes.string.isRequired,
}
