import { Box, Flex, Heading, Paragraph, Subheading } from '@contentful/f36-components';
import { css } from '@emotion/css';
import Link from 'next/link';

import { ContentfulImage } from '../../components/shared/ContentfulImage';
import { apiClient } from '../../lib/contentfulApi';

const styles = {
  container: css``,
  content: css`
    max-width: 1280px;
    margin: auto;
  `,
  itemContainer: css`
    gap: 20px;
  `,
  item: css`
    max-width: 300px;
  `,
};

const Home = ({ data }) => {
  const { title, highlightedPosts, image, description } = data.fields;

  return (
    <Flex className={styles.container}>
      <Box className={styles.content} marginTop="spacingL">
        <Heading marginBottom="spacingXl">{title}</Heading>
        <Paragraph>{description}</Paragraph>
        <ContentfulImage image={image} />
        <Box marginTop="spacingL">
          <Subheading>Highlighted blog items!</Subheading>
          <Flex marginTop="spacingL" className={styles.itemContainer}>
            {highlightedPosts.map(item => {
              return (
                <Link key={item.sys.id} href={`/cheatsheet/post/${item.fields.slug}`} passHref>
                  <Box as="a" className={styles.item}>
                    <ContentfulImage image={item.fields.image} />
                    <Subheading>{item.fields.title}</Subheading>
                    <Paragraph>{item.fields.content}</Paragraph>
                  </Box>
                </Link>
              );
            })}
          </Flex>
        </Box>
      </Box>
    </Flex>
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
