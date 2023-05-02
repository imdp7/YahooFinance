import { describe, expect, it } from 'vitest';
import { createFeature2Data } from '../../../src/features/S3/feature2DataSlice';

describe('Feature 2 Data', () => {
  it('defaults work', () => {
    const feature2Data = createFeature2Data('test name');

    expect(feature2Data.name).toBe('test name');
    expect(feature2Data.active).toBe(false);
    expect(feature2Data.description).toBe('');
  });

  it('non-defaults work', () => {
    const feature2Data = createFeature2Data(
      'test name',
      true,
      'feature description'
    );

    expect(feature2Data.name).toBe('test name');
    expect(feature2Data.active).toBe(true);
    expect(feature2Data.description).toBe('feature description');
  });
});
