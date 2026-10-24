import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";

export type ChartPoint = { day?: string; week?: string; sessions?: number; value?: number };

export function TeacherPulseChart({ data }: { data: ChartPoint[] }) {
  return <ResponsiveContainer width="100%" height="100%"><AreaChart data={data} margin={{ top: 14, right: 8, left: -22, bottom: 0 }}><defs><linearGradient id="sessionsFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6865ef" stopOpacity={0.22} /><stop offset="100%" stopColor="#6865ef" stopOpacity={0} /></linearGradient></defs><CartesianGrid vertical={false} stroke="#eceef4" /><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#8a91a0", fontSize: 11 }} /><YAxis axisLine={false} tickLine={false} tick={{ fill: "#9aa0ad", fontSize: 10 }} /><Tooltip contentStyle={{ border: "1px solid #e7e9f1", borderRadius: 12, boxShadow: "0 8px 24px #1b23400f" }} /><Area dataKey="sessions" name="Learning sessions" type="monotone" stroke="#6865ef" strokeWidth={2.4} fill="url(#sessionsFill)" activeDot={{ r: 4 }} /></AreaChart></ResponsiveContainer>;
}

export function MasteryTrendChart({ data }: { data: ChartPoint[] }) {
  return <ResponsiveContainer width="100%" height="100%"><AreaChart data={data} margin={{ top: 14, right: 8, left: -22, bottom: 0 }}><CartesianGrid vertical={false} stroke="#eceef4" /><XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: "#8a91a0", fontSize: 10 }} /><YAxis axisLine={false} tickLine={false} tick={{ fill: "#9aa0ad", fontSize: 10 }} domain={[45, 80]} /><Tooltip /><Area dataKey="value" name="Mastery" type="monotone" stroke="#1baa95" strokeWidth={2.5} fill="#1baa9518" /></AreaChart></ResponsiveContainer>;
}

export function LearningGainChart({ data }: { data: ChartPoint[] }) {
  return <ResponsiveContainer width="100%" height="100%"><AreaChart data={data} margin={{ top: 16, right: 12, left: -22, bottom: 0 }}><defs><linearGradient id="gainFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1bad96" stopOpacity={.18} /><stop offset="100%" stopColor="#1bad96" stopOpacity={0} /></linearGradient></defs><CartesianGrid vertical={false} stroke="#edf0f5" /><XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: "#858b9b", fontSize: 10 }} /><YAxis axisLine={false} tickLine={false} tick={{ fill: "#959baa", fontSize: 10 }} domain={[45, 80]} /><Tooltip /><Area dataKey="value" name="Concept mastery" type="monotone" stroke="#1bad96" strokeWidth={2.5} fill="url(#gainFill)" activeDot={{ r: 5 }} /></AreaChart></ResponsiveContainer>;
}

export function ResultsTrendChart({ data }: { data: ChartPoint[] }) {
  return <ResponsiveContainer width="100%" height="100%"><AreaChart data={data} margin={{ top: 18, right: 20, left: -20, bottom: 5 }}><defs><linearGradient id="resultsFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6764ee" stopOpacity={0.2} /><stop offset="100%" stopColor="#6764ee" stopOpacity={0} /></linearGradient></defs><CartesianGrid vertical={false} stroke="#e9ebf3" /><XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: "#7e8597", fontSize: 12 }} /><YAxis axisLine={false} tickLine={false} tick={{ fill: "#9097a7", fontSize: 11 }} domain={[45, 80]} unit="%" /><Tooltip /><Area dataKey="value" name="Mastery" type="monotone" stroke="#6764ee" strokeWidth={3} fill="url(#resultsFill)" activeDot={{ r: 5 }} /></AreaChart></ResponsiveContainer>;
}
