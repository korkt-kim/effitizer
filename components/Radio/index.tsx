import { ComponentProps } from 'react';

export default function Radio(props: ComponentProps<'input'>) {
  return <input type="radio" {...props} />;
}
