/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { Podcast } from '@/data/interfaces/podcast/podcast.interface';
import { useEffect, useState, useCallback } from 'react';
import styles from './search.module.scss';

interface SearchProps {
    podcasts: Podcast[];
    onFilter: (filteredPodcasts: Podcast[]) => void;
}

const Search: React.FC<SearchProps> = ({ podcasts, onFilter }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [counter, setCounter] = useState<number>();

    const handleFilter = useCallback(() => {
        const filtered = podcasts.filter(
            podcast =>
                podcast['im:name'].label
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                podcast['im:artist'].label
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
        );
        onFilter(filtered);
        setCounter(filtered.length)
    }, [searchTerm, podcasts]);

    useEffect(() => {
        handleFilter();
    }, [searchTerm, handleFilter]);

    return (
        <div className={styles.searchContainer}>
            <span className={styles.counter}>{counter}</span>
            <input
                className={styles.search}
                type="search"
                placeholder="Filter podcasts..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
        </div>
    );
};

export default Search;
