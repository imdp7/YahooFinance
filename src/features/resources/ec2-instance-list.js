// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const getElement = (array, loopedIndex) => array[loopedIndex % array.length];

export default Array.from({ length: 50 }).map((item, i) => ({
  type: getElement(
    [
      't1.micro',
      't2.nano',
      't2.micro',
      't2.small',
      't2.medium',
      't2.large',
      't2.xlarge',
      't2.2xlarge',
      't3.nano',
      't3.micro',
      't3.small',
      't3.medium',
      't3.large',
      't3.xlarge',
      't3.2xlarge',
      'a1.medium',
      'a1.large',
      'a1.xlarge',
      'a1.2xlarge',
      'a1.4xlarge',
      'a1.metal',
      'c1.medium',
      'c1.xlarge',
      'c1.large',
      'c1.2xlarge',
    ],
    i
  ),
  publicDns: `231.50.3.${i}`,
  monitoring: 'Default',
  hypervisor: getElement(['xen', 'nitro'], i),
  freeTier: getElement(['true', 'false'], i),
  freeTrial: getElement(['true', 'false'], i),
  bareMetal: getElement(['true', 'false'], i),
  state: getElement(['Stopped', 'Running', 'Terminated', 'Pending'], i),
  platformDetails: getElement(['Linux', 'Windows'], i),
  statusCheck: getElement(
    ['0/2 checks passed', '1/2 checks passed', '2/2 checks passed'],
    i
  ),
  terminalProtection: 'on',
  launchTime: `2021-05-12 16:53:${i.toString().padStart(2, '0')} GMT+0200 CEST`,
  volume: getElement([1, 2, 3, 4, 5], i),
  securityGroups: getElement(
    [['groupA', 'groupB'], ['groupC', 'groupD', 'groupE'], ['groupF']],
    i
  ),
  loadBalancers: getElement(
    [
      ['lb-1', 'lb-2'],
      ['lb-3', 'lb-4', 'lb-5'],
      ['lb-6', 'lb-7', 'lb-8', 'lb-9'],
    ],
    i
  ),
  availabilityZone: getElement(
    [
      'US East (N. Virginia)',
      'US East Ohio)',
      'US West (N. California)',
      'US West (Oregon)',
      'Asia Pacific (Mumbai)',
      'Asia Pacific (Osaka)',
      'Asia Pacific (Seoul)',
      'Asia Pacific (Sydney)',
      'Asia Pacific (Tokyo)',
      'Canada (Central)',
      'Europe (Frankfurt)',
      'Europe (Ireland)',
      'Europe (London)',
      'Europe (Paris)',
      'Europe (Stockholm)',
      'South America (Sao Paulo)',
    ],
    i
  ),
  numOfvCpu: getElement([3, 5, 9], i),
  inboundRules: [
    {
      type: 'All traffic',
      protocol: 'All',
      portRange: 'All',
      source: `sg-abcdefg${i} (default)`,
      description: '-',
    },
    {
      type: 'Custom TCP',
      protocol: 'TCP',
      portRange: '8182',
      source: `sg-dfs${i} (default)`,
      description: '-',
    },
  ],
}));
