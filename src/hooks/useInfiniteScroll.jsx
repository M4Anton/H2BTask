import { useState, useEffect } from 'react';

export default function useInfiniteScroll (callback) {

    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', yHandler);
        return () => window.removeEventListener('scroll', yHandler);
    }, []);

    useEffect(() => {
        if(!isFetching) return;
        callback(() => {
            console.log("calledBack!!");
        });
        //eslint-disable-next-line
    }, [isFetching]);

    const yHandler = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        setIsFetching(true);
    }

    return [isFetching, setIsFetching];
}