import styles from './Tag.module.css';

export default function Tag ({ name, func }) {


    return (
        <div className={styles.container} onClick={func}>
            {name}
        </div>
    )
}