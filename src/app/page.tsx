'use client';
import PodcastCard from '@/components/podcast-card/podcast-card';
import Search from '@/components/search/search';
import { Podcast } from '@/data/interfaces/podcast/podcast.interface';
import { getPodcasts } from '@/services/podcasts';
import { useEffect, useState } from 'react';
import styles from '@/styles/home.module.scss';
import EmptyData from '@/components/empty-data/empty-data';

export default function Page() {
    const [podcasts, setPodcasts] = useState<Podcast[]>([]);
    const [allPodcasts, setAllPodcasts] = useState<Podcast[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getPodcasts(1310, 100)
            .then(res => {
                setPodcasts(res.feed.entry);
                setAllPodcasts(res.feed.entry);
                setIsLoading(false);
            })
            .catch(e => {
                console.error(e);
                setIsLoading(false);
            });
    }, []);

    const handleFilterPodcasts = (filtered: Podcast[]) => {
        setPodcasts(filtered);
    };

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
            <EmptyData isLoading={isLoading} hasData={podcasts.length > 0} />
            {podcasts.length > 0 && (
                <div
                    className={`${styles.podcastList} ${
                        podcasts.length > 3 ? styles.podcastListBetween : ''
                    }`}>
                    {podcasts.map(podcast => (
                        <PodcastCard
                            key={podcast.id.attributes['im:id']}
                            id={podcast.id.attributes['im:id']}
                            title={podcast['im:name'].label}
                            author={podcast['im:artist'].label}
                            imageUrl={podcast['im:image'][2].label}
                        />
                    ))}
                </div>
            )}
        </>
    );
}
