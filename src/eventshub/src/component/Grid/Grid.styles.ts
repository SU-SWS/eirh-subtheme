export const gridNumCols = {
  xs: {
    1: 'er-grid-cols-1',
    2: 'er-grid-cols-2',
    3: 'er-grid-cols-3',
    4: 'er-grid-cols-4',
    6: 'er-grid-cols-6',
    12: 'er-grid-cols-12',
  },
  sm: {
    1: 'sm:er-grid-cols-1',
    2: 'sm:er-grid-cols-2',
    3: 'sm:er-grid-cols-3',
    4: 'sm:er-grid-cols-4',
    6: 'sm:er-grid-cols-6',
    12: 'sm:er-grid-cols-12',
  },
  md: {
    1: 'md:er-grid-cols-1',
    2: 'md:er-grid-cols-2',
    3: 'md:er-grid-cols-3',
    4: 'md:er-grid-cols-4',
    6: 'md:er-grid-cols-6',
    12: 'md:er-grid-cols-12',
  },
  lg: {
    1: 'lg:er-grid-cols-1',
    2: 'lg:er-grid-cols-2',
    3: 'lg:er-grid-cols-3',
    4: 'lg:er-grid-cols-4',
    6: 'lg:er-grid-cols-6',
    12: 'lg:er-grid-cols-12',
  },
  xl: {
    1: 'xl:er-grid-cols-1',
    2: 'xl:er-grid-cols-2',
    3: 'xl:er-grid-cols-3',
    4: 'xl:er-grid-cols-4',
    6: 'xl:er-grid-cols-6',
    12: 'xl:er-grid-cols-12',
  },
  xxl: {
    1: '2xl:er-grid-cols-1',
    2: '2xl:er-grid-cols-2',
    3: '2xl:er-grid-cols-3',
    4: '2xl:er-grid-cols-4',
    6: '2xl:er-grid-cols-6',
    12: '2xl:er-grid-cols-12',
  },
};

export const rtl = '[direction:rtl] er-children:[direction:ltr]';

export const gridGaps = {
  default: 'er-grid-gap',
  card: 'er-grid-gap er-gap-y-50 xl:er-gap-y-70',
  split: 'md:er-gap-x-60 lg:er-gap-x-100 xl:er-gap-x-200 2xl:er-gap-x-280',
  xs: 'er-gap-4',
  'xs-horizontal': 'er-gap-x-4 er-gap-y-50 xl:er-gap-y-70',
};

export const gridJustifyContent = {
  start: 'er-justify-start',
  end: 'er-justify-end',
  center: 'er-justify-center',
  between: 'er-justify-between',
  around: 'er-justify-around',
  evenly: 'er-justify-evenly',
};

export const gridJustifyItems = {
  start: 'er-justify-items-start',
  end: 'er-justify-items-end',
  center: 'er-justify-items-center',
  stretch: 'er-justify-items-stretch',
};

export const gridAlignContent = {
  start: 'er-content-start',
  end: 'er-content-end',
  center: 'er-content-center',
  between: 'er-content-between',
  around: 'er-content-around',
  evenly: 'er-content-evenly',
};

export const gridAlignItems = {
  start: 'er-items-start',
  end: 'er-items-end',
  center: 'er-items-center',
  baseline: 'er-items-baseline',
  stretch: 'er-items-stretch',
};

export const alternatingGridWrapper = 'er-relative er-mx-auto er-cc';

export const centerlineBg = 'er-hidden md:er-block er-w-2 er-absolute er-top-0 er-left-1/2 er--ml-1 er-h-full er-origin-top er-bg-current er-bg-plum-light';
export const centerline = 'er-hidden md:er-block er-w-2 er-absolute er-top-0 er-left-1/2 er--ml-1 er-h-full er-origin-top er-bg-current er-bg-digital-red-light';

export const circleWrapper = 'er-hidden md:er-block er-relative er-top-0 er-left-1/2 er--ml-1 er-origin-top';
export const circle = 'er-fill-none er-stroke-2 er-stroke-black';

export const gridWidths = {
  full: 'er-w-full',
  inset: 'er-w-full 2xl:er-w-[95%] 3xl:er-w-[85%]',
};

export const negativeSpacing = {
  theme: 'md:er--mb-140 lg:er--mb-171',
};

export const cellWithContent = 'last:!er-mb-0';
