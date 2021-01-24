import { GetServerSideProps } from 'next';

type Props = {
  message: string;
};

export default function ServerPage(props: Props) {
  return <span>Message from server side: {props.message}</span>;
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      message: process.env.HW as string,
    },
  };
};
