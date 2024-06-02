'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { PodcastEpisode } from '@/data/interfaces/podcast/podcast-details.interface';
import EmptyData from '@/components/empty-data/empty-data';
import { getPodcastDetails } from '@/services/podcasts';
import styles from '@/styles/episode-details.module.scss';
import EpisodeDetails from '@/components/episode-details/episode-details';

type EpisodePageProps = {
    params: {
        podcastId: number;
        episodeId: number;
    };
};

const EpisodePage: React.FC<EpisodePageProps> = ({ params }) => {
    const [podcastEpisode, setPodcastEpisode] = useState<PodcastEpisode | null>(
        null
    );

    useEffect(() => {
        getPodcastDetails(Number(params.podcastId), 20).then(res => {
            const episodes = res.results.filter(
                result => !!(result as PodcastEpisode).episodeGuid
            ) as PodcastEpisode[];

            const episode = episodes.find(
                ep => ep.trackId === Number(params.episodeId)
            );
            setPodcastEpisode(episode || null);
        });
    }, [params.podcastId, params.episodeId]);

    return (
        <>
            {podcastEpisode && (
                <EpisodeDetails podcastEpisode={podcastEpisode}></EpisodeDetails>
            )}
        </>
    );
};

export default EpisodePage;
