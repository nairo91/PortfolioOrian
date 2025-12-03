"use client";

import React, { useState } from 'react';
import {
    LayoutDashboard, ShoppingBag, Users, Settings, Bell, Search,
    Menu as MenuIcon, DollarSign, Clock, Pizza,
    LogOut, Plus, Edit2, Trash2, Filter, ChevronDown
} from 'lucide-react';

// --- COMPOSANT: VUE DASHBOARD (Celle que tu avais déjà) ---
const DashboardView = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
                { label: "Chiffre d'affaires (Jour)", value: "1,240.50 €", icon: DollarSign, trend: "+12%", color: "text-emerald-400", bg: "bg-emerald-500/10" },
                { label: "Commandes Actives", value: "12", icon: ShoppingBag, trend: "En cours", color: "text-orange-400", bg: "bg-orange-500/10" },
                { label: "Plat le plus vendu", value: "Reine", icon: Pizza, trend: "45 ventes", color: "text-blue-400", bg: "bg-blue-500/10" },
                { label: "Temps moyen livraison", value: "28 min", icon: Clock, trend: "-2 min", color: "text-purple-400", bg: "bg-purple-500/10" },
            ].map((stat, i) => (
                <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition duration-300">
                    <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                            <stat.icon size={22} />
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full bg-slate-800 ${stat.color.replace('text-', 'text-')}`}>
                            {stat.trend}
                        </span>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
            ))}
        </div>

        {/* CHART & RECENT ORDERS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* CHART SIMULÉ */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-lg font-bold text-white">Activité de la semaine</h3>
                    <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">7 derniers jours</span>
                </div>
                <div className="h-64 flex items-end justify-between gap-2 md:gap-4 px-2">
                    {[65, 40, 85, 60, 95, 55, 75].map((height, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                            <div className="w-full bg-slate-800 rounded-t-lg relative h-full flex items-end overflow-hidden">
                                <div style={{ height: `${height}%` }} className="w-full bg-orange-500 opacity-80 group-hover:opacity-100 transition-all duration-500 rounded-t-lg relative"></div>
                            </div>
                            <span className="text-xs text-slate-500 font-medium">{['L', 'M', 'M', 'J', 'V', 'S', 'D'][i]}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* COMPACT ORDER LIST */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col">
                <h3 className="text-lg font-bold text-white mb-6">Dernières Commandes</h3>
                <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar max-h-[300px]">
                    {[
                        { client: "Thomas D.", price: "24€", status: "En cuisine", color: "text-orange-400" },
                        { client: "Sarah L.", price: "14€", status: "En livraison", color: "text-blue-400" },
                        { client: "Kevin M.", price: "48€", status: "Livré", color: "text-emerald-400" },
                    ].map((order, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-slate-800/50 hover:bg-slate-800 transition">
                            <span className="text-sm font-bold text-white">{order.client}</span>
                            <div className="text-right">
                                <div className="text-sm font-bold text-white">{order.price}</div>
                                <span className={`text-[10px] ${order.color}`}>{order.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

// --- COMPOSANT: VUE MENU (Nouvelle Vue !) ---
const MenuView = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Gestion du Menu</h2>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold transition">
                <Plus size={18} /> Ajouter un plat
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
                { name: "Margherita", price: "10.50€", img: "🍅", cat: "Pizza Rouge" },
                { name: "4 Fromages", price: "13.50€", img: "🧀", cat: "Pizza Blanche" },
                { name: "Reine", price: "12.00€", img: "🍄", cat: "Pizza Rouge" },
                { name: "Calzone", price: "13.00€", img: "🥟", cat: "Pizza Soufflée" },
                { name: "Tiramisu", price: "6.50€", img: "🍰", cat: "Dessert" },
                { name: "Coca-Cola", price: "3.50€", img: "🥤", cat: "Boisson" },
            ].map((item, i) => (
                <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex gap-4 hover:border-orange-500/50 transition group">
                    <div className="w-20 h-20 bg-slate-800 rounded-lg flex items-center justify-center text-4xl">
                        {item.img}
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start">
                                <h4 className="font-bold text-white">{item.name}</h4>
                                <span className="text-orange-400 font-mono text-sm">{item.price}</span>
                            </div>
                            <span className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded mt-1 inline-block">{item.cat}</span>
                        </div>
                        <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 bg-slate-800 hover:bg-blue-500/20 hover:text-blue-400 text-slate-400 rounded"><Edit2 size={14} /></button>
                            <button className="p-1.5 bg-slate-800 hover:bg-red-500/20 hover:text-red-400 text-slate-400 rounded"><Trash2 size={14} /></button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// --- COMPOSANT: VUE COMMANDES (Nouvelle Vue !) ---
const OrdersView = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Suivi des Commandes</h2>
            <div className="flex gap-2">
                <button className="flex items-center gap-2 bg-slate-900 border border-slate-700 text-slate-300 px-3 py-2 rounded-lg text-sm hover:border-orange-500 transition">
                    <Filter size={16} /> Filtres
                </button>
                <button className="flex items-center gap-2 bg-slate-900 border border-slate-700 text-slate-300 px-3 py-2 rounded-lg text-sm hover:border-orange-500 transition">
                    Date <ChevronDown size={16} />
                </button>
            </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-slate-950 text-slate-400 text-xs uppercase font-semibold">
                    <tr>
                        <th className="px-6 py-4">ID</th>
                        <th className="px-6 py-4">Client</th>
                        <th className="px-6 py-4">Détails</th>
                        <th className="px-6 py-4">Total</th>
                        <th className="px-6 py-4">Statut</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                    {[
                        { id: "#8742", client: "Thomas Dubois", items: "2x Margh, 1x Coca", total: "24.50€", status: "En cuisine", color: "bg-orange-500/20 text-orange-400" },
                        { id: "#8741", client: "Sarah Lemoine", items: "1x 4 Fromages", total: "14.50€", status: "En livraison", color: "bg-blue-500/20 text-blue-400" },
                        { id: "#8740", client: "Kevin Martin", items: "3x Royale", total: "36.00€", status: "Livré", color: "bg-emerald-500/20 text-emerald-400" },
                        { id: "#8739", client: "Emma Petit", items: "1x Calzone", total: "13.00€", status: "Livré", color: "bg-emerald-500/20 text-emerald-400" },
                        { id: "#8738", client: "Lucas Blanc", items: "2x Pepperoni", total: "28.00€", status: "Annulé", color: "bg-red-500/20 text-red-400" },
                    ].map((order, i) => (
                        <tr key={i} className="hover:bg-slate-800/50 transition">
                            <td className="px-6 py-4 font-mono text-slate-500">{order.id}</td>
                            <td className="px-6 py-4 font-bold text-white">{order.client}</td>
                            <td className="px-6 py-4 text-sm text-slate-400">{order.items}</td>
                            <td className="px-6 py-4 font-bold text-white">{order.total}</td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded text-xs font-bold ${order.color}`}>
                                    {order.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button className="text-slate-400 hover:text-white transition">...</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

// --- COMPOSANT PRINCIPAL (LAYOUT) ---
export default function MamaAdmin() {
    const [activeTab, setActiveTab] = useState('dashboard');

    // C'est ici que la magie opère pour changer de page
    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard': return <DashboardView />;
            case 'orders': return <OrdersView />;
            case 'menu': return <MenuView />;
            case 'customers': return <div className="text-center py-20 text-slate-500">Module Clients en cours de développement...</div>;
            case 'settings': return <div className="text-center py-20 text-slate-500">Module Paramètres en cours de développement...</div>;
            default: return <DashboardView />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex overflow-hidden selection:bg-orange-500/30">

            {/* SIDEBAR */}
            <aside className="w-64 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col">
                <div className="h-20 flex items-center px-8 border-b border-slate-800">
                    <div className="flex items-center gap-2 text-orange-500">
                        <Pizza size={28} fill="currentColor" className="text-orange-500" />
                        <span className="text-xl font-bold text-white tracking-tight">Mama<span className="text-orange-500">Admin</span></span>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    {[
                        { id: 'dashboard', icon: LayoutDashboard, label: 'Vue d\'ensemble' },
                        { id: 'orders', icon: ShoppingBag, label: 'Commandes' },
                        { id: 'menu', icon: Pizza, label: 'Gestion Menu' },
                        { id: 'customers', icon: Users, label: 'Clients' },
                        { id: 'settings', icon: Settings, label: 'Paramètres' },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${activeTab === item.id
                                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            <item.icon size={20} className={activeTab === item.id ? 'text-white' : 'text-slate-500 group-hover:text-white'} />
                            <span className="font-medium text-sm">{item.label}</span>
                            {item.id === 'orders' && (
                                <span className="ml-auto bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">3</span>
                            )}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition">
                        <LogOut size={20} />
                        <span className="font-medium text-sm">Déconnexion</span>
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 flex flex-col relative overflow-hidden">

                {/* HEADER */}
                <header className="h-20 bg-slate-900/50 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-8 sticky top-0 z-20">
                    <div className="md:hidden">
                        <MenuIcon className="text-slate-400" />
                    </div>

                    <div className="hidden md:flex items-center bg-slate-800/50 rounded-full px-4 py-2 border border-slate-700 focus-within:border-orange-500/50 transition w-96">
                        <Search size={18} className="text-slate-500 mr-2" />
                        <input type="text" placeholder="Rechercher..." className="bg-transparent border-none focus:outline-none text-sm text-white w-full placeholder-slate-500" />
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative text-slate-400 hover:text-white transition">
                            <Bell size={20} />
                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-900"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-6 border-l border-slate-800">
                            <div className="text-right hidden sm:block">
                                <div className="text-sm font-bold text-white">Orian Mirona</div>
                                <div className="text-xs text-slate-500">Manager</div>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-red-500 border-2 border-slate-800 shadow-lg"></div>
                        </div>
                    </div>
                </header>

                {/* DYNAMIC CONTENT AREA */}
                <div className="flex-1 overflow-y-auto p-8 w-full max-w-7xl mx-auto">
                    {renderContent()}
                </div>

            </main>
        </div>
    );
}