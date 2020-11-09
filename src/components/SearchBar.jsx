import { useContext, useState } from 'react';
import { debounce } from "helpers";
import { getTopics } from "services";
import { AppContext } from "providers";

import styles from './SearchBar.module.css';

import { Suggestions } from 'components';

export default function SearchBar () {
    const { searchHistory, confirmSearch } = useContext(AppContext);
    const [suggestionsVisible, setSuggestionsVisible] = useState(false);
    const [suggestionList, setSuggestionList] = useState([]);

    const onSearchChange = async (value) => {
        if(value.length > 2) {
            getTopics(value).then(data => setSuggestionList(data.did_you_mean));
        }
    }

    const clear = () => {
       return document.querySelector('input').value = '';
    }

    const renderSuggestions = () => {
        if(searchHistory.length && !document.querySelector('input').value){
            return <Suggestions array={searchHistory} />;
        }
        else if(suggestionList.length) {
            return <Suggestions array={suggestionList} />;
        } else {
            return document.querySelector('input').value ? (
                <div className={styles.simple}>Sorry We couldn't find anything that matches Your text</div>
            ) : (
                <div className={styles.simple}>It looks like Your search history is empty</div>
            );
        }
    }


    return (
        
        <div 
            className={styles.searchbox__container}
            onMouseOver={() => setSuggestionsVisible(true)}
            onMouseLeave={() => setSuggestionsVisible(false)}
        >
            {console.log(process.env)}
            <div className={styles.magnifier} />
            <input
                placeholder="Search free high-resolution images!"
                className={styles.searchbox__input}
                onChange={debounce(e => onSearchChange(e.target.value), 300)}
                onKeyPress={e => e.key === "Enter" ? confirmSearch(e.target.value) : null}
            />
            <span className={styles.clear} onClick={() => clear()} />
            {suggestionsVisible ? renderSuggestions() : null}
        </div>
    );
}