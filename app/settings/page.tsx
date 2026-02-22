"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SettingsPage() {
  const [food, setFood] = useState(150000);
  const [gift, setGift] = useState(50000);
  const [rate, setRate] = useState(150);

  // 初期値の読み込み
  useEffect(() => {
    setFood(Number(localStorage.getItem('aloha_budget_food') || 150000));
    setGift(Number(localStorage.getItem('aloha_budget_gift') || 50000));
    setRate(Number(localStorage.getItem('aloha_rate') || 150));
  }, []);

  // 保存処理
  const saveSettings = () => {
    localStorage.setItem('aloha_budget_food', food.toString());
    localStorage.setItem('aloha_budget_gift', gift.toString());
    localStorage.setItem('aloha_rate', rate.toString());
    alert("設定を保存しました！🌺");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-800">
      <div className="flex justify-between items-center mb-8">
        <Link href="/" className="text-sky-500 font-black text-sm">← BACK</Link>
        <h1 className="text-xl font-black">SETTINGS</h1>
        <div className="w-10"></div>
      </div>

      <div className="space-y-6">
        {/* 為替レート設定 */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <label className="block text-[10px] font-black text-slate-400 mb-2">DEFAULT RATE ($1 = ?)</label>
          <input 
            type="number" 
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full text-3xl font-black text-sky-600 focus:outline-none"
          />
        </div>

        {/* 食費予算設定 */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-orange-100">
          <label className="block text-[10px] font-black text-orange-400 mb-2">FOOD BUDGET (¥)</label>
          <input 
            type="number" 
            value={food}
            onChange={(e) => setFood(Number(e.target.value))}
            className="w-full text-3xl font-black text-orange-500 focus:outline-none"
          />
        </div>

        {/* お土産予算設定 */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-pink-100">
          <label className="block text-[10px] font-black text-pink-400 mb-2">GIFT BUDGET (¥)</label>
          <input 
            type="number" 
            value={gift}
            onChange={(e) => setGift(Number(e.target.value))}
            className="w-full text-3xl font-black text-pink-500 focus:outline-none"
          />
        </div>

        <button 
          onClick={saveSettings}
          className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl shadow-xl active:scale-95 transition-all"
        >
          SAVE SETTINGS
        </button>
      </div>

      <p className="text-center text-[10px] text-slate-300 mt-10 font-bold uppercase tracking-widest">
        Aloha Pay - 2026 Edition
      </p>
    </div>
  );
}
