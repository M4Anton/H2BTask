import { SearchBar } from 'components';

import styles from './Main.module.css';

export default function Main () {

    return (
        <div className={styles.basic}>
        <div className={styles.main__container}>
            <h1 className={styles.h1}>Image browser</h1>
            <h2>Look for high-resolution images from <em>UNSPLASH</em> Website</h2>
            <h3>Powered by Unsplash API</h3>
            <div className={styles.searchbar__container} >
                <SearchBar />
            </div>
        </div>
        </div>
    );
}