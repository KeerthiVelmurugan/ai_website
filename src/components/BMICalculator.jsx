import { useState } from "react";
import {
  Scale,
  RefreshCw,
  Weight,
  Ruler,
  Calculator,
  Activity,
  HeartPulse,
  Info,
  Leaf,
} from "lucide-react";

import "./BMICalculator.css";

function getBMIResult(bmi) {
  if (bmi < 18.5) {
    return {
      category: "Underweight",
      color: "#3988f5",
      description: "Your BMI is below the usual healthy range.",
      range: "< 18.5",
    };
  }

  if (bmi < 25) {
    return {
      category: "Normal Weight",
      color: "#10b981",
      description:
        "Your BMI is within the usual healthy range. Maintain balanced habits.",
      range: "18.5 – 24.9",
    };
  }

  if (bmi < 30) {
    return {
      category: "Overweight",
      color: "#f59e0b",
      description: "Your BMI is above the usual healthy range.",
      range: "25.0 – 29.9",
    };
  }

  return {
    category: "Obese",
    color: "#f04452",
    description:
      "Your BMI is in a higher range. Consider discussing your health with a healthcare professional.",
    range: "≥ 30.0",
  };
}

const categories = [
  {
    label: "Underweight",
    range: "< 18.5",
    color: "#3988f5",
    className: "bmi-underweight",
  },
  {
    label: "Normal Weight",
    range: "18.5 – 24.9",
    color: "#10b981",
    className: "bmi-normal",
  },
  {
    label: "Overweight",
    range: "25.0 – 29.9",
    color: "#f59e0b",
    className: "bmi-overweight",
  },
  {
    label: "Obese",
    range: "≥ 30.0",
    color: "#f04452",
    className: "bmi-obese",
  },
];

