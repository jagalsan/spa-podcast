'use client';
import PodcastCard from '@/components/podcast-card/podcast-card';
import Search from '@/components/search/search';
import { Podcast } from '@/data/interfaces/podcast/podcast.interface';
import { getPodcasts } from '@/services/podcasts';
import { useEffect, useState } from 'react';
import styles from '@/styles/home.module.scss';
import EmptyData from '@/components/empty-data/empty-data';
import PodcastList from '@/components/podcast-list/podcast-list';

export default function Page() {
    const [podcasts, setPodcasts] = useState<Podcast[]>([]);
    const [allPodcasts, setAllPodcasts] = useState<Podcast[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getPodcasts(1310, 100)
            .then(res => {
                setPodcasts(res.feed.entry);
                setAllPodcasts(res.feed.entry);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const handleFilterPodcasts = (filtered: Podcast[]) => {
        setPodcasts(filtered);
    };

    if (isLoading) {
        return (
            <EmptyData isLoading={isLoading} hasData={podcasts.length > 0} />
        );
    }

    if (podcasts.length < 0) {
        return (
            <EmptyData isLoading={isLoading} hasData={podcasts.length > 0} />
        );
    }

    return (
        <>
            <div className={styles.searchContainer}>
                {!isLoading && (
                    <Search
                        podcasts={allPodcasts}
                        onFilter={handleFilterPodcasts}
                    />
                )}
            </div>
            {podcasts.length > 0 && (
                <PodcastList podcasts={podcasts}></PodcastList>
            )}
        </>
    );
}
