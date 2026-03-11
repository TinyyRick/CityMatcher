import { useMemo, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { cities } from '../data/cities';
import { RefreshCcw, MapPin, Sparkles } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { generateLocalReason } from '../services/reasonService';

interface ResultsProps {
  answers: Record<string, number>;
  onRestart: () => void;
}

export default function Results({ answers, onRestart }: ResultsProps) {
  const topCities = useMemo(() => {
    const keys = ['job', 'entrepreneur', 'lieFlat', 'safety', 'infra', 'family', 'female', 'smoking', 'moral', 'green'];
    const userProfile = keys.reduce((acc, key) => {
      acc[key] = answers[key] || 5;
      return acc;
    }, {} as Record<string, number>);

    const scoredCities = cities.map(city => {
      let totalDiff = 0;
      keys.forEach(key => {
        totalDiff += Math.abs(userProfile[key] - (city as any)[key]);
      });
      
      const matchPercentage = Math.max(0, Math.round(((90 - totalDiff) / 90) * 100));
      
      return {
        ...city,
        matchScore: matchPercentage
      };
    });

    return scoredCities.sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);
  }, [answers]);

  const bestCity = topCities[0];

  const [reason, setReason] = useState<string>('');
  const [loadingReason, setLoadingReason] = useState<boolean>(true);

  useEffect(() => {
    if (bestCity) {
      setLoadingReason(true);
      // Use local reason generator instead of API
      const text = generateLocalReason(bestCity, answers);
      setReason(text);
      setLoadingReason(false);
    }
  }, [bestCity, answers]);

  const radarData = useMemo(() => {
    if (!bestCity) return [];
    
    const labels: Record<string, string> = {
      job: '工作',
      entrepreneur: '创业',
      lieFlat: '躺平',
      safety: '安全',
      infra: '基建',
      family: '家庭',
      female: '女性',
      smoking: '吸烟',
      moral: '素质',
      green: '绿化'
    };

    return Object.keys(labels).map(key => ({
      subject: labels[key],
      A: (bestCity as any)[key],
      fullMark: 10,
    }));
  }, [bestCity]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 p-6 py-12"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-sm font-bold text-indigo-600 tracking-wider uppercase mb-2">
            测试结果
          </h2>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            最适合你的城市是
          </h1>
        </div>

        {bestCity && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8"
          >
            <div className="bg-indigo-600 p-8 text-white text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <MapPin className="w-64 h-64 absolute -top-10 -right-10" />
              </div>
              <div className="relative z-10">
                <div className="text-indigo-200 font-medium mb-1">{bestCity.region}</div>
                <h2 className="text-5xl font-bold mb-4">{bestCity.name}</h2>
                <div className="inline-flex items-center justify-center px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
                  <span className="font-bold text-xl mr-1">{bestCity.matchScore}%</span>
                  <span className="text-indigo-100 text-sm">契合度</span>
                </div>
              </div>
            </div>
            
            <div className="p-6 md:p-8">
              <div className="mb-10 pb-10 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                  为什么推荐{bestCity.name}？
                </h3>
                {loadingReason ? (
                  <div className="animate-pulse space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                  </div>
                ) : (
                  <p className="text-gray-700 leading-relaxed text-justify">
                    {reason}
                  </p>
                )}
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-6 text-center">城市画像</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
                    <Radar
                      name={bestCity.name}
                      dataKey="A"
                      stroke="#4f46e5"
                      fill="#4f46e5"
                      fillOpacity={0.4}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}

        <div className="space-y-4 mb-12">
          <h3 className="text-lg font-bold text-gray-900 px-2">其他高分推荐</h3>
          {topCities.slice(1).map((city, index) => (
            <motion.div
              key={city.name}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between"
            >
              <div>
                <div className="text-sm text-gray-500 mb-1">{city.region}</div>
                <h4 className="text-xl font-bold text-gray-900">{city.name}</h4>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-indigo-600">{city.matchScore}%</div>
                <div className="text-xs text-gray-500">契合度</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={onRestart}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-colors"
          >
            <RefreshCcw className="w-4 h-4" />
            重新测试
          </button>
        </div>
      </div>
    </motion.div>
  );
}