function BMICalculator() {
  const [unit, setUnit] = useState("metric");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [weightLbs, setWeightLbs] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  function reset() {
    setWeight("");
    setHeight("");
    setWeightLbs("");
    setHeightFt("");
    setHeightIn("");
    setResult(null);
    setError("");
  }

  function changeUnit(nextUnit) {
    setUnit(nextUnit);
    reset();
  }

  function calculate(event) {
    event.preventDefault();
    setError("");
    setResult(null);

    let bmi;

    if (unit === "metric") {
      const w = Number(weight);
      const h = Number(height) / 100;

      if (
        !weight.trim() ||
        !height.trim() ||
        !Number.isFinite(w) ||
        !Number.isFinite(h) ||
        w <= 0 ||
        h <= 0
      ) {
        setError("Please enter a valid weight and height.");
        return;
      }

      bmi = w / (h * h);
    } else {
      const w = Number(weightLbs);
      const ft = heightFt.trim() ? Number(heightFt) : 0;
      const inches = heightIn.trim() ? Number(heightIn) : 0;
      const totalInches = ft * 12 + inches;

      if (
        !weightLbs.trim() ||
        !Number.isFinite(w) ||
        !Number.isFinite(ft) ||
        !Number.isFinite(inches) ||
        w <= 0 ||
        ft < 0 ||
        inches < 0 ||
        inches >= 12 ||
        totalInches <= 0
      ) {
        setError(
          "Enter a valid weight, feet, and inches. Inches must be less than 12."
        );
        return;
      }

      bmi = (w / (totalInches * totalInches)) * 703;
    }

    if (!Number.isFinite(bmi) || bmi < 5 || bmi > 100) {
      setError("Please check your values and enter realistic measurements.");
      return;
    }

    const roundedBMI = Number(bmi.toFixed(1));
    setResult({
      value: roundedBMI,
      ...getBMIResult(roundedBMI),
    });
  }

  const gaugeRotation = result
    ? Math.max(-90, Math.min(90, ((result.value - 10) / 30) * 180 - 90))
    : -35;

  return (
    <main className="bmi-page">
      <div className="bmi-decoration bmi-decoration-top" />
      <div className="bmi-decoration bmi-decoration-bottom" />

      <div className="bmi-container">
        <header className="bmi-header">
          <div className="bmi-logo">
            <Scale size={30} />
          </div>

          <h1>
            <span>BMI</span> Calculator
          </h1>

          <p>
            Body Mass Index — a measure based on your height and weight
          </p>
        </header>

        <section className="bmi-main-card">
          <div className="bmi-calculator-grid">
            <div className="bmi-input-panel">
              <div className="bmi-unit-switch">
                <button
                  type="button"
                  className={unit === "metric" ? "active" : ""}
                  onClick={() => changeUnit("metric")}
                >
                  <Ruler size={18} />
                  Metric (kg / cm)
                </button>

                <button
                  type="button"
                  className={unit === "imperial" ? "active" : ""}
                  onClick={() => changeUnit("imperial")}
                >
                  <Weight size={18} />
                  Imperial (lbs / ft)
                </button>
              </div>

              <form onSubmit={calculate}>
                {unit === "metric" ? (
                  <div className="bmi-fields">
                    <div className="bmi-field">
                      <label htmlFor="weight">
                        <Weight size={19} />
                        Weight
                      </label>

                      <div className="bmi-input-wrap">
                        <input
                          id="weight"
                          type="number"
                          min="0.1"
                          step="any"
                          placeholder="Enter weight in kg"
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                        />
                        <span>kg</span>
                      </div>
                    </div>

                    <div className="bmi-field">
                      <label htmlFor="height">
                        <Ruler size={19} />
                        Height
                      </label>

                      <div className="bmi-input-wrap">
                        <input
                          id="height"
                          type="number"
                          min="1"
                          step="any"
                          placeholder="Enter height in cm"
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                        />
                        <span>cm</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bmi-fields">
                    <div className="bmi-field">
                      <label htmlFor="weightLbs">
                        <Weight size={19} />
                        Weight
                      </label>

                      <div className="bmi-input-wrap">
                        <input
                          id="weightLbs"
                          type="number"
                          min="0.1"
                          step="any"
                          placeholder="Enter weight"
                          value={weightLbs}
                          onChange={(e) => setWeightLbs(e.target.value)}
                        />
                        <span>lbs</span>
                      </div>
                    </div>

                    <div className="bmi-field">
                      <label>
                        <Ruler size={19} />
                        Height
                      </label>

                      <div className="bmi-imperial-inputs">
                        <input
                          aria-label="Height in feet"
                          type="number"
                          min="0"
                          step="1"
                          placeholder="Feet"
                          value={heightFt}
                          onChange={(e) => setHeightFt(e.target.value)}
                        />
                        <input
                          aria-label="Height in inches"
                          type="number"
                          min="0"
                          max="11.99"
                          step="any"
                          placeholder="Inches"
                          value={heightIn}
                          onChange={(e) => setHeightIn(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {error && (
                  <p className="bmi-error" role="alert">
                    {error}
                  </p>
                )}

                <div className="bmi-actions">
                  <button type="submit" className="bmi-calculate-btn">
                    <Calculator size={19} />
                    Calculate BMI
                  </button>

                  <button
                    type="button"
                    className="bmi-reset-btn"
                    onClick={reset}
                    aria-label="Reset calculator"
                    title="Reset"
                  >
                    <RefreshCw size={21} />
                  </button>
                </div>
              </form>
            </div>

            <div
              className="bmi-result-panel"
              aria-live="polite"
              style={{
                "--result-color": result?.color || "#10b981",
              }}
            >
              <div className="bmi-gauge">
                <svg viewBox="0 0 240 145" role="img" aria-label="BMI range gauge">
                  <path
                    d="M 25 120 A 95 95 0 0 1 215 120"
                    fill="none"
                    stroke="#e8eef7"
                    strokeWidth="17"
                    strokeLinecap="round"
                  />

                  <path
                    d="M 25 120 A 95 95 0 0 1 59 48"
                    fill="none"
                    stroke="#58b9fa"
                    strokeWidth="17"
                    strokeLinecap="round"
                  />

                  <path
                    d="M 59 48 A 95 95 0 0 1 120 25"
                    fill="none"
                    stroke="#34c878"
                    strokeWidth="17"
                  />

                  <path
                    d="M 120 25 A 95 95 0 0 1 181 48"
                    fill="none"
                    stroke="#ffbd43"
                    strokeWidth="17"
                  />

                  <path
                    d="M 181 48 A 95 95 0 0 1 215 120"
                    fill="none"
                    stroke="#ff6b70"
                    strokeWidth="17"
                    strokeLinecap="round"
                  />

                  <g transform={`rotate(${gaugeRotation}, 120, 120)`}>
                    <path
                      d="M 120 120 L 114 52 L 120 38 L 126 52 Z"
                      fill="#147d72"
                    />
                  </g>

                  <circle cx="120" cy="120" r="10" fill="#147d72" />
                </svg>
              </div>

              <p className="bmi-result-label">YOUR BMI</p>

              <h2>{result ? result.value : "--.-"}</h2>

              <span className="bmi-result-category">
                {result ? result.category : "Awaiting result"}
              </span>

              <p className="bmi-result-description">
                {result
                  ? result.description
                  : "Enter your measurements to calculate your BMI."}
              </p>
            </div>
          </div>

          <div className="bmi-summary">
            <h3>Your Result</h3>

            <div className="bmi-summary-grid">
              <div className="bmi-summary-item">
                <span className="bmi-summary-icon blue">
                  <Weight size={20} />
                </span>
                <p>Weight</p>
                <strong>
                  {unit === "metric"
                    ? weight && Number(weight) > 0
                      ? `${weight} kg`
                      : "—"
                    : weightLbs && Number(weightLbs) > 0
                      ? `${weightLbs} lbs`
                      : "—"}
                </strong>
              </div>

              <div className="bmi-summary-item">
                <span className="bmi-summary-icon blue">
                  <Ruler size={20} />
                </span>
                <p>Height</p>
                <strong>
                  {unit === "metric"
                    ? height && Number(height) > 0
                      ? `${height} cm`
                      : "—"
                    : (heightFt || heightIn) &&
                        (Number(heightFt) * 12 + Number(heightIn) > 0)
                      ? `${heightFt || 0} ft ${heightIn || 0} in`
                      : "—"}
                </strong>
              </div>

              <div className="bmi-summary-item">
                <span className="bmi-summary-icon blue">
                  <Activity size={20} />
                </span>
                <p>BMI</p>
                <strong>{result ? result.value : "—"}</strong>
              </div>

              <div className="bmi-summary-item">
                <span className="bmi-summary-icon green">
                  <Leaf size={20} />
                </span>
                <p>Category</p>
                <strong className={result ? "bmi-summary-category" : ""}>
                  {result ? result.category : "—"}
                </strong>
              </div>
            </div>
          </div>
        </section>

        <section className="bmi-categories-card">
          <h3>
            <Activity size={24} />
            BMI Categories
          </h3>

          <div className="bmi-category-grid">
            {categories.map((category) => (
              <div
                className={`bmi-category-item ${category.className} ${
                  result?.category === category.label ? "selected" : ""
                }`}
                key={category.label}
              >
                <span
                  className="bmi-category-dot"
                  style={{ backgroundColor: category.color }}
                />
                <strong>{category.label}</strong>
                <p>{category.range}</p>
              </div>
            ))}
          </div>

          <div className="bmi-disclaimer">
            <Info size={21} />
            <p>
              BMI is a screening tool, not a diagnosis. It does not directly
              measure body fat and may not be appropriate for everyone.
              Consult a healthcare professional for a complete assessment.
            </p>
          </div>
        </section>

        <footer className="bmi-footer">
          <span />
          <HeartPulse size={27} />
          <span />
          <p>HEALTHIER TODAY&nbsp; • &nbsp;STRONGER TOMORROW</p>
        </footer>
      </div>
    </main>
  );
}

export default BMICalculator;