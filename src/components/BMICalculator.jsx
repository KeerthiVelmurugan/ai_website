import { useState } from 'react';
import { Scale, RefreshCw, Info } from 'lucide-react';

function getBMIResult(bmi) {
  if (bmi < 18.5) {
    return {
      value: bmi,
      category: 'Underweight',
      color: 'text-sky-600',
      bgColor: 'bg-sky-50',
      borderColor: 'border-sky-200',
      description: 'You may need to gain some weight. Consult a healthcare provider.',
      range: '< 18.5',
    };
  } else if (bmi < 25) {
    return {
      value: bmi,
      category: 'Normal Weight',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      description: 'You have a healthy weight. Maintain your current lifestyle.',
      range: '18.5 – 24.9',
    };
  } else if (bmi < 30) {
    return {
      value: bmi,
      category: 'Overweight',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      description: 'You are slightly above the healthy range. Consider diet and exercise.',
      range: '25.0 – 29.9',
    };
  } else {
    return {
      value: bmi,
      category: 'Obese',
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
      description: 'Health risks are elevated. Please consult a healthcare professional.',
      range: '≥ 30.0',
    };
  }
}

function getGaugeRotation(bmi) {
  const min = 10;
  const max = 40;
  const clamped = Math.min(Math.max(bmi, min), max);
  return ((clamped - min) / (max - min)) * 180 - 90;
}

const categories = [
  { label: 'Underweight', range: '< 18.5', color: 'bg-sky-400' },
  { label: 'Normal', range: '18.5–24.9', color: 'bg-emerald-400' },
  { label: 'Overweight', range: '25–29.9', color: 'bg-amber-400' },
  { label: 'Obese', range: '≥ 30', color: 'bg-rose-400' },
];

export default function BMICalculator() {
  const [unit, setUnit] = useState('metric');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [weightLbs, setWeightLbs] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  function calculate() {
    setError('');
    let bmi;

    if (unit === 'metric') {
      const w = parseFloat(weight);
      const h = parseFloat(height) / 100;
      if (!w || !h || w <= 0 || h <= 0) {
        setError('Please enter valid weight and height values.');
        return;
      }
      bmi = w / (h * h);
    } else {
      const w = parseFloat(weightLbs);
      const ft = parseFloat(heightFt) || 0;
      const inch = parseFloat(heightIn) || 0;
      const totalInches = ft * 12 + inch;
      if (!w || !totalInches || w <= 0 || totalInches <= 0) {
        setError('Please enter valid weight and height values.');
        return;
      }
      bmi = (w / (totalInches * totalInches)) * 703;
    }

    if (bmi > 100 || bmi < 5) {
      setError('Please enter realistic values.');
      return;
    }

    setResult(getBMIResult(parseFloat(bmi.toFixed(1))));
  }

  function reset() {
    setWeight('');
    setHeight('');
    setHeightFt('');
    setHeightIn('');
    setWeightLbs('');
    setResult(null);
    setError('');
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-2xl shadow-lg mb-4">
            <Scale className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">BMI Calculator</h1>
          <p className="text-slate-500 mt-1 text-sm">
            Body Mass Index — a measure of body fat based on height and weight
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100">
          
          {/* Toggle */}
          <div className="flex border-b border-slate-100">
            <button onClick={() => { setUnit('metric'); reset(); }} className={`flex-1 py-4 ${unit === 'metric' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}>
              Metric (kg / cm)
            </button>
            <button onClick={() => { setUnit('imperial'); reset(); }} className={`flex-1 py-4 ${unit === 'imperial' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}>
              Imperial (lbs / ft)
            </button>
          </div>

          <div className="p-6">
            
            {/* Inputs */}
            {unit === 'metric' ? (
              <div className="grid grid-cols-2 gap-4 mb-6">
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Weight (kg)" className="border p-3 rounded-xl text-black" />
                <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Height (cm)" className="border p-3 rounded-xl text-black" />
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4 mb-6">
                <input type="number" value={weightLbs} onChange={(e) => setWeightLbs(e.target.value)} placeholder="lbs" className="border p-3 rounded-xl text-black" />
                <input type="number" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} placeholder="ft" className="border p-3 rounded-xl text-black" />
                <input type="number" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} placeholder="in" className="border p-3 rounded-xl text-black" />
              </div>
            )}

            {error && <p className="text-red-500">{error}</p>}

            <div className="flex gap-3">
              <button onClick={calculate} className="flex-1 bg-blue-600 text-white py-3 rounded-xl">Calculate BMI</button>
              <button onClick={reset} className="w-12 border rounded-xl"><RefreshCw /></button>
            </div>

            {/* Result */}
            {result && (
              <div className={`mt-6 p-5 rounded-xl ${result.bgColor}`}>
                <h2 className={`text-4xl font-bold ${result.color}`}>{result.value}</h2>
                <p className={result.color}>{result.category}</p>
              </div>
            )}
          </div>
          {/* BMI Categories Section */}
<div className="mt-6 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
    BMI Categories
  </h3>

  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
    {categories.map((cat) => (
      <div key={cat.label} className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${cat.color}`} />
        <div>
          <p className="text-xs font-semibold text-slate-700">{cat.label}</p>
          <p className="text-xs text-slate-400">{cat.range}</p>
        </div>
      </div>
    ))}
  </div>

  <p className="text-xs text-slate-400 mt-4 leading-relaxed">
    BMI is a screening tool, not a diagnostic measure. Consult a healthcare
    provider for a complete health assessment.
  </p>
</div>
        </div>
        
      </div>
      
    </div>
  );
}