/* eslint-disable @next/next/no-img-element */
'use client';
import React from 'react';
import styles from './podcast-info.module.scss';
import Link from 'next/link';

export interface PodcastInfoI {
    description: string;
    authorName: string;
    title: string;
    image: string;
    id: number;
}

type PodcastInfoProps = {
    podcastInfo: PodcastInfoI;
};

const PodcastInfo: React.FC<PodcastInfoProps> = ({ podcastInfo }) => {
    return (
        <aside className={styles.podcastInfo}>
            <img
                src={podcastInfo.image}
                alt={podcastInfo.title}
                className={styles.podcastInfoImage}
            />
            <div className={styles.podcastInfoTitle}>
                <Link href={`/podcasts/${podcastInfo.id}`}>
                    <h2 className={styles.podcastInfoName}>{podcastInfo.title}</h2>
                </Link>

                <h3 className={styles.podcastInfoSecondaryTitle}>
                    by {podcastInfo.authorName}
                </h3>
            </div>
            {/** Api don't return podcast description */}
            <div className={styles.podcastInfoDescriptionContainer}>
                <h3 className={styles.podcastInfoSecondaryTitle}>Description</h3>
                <p className={styles.podcastInfoDescription}>
                    {podcastInfo.description}
                </p>
            </div>
        </aside>
    );
};

export default PodcastInfo;
