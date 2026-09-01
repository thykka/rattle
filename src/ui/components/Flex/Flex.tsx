import React from 'react';
import styles from './Flex.module.css';
import { classNames } from '../../utils/classNames';

type FlexProps<T extends React.ElementType> = {
  center?: boolean;
  children?: React.ReactNode;
  fit?: boolean;
  gap?: boolean;
  horizontal?: boolean;
  pad?: boolean;
  scroll?: boolean;
  clip?: boolean;
  type?: T;
  wrap?: boolean;
};

type FlexAllowedProps<T extends React.ElementType = 'div'> = FlexProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof FlexProps<T>>;

export function Flex<T extends React.ElementType = 'div'>({
  children,
  horizontal,
  fit,
  pad,
  gap,
  center,
  scroll,
  clip,
  type,
  wrap,
  ...rest
}: FlexAllowedProps<T>) {
  const Tag: React.ElementType = type || 'div';
  return (
    <Tag
      className={classNames([
        styles.flex,
        horizontal && styles.horizontal,
        fit && styles.fit,
        pad && styles.pad,
        gap && styles.gap,
        center && styles.center,
        scroll && styles.scroll,
        clip && styles.clip,
        wrap && styles.wrap,
      ])}
      {...rest}
    >
      {children}
    </Tag>
  );
}
