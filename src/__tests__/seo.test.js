import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('P3 SEO & Discoverability Validation', () => {
  const rootDir = process.cwd();
  const publicDir = path.join(rootDir, 'public');

  describe('robots.txt', () => {
    const robotsPath = path.join(publicDir, 'robots.txt');

    it('should exist in public directory', () => {
      expect(fs.existsSync(robotsPath)).toBe(true);
    });

    it('should allow public crawling and specify the sitemap', () => {
      const content = fs.readFileSync(robotsPath, 'utf8');
      expect(content).toContain('User-agent: *');
      expect(content).toContain('Allow: /');
      expect(content).toContain('Disallow: /dist/');
      expect(content).toContain('Disallow: /node_modules/');
      expect(content).toContain('Sitemap: https://udaypatnala.github.io/portifolio/sitemap.xml');
    });
  });

  describe('sitemap.xml', () => {
    const sitemapPath = path.join(publicDir, 'sitemap.xml');

    it('should exist in public directory', () => {
      expect(fs.existsSync(sitemapPath)).toBe(true);
    });

    it('should be valid XML referencing the sitemaps.org schema', () => {
      const content = fs.readFileSync(sitemapPath, 'utf8');
      expect(content).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(content).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
      expect(content).toContain('</urlset>');
    });

    it('should list all key public portfolio routes with priorities', () => {
      const content = fs.readFileSync(sitemapPath, 'utf8');
      const expectedRoutes = [
        'https://udaypatnala.github.io/portifolio/',
        'https://udaypatnala.github.io/portifolio/#/projects',
        'https://udaypatnala.github.io/portifolio/#/skills',
        'https://udaypatnala.github.io/portifolio/#/experience',
        'https://udaypatnala.github.io/portifolio/#/journey',
        'https://udaypatnala.github.io/portifolio/#/education',
        'https://udaypatnala.github.io/portifolio/#/certifications',
        'https://udaypatnala.github.io/portifolio/#/achievements',
        'https://udaypatnala.github.io/portifolio/#/resume',
        'https://udaypatnala.github.io/portifolio/#/gallery',
        'https://udaypatnala.github.io/portifolio/#/contact',
        'https://udaypatnala.github.io/portifolio/#/privacy'
      ];

      for (const route of expectedRoutes) {
        expect(content).toContain(`<loc>${route}</loc>`);
      }
    });
  });

  describe('llms.txt', () => {
    const llmsPath = path.join(publicDir, 'llms.txt');

    it('should exist in public directory', () => {
      expect(fs.existsSync(llmsPath)).toBe(true);
    });

    it('should contain accurate, un-hallucinated author and profile data', () => {
      const content = fs.readFileSync(llmsPath, 'utf8');
      expect(content).toContain('Patnala Uday Kumar');
      expect(content).toContain('Raghu Institute of Technology');
      expect(content).toContain('udaypatnala5@gmail.com');
      expect(content).toContain('https://github.com/UdayPatnala');
      expect(content).toContain('https://linkedin.com/in/patnala-uday-kumar');
      expect(content).toContain('CGPA: 7.70');
    });

    it('should document real projects and publications', () => {
      const content = fs.readFileSync(llmsPath, 'utf8');
      expect(content).toContain('Music Mirror');
      expect(content).toContain('Churn Prediction System');
      expect(content).toContain('JavaPath Pro');
      expect(content).toContain('Spedex Fintech Dashboard');
      expect(content).toContain('Smart Music Recommendation System Based on User Emotions');
      expect(content).toContain('IJARESM');
    });
  });

  describe('index.html Document Head & Structured Data', () => {
    const indexPath = path.join(rootDir, 'index.html');
    const content = fs.readFileSync(indexPath, 'utf8');

    it('should contain canonical URL and robots directive', () => {
      expect(content).toContain('<link rel="canonical" href="https://udaypatnala.github.io/portifolio/" />');
      expect(content).toContain('<meta name="robots" content="index, follow" />');
    });

    it('should contain apple-touch-icon, theme-color, and webmaster readiness tags', () => {
      expect(content).toContain('<link rel="apple-touch-icon" href="./favicon.svg" />');
      expect(content).toContain('<meta name="theme-color"');
      expect(content).toContain('name="google-site-verification"');
      expect(content).toContain('name="msvalidate.01"');
    });

    it('should use absolute image URLs for Open Graph and Twitter cards', () => {
      expect(content).toContain('<meta property="og:image" content="https://udaypatnala.github.io/portifolio/profile-office.jpg" />');
      expect(content).toContain('<meta property="twitter:image" content="https://udaypatnala.github.io/portifolio/profile-office.jpg" />');
      expect(content).not.toContain('<meta property="og:image" content="/profile-office.jpg" />');
    });

    it('should contain a valid, parseable Schema.org JSON-LD graph', () => {
      const match = content.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
      expect(match).not.toBeNull();
      
      const json = JSON.parse(match[1]);
      expect(json['@context']).toBe('https://schema.org');
      expect(json['@graph']).toBeDefined();

      const types = json['@graph'].map(item => item['@type']);
      expect(types).toContain('WebSite');
      expect(types).toContain('ProfilePage');
      expect(types).toContain('Person');
      expect(types).toContain('ItemList');

      const person = json['@graph'].find(item => item['@type'] === 'Person');
      expect(person.name).toBe('Patnala Uday Kumar');
      expect(person.sameAs).toContain('https://github.com/UdayPatnala');
      expect(person.sameAs).toContain('https://linkedin.com/in/patnala-uday-kumar');
      expect(person.email).toBe('mailto:udaypatnala5@gmail.com');
    });
  });
});
