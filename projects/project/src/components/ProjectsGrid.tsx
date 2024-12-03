import React from 'react';
import { ProjectCard } from './ProjectCard';

const projects = [
  {
    title: 'Project Alpha',
    description: 'A full-stack web application for managing digital assets with real-time updates.',
    link: 'https://github.com',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
  },
  {
    title: 'Project Beta',
    description: 'AI-powered content analysis tool with natural language processing capabilities.',
    link: 'https://github.com',
    technologies: ['Python', 'TensorFlow', 'FastAPI', 'Docker'],
  },
  {
    title: 'Project Gamma',
    description: 'Cross-platform mobile application for fitness tracking and social networking.',
    link: 'https://github.com',
    technologies: ['React Native', 'Firebase', 'Redux', 'GraphQL'],
  },
];

export function ProjectsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-6">
      {projects.map((project) => (
        <ProjectCard key={project.title} {...project} />
      ))}
    </div>
  );
}