import Head from 'next/head';
import * as React from 'react';
import '@/lib/env';

import Main from '@/components/Main';

export default function HomePage() {
  const title = 'Closest country Search';

  return (
    <main>
      <Head>
        <title>{title}</title>
      </Head>
      <section className='bg-white'>
        <div className='container mx-auto w-full lg:w-2/4 p-4'>
          <h1 className='text-2xl font-bold p-4 pb-0'>{title}</h1>
          <Main />
        </div>
      </section>
    </main>
  );
}
