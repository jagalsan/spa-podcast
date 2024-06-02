/* eslint-disable @next/next/no-img-element */
'use client';
import React from 'react';
import styles from './podcast-list.module.scss';
import { Podcast } from '@/data/interfaces/podcast/podcast.interface';
import PodcastCard from '../podcast-card/podcast-card';

type PodcastListProps = {
    podcasts: Podcast[];
};

const PodcastList: React.FC<PodcastListProps> = ({ podcasts }) => {
    return (
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
    );
};

export default PodcastList;
