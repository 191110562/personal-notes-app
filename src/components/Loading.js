import React from 'react'
import LocaleContext from '../contexts/LocaleContext'

export default function Loading() {
    const { locale } = React.useContext(LocaleContext);
    return (
        <section>
            <p>{locale === 'id' ? 'Memuat Catatan...' : 'Fetching Notes...'}</p>
        </section>
    )
}
