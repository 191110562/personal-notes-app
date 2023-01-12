import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getArchivedNotes } from "../utils/network-data";
import SearchBar from "../components/SearchBar";
import NotesEmptyList from "../components/NotesEmptyList";
import NotesList from "../components/NotesList";
import LocaleContext from "../contexts/LocaleContext";
import Loading from '../components/Loading';

export default function HomePage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [archivedNotes, setArchivedNotes] = React.useState([]);
    const [keyword, setKeyword] = React.useState(() => {
        return searchParams.get('keyword') || ''
    });

    const { locale } = React.useContext(LocaleContext);
    const [loading, setLoading] = React.useState(true);
  
    React.useEffect(() => {
        getArchivedNotes().then(({ data }) => {
            setArchivedNotes(data);
            setLoading(false)
      });
    }, []);

    function onKeywordChangeHandler(keyword) {
        setKeyword(keyword);
        setSearchParams({keyword});
    }

    const filteredArchivedNotes= archivedNotes.filter((archivedNote) => {
        return archivedNote.title.toLowerCase().includes(
          keyword.toLowerCase()
        );
    });



    return (
        <section className="archives-page">
            <h2>{locale === 'id' ? 'Catatan Arsip' : 'Archived Note' }</h2>
            <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
            {
                loading === true ? <Loading /> : (filteredArchivedNotes.length > 0 ? (<NotesList notes={filteredArchivedNotes}/>) : <NotesEmptyList/>)
            }
        </section>
    )
}
