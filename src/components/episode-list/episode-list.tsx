'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './episode-list.module.scss';

type Episode = {
    trackId: number;
    trackName: string;
    releaseDate: string;
    trackTimeMillis?: number;
};

type EpisodeListProps = {
    episodes: Episode[];
};

const formatDuration = (millis: number) => {
    const hours = Math.floor(millis / 3600000);
    const minutes = Math.floor((millis % 3600000) / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    
    const formattedMinutes = `${minutes}`.padStart(2, '0');
    const formattedSeconds = `${seconds.length === 1 ? '0' : ''}${seconds}`;
    
    if (hours > 0) {
        return `${hours}:${formattedMinutes}:${formattedSeconds}`;
    } else {
        return `${minutes}:${formattedSeconds}`;
    }
};

const EpisodeList: React.FC<EpisodeListProps> = ({ episodes }) => {
    const pathname = usePathname();

    return (
        <div className={styles.episodeList}>
            <div className={styles.episodeListHeader}>
                <h2>Episodes: {episodes.length}</h2>
            </div>
            <table className={styles.episodeListTable}>
                <thead className={styles.tableThead}>
                    <tr>
                        <th className={styles.tableTh}>Title</th>
                        <th className={styles.tableTh}>Date</th>
                        <th className={styles.tableTh}>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {episodes.map(episode => (
                        <tr key={episode.trackId}>
                            <td className={styles.tableTd}>
                                <Link
                                    href={`${pathname}/episodes/${episode.trackId}`}>
                                    <span className={styles.tableLink}>
                                        {episode.trackName}
                                    </span>
                                </Link>
                            </td>
                            <td className={styles.tableTd}>
                                {new Date(
                                    episode.releaseDate
                                ).toLocaleDateString()}
                            </td>
                            <td className={styles.tableTd}>
                                {formatDuration(episode?.trackTimeMillis || 0)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EpisodeList;
