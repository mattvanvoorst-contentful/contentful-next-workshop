import { apiClient } from '../../../lib/contentfulApi';

const BlogPost = ({ data }) => {
  const { title } = data.fields;
  return (
    <>
      <h1>{title}</h1>
    </>
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
