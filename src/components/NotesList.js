import React from "react";
import PropTypes from 'prop-types';
import NoteItem from "./NoteItem";

function NotesList ({notes}) {
    return(
        <section className="notes-list">
            {
                notes.map((note) => (
                    <NoteItem
                        key={note.id}
                        id={note.id}
                        {...note}
                    />
                ))
            }
        </section>
    );
}

NotesList.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default NotesList;
