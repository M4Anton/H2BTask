import { useState } from 'react';

export default function useHistory () {

    const [searchHistory, setSearchHistory] = useState(localStorage.getItem("history") ? localStorage.getItem("history").split(',', 5) : []);
    return {
        searchHistory,
        setSearchHistory,
    }
}