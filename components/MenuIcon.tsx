import { ComponentProps } from 'react';

export default function MenuIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="2" y="7" width="19.8" height="2.4" />
      <rect x="2" y="14.8" width="19.8" height="2.4" />
    </svg>
  );
}
