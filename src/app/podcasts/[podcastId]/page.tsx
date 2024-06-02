'use client';
import { PodcastEpisode } from '@/data/interfaces/podcast/podcast-details.interface';
import { usePathname } from 'next/navigation';
import EpisodeList from '@/components/episode-list/episode-list';
import { useEffect, useState } from 'react';
import EmptyData from '@/components/empty-data/empty-data';
import { getPodcastDetails } from '@/services/podcasts';

type EpisodePageProps = {
    params: {
        podcastId: number;
    };
};

const Page: React.FC<EpisodePageProps> = ({ params }) => {
    const [podcastEpisodes, setPodcastEpisodes] = useState<PodcastEpisode[]>();

    useEffect(() => {
        getPodcastDetails(Number(params.podcastId), 20)
            .then(res => {
                const episodes = res.results.filter(
                    result => !!(result as PodcastEpisode).episodeGuid
                ) as PodcastEpisode[];

                setPodcastEpisodes(episodes);
            })
    }, [params.podcastId]);

    return (
        <>
            {podcastEpisodes && (
                <div>
                    <EpisodeList episodes={podcastEpisodes as PodcastEpisode[]}></EpisodeList>
                </div>
            )}
        </>
    );
};

export default Page;
