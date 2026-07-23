import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProjectCard from '../ProjectCard';

describe('ProjectCard Component Suite', () => {
  const sampleProject = {
    title: 'AROH Ecosystem Monorepo',
    description: 'Unified React & Next.js platform architecture for AI services and design system tokens.',
    tags: ['React', 'Next.js', 'TailwindCSS', 'TypeScript'],
    category: 'Full Stack',
    highlights: ['Micro-frontend layout', 'Design system integration'],
    github: 'https://github.com/example/aroh',
    live: 'https://aroh.vercel.app',
    type: 'web',
    image: '/skyflow_real.png',
  };

  it('renders project title, category, and description', () => {
    render(<ProjectCard project={sampleProject} isDarkMode={true} />);

    expect(screen.getByText('AROH Ecosystem Monorepo')).toBeInTheDocument();
    expect(screen.getByText('Full Stack')).toBeInTheDocument();
    expect(
      screen.getByText(/Unified React & Next.js platform architecture/i)
    ).toBeInTheDocument();
  });

  it('renders technical tags correctly', () => {
    render(<ProjectCard project={sampleProject} isDarkMode={true} />);

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('renders repository and live links', () => {
    render(<ProjectCard project={sampleProject} isDarkMode={false} />);

    const repoLink = screen.getByText('Repository').closest('a');
    const liveLink = screen.getByText(/Explore Vercel/i).closest('a');

    expect(repoLink).toHaveAttribute('href', 'https://github.com/example/aroh');
    expect(liveLink).toHaveAttribute('href', 'https://aroh.vercel.app');
  });

  it('renders extra card view with github repository banner', () => {
    render(<ProjectCard project={sampleProject} isDarkMode={true} isExtra={true} />);

    expect(screen.getByText('example/aroh')).toBeInTheDocument();
  });
});
