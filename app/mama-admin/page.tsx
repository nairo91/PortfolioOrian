"use client";

import React, { useState } from 'react';
import {
    LayoutDashboard, ShoppingBag, Users, Settings, Bell, Search,
    Menu as MenuIcon, TrendingUp, DollarSign, Clock, Pizza,
    ChevronRight, MoreVertical, LogOut
} from 'lucide-react';

export default function MamaAdmin() {
    const [activeTab, setActiveTab] = useState('dashboard');

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex overflow-hidden selection:bg-orange-500/30">

            {/* --- SIDEBAR --- */}
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

            {/* --- MAIN CONTENT --- */}
            <main className="flex-1 flex flex-col relative overflow-y-auto">

                {/* HEADER */}
                <header className="h-20 bg-slate-900/50 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-8 sticky top-0 z-20">
                    <div className="md:hidden">
                        <MenuIcon className="text-slate-400" />
                    </div>

                    <div className="hidden md:flex items-center bg-slate-800/50 rounded-full px-4 py-2 border border-slate-700 focus-within:border-orange-500/50 transition w-96">
                        <Search size={18} className="text-slate-500 mr-2" />
                        <input type="text" placeholder="Rechercher une commande, un plat..." className="bg-transparent border-none focus:outline-none text-sm text-white w-full placeholder-slate-500" />
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

                {/* CONTENT BODY */}
                <div className="p-8 max-w-7xl mx-auto w-full space-y-8">

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

                    {/* MAIN SECTION : CHART & ORDERS */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* CHART (SIMULATED CSS) */}
                        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-lg font-bold text-white">Activité de la semaine</h3>
                                <select className="bg-slate-950 border border-slate-800 text-slate-400 text-sm rounded-lg px-3 py-1 outline-none">
                                    <option>7 derniers jours</option>
                                </select>
                            </div>

                            <div className="h-64 flex items-end justify-between gap-2 md:gap-4 px-2">
                                {[65, 40, 85, 60, 95, 55, 75].map((height, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                        <div className="w-full bg-slate-800 rounded-t-lg relative h-full flex items-end overflow-hidden">
                                            <div
                                                style={{ height: `${height}%` }}
                                                className="w-full bg-orange-500 opacity-80 group-hover:opacity-100 transition-all duration-500 rounded-t-lg relative"
                                            >
                                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition shadow-lg border border-slate-700">
                                                    {height * 10}€
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-xs text-slate-500 font-medium">
                                            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'][i]}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RECENT ORDERS LIST */}
                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-white">Dernières Commandes</h3>
                                <button className="text-orange-500 text-sm hover:text-orange-400 font-medium">Tout voir</button>
                            </div>

                            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                                {[
                                    { id: "#8742", client: "Thomas Dubois", items: "2x Margherita", price: "24.00€", status: "En cuisine", color: "text-orange-400 bg-orange-500/10" },
                                    { id: "#8741", client: "Sarah Lemoine", items: "1x 4 Fromages", price: "14.50€", status: "En livraison", color: "text-blue-400 bg-blue-500/10" },
                                    { id: "#8740", client: "Kevin Martin", items: "3x Royale, 2x Coca", price: "48.00€", status: "Livré", color: "text-emerald-400 bg-emerald-500/10" },
                                    { id: "#8739", client: "Emma Petit", items: "1x Calzone", price: "13.00€", status: "Livré", color: "text-emerald-400 bg-emerald-500/10" },
                                    { id: "#8738", client: "Lucas Blanc", items: "2x Pepperoni", price: "28.00€", status: "Annulé", color: "text-red-400 bg-red-500/10" },
                                ].map((order, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-slate-800/50 hover:bg-slate-800 transition group cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 font-bold text-xs">
                                                {order.client.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-white">{order.client}</div>
                                                <div className="text-xs text-slate-500">{order.items}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-bold text-white mb-1">{order.price}</div>
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${order.color}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}