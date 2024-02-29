import { ReactNode } from 'react';
import { cnb } from 'cnbuilder';
import * as styles from './typography.styles';
import * as types from './typography.types';

export type TypographyProps = {
  as?: types.TextType;
  font?: types.FontFamilyType;
  size?: types.FontSizeType;
  weight?: types.FontWeightType;
  align?: types.TextAlignType;
  color?: types.TextColorType;
  variant?: types.TextVariantType;
  leading?: types.FontLeadingType;
  italic?: boolean;
  srOnly?: boolean;
  uppercase?: boolean;
  className?: string;
  children?: ReactNode;
};

export type TextProps = TypographyProps & React.HTMLAttributes<HTMLElement>;

export const Text = ({
  as: AsComponent = 'div',
  font = 'sans',
  size,
  weight,
  align,
  color = 'default',
  variant,
  leading,
  italic,
  srOnly,
  uppercase,
  className,
  children,
  ...rest
}: TextProps) => (
  <AsComponent
    {...rest}
    className={
      cnb(
        font ? styles.fontFamilies[font] : '',
        size ? styles.fontSizes[size] : '',
        weight ? styles.fontWeights[weight] : '',
        align ? styles.textAligns[align] : '',
        color ? styles.textColors[color] : '',
        variant ? styles.textVariants[variant] : '',
        leading ? styles.fontLeadings[leading] : '',
        italic ? 'italic' : '',
        srOnly ? 'sr-only' : '',
        uppercase ? 'uppercase' : '',
        className,
      )
    }
  >
    {children}
  </AsComponent>
);