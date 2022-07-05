export const Component = () => {
  return null;
};

export const getServerSideProps = () => {
  return {
    redirect: {
      permanent: false,
      destination: '/',
    },
  };
};

export default Component;
