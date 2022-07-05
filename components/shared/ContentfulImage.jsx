import Image from 'next/image';

export const ContentfulImage = ({ image }) => {
  return (
    <Image
      src={`https:${image.fields.file.url}`}
      width={image.fields.file.details.image.width}
      height={image.fields.file.details.image.height}
    />
  );
};
