import { cmsContent } from '../data/content';

/**
 * Calculates the number of projects associated with a given skill name.
 * Uses exact matching and key aliases to compute usage statistics.
 */
export const getProjectCountForSkill = (skillName) => {
  const normalizedSkill = skillName.toLowerCase().trim();
  return cmsContent.projects.filter((proj) => 
    proj.tags.some((tag) => {
      const normalizedTag = tag.toLowerCase().trim();
      
      // Basic inclusive matching
      if (normalizedTag.includes(normalizedSkill) || normalizedSkill.includes(normalizedTag)) return true;
      
      // Explicit mappings
      if (normalizedSkill === "java" && normalizedTag.includes("java") && !normalizedTag.includes("javascript")) return true;
      if (normalizedSkill === "git & github" && (normalizedTag.includes("git") || normalizedTag.includes("github"))) return true;
      if (normalizedSkill === "html5 & css3" && (normalizedTag.includes("html") || normalizedTag.includes("css"))) return true;
      if (normalizedSkill === "docker & vercel" && (normalizedTag.includes("docker") || normalizedTag.includes("vercel"))) return true;
      if (normalizedSkill === "node.js & express" && (normalizedTag.includes("node") || normalizedTag.includes("express"))) return true;
      
      return false;
    })
  ).length;
};
