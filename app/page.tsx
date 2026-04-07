"use client";

import React, { useState, useEffect } from 'react';
import { Reveal } from "./components/Reveal";
import { SpotlightCard } from "./components/SpotlightCard";
import {
  Terminal, Code, Globe, Trash2, Plus, CheckCircle,
  Github, Linkedin, Mail, Server, Cpu, Layers, Send, Save, Loader2, X,
  ExternalLink, ArrowRight, Search, Calendar, LayoutDashboard,
  Menu, MapPin, ChevronRight, Gamepad2, Zap
} from 'lucide-react';

// --- TYPES ---
type Task = {
  id: number;
  text: string;
  completed: boolean;
  tag: 'Frontend' | 'Backend' | 'DevOps';
};

type Notification = {
  id: number;
  message: string;
  type: 'success' | 'info';
};

// --- COMPOSANT : NOTIFICATIONS (TOASTS) ---
const ToastContainer = ({ notifications, removeToast }: { notifications: Notification[], removeToast: (id: number) => void }) => (
  <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
    {notifications.map((notif) => (
      <div key={notif.id} className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-white transform transition-all animate-in slide-in-from-right fade-in duration-300 ${notif.type === 'success' ? 'bg-emerald-600' : 'bg-blue-600'}`}>
        {notif.type === 'success' ? <CheckCircle size={16} /> : <Server size={16} />}
        <span className="text-sm font-medium">{notif.message}</span>
        <button onClick={() => removeToast(notif.id)}><X size={14} className="opacity-50 hover:opacity-100" /></button>
      </div>
    ))}
  </div>
);

// --- COMPOSANT : MINI-APP SAAS (DEV-PLANNER PRO) ---
const TaskManagerDemo = ({ addToast }: { addToast: (msg: string, type: 'success' | 'info') => void }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [selectedTag, setSelectedTag] = useState<'Frontend' | 'Backend' | 'DevOps'>('Frontend');

  useEffect(() => {
    const saved = localStorage.getItem('demo-tasks');
    if (saved) setTasks(JSON.parse(saved));
    else setTasks([
      { id: 1, text: 'Optimiser les requêtes SQL', completed: true, tag: 'Backend' },
      { id: 2, text: 'Configurer le pipeline CI/CD', completed: false, tag: 'DevOps' },
    ]);
  }, []);

  const saveToCloud = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem('demo-tasks', JSON.stringify(tasks));
      setIsSaving(false);
      addToast("Données synchronisées avec la DB", 'success');
    }, 1200);
  };

  const addTask = () => {
    if (!input.trim()) return;
    const newTask: Task = { id: Date.now(), text: input, completed: false, tag: selectedTag };
    setTasks([...tasks, newTask]);
    setInput('');
    addToast("Tâche ajoutée localement", 'info');
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 shadow-2xl overflow-hidden relative group">
      <div className="bg-slate-950 px-4 py-2 flex items-center gap-2 border-b border-slate-800">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
        </div>
        <div className="bg-slate-800 rounded px-3 py-1 text-xs text-slate-400 font-mono ml-4 flex-1 text-center">
          https://api.orian-mirona.dev/v1/dashboard
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="text-emerald-400" />
            DevTasks <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">PRO</span>
          </h3>
          <button
            onClick={saveToCloud}
            disabled={isSaving}
            className="flex items-center gap-2 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded transition border border-slate-700"
          >
            {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {isSaving ? 'Sync...' : 'Sauvegarder'}
          </button>
        </div>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            placeholder="Ajouter une nouvelle tâche..."
            className="flex-1 bg-slate-950/50 border border-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-500 transition placeholder:text-slate-600"
          />
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value as any)}
            className="bg-slate-950 border border-slate-700 text-slate-300 rounded-lg px-3 text-sm focus:outline-none focus:border-emerald-500"
          >
            <option value="Frontend">Front</option>
            <option value="Backend">Back</option>
            <option value="DevOps">Ops</option>
          </select>
          <button onClick={addTask} className="bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-lg transition shadow-lg shadow-emerald-900/20">
            <Plus size={20} />
          </button>
        </div>

        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
          {tasks.length === 0 && (
            <div className="text-center py-10 border-2 border-dashed border-slate-800 rounded-lg">
              <p className="text-slate-500 italic">Aucune tâche. Tout est propre ! 🚀</p>
            </div>
          )}
          {tasks.map((task) => (
            <div key={task.id} className={`group/item flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${task.completed ? 'bg-slate-950/30 border-slate-800/50 opacity-60' : 'bg-slate-800/40 border-slate-700/50 hover:border-slate-600 hover:bg-slate-800'}`}>
              <div className="flex items-center gap-3">
                <button onClick={() => toggleTask(task.id)} className={`transition-colors ${task.completed ? 'text-emerald-500' : 'text-slate-600 hover:text-emerald-400'}`}>
                  <CheckCircle size={20} className={task.completed ? "fill-emerald-500/10" : ""} />
                </button>
                <span className={`text-sm ${task.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>{task.text}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${task.tag === 'Frontend' ? 'border-blue-500/20 text-blue-400 bg-blue-500/5' :
                  task.tag === 'Backend' ? 'border-purple-500/20 text-purple-400 bg-purple-500/5' :
                    'border-orange-500/20 text-orange-400 bg-orange-500/5'
                  }`}>
                  {task.tag}
                </span>
                <button onClick={() => deleteTask(task.id)} className="text-slate-600 hover:text-red-400 transition opacity-0 group-hover/item:opacity-100">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- COMPOSANT : COMMAND PALETTE (CMD+K) ---
const CommandMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Gestion du raccourci clavier
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  if (!isOpen) return null;

  const actions = [
    { icon: <Globe size={18} />, label: "Aller à l'accueil", action: () => window.location.href = "#" },
    { icon: <Code size={18} />, label: "Voir mes projets", action: () => window.location.href = "#realisations" },
    { icon: <Mail size={18} />, label: "Me contacter", action: () => window.location.href = "#contact" },
    { icon: <Github size={18} />, label: "Mon GitHub", action: () => window.open("https://github.com", "_blank") },
    { icon: <Linkedin size={18} />, label: "Mon LinkedIn", action: () => window.open("https://www.linkedin.com/in/orian-mirona-85aa15235/", "_blank") },
  ];

  const filteredActions = actions.filter(action =>
    action.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[15vh] px-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center border-b border-slate-800 px-4 py-3">
          <Search size={20} className="text-slate-400 mr-3" />
          <input
            autoFocus
            className="flex-1 bg-transparent text-white placeholder-slate-500 focus:outline-none text-lg"
            placeholder="Rechercher une commande..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="text-xs text-slate-500 border border-slate-800 rounded px-2 py-0.5">mq. esc</div>
        </div>
        <div className="py-2">
          {filteredActions.length === 0 && (
            <div className="px-4 py-8 text-center text-slate-500 text-sm">Aucun résultat trouvé.</div>
          )}
          {filteredActions.map((action, i) => (
            <button
              key={i}
              className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-l-2 hover:border-emerald-500 transition-all text-left group"
              onClick={() => { action.action(); setIsOpen(false); }}
            >
              <span className="text-slate-500 group-hover:text-emerald-500">{action.icon}</span>
              <span>{action.label}</span>
              {i === 0 && <span className="ml-auto text-xs text-slate-600">Entrée</span>}
            </button>
          ))}
        </div>
        <div className="bg-slate-950 px-4 py-2 border-t border-slate-800 text-[10px] text-slate-500 flex justify-between">
          <span>Navigation rapide</span>
          <div className="flex gap-2">
            <span>↑↓ naviguer</span>
            <span>↵ sélectionner</span>
          </div>
        </div>
      </div>
      {/* Overlay click to close */}
      <div className="absolute inset-0 -z-10" onClick={() => setIsOpen(false)}></div>
    </div>
  );
};

// --- PAGE PRINCIPALE ---
export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addToast = (message: string, type: 'success' | 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 4000);
  };

  const removeToast = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const [contactStatus, setContactStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactStatus('loading');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // REMPLACEZ 'VOTRE_ID_FORMSPREE' PAR L'ID OBTENU SUR FORMSPREE.IO
    // Exemple: 'xdoqzkaz'
    const FORMSPREE_ID = 'xovgljlj';

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setContactStatus('success');
        addToast("Message envoyé à Orian !", 'success');
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error('Erreur lors de l\'envoi');
      }
    } catch (error) {
      console.error(error);
      addToast("Erreur lors de l'envoi. Réessayez.", 'info');
      setContactStatus('idle');
    } finally {
      if (contactStatus === 'success') {
        setTimeout(() => setContactStatus('idle'), 3000);
      }
    }
  };

  return (
    <main className="min-h-screen selection:bg-emerald-500/30 bg-grid-white">
      <ToastContainer notifications={notifications} removeToast={removeToast} />
      <CommandMenu />

      {/* Navbar Translucide */}
      <nav className="border-b border-white/5 bg-slate-950/90 backdrop-blur-lg fixed w-full z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="bg-emerald-500 w-8 h-8 rounded-lg flex items-center justify-center text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/20">M</div>
            <span className="font-bold text-xl tracking-tight text-white">Mirona<span className="text-emerald-400">.Dev</span></span>
          </div>
          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            <a href="#about" className="hover:text-white transition-colors duration-200">Profil</a>
            <a href="#services" className="hover:text-white transition-colors duration-200">Services</a>
            <a href="#realisations" className="hover:text-white transition-colors duration-200">Réalisations</a>
            <a href="#demo" className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200 flex items-center gap-1.5"><Terminal size={13} /> Démo</a>
            <a href="#contact" className="hover:text-white transition-colors duration-200">Contact</a>
          </div>
          {/* Desktop CTA + shortcut */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 border border-slate-800 rounded-md px-2 py-1 bg-slate-900/50">
              <span>⌘K</span>
            </div>
            <a href="https://www.linkedin.com/in/orian-mirona-85aa15235/" target="_blank" className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded-full text-xs font-semibold transition shadow-lg shadow-emerald-900/20">
              LinkedIn
            </a>
          </div>
          {/* Mobile hamburger */}
          <button
            className="md:hidden text-slate-400 hover:text-white transition p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/5 bg-slate-950/95 backdrop-blur-lg">
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
              {[
                { href: "#about", label: "Profil" },
                { href: "#services", label: "Services" },
                { href: "#realisations", label: "Réalisations" },
                { href: "#demo", label: "Démo interactive" },
                { href: "#parcours", label: "Parcours" },
                { href: "#contact", label: "Contact" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3 px-3 text-slate-300 hover:text-emerald-400 hover:bg-slate-900 rounded-lg transition-all text-sm font-medium border border-transparent hover:border-slate-800"
                >
                  {link.label}
                  <ChevronRight size={16} className="text-slate-600" />
                </a>
              ))}
              <a
                href="https://www.linkedin.com/in/orian-mirona-85aa15235/"
                target="_blank"
                className="mt-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition text-center"
              >
                Voir mon LinkedIn
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="about" className="pt-40 pb-20 px-6 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Disponible pour missions Fullstack
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
                Salut, je suis <br />
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">MIRONA Orian</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
                Développeur Fullstack passionné par l'architecture logicielle et l'expérience utilisateur.
                Je transforme des idées complexes en applications web fluides et performantes.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="flex flex-wrap gap-4 pt-4">
                <a href="#realisations" className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-lg font-semibold transition shadow-lg shadow-emerald-900/30 flex items-center gap-2 group">
                  Voir mes projets <Code size={18} className="group-hover:translate-x-0.5 transition-transform" />
                </a>
                <a href="https://github.com/nairo91" target="_blank" className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold transition border border-slate-700 hover:border-slate-600 flex items-center gap-2">
                  <Github size={18} /> GitHub
                </a>
              </div>
            </Reveal>

            {/* Stats */}
            <Reveal delay={0.4}>
              <div className="flex items-center gap-6 pt-6 border-t border-slate-800/60 mt-2">
                <div className="text-center">
                  <div className="text-2xl font-black text-white">2+</div>
                  <div className="text-xs text-slate-500 font-medium">Ans d&apos;exp.</div>
                </div>
                <div className="w-px h-10 bg-slate-800"></div>
                <div className="text-center">
                  <div className="text-2xl font-black text-white">5+</div>
                  <div className="text-xs text-slate-500 font-medium">Projets livrés</div>
                </div>
                <div className="w-px h-10 bg-slate-800"></div>
                <div className="text-center">
                  <div className="text-2xl font-black text-white">10+</div>
                  <div className="text-xs text-slate-500 font-medium">Technologies</div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Bloc Visuel "Code" */}
          <div className="flex-1 w-full max-w-md">
            <Reveal delay={0.4}>
              <div className="bg-slate-900 rounded-xl border border-slate-700/60 p-0 shadow-2xl shadow-slate-950/50 hover:rotate-0 transition-all duration-500 rotate-1 hover:shadow-emerald-900/10 overflow-hidden">
                {/* Title bar */}
                <div className="bg-slate-950 px-4 py-3 flex items-center gap-2 border-b border-slate-800">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/90"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/90"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/90"></div>
                  </div>
                  <div className="flex-1 text-center text-xs text-slate-500 font-mono">developer.ts</div>
                </div>
                {/* Code content */}
                <div className="p-5 space-y-1.5 font-mono text-sm">
                  <div className="text-slate-500 text-xs mb-3">// Mon profil développeur</div>
                  <div>
                    <span className="text-purple-400">const </span>
                    <span className="text-blue-400">developer</span>
                    <span className="text-slate-400"> = </span>
                    <span className="text-yellow-300">{'{'}</span>
                  </div>
                  <div className="pl-5 text-slate-200">
                    <span className="text-slate-500">name: </span>
                    <span className="text-emerald-400">&apos;MIRONA Orian&apos;</span>
                    <span className="text-slate-500">,</span>
                  </div>
                  <div className="pl-5 text-slate-200">
                    <span className="text-slate-500">role: </span>
                    <span className="text-emerald-400">&apos;Fullstack Engineer&apos;</span>
                    <span className="text-slate-500">,</span>
                  </div>
                  <div className="pl-5 text-slate-200">
                    <span className="text-slate-500">stack: </span>
                    <span className="text-yellow-300">[</span>
                    <span className="text-orange-300">&apos;React&apos;</span>
                    <span className="text-slate-500">, </span>
                    <span className="text-orange-300">&apos;Node&apos;</span>
                    <span className="text-slate-500">, </span>
                    <span className="text-orange-300">&apos;SQL&apos;</span>
                    <span className="text-yellow-300">]</span>
                    <span className="text-slate-500">,</span>
                  </div>
                  <div className="pl-5 text-slate-200">
                    <span className="text-slate-500">available: </span>
                    <span className="text-emerald-400">true</span>
                    <span className="text-slate-500 cursor-blink">_</span>
                  </div>
                  <div className="text-yellow-300">{'}'}</div>
                </div>
                {/* Status bar */}
                <div className="bg-emerald-600/10 border-t border-emerald-500/10 px-5 py-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-xs text-emerald-400 font-mono">Disponible — Ouvert aux opportunités</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stack Marquee */}
      <section className="py-8 border-y border-white/5 bg-slate-900/40 overflow-hidden marquee-fade">
        <div className="flex gap-14 animate-scroll w-max">
          {[
            { icon: Globe, label: "React", color: "text-cyan-400" },
            { icon: Server, label: "Node.js", color: "text-green-400" },
            { icon: Cpu, label: "Next.js", color: "text-white" },
            { icon: Layers, label: "TypeScript", color: "text-blue-400" },
            { icon: Code, label: "Tailwind CSS", color: "text-sky-400" },
            { icon: Terminal, label: "Docker", color: "text-blue-300" },
            { icon: Globe, label: "PostgreSQL", color: "text-indigo-400" },
            { icon: Server, label: "GraphQL", color: "text-pink-400" },
            { icon: Cpu, label: "AWS", color: "text-orange-400" },
            { icon: Zap, label: "Framer Motion", color: "text-purple-400" },
            // Duplication pour l'effet infini
            { icon: Globe, label: "React", color: "text-cyan-400" },
            { icon: Server, label: "Node.js", color: "text-green-400" },
            { icon: Cpu, label: "Next.js", color: "text-white" },
            { icon: Layers, label: "TypeScript", color: "text-blue-400" },
            { icon: Code, label: "Tailwind CSS", color: "text-sky-400" },
            { icon: Terminal, label: "Docker", color: "text-blue-300" },
            { icon: Globe, label: "PostgreSQL", color: "text-indigo-400" },
            { icon: Server, label: "GraphQL", color: "text-pink-400" },
            { icon: Cpu, label: "AWS", color: "text-orange-400" },
            { icon: Zap, label: "Framer Motion", color: "text-purple-400" },
          ].map((tech, i) => (
            <div key={i} className="flex items-center gap-2.5 text-slate-400 font-mono text-base font-semibold opacity-75 hover:opacity-100 transition-opacity whitespace-nowrap">
              <tech.icon size={20} className={tech.color} />
              {tech.label}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION SERVICES */}
      <section id="services" className="py-24 px-6 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full mb-4">Ce que je fais</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Des solutions complètes</h2>
              <p className="text-slate-400 max-w-xl mx-auto">De la conception à la mise en production, je couvre l&apos;ensemble du cycle de développement.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Frontend */}
            <Reveal delay={0.1}>
              <SpotlightCard className="h-full p-7" spotlightColor="rgba(59, 130, 246, 0.3)">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5">
                  <Code size={22} className="text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">Développement Frontend</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">Interfaces modernes, réactives et accessibles. Du prototype au produit fini avec une attention au détail.</p>
                <ul className="space-y-2">
                  {["React / Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"].map(s => (
                    <li key={s} className="flex items-center gap-2 text-sm text-slate-400">
                      <ChevronRight size={14} className="text-blue-400 flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
            {/* Backend */}
            <Reveal delay={0.2}>
              <SpotlightCard className="h-full p-7" spotlightColor="rgba(168, 85, 247, 0.3)">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-5">
                  <Server size={22} className="text-purple-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">Développement Backend</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">APIs robustes, bases de données optimisées et architecture scalable pensée pour la performance.</p>
                <ul className="space-y-2">
                  {["Node.js / Express", "PostgreSQL", "REST API", "Authentification JWT"].map(s => (
                    <li key={s} className="flex items-center gap-2 text-sm text-slate-400">
                      <ChevronRight size={14} className="text-purple-400 flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
            {/* DevOps */}
            <Reveal delay={0.3}>
              <SpotlightCard className="h-full p-7" spotlightColor="rgba(249, 115, 22, 0.25)">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-5">
                  <Terminal size={22} className="text-orange-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">DevOps & Déploiement</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">Mise en production, automatisation des pipelines et monitoring pour des applications toujours disponibles.</p>
                <ul className="space-y-2">
                  {["Docker", "CI/CD GitHub Actions", "AWS / Netlify", "Git & Gestion de projet"].map(s => (
                    <li key={s} className="flex items-center gap-2 text-sm text-slate-400">
                      <ChevronRight size={14} className="text-orange-400 flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION RÉALISATIONS */}
      <section id="realisations" className="py-24 bg-slate-900/30 border-t border-white/5 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full mb-4">Mes projets</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Réalisations</h2>
              <p className="text-slate-400">Une sélection de projets récents déployés en production.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Projet 1 : Mama Pizza — Featured full-width */}
            <Reveal width="100%" delay={0}>
              <SpotlightCard className="group hover:border-emerald-500/40 transition duration-500 md:col-span-2">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-2/5 h-52 md:h-auto bg-gradient-to-br from-orange-600/25 via-red-600/15 to-orange-900/20 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-800 group-hover:from-orange-600/30 transition relative overflow-hidden">
                    <Globe size={56} className="text-orange-400 opacity-90 drop-shadow-lg" />
                    <span className="mt-3 text-xs font-mono text-orange-400/60">mamapizza-montlhery.netlify.app</span>
                    <span className="absolute top-3 right-3 text-[10px] font-bold text-slate-600 font-mono">01</span>
                    <span className="absolute top-3 left-3 flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      En production
                    </span>
                  </div>
                  <div className="flex-1 p-8">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition">Mama Pizza Montlhéry</h3>
                    <p className="text-slate-400 leading-relaxed mb-5">
                      Site vitrine complet pour une pizzeria locale. Présentation du menu, formulaire de contact, design responsive et optimisation SEO pour une visibilité maximale.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {["React", "Tailwind CSS", "Netlify"].map(t => (
                        <span key={t} className="px-3 py-1 bg-slate-950 rounded-full text-xs font-medium text-slate-300 border border-slate-700/60">{t}</span>
                      ))}
                    </div>
                    <a href="https://mamapizza-montlhery.netlify.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-emerald-400 font-semibold hover:text-emerald-300 transition group/link">
                      Voir le site <ExternalLink size={16} className="group-hover/link:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>

            {/* Projet 2 : App Dashboard */}
            <Reveal delay={0.15}>
              <SpotlightCard className="group hover:border-blue-500/30 transition duration-500 h-full" spotlightColor="rgba(59, 130, 246, 0.25)">
                <div className="h-44 bg-gradient-to-br from-blue-600/20 to-cyan-600/15 flex items-center justify-center border-b border-slate-800 relative overflow-hidden">
                  <Layers size={44} className="text-blue-400 opacity-90" />
                  <span className="absolute top-3 right-3 text-[10px] font-bold text-slate-600 font-mono">02</span>
                  <span className="absolute top-3 left-3 flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    En production
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition">Application Web & Dashboard</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">Prototype d&apos;application web moderne démontrant l&apos;intégration de composants dynamiques avancés.</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {["Next.js", "TypeScript", "Netlify"].map(t => (
                      <span key={t} className="px-2.5 py-1 bg-slate-950 rounded-full text-xs font-medium text-slate-300 border border-slate-700/60">{t}</span>
                    ))}
                  </div>
                  <a href="https://fabulous-faloodeh-4e5cb3.netlify.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-emerald-400 text-sm font-medium hover:text-emerald-300 transition">
                    Voir l&apos;app <ExternalLink size={14} />
                  </a>
                </div>
              </SpotlightCard>
            </Reveal>

            {/* Projet 3 : MamaAdmin */}
            <Reveal delay={0.2}>
              <SpotlightCard className="group hover:border-purple-500/30 transition duration-500 h-full" spotlightColor="rgba(168, 85, 247, 0.25)">
                <div className="h-44 bg-gradient-to-br from-purple-900/30 to-slate-950 flex items-center justify-center border-b border-slate-800 relative overflow-hidden">
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-700/80 shadow-xl">
                    <LayoutDashboard size={30} className="text-emerald-400" />
                  </div>
                  <span className="absolute top-3 right-3 text-[10px] font-bold text-slate-600 font-mono">03</span>
                  <span className="absolute top-3 left-3 flex items-center gap-1 text-[10px] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                    Démo live
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition">MamaAdmin Dashboard</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">Back-office complet pour la pizzeria. Suivi des KPI, gestion des commandes et statistiques en temps réel.</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {["Next.js", "Recharts", "TypeScript"].map(t => (
                      <span key={t} className="px-2.5 py-1 bg-slate-950 rounded-full text-xs font-medium text-slate-300 border border-slate-700/60">{t}</span>
                    ))}
                  </div>
                  <a href="/mama-admin" target="_blank" className="inline-flex items-center gap-2 text-emerald-400 text-sm font-medium hover:text-emerald-300 transition">
                    Tester le Dashboard <ArrowRight size={14} />
                  </a>
                </div>
              </SpotlightCard>
            </Reveal>

            {/* Projet 4 : Rendez-vous Ostéo */}
            <Reveal delay={0.25}>
              <SpotlightCard className="group hover:border-teal-500/30 transition duration-500 h-full" spotlightColor="rgba(20, 184, 166, 0.25)">
                <div className="h-44 bg-gradient-to-br from-teal-600/20 to-emerald-600/15 flex items-center justify-center border-b border-slate-800 relative overflow-hidden">
                  <Calendar size={44} className="text-teal-400 opacity-90" />
                  <span className="absolute top-3 right-3 text-[10px] font-bold text-slate-600 font-mono">04</span>
                  <span className="absolute top-3 left-3 flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    En production
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition">Application Rendez-vous Ostéo</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">Prise de rendez-vous avec vues client et administrateur. Gestion des créneaux et interface intuitive.</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {["React", "Tailwind CSS", "Netlify"].map(t => (
                      <span key={t} className="px-2.5 py-1 bg-slate-950 rounded-full text-xs font-medium text-slate-300 border border-slate-700/60">{t}</span>
                    ))}
                  </div>
                  <a href="https://wonderful-cajeta-8b94ec.netlify.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-emerald-400 text-sm font-medium hover:text-emerald-300 transition">
                    Voir l&apos;application <ExternalLink size={14} />
                  </a>
                </div>
              </SpotlightCard>
            </Reveal>

            {/* Projet 5 : Mini Jeu Raffy */}
            <Reveal delay={0.3}>
              <SpotlightCard className="group hover:border-pink-500/30 transition duration-500 h-full" spotlightColor="rgba(236, 72, 153, 0.2)">
                <div className="h-44 bg-gradient-to-br from-pink-600/20 to-rose-600/15 flex items-center justify-center border-b border-slate-800 relative overflow-hidden">
                  <Gamepad2 size={44} className="text-pink-400 opacity-90" />
                  <span className="absolute top-3 right-3 text-[10px] font-bold text-slate-600 font-mono">05</span>
                  <span className="absolute top-3 left-3 flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    En production
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition">Mini Jeu Raffy</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">Jeu arcade HTML5/JavaScript déployé sur Netlify. Gameplay addictif, parfait pour un prototype interactif.</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {["HTML5", "JavaScript", "Canvas API"].map(t => (
                      <span key={t} className="px-2.5 py-1 bg-slate-950 rounded-full text-xs font-medium text-slate-300 border border-slate-700/60">{t}</span>
                    ))}
                  </div>
                  <a href="https://minijeutraffy.netlify.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-emerald-400 text-sm font-medium hover:text-emerald-300 transition">
                    Jouer au mini-jeu <ExternalLink size={14} />
                  </a>
                </div>
              </SpotlightCard>
            </Reveal>
          </div>
        </div>
      </section>



      {/* Section Interactive APP */}
      <section id="demo" className="py-24 px-6 relative overflow-hidden bg-slate-950 border-t border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/8 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative">
          <Reveal>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full mb-4">
                <Terminal size={13} />
                <span>Labo Technique</span>
                <span className="bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded text-[10px] font-bold">LIVE</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Démo interactive</h2>
              <p className="text-slate-400 max-w-xl mx-auto">Une mini-application React fonctionnelle, intégrée directement dans ce portfolio pour démontrer mes compétences en live.</p>
            </div>
          </Reveal>
          <TaskManagerDemo addToast={addToast} />
        </div>
      </section>

      {/* Parcours Timeline */}
      <section id="parcours" className="py-24 bg-slate-900/20 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full mb-4">Formation</span>
              <h2 className="text-3xl font-bold text-white mb-3">Mon Parcours</h2>
              <p className="text-slate-400">Le chemin qui m&apos;a amené là où je suis aujourd&apos;hui.</p>
            </div>
          </Reveal>
          <div className="relative border-l-2 border-slate-800 ml-4 space-y-10">
            {[
              {
                year: "Sept 2025 — Présent",
                title: "Licence CPI",
                subtitle: "Concepteur de Projets Informatiques",
                company: "Formation en cours",
                badge: "En cours",
                badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
                desc: "Conception et développement d'applications complexes. Architecture logicielle, patterns de conception et gestion de projet agile en équipe."
              },
              {
                year: "Sept 2023 — Juin 2025",
                title: "BTS SIO Option SLAM",
                subtitle: "Solutions Logicielles et Applications Métiers",
                company: "Diplôme Validé",
                badge: "Diplômé",
                badgeColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
                desc: "Développement web, mobile et bases de données. Maîtrise des bonnes pratiques : versioning, tests, sécurité et déploiement continu."
              },
              {
                year: "2021 — 2023",
                title: "Baccalauréat STI2D",
                subtitle: "Option SIN — Systèmes d'Information et Numérique",
                company: "Diplôme Obtenu",
                badge: "Diplômé",
                badgeColor: "text-slate-400 bg-slate-500/10 border-slate-500/20",
                desc: "Premières notions de programmation, électronique et systèmes numériques. Découverte de la logique de développement et des réseaux."
              },
            ].map((exp, i) => (
              <Reveal key={i} delay={i * 0.12} width="100%">
                <div className="relative pl-10">
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-slate-950 shadow-lg shadow-emerald-500/20"></div>
                  <div className="bg-slate-900/60 border border-slate-800/60 rounded-xl p-5 hover:border-slate-700/80 transition-colors">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <div className="text-xs font-mono text-emerald-400/80 mb-1">{exp.year}</div>
                        <h3 className="text-base font-bold text-white">{exp.title}</h3>
                        <div className="text-sm text-slate-400">{exp.subtitle}</div>
                      </div>
                      <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${exp.badgeColor}`}>
                        {exp.badge}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">{exp.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 border-t border-white/5 bg-slate-950 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/6 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="max-w-5xl mx-auto px-6 relative">
          <Reveal>
            <div className="text-center mb-14">
              <span className="inline-block text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full mb-4">Contact</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Travaillons ensemble</h2>
              <p className="text-slate-400 max-w-md mx-auto">Vous avez un projet en tête ? Je suis disponible pour des missions freelance et des opportunités en CDI.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
            {/* Info cards (left) */}
            <div className="md:col-span-2 space-y-4">
              <Reveal delay={0.1}>
                <div className="bg-slate-900/60 border border-slate-800/60 rounded-xl p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-0.5">Localisation</div>
                    <div className="text-sm font-medium text-white">Paris, France</div>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="bg-slate-900/60 border border-slate-800/60 rounded-xl p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-blue-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-0.5">Email</div>
                    <a href="mailto:orian.mirona@gmail.com" className="text-sm font-medium text-white hover:text-emerald-400 transition">orian.mirona@gmail.com</a>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="bg-slate-900/60 border border-slate-800/60 rounded-xl p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-0.5">Disponibilité</div>
                    <div className="text-sm font-medium text-emerald-400">Disponible maintenant</div>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.25}>
                <div className="flex gap-3 pt-2">
                  <a href="https://github.com/nairo91" target="_blank" className="flex-1 flex items-center justify-center gap-2 bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/60 hover:border-slate-600 text-slate-300 hover:text-white rounded-xl py-3 text-sm font-medium transition">
                    <Github size={17} /> GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/orian-mirona-85aa15235/" target="_blank" className="flex-1 flex items-center justify-center gap-2 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-600/20 hover:border-blue-500/40 text-blue-400 hover:text-blue-300 rounded-xl py-3 text-sm font-medium transition">
                    <Linkedin size={17} /> LinkedIn
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Contact form (right) */}
            <Reveal delay={0.1} width="100%">
              <div className="md:col-span-3">
                <form onSubmit={handleContactSubmit} className="space-y-4 bg-slate-900/50 p-7 rounded-2xl border border-slate-800/60">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1.5">Votre Nom</label>
                      <input required name="name" type="text" placeholder="Jean Dupont" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white text-sm focus:border-emerald-500/60 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition placeholder:text-slate-600" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1.5">Votre Email</label>
                      <input required name="email" type="email" placeholder="contact@exemple.com" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white text-sm focus:border-emerald-500/60 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition placeholder:text-slate-600" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Votre Message</label>
                    <textarea required name="message" rows={5} placeholder="Bonjour Orian, j'ai un projet..." className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white text-sm focus:border-emerald-500/60 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition resize-none placeholder:text-slate-600"></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={contactStatus === 'loading' || contactStatus === 'success'}
                    className={`w-full py-3.5 rounded-lg font-bold text-sm transition flex items-center justify-center gap-2 shadow-lg ${contactStatus === 'success' ? 'bg-emerald-600 text-white shadow-emerald-900/30' : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/20'} disabled:opacity-70`}
                  >
                    {contactStatus === 'loading'
                      ? <><Loader2 size={18} className="animate-spin" /> Envoi en cours...</>
                      : contactStatus === 'success'
                      ? <><CheckCircle size={18} /> Message envoyé !</>
                      : <><Send size={18} /> Envoyer le message</>}
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="bg-emerald-500 w-7 h-7 rounded-md flex items-center justify-center text-slate-950 font-black text-xs">M</div>
            <span className="font-bold text-sm text-white">Mirona<span className="text-emerald-400">.Dev</span></span>
          </div>
          <p className="text-slate-600 text-xs text-center">
            © 2025 MIRONA Orian — Fait avec <span className="text-slate-500">Next.js</span>, <span className="text-slate-500">Tailwind CSS</span> & <span className="text-slate-500">Framer Motion</span>
          </p>
          <div className="flex items-center gap-4">
            <a href="https://github.com/nairo91" target="_blank" className="text-slate-600 hover:text-white transition"><Github size={18} /></a>
            <a href="https://www.linkedin.com/in/orian-mirona-85aa15235/" target="_blank" className="text-slate-600 hover:text-blue-400 transition"><Linkedin size={18} /></a>
            <a href="mailto:orian.mirona@gmail.com" className="text-slate-600 hover:text-emerald-400 transition"><Mail size={18} /></a>
          </div>
        </div>
      </footer>
    </main>
  );
}