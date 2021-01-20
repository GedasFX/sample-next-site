import { parseISO, format } from 'date-fns';

export default function Date(props: { dateString: string }) {
  return (
    <time dateTime={props.dateString}>{format(parseISO(props.dateString), 'LLLL d, yyyy')}</time>
  );
}
