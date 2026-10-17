import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/ProductCard";

const QUESTIONS = [
  {
    key: "skinType",
    label: "How would you describe your skin?",
    options: ["Oily", "Normal", "Dry"],
  },
  {
    key: "personality",
    label: "Which best describes your everyday style?",
    options: ["Bold & Confident", "Classic & Refined", "Fresh & Easygoing", "Warm & Sensual"],
  },
  {
    key: "preferredScent",
    label: "Which of these already appeals to you?",
    options: ["Citrus & Fresh", "Floral", "Woody & Earthy", "Sweet & Spicy", "Not sure yet"],
  },
  {
    key: "intensity",
    label: "How noticeable do you want your fragrance to be?",
    options: ["A subtle skin scent", "Noticeable but soft", "Strong and long-lasting"],
  },
  {
    key: "occasion",
    label: "When will you wear it most?",
    options: ["Daytime, casual", "Evenings & special occasions", "Work / office", "Any time"],
  },
];

// Maps each answer to accord-family score bonuses
const PERSONALITY_MAP = {
  "Bold & Confident": { Woody: 2, "Warm Spicy": 2, Amber: 1 },
  "Classic & Refined": { Aromatic: 2, Woody: 1, Citrus: 1 },
  "Fresh & Easygoing": { Citrus: 2, Fresh: 2, Aromatic: 1 },
  "Warm & Sensual": { Amber: 2, Musky: 2, Sweet: 1 },
};

const PREFERRED_SCENT_MAP = {
  "Citrus & Fresh": { Citrus: 2, Fresh: 2 },
  "Floral": { Floral: 2 },
  "Woody & Earthy": { Woody: 2, Aromatic: 1 },
  "Sweet & Spicy": { Sweet: 2, "Warm Spicy": 2 },
  "Not sure yet": {},
};

const OCCASION_MAP = {
  "Daytime, casual": { Citrus: 1, Fresh: 1, Aromatic: 1 },
  "Evenings & special occasions": { Amber: 2, Woody: 1, Musky: 1 },
  "Work / office": { Aromatic: 1, Fresh: 1, Powdery: 1 },
  "Any time": { Woody: 1 },
};

const SILLAGE_MAP = {
  "A subtle skin scent": ["Intimate", "Moderate"],
  "Noticeable but soft": ["Moderate", "Strong"],
  "Strong and long-lasting": ["Strong", "Enormous"],
};

const SKIN_TYPE_TIPS = {
  Oily: "Oily skin tends to hold fragrance longer and can amplify sweeter, muskier notes — a lighter Eau de Toilette often performs beautifully on you.",
  Normal: "Normal skin gives a balanced, true-to-bottle performance — most concentrations will wear as intended.",
  Dry: "Dry skin causes fragrance to fade faster, especially top notes. A richer Eau de Parfum or Parfum concentration will help it last.",
};

function mergeScores(target, source) {
  for (const key in source) {
    target[key] = (target[key] || 0) + source[key];
  }
}

export default function ScentQuiz() {
  const { products } = useStore();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const question = QUESTIONS[step];

  function selectAnswer(value) {
    const updated = { ...answers, [question.key]: value };
    setAnswers(updated);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setShowResults(true);
    }
  }

  function restart() {
    setAnswers({});
    setStep(0);
    setShowResults(false);
  }

  const results = useMemo(() => {
    if (!showResults) return { topFamilies: [], matches: [] };

    const scores = {};
    if (answers.personality) mergeScores(scores, PERSONALITY_MAP[answers.personality] || {});
    if (answers.preferredScent) mergeScores(scores, PREFERRED_SCENT_MAP[answers.preferredScent] || {});
    if (answers.occasion) mergeScores(scores, OCCASION_MAP[answers.occasion] || {});

    const topFamilies = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name]) => name);

    const acceptableSillage = SILLAGE_MAP[answers.intensity] || [];

    const scored = products.map((p) => {
      let matchScore = 0;
      const productAccordNames = (p.accords || []).map((a) => a.name);
      matchScore += productAccordNames.filter((name) => topFamilies.includes(name)).length * 2;
      if (p.sillage && acceptableSillage.includes(p.sillage)) matchScore += 1;
      return { p, matchScore };
    });

    const matches = scored
      .filter((s) => s.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 4)
      .map((s) => s.p);

    return { topFamilies, matches };
  }, [showResults, answers, products]);

  if (showResults) {
    return (
      <div>
        <div className="text-center mb-10">
          <p className="eyebrow mb-3">Your Fragrance Profile</p>
          <h3 className="text-2xl font-light mb-4">
            You lean toward{" "}
            <span className="text-olive">
              {results.topFamilies.length > 0 ? results.topFamilies.join(", ") : "a versatile mix"}
            </span>
          </h3>
          {answers.skinType && (
            <p className="text-text-secondary text-sm max-w-lg mx-auto leading-relaxed">
              {SKIN_TYPE_TIPS[answers.skinType]}
            </p>
          )}
        </div>

        {results.matches.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12 mb-10">
            {results.matches.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        ) : (
          <p className="text-center text-text-secondary text-sm mb-10">
            We don't have a close match in stock just yet —{" "}
            <Link to="/shop" className="text-olive hover:underline">
              browse the full collection
            </Link>{" "}
            in the meantime.
          </p>
        )}

        <div className="text-center">
          <button
            onClick={restart}
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-olive transition-colors"
          >
            <RotateCcw size={14} /> Retake the quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex justify-center gap-1.5 mb-10">
        {QUESTIONS.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all ${
              i <= step ? "bg-olive w-8" : "bg-border w-4"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <h3 className="text-2xl font-light mb-8">{question.label}</h3>
          <div className="flex flex-col gap-3 max-w-sm mx-auto">
            {question.options.map((opt) => (
              <button
                key={opt}
                onClick={() => selectAnswer(opt)}
                className="border border-border rounded-input px-5 py-3.5 text-sm hover:border-olive hover:bg-bg-secondary/40 transition-colors"
              >
                {opt}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}