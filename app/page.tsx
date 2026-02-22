"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// 履歴データの型定義
type HistoryItem = {
  id: number;
  date: string;
  dollar: number;
  yen: number;
};

export default function HawaiiTipApp() {
  const [amount, setAmount] = useState<string>(""); 
  const [tipRate, setTipRate] = useState<number>(0.20);
  const [exchangeRate, setExchangeRate] = useState<number>(150);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  // 初回読み込み時にLocalStorageから履歴を取得
  useEffect(() => {
    const saved = localStorage.getItem('aloha_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const totalDollar = parseFloat(amount || "0") * (1 + tipRate);
  const totalYen = totalDollar * exchangeRate;

  // 履歴に保存する関数
  const saveToHistory = () => {
    if (!amount) return;
    const newItem: HistoryItem = {
      id: Date.now(),
      date: new Date().toLocaleString('ja-JP', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      dollar: totalDollar,
      yen: totalYen
    };
    const newHistory = [newItem, ...history];
    setHistory(newHistory);
    localStorage.setItem('aloha_history', JSON.stringify(newHistory));
    
    // 保存成功アニメーション用
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
    setAmount(""); // 入力をクリア
  };

  return (
    <div className="min-h-screen bg-[#f0f9ff] p-4 pb-24 font-sans text-slate-800">
  <header className="py-4 flex justify-between items-center px-2">
    <div className="w-8"></div> {/* 空白のバランス用 */}
    <div className="text-center">
      <h1 className="text-3xl font-black text-sky-500 tracking-tight text-center">ALOHA PAY 🌺</h1>
      <p className="text-xs font-bold text-sky-300">子連れハワイの家計簿＆計算</p>
    </div>
    <Link href="/settings" className="text-2xl hover:opacity-70 transition">⚙️</Link>
  </header>


      {/* 為替設定 */}
      <div className="bg-white/60 backdrop-blur-sm p-3 rounded-xl mb-4 border border-sky-100 flex justify-between items-center">
        <span className="text-xs font-bold text-slate-400">1ドル = </span>
        <input 
          type="number" 
          value={exchangeRate} 
          onChange={(e) => setExchangeRate(Number(e.target.value))}
          className="bg-transparent text-right text-lg font-bold text-sky-600 w-20 focus:outline-none"
        />
        <span className="text-xs font-bold text-slate-400">円</span>
      </div>

      {/* メイン計算カード */}
      <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-sky-100 border border-sky-50 mb-6 relative">
        <input 
          type="number" 
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full text-6xl font-black mb-4 focus:outline-none text-slate-700 placeholder-slate-100"
        />
        
        <div className="flex gap-2 mb-6">
          {[0.18, 0.20, 0.22].map((rate) => (
            <button 
              key={rate}
              onClick={() => setTipRate(rate)}
              className={`flex-1 py-3 rounded-2xl font-black transition-all ${tipRate === rate ? 'bg-sky-500 text-white scale-105' : 'bg-slate-50 text-slate-400'}`}
            >
              {rate * 100}%
            </button>
          ))}
        </div>

        <div className="space-y-1 mb-6">
          <div className="flex justify-between text-slate-400 font-bold">
            <span>Total</span>
            <span>${totalDollar.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-sky-500 font-black">日本円</span>
            <span className="text-4xl font-black text-sky-500">¥{Math.round(totalYen).toLocaleString()}</span>
          </div>
        </div>

        <button 
          onClick={saveToHistory}
          disabled={!amount}
          className="w-full bg-orange-400 hover:bg-orange-500 disabled:bg-slate-200 text-white font-black py-4 rounded-2xl shadow-lg shadow-orange-100 transition-all active:scale-95"
        >
          {showSuccess ? "SAVED! 🤙" : "履歴に保存する"}
        </button>
      </div>

      {/* 最近の履歴（簡易可視化） */}
      <div className="px-2">
        <h2 className="font-black text-slate-400 text-sm mb-3 uppercase tracking-widest">Recent History</h2>
        <div className="space-y-2">
          {history.slice(0, 3).map(item => (
            <div key={item.id} className="bg-white/80 p-4 rounded-2xl flex justify-between items-center shadow-sm">
              <span className="text-[10px] font-bold text-slate-300">{item.date}</span>
              <span className="font-bold text-slate-600">${item.dollar.toFixed(2)}</span>
              <span className="font-black text-sky-500">¥{item.yen.toLocaleString()}</span>
            </div>
          ))}
          {history.length === 0 && <p className="text-center text-slate-300 text-sm py-4 italic">No data yet...</p>}
        </div>
      </div>

      {/* フッターナビ（固定） */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-slate-900/90 backdrop-blur text-white rounded-3xl p-4 flex justify-around shadow-2xl">
        <span className="text-sky-400 font-black text-xs">CALC</span>
        <span className="text-slate-500 font-black text-xs">CHART</span>
        <span className="text-slate-500 font-black text-xs">VOICE</span>
      </div>
    </div>
  );
}
