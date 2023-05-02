const getElement = (array, loopedIndex) => array[loopedIndex % array.length];

export default Array.from({ length: 50 }).map((item, i) => ({
  id: `Bucket-${i}`,
  name: `storage ${i}`,
  type: getElement(['m5.large', 'm5.xlarge', 'm5.4xlarge'], i),
  publicDns: `231.50.3.${i}`,
  monitoring: 'Default',
  privateAccess: getElement(
    ['Objects can be public', 'Bucket and objects not public'],
    i
  ),
  version: getElement(['Enable', 'Disable'], i),
  bucketKey: getElement(['Enable', ' Disable'], i),
  state: getElement(['Activated', 'Deactivated'], i),
  platformDetails: getElement(
    ['Linux', 'Windows', 'macOS', 'Ubuntu', 'Amazon AMI'],
    i
  ),
  terminalProtection: 'on',
  createdAt: `2021-05-12 16:53:${i.toString().padStart(2, '0')} GMT+0200 CEST`,
  awsRegion: getElement(
    [
      'US East (Ohio) us-east-2',
      'Canada (Central) ca-central-1',
      'Middle East (Bahrain) me-south-1',
    ],
    i
  ),
  arn: `arn:aws:s3:::example-${i}`,
  destination: `s3://s3.example-${i}`,
}));

export const dataBucketFiles = [];
