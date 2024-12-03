import React from 'react';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  link: string;
  technologies: string[];
}

export function ProjectCard({ title, description, link, technologies }: ProjectCardProps) {
  return (
    <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl text-purple-300 font-semibold">{title}</h3>
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors">
          <ExternalLink size={20} />
        </a>
      </div>
      <p className="text-gray-300 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <span key={tech} className="px-3 py-1 text-sm bg-purple-500/10 text-purple-300 rounded-full">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}