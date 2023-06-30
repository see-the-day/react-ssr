import * as React from 'react';
import { usePageData } from '@runtime';
import { HomeFeature } from '../../components/HomeFeature';
import { HomeHero } from '../../components/HomeHero';

export function HomeLayout() {
  const { frontmatter } = usePageData();
  return (
    <div>
      {frontmatter?.hero && <HomeHero hero={frontmatter?.hero}></HomeHero>}
      {frontmatter?.features && (
        <HomeFeature features={frontmatter?.features}></HomeFeature>
      )}
    </div>
  );
}
