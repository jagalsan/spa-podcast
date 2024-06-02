/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from './empty-data.module.scss';

interface EmptyDataProps {
  isLoading: boolean;
  hasData: boolean;
}

const EmptyData: React.FC<EmptyDataProps> = ({ isLoading, hasData }) => {
  if (hasData) return null;

  return (
    <div className={styles.emptyContainer}>
      {isLoading ? (
        <div className={styles.loading}>Loading data...</div>
      ) : (
        <>
          <img src="/images/empty-data.png" alt="Empty Data" className={styles.image} />
          <p className={styles.text}>No data available or no results found.</p>
        </>
      )}
    </div>
  );
};

export default EmptyData;
