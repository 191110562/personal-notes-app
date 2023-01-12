import React from 'react';
import { FiPlusCircle } from "react-icons/fi/index.esm";
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getActiveNotes } from "../utils/network-data";
import NotesEmptyList from "../components/NotesEmptyList";
import NotesList from "../components/NotesList";
import LocaleContext from "../contexts/LocaleContext";
import SearchBar from '../components/SearchBar';
import Loading from '../components/Loading';

export default function HomePage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeNotes, setActiveNotes] = React.useState([]);
    const [keyword, setKeyword] = React.useState(() => {
        return searchParams.get('keyword') || ''
    });
    const navigate = useNavigate()
    const { locale } = React.useContext(LocaleContext);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        getActiveNotes().then(({ data }) => {
            setActiveNotes(data);
            setLoading(false)
        });
    }, []);

    function onNavigateHandler() {
        navigate('/notes/new');
    }

    function onKeywordChangeHandler(keyword) {
        setKeyword(keyword);
        setSearchParams({keyword});
    }

    const filteredActiveNotes= activeNotes.filter((activeNote) => {
        return activeNote.title.toLowerCase().includes(
          keyword.toLowerCase()
        );
    });

    return (
        <section className="homepage">
            <h2>{locale === 'id' ? 'Catatan Aktif' : 'Active Note'}</h2>
            <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler}/>
            {
                loading === true ? <Loading /> : (filteredActiveNotes.length > 0 ? (<NotesList notes={filteredActiveNotes}/>) : <NotesEmptyList/>)
            }
            <div className="homepage__action">
                <button className="action" type="button" title="Add" onClick={onNavigateHandler}><FiPlusCircle/></button>
            </div>
        </section>
    )
}
