import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Page404() {
  const router = useRouter();

  // On 404 redirect to home page.
  useEffect(() => {
    router.push('/');
  }, [router]);

  return null;
}
