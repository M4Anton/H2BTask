import { useContext } from 'react';
import { AppContext } from 'providers';

import styles from './Suggestions.module.css';


export default function Suggestions ({array}) {
    const { searchHistory, deleteHistory, confirmSearch } = useContext(AppContext);

    return (
        <div className={styles.suggestion__container}>
            {array === searchHistory && <div>Search history: <span className={styles.deleteHistory} onClick={(e) => deleteHistory("full")}>clear history</span></div>}
            {array.map((item, index) => (
            <div className={styles.suggestion__item} key={index}>
                <span className={styles.magnifier} />
                <div className={styles.suggestion__text} onClick={() => confirmSearch(item.query)}>{item.query}</div>
                {array === searchHistory && <span className={styles.delete} onClick={(e) => deleteHistory(index)}/>}
            </div>
            ))}
        </div>
        );
}