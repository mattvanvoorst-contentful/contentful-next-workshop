import { Box, Flex, Heading, Paragraph } from '@contentful/f36-components';
import { css } from '@emotion/css';

import { ContentfulImage } from '../../../components/shared/ContentfulImage';
import { apiClient } from '../../../lib/contentfulApi';

const styles = {
  container: css``,
  content: css`
    max-width: 1280px;
    margin: auto;
  `,
};

const BlogPost = ({ data }) => {
  const { title, content, image } = data.fields;
  return (
    <Flex className={styles.container}>
      <Box className={styles.content}>
        <ContentfulImage image={image} />
        <Heading marginBottom="spacingXl">{title}</Heading>
        <Paragraph>{content}</Paragraph>
      </Box>
    </Flex>
  );
};

export const getStaticProps = async ({ params }) => {
  const slug = params?.slug;

  if (!slug) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }

  const blogPostEntries = await apiClient.getEntries({
    content_type: 'pageBlogPost',
    'fields.slug[match]': slug,
  });

  const blogPostEntry = blogPostEntries?.items?.[0];

  if (!blogPostEntry) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }

  return {
    revalidate: 60,
    props: {
      data: blogPostEntry,
    },
  };
};

export const getStaticPaths = async () => {
  const entries = await apiClient.getEntries({
    content_type: 'pageBlogPost',
  });

  const paths =
    entries.items
      .map(entry =>
        entry.fields?.slug
          ? {
              params: {
                slug: entry.fields.slug,
              },
            }
          : null,
      )
      .filter(Boolean) || [];

  return {
    paths,
    fallback: 'blocking',
  };
};

export default BlogPost;
