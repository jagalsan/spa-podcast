/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from './episode-details.module.scss';
import { PodcastEpisode } from '@/data/interfaces/podcast/podcast-details.interface';

interface EpisodeDetailsProps {
    podcastEpisode: PodcastEpisode;
}

const EpisodeDetails: React.FC<EpisodeDetailsProps> = ({ podcastEpisode }) => {

    return (
        <div className={styles.episodeContainer}>
            <h1 className={styles.episodeTitle}>{podcastEpisode.trackName}</h1>
            <div
                className={styles.episodeDescription}
                dangerouslySetInnerHTML={{
                    __html: podcastEpisode.description,
                }}
            />
            <audio controls className={styles.audioPlayer}>
                <source src={podcastEpisode.episodeUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default EpisodeDetails;
