import React from 'react';
import { ProjectsGrid } from './components/ProjectsGrid';
import { Github } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/black-felt.png")',
          animation: 'moveBackground 20s linear infinite',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <h1 className="text-5xl font-bold text-purple-300 mb-6">
            My Projects
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Explore my latest work and personal projects. Each project represents a unique challenge and learning experience.
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 rounded-full transition-all duration-300"
          >
            <Github size={20} />
            <span>View on GitHub</span>
          </a>
        </div>
        
        <ProjectsGrid />
      </div>
    </div>
  );
}

export default App;