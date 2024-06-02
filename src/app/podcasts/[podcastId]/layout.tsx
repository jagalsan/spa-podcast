/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/podcast-layout.module.scss';
import { getPodcastDetails } from '@/services/podcasts';
import {
    PodcastDetails,
    PodcastEpisode,
    PodcastResult,
    Track,
} from '@/data/interfaces/podcast/podcast-details.interface';
import EmptyData from '@/components/empty-data/empty-data';
import PodcastInfo, {
    PodcastInfoI,
} from '@/components/podcast-info/podcast-info';

type Layout = {
    children: React.ReactElement;
    params: {
        podcastId: number;
    };
};

const Layout: React.FC<Layout> = ({ children, params }) => {
    const [podcastEpisodes, setPodcastEpisodes] = useState<PodcastEpisode[]>();
    const [podcastDetails, setPodcastDetails] = useState<Track>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [podcastInfoData, setPodcastInfoData] = useState<PodcastInfoI | null>(null);

    useEffect(() => {
        getPodcastDetails(Number(params.podcastId), 20)
            .then(res => {
                const details = res.results[0] as Track;
                setPodcastDetails(details);
                const episodes = res.results.filter(
                    result => !!(result as PodcastEpisode).episodeGuid
                ) as PodcastEpisode[];
                setPodcastEpisodes(episodes);

                setPodcastInfoData({
                    authorName: details.artistName,
                    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione sequi quaerat labore modi dolorum error, magni deleniti facilis laboriosam soluta nesciunt repellendus adipisci fugit quis cupiditate pariatur dolorem. Dolores, corrupti.`,
                    id: params.podcastId,
                    image: details.artworkUrl600,
                    title: details.collectionName,
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.podcastId]);

    if (isLoading) {
        return <EmptyData isLoading={true} hasData={false} />;
    }

    if (!podcastDetails) {
        return <EmptyData isLoading={false} hasData={false} />;
    }

    return (
        <section className={styles.container}>
            <div className={styles.sidebar}>
                {podcastInfoData && (
                    <PodcastInfo podcastInfo={podcastInfoData} />
                )}
            </div>
            <div className={styles.content}>
                {children}
            </div>
        </section>
    );
};

export default Layout;
