const reqDetails = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Client-ID #PUT THE ACCESS KEY HERE` 
    }
};

export const fetchSearch = async (query, page = 1) => {
    const res = await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${query}`, reqDetails);
    
    return res.json();
}

export const getPhoto = async (photoId) => {
    const res = await fetch(`https://api.unsplash.com/photos/${photoId}`, reqDetails);
    return res.json();
}

export const getTopics = async (query) => {
    const res = await fetch(`https://unsplash.com/nautocomplete/${query}`);
    return res.json();
}
