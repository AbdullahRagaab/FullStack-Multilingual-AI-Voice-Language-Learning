import React from 'react';
import styles from './BackButton.module.css';

interface BackButtonProps {
  onClick: () => void;
  label?: string;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ 
  onClick, 
  className = '' 
}) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.backButton} ${className}`}
    >
      <span className={styles.arrow}>←</span>
    </button>
  );
};

export default BackButton;