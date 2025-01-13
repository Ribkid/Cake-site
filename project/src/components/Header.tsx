import React from 'react';
import { Music2, User, Briefcase, PlayCircle, Settings, Facebook, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-black/30 backdrop-blur-sm z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-white">Liam Thomas</Link>
          <div className="flex items-center space-x-8">
            <Link to="/about" className="text-white hover:text-purple-400 transition-colors flex items-center gap-2">
              <User size={20} />
              <span>About</span>
            </Link>
            <Link to="/services" className="text-white hover:text-purple-400 transition-colors flex items-center gap-2">
              <Briefcase size={20} />
              <span>Services</span>
            </Link>
            <Link to="/music" className="text-white hover:text-purple-400 transition-colors flex items-center gap-2">
              <PlayCircle size={20} />
              <span>Music</span>
            </Link>
            <a 
              href="https://instagram.com/liamorganthomas" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-purple-400 transition-colors flex items-center gap-2"
            >
              <Music2 size={20} />
              <span>Instagram</span>
            </a>
            <a 
              href="https://www.facebook.com/liamthomusic/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-purple-400 transition-colors flex items-center gap-2"
            >
              <Facebook size={20} />
              <span>Facebook</span>
            </a>
            <a 
              href="mailto:liamtheboy5@gmail.com"
              className="text-white hover:text-purple-400 transition-colors flex items-center gap-2"
            >
              <Mail size={20} />
              <span>Email</span>
            </a>
            <Link to="/admin/login" className="text-white hover:text-purple-400 transition-colors flex items-center gap-2">
              <Settings size={20} />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}