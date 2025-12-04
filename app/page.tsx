"use client";

import React, { useState, useEffect } from 'react';
import { Reveal } from "./components/Reveal";
import { SpotlightCard } from "./components/SpotlightCard";
import {
  Terminal, Code, Globe, Trash2, Plus, CheckCircle,
  Github, Linkedin, Mail, Server, Cpu, Layers, Send, Save, Loader2, X,
  ExternalLink, ArrowRight, Search, Command, Moon, Sun, Laptop, LayoutDashboard
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
      <nav className="border-b border-white/5 bg-slate-950/80 backdrop-blur-md fixed w-full z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-500 w-8 h-8 rounded-lg flex items-center justify-center text-slate-950 font-bold">M</div>
            <span className="font-bold text-xl tracking-tight text-white">Mirona<span className="text-emerald-500">.Dev</span></span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            <a href="#about" className="hover:text-white transition">Profil</a>
            <a href="#realisations" className="hover:text-white transition">Réalisations</a>
            <a href="#demo" className="text-emerald-400 hover:text-emerald-300 transition flex items-center gap-1"><Terminal size={14} /> Démo</a>
            <a href="#contact" className="hover:text-white transition">Contact</a>
          </div>
          <a href="https://www.linkedin.com/in/orian-mirona-85aa15235/" target="_blank" className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-xs font-semibold transition border border-white/5">
            LinkedIn
          </a>
          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-slate-500 border border-slate-800 rounded-md px-2 py-1 bg-slate-900/50 ml-4">
            <span>⌘</span><span>K</span>
          </div>
        </div>
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
                <a href="#realisations" className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-lg font-semibold transition shadow-lg shadow-emerald-900/20 flex items-center gap-2">
                  Voir mes projets <Code size={18} />
                </a>
                <a href="https://github.com" target="_blank" className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold transition border border-slate-700 flex items-center gap-2">
                  <Github size={18} /> GitHub
                </a>
              </div>
            </Reveal>
          </div>

          {/* Bloc Visuel "Code" */}
          <div className="flex-1 w-full max-w-md">
            <Reveal delay={0.4}>
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 shadow-2xl rotate-3 hover:rotate-0 transition duration-500">
                <div className="flex gap-1.5 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="space-y-2 font-mono text-sm">
                  <div className="text-slate-400">// Définition du profil</div>
                  <div className="text-purple-400">const <span className="text-blue-400">developer</span> = <span className="text-yellow-300">{'{'}</span></div>
                  <div className="pl-4 text-white">name: <span className="text-emerald-400">'MIRONA Orian'</span>,</div>
                  <div className="pl-4 text-white">role: <span className="text-emerald-400">'Fullstack Engineer'</span>,</div>
                  <div className="pl-4 text-white">skills: <span className="text-yellow-300">['React', 'Node', 'SQL']</span>,</div>
                  <div className="pl-4 text-white">hardWorker: <span className="text-orange-400">true</span></div>
                  <div className="text-yellow-300">{'}'}</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stack & Services (Infinite Marquee) */}
      <section className="py-10 border-y border-white/5 bg-slate-900/50 overflow-hidden">
        <div className="flex gap-16 animate-scroll w-max">
          {[
            { icon: Globe, label: "React" }, { icon: Server, label: "Node.js" }, { icon: Cpu, label: "Next.js" },
            { icon: Layers, label: "TypeScript" }, { icon: Code, label: "Tailwind" }, { icon: Terminal, label: "Docker" },
            { icon: Globe, label: "PostgreSQL" }, { icon: Server, label: "GraphQL" }, { icon: Cpu, label: "AWS" },
            // Duplication pour l'effet infini
            { icon: Globe, label: "React" }, { icon: Server, label: "Node.js" }, { icon: Cpu, label: "Next.js" },
            { icon: Layers, label: "TypeScript" }, { icon: Code, label: "Tailwind" }, { icon: Terminal, label: "Docker" },
          ].map((tech, i) => (
            <div key={i} className="flex items-center gap-2 text-slate-400 font-mono text-lg font-bold opacity-70">
              <tech.icon size={24} className="text-emerald-500" />
              {tech.label}
            </div>
          ))}
        </div>
      </section>

      {/* NOUVELLE SECTION : REALISATIONS (AVEC SPOTLIGHT) */}
      <section id="realisations" className="py-24 bg-slate-950 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Mes Réalisations</h2>
            <p className="text-slate-400">Une sélection de projets récents déployés en production.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Projet 1 : Mama Pizza */}
            <Reveal>
              <SpotlightCard className="group hover:border-emerald-500/50 transition duration-500">
                <div className="h-48 bg-gradient-to-br from-orange-600/20 to-red-600/20 flex items-center justify-center border-b border-slate-800 group-hover:bg-slate-800/80 transition">
                  <Globe size={48} className="text-orange-500 opacity-80" />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition">Mama Pizza Montlhéry</h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-4">
                        Site vitrine complet pour une pizzeria locale. Mise en avant du menu, design responsive et optimisation SEO.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-slate-950 rounded-full text-xs font-medium text-slate-300 border border-slate-800">React</span>
                    <span className="px-3 py-1 bg-slate-950 rounded-full text-xs font-medium text-slate-300 border border-slate-800">Tailwind</span>
                  </div>
                  <a href="https://mamapizza-montlhery.netlify.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-emerald-400 font-medium hover:text-emerald-300 transition group-hover:translate-x-1">
                    Voir le site <ExternalLink size={16} />
                  </a>
                </div>
              </SpotlightCard>
            </Reveal>

            {/* Projet 2 : App Dashboard */}
            <Reveal delay={0.2}>
              <SpotlightCard className="group hover:border-emerald-500/50 transition duration-500" spotlightColor="rgba(59, 130, 246, 0.25)"> {/* Lumière Bleue */}
                <div className="h-48 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 flex items-center justify-center border-b border-slate-800 group-hover:bg-slate-800/80 transition">
                  <Layers size={48} className="text-blue-500 opacity-80" />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition">Application Web & Dashboard</h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-4">
                        Prototype d'application web moderne démontrant l'intégration de composants dynamiques.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-slate-950 rounded-full text-xs font-medium text-slate-300 border border-slate-800">Next.js</span>
                    <span className="px-3 py-1 bg-slate-950 rounded-full text-xs font-medium text-slate-300 border border-slate-800">TypeScript</span>
                  </div>
                  <a href="https://fabulous-faloodeh-4e5cb3.netlify.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-emerald-400 font-medium hover:text-emerald-300 transition group-hover:translate-x-1">
                    Voir l'app <ExternalLink size={16} />
                  </a>
                </div>
              </SpotlightCard>
            </Reveal>

            {/* Projet 3 : MamaAdmin */}
            <Reveal delay={0.3}>
              <SpotlightCard className="group hover:border-emerald-500/50 transition duration-500" spotlightColor="rgba(168, 85, 247, 0.25)"> {/* Lumière Violette */}
                <div className="h-48 bg-slate-950 flex items-center justify-center border-b border-slate-800 group-hover:bg-slate-900/80 transition relative">
                  <div className="z-10 bg-slate-900 p-3 rounded-xl border border-slate-700 shadow-xl">
                    <LayoutDashboard size={32} className="text-emerald-500" />
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition">MamaAdmin Dashboard</h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-4">
                        Le Back-Office de gestion pour la pizzeria. Suivi des KPI et gestion des commandes.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-slate-950 rounded-full text-xs font-medium text-slate-300 border border-slate-800">Admin</span>
                    <span className="px-3 py-1 bg-slate-950 rounded-full text-xs font-medium text-slate-300 border border-slate-800">Recharts</span>
                  </div>
                  <a href="/mama-admin" target="_blank" className="inline-flex items-center gap-2 text-emerald-400 font-medium hover:text-emerald-300 transition group-hover:translate-x-1">
                    Tester Dashboard <ArrowRight size={16} />
                  </a>
                </div>
              </SpotlightCard>
            </Reveal>

            {/* Projet 4 : Mini Jeu Raffy */}
            <Reveal delay={0.35}>
              <SpotlightCard className="group hover:border-emerald-500/50 transition duration-500" spotlightColor="rgba(236, 72, 153, 0.18)">
                <div className="h-48 bg-gradient-to-br from-pink-600/20 to-rose-600/20 flex items-center justify-center border-b border-slate-800 group-hover:bg-slate-800/80 transition">
                  <Globe size={48} className="text-pink-500 opacity-80" />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition">Mini Jeu Raffy</h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-4">
                        Petit jeu arcade HTML5/JavaScript déployé sur Netlify. Gameplay simple et addictif, parfait pour un prototype interactif.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-slate-950 rounded-full text-xs font-medium text-slate-300 border border-slate-800">HTML5</span>
                    <span className="px-3 py-1 bg-slate-950 rounded-full text-xs font-medium text-slate-300 border border-slate-800">JavaScript</span>
                    <span className="px-3 py-1 bg-slate-950 rounded-full text-xs font-medium text-slate-300 border border-slate-800">Arcade</span>
                  </div>
                  <a href="https://minijeutraffy.netlify.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-emerald-400 font-medium hover:text-emerald-300 transition group-hover:translate-x-1">
                    Jouer au mini-jeu <ExternalLink size={16} />
                  </a>
                </div>
              </SpotlightCard>
            </Reveal>

          </div>
        </div>
      </section>



      {/* Section Interactive APP */}
      <section id="demo" className="py-24 px-6 relative overflow-hidden bg-slate-900/30 border-y border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/10 blur-[100px] rounded-full -z-10"></div>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Labo Technique</h2>
            <p className="text-slate-400">Une mini-application intégrée directement ici pour prouver mes compétences React en live.</p>
          </div>
          <TaskManagerDemo addToast={addToast} />
        </div>
      </section>

      {/* Expérience Timeline */}
      <section id="parcours" className="py-20 bg-slate-950">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Mon Parcours</h2>
          <div className="relative border-l border-slate-800 ml-3 space-y-12">
            {[
              { year: "Sept 2025 - Présent", title: "Licence CPI (Concepteur de Projets Informatiques)", company: "Formation en cours", desc: "Conception et développement d'applications complexes. Architecture logicielle et gestion de projet agile." },
              { year: "Sept 2023 - Juin 2025", title: "BTS SIO Option SLAM", company: "Diplôme Validé", desc: "Solutions Logicielles et Applications Métiers. Développement web, mobile et bases de données. Apprentissage des bonnes pratiques de code." },
            ].map((exp, i) => (
              <Reveal key={i} delay={i * 0.1} width="100%">
                <div className="relative pl-8">
                  <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-slate-950"></div>
                  <div className="text-xs font-mono text-emerald-500 mb-1">{exp.year}</div>
                  <h3 className="text-lg font-bold text-white">{exp.title}</h3>
                  <div className="text-slate-500 text-sm mb-2">{exp.company}</div>
                  <p className="text-slate-400 text-sm leading-relaxed">{exp.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="py-20 border-t border-slate-900 bg-slate-950 relative">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Travaillons ensemble</h2>
          <p className="text-slate-400 mb-8">Vous avez un projet en tête ? Je suis toujours à l'écoute de nouvelles opportunités.</p>

          <form onSubmit={handleContactSubmit} className="space-y-4 text-left bg-slate-900/50 p-6 rounded-2xl border border-white/5">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Votre Email</label>
              <input required name="email" type="email" placeholder="contact@exemple.com" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none transition" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Votre Message</label>
              <textarea required name="message" rows={4} placeholder="Bonjour Orian, j'ai un projet..." className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none transition"></textarea>
            </div>
            <button
              type="submit"
              disabled={contactStatus === 'loading' || contactStatus === 'success'}
              className={`w-full py-3 rounded-lg font-bold transition flex items-center justify-center gap-2 ${contactStatus === 'success' ? 'bg-green-600 text-white' : 'bg-white text-slate-900 hover:bg-emerald-50'}`}
            >
              {contactStatus === 'loading' ? <Loader2 className="animate-spin" /> : contactStatus === 'success' ? 'Envoyé !' : <><Send size={18} /> Envoyer</>}
            </button>
          </form>

          <div className="flex justify-center gap-6 mt-12">
            <a href="https://github.com" className="text-slate-500 hover:text-white transition"><Github size={24} /></a>
            <a href="https://www.linkedin.com/in/orian-mirona-85aa15235/" className="text-slate-500 hover:text-blue-500 transition"><Linkedin size={24} /></a>
            <a href="mailto:orian.mirona@gmail.com" className="text-slate-500 hover:text-emerald-500 transition"><Mail size={24} /></a>
          </div>
          <p className="text-slate-600 text-xs mt-8">© 2025 MIRONA Orian - Fait avec Next.js & Tailwind</p>
        </div>
      </footer>
    </main>
  );
}