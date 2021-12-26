import ContentLoader from 'react-content-loader';

const Skeleton = () => {
  return (
    <ContentLoader
      speed={2}
      height={410}
      backgroundColor="#efefef"
      foregroundColor="#ffffff"
      style={{ width: '100%' }}
    >
      <rect x="0" y="6" width="100%" height="120" />
      <rect x="0" y="150" width="100%" height="120" />
      <rect x="0" y="294" width="100%" height="120" />
    </ContentLoader>
  );
};

Skeleton.metadata = {
  name: 'Abraham Calsin',
  github: 'abrahamcalsin',
  description: 'Loading a list of tasks.',
  filename: 'SkeletonLoader',
};

export default Skeleton;
