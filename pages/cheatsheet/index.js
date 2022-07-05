import { Heading } from '@contentful/f36-components';
import Link from 'next/link';

import { apiClient } from '../../lib/contentfulApi';

const Home = ({ data }) => {
  const { title, highlightedPosts } = data.fields;

  return (
    <>
      <Heading marginBottom="spacingXl">{title}</Heading>
      {highlightedPosts.map(item => {
        return (
          <Link key={item.sys.id} href={`/cheatsheet/post/${item.fields.slug}`}>
            {item.fields.title}
          </Link>
        );
      })}
    </>
  );
};

export const getServerSideProps = async () => {
  try {
    const homePageEntries = await apiClient.getEntries({
      content_type: 'pageHomepage',
    });

    const homePageEntry = homePageEntries?.items?.[0];

    if (!homePageEntry) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        data: homePageEntry,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export default Home;
