import type { GetServerSideProps } from 'next';
import Layout from 'src/layout';

type Props = {
  message: string;
};

export default function ServerPage(props: Props) {
  return (
    <Layout>
      <span>Message from server side: {props.message}</span>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      message: process.env.HW as string,
    },
  };
};
