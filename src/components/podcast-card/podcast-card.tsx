/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './podcast-card.module.scss';

interface PodcastCardProps {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
}

const PodcastCard: React.FC<PodcastCardProps> = ({ id, title, author, imageUrl }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/podcasts/${id}`);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={title} className={styles.image} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.author}>Author: {author}</p>
      </div>
    </div>
  );
};

export default PodcastCard;
