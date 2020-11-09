import { useState } from 'react';

export default function Card ({ toggle, content }) {
    const [openModal, setOpenModal] = useState(false);
    const hide = () => setOpenModal(false);
    const show = () => setOpenModal(true);

    return (
        <>
            {toggle(show)}
            {openModal && content(hide)}
        </>
    );
}