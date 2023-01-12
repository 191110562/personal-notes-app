import React from "react";
import PropTypes from 'prop-types';
import { showFormattedDate } from "../utils/index";
import { FiArrowDown, FiArrowUp, FiTrash } from "react-icons/fi/index.esm";
import { useNavigate } from "react-router-dom";

function DetailItem ({ id, title, body, createdAt, archived, onDelete , onArchive, inArchive}) {
    // const navigate = useNavigate();

    // function onDeleteNoteHandler() {
    //     onDelete(id);
    //     navigate('/');
    // }

    // function onArchiveNoteHandler() {
    //     navigate('/');
    // }

    return (
        <section className="detail-page">
            <h3 className="detail-page__title">{title}</h3>
            <p className="detail-page__createdAt">{showFormattedDate(createdAt)}</p>
            <div className="detail-page__body">{body}</div>
            <div className="detail-page__action">
                {
                    archived === false ?
                    (
                        <button className="action" type="button" title="Arsipkan" onClick={() => {onArchive(id)}}><FiArrowDown/></button>
                    )
                    :(
                        <button className="action" type="button" title="Arsipkan" onClick={() => {inArchive(id)}}><FiArrowUp/></button>
                    ) 
                }
                <button className="action" type="button" title="Hapus" onClick={() => onDelete(id)}><FiTrash/></button>
            </div>
        </section>
    )
}

DetailItem.propTypes = {
    notes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    onArchive: PropTypes.func.isRequired,
    inArchive: PropTypes.func.isRequired,
}

export default DetailItem;