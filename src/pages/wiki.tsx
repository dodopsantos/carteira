import React, { useState } from 'react';
import WikiPage from '@modules/wiki';
import Layout from '@components/layout';
import { GetStaticProps } from 'next';
import { getAPIPublic } from '@services/axios';
import { Items } from '@interfaces/items';

export interface ActivityWiki {
  index: number;
}

interface Props {
  items: Items;
}

export default function Wiki({ items }: Props): JSX.Element {
  const [activityWiki, setActivityWiki] = useState<ActivityWiki>({
    index: 0
  });

  return (
    <div>
      <main>
        <Layout>
          <WikiPage
            activityWiki={activityWiki}
            callback={(e: ActivityWiki) => setActivityWiki(e)}
            items={items}
          />
        </Layout>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const api = getAPIPublic();

  const { data: items } = await api.post('/v1/gameobjects/item', {
    page: 0,
    count: 200
  });

  return {
    props: { items },
    revalidate: 3600
  };
};
