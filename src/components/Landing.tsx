import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';

export default function Landing({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-gray-50"
    >
      <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-8 shadow-sm">
        <MapPin className="w-12 h-12 text-indigo-600" />
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
        寻找你的理想之城
      </h1>
      <p className="text-lg text-gray-600 mb-12 max-w-md">
        通过10个简单的问题，测一测哪座城市最契合你的性格与生活方式。
      </p>
      <button
        onClick={onStart}
        className="px-8 py-4 bg-indigo-600 text-white rounded-full font-medium text-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
      >
        开始测试
      </button>
    </motion.div>
  );
}
