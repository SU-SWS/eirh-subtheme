import React from 'react';
import { cnb } from 'cnbuilder';
import { ArrowUpRightIcon } from '@heroicons/react/16/solid';
import * as styles from './Cta.styles';

interface CtaProps {
  children: string;
  href: string;
  extIcon?: boolean;
  className?: string;
}

const Cta: React.FC<CtaProps> = ({ children, href, extIcon, className }) => {
  return (
    <a href={href} className={cnb(styles.link, className)}>
      {children}
      {extIcon && <ArrowUpRightIcon aria-hidden className={styles.heroIcon}  />}
    </a>
  );
};

export default Cta;
