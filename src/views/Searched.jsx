import { useContext, useState } from 'react';
import { debounce } from 'helpers';
import { fetchSearch, getPhoto } from 'services';

import styles from './Searched.module.css';

import { SearchBar, Card, Modal, Tag } from "components";
import { AppContext } from "providers";
import { useInfiniteScroll } from 'hooks';

export default function Searched () {
    const { search, pages, setPages, data, setData, confirmSearch } = useContext(AppContext);
    const [isFetching, setIsFetching] = useInfiniteScroll(debounce(fetchMoreData, 500));
    const [photoDetails, setPhotoDetails] = useState({});

    function fetchMoreData () {
        let newPages = {actual: pages.actual+1, total: pages.total}
        setPages(newPages);
        if(newPages.actual <= newPages.total) {
          fetchSearch(search, newPages.actual)
                .then(newData => setData([...data, ...newData.results]))
                .then(setIsFetching(false));
        } else {
           setIsFetching(false);
        }
    };

    return (

        <div className={styles.main}>
            <div className={styles.searchbar__container}><SearchBar /></div>
                <div className={styles.container}>
                    <h2 className={styles.results__query}>Results for: {search}</h2>
                    <div className={styles.results__cols}>
                    {data && data.map((item,i) => ( 
                        <div className={styles.results__grid}>
                            <Card
                                toggle={show => ( 
                                    <div className={styles.card__container} >
                                        <div className={styles.thumbnail__container}>
                                            {console.log(item)}
                                            <img 
                                                className={styles.thumbnail__img} 
                                                src={item.urls.small} 
                                                onClick={async () => getPhoto(item.id).then(data => setPhotoDetails(data)).then(show)} 
                                                alt={item.alt_description} 
                                            />
                                            <figcaption className={styles.thumbnail__caption}>
                                                <figure className={styles.profile__shape_md}>
                                                    <img
                                                        src={item.user.profile_image.medium} 
                                                        alt="profilePhoto"
                                                    />
                                                </figure>
                                                <div>
                                                    {item.user.name}
                                                </div>
                                            </figcaption>
                                        </div>
                                        <div className={styles.tag__container}>
                                            {item.tags.map(tag => <Tag key={tag.title} name={tag.title} func={() => confirmSearch(tag.title)}/>)}
                                        </div>
                                    </div>
                                )}
                                content={hide => Object.keys(photoDetails).length !== 0 &&(
                                    <Modal 
                                        key={i} 
                                        hide={hide} 
                                        loc={photoDetails.location.name} 
                                        author={item.user.name} 
                                        authorAvatar={item.user.profile_image.medium}
                                    >
                                        <img src={item.urls.regular} alt={item.alt_description}/>                        
                                    </Modal>
                                )}
                                key={i}
                            />
                        </div>))}
                    {isFetching && <h4>Fetching photos for Ya!</h4>}
                </div>
            </div>
        </div>

    );
}