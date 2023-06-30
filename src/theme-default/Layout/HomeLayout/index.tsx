import * as React from 'react';
import { usePageData } from '@runtime';
import { HomeFeature } from '../../components/HomeFeature';
import { HomeHero } from '../../components/HomeHero';

export function HomeLayout() {
  const { frontmatter } = usePageData();
  return (
    <div>
      <span>{JSON.stringify(frontmatter)}</span>
      <HomeHero hero={frontmatter.hero}></HomeHero>
      <HomeFeature features={frontmatter.features}></HomeFeature>
    </div>
  );
}
