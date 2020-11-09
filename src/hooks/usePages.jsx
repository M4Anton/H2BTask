import { useState } from 'react';

export default function usePages () {
    const [pages, setPages] = useState(0);
    return {pages, setPages};
}