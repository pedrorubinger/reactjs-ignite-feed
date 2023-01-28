import { ImgHTMLAttributes } from "react";

import styles from "./Avatar.module.css";

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  /** @default true */
  hasBorder?: boolean;
}

export function Avatar({ hasBorder = true, ...rest }: Props) {
  return (
    <img
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      {...rest}
    />
  );
}
