import { Problem, MOCK_PROBLEMS } from "@/lib/mockProblems";
import { Button } from "@/components/ui/button";
import { BookMarked, CheckCircle2, RotateCcw, Clock } from "lucide-react";
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";
import { useLanguage } from "@/components/LanguageProvider";

type ProblemBankProps = {
  currentProblem: Problem;
  onSelectProblem: (problem: Problem) => void;
};

export function ProblemBank({ currentProblem, onSelectProblem }: ProblemBankProps) {
  const { t, language } = useLanguage();

  const learningProblems = [currentProblem];
  
  const unsolvedProblems = MOCK_PROBLEMS.filter(
    (p) => p.id !== currentProblem.id && p.status !== "solved"
  );
  
  const solvedProblems = MOCK_PROBLEMS.filter(
    (p) => p.id !== currentProblem.id && p.status === "solved"
  );

  const sections = [
    { title: t("bank.badge.learning"), problems: learningProblems, icon: <Clock className="w-5 h-5 text-amber-500" /> },
    { title: t("bank.badge.unsolved"), problems: unsolvedProblems, icon: <div className="w-5 h-5 rounded-full border-2 border-slate-400" /> },
    { title: t("bank.badge.solved"), problems: solvedProblems, icon: <CheckCircle2 className="w-5 h-5 text-green-500" /> },
  ];

  const ProblemCard = ({ problem }: { problem: Problem }) => (
    <div className="group flex flex-col bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:shadow-md transition-all hover:border-primary/20 relative overflow-hidden">
      {/* Status Badge */}
      <div className="absolute top-4 right-4">
        {problem.id === currentProblem.id ? (
          <div className="flex items-center gap-1.5 bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full text-xs font-bold">
            <Clock className="w-3.5 h-3.5" />
            {t("bank.badge.learning")}
          </div>
        ) : problem.status === "solved" ? (
          <div className="flex items-center gap-1.5 bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {t("bank.badge.solved")}
          </div>
        ) : (
          <div className="flex items-center gap-1.5 bg-slate-200 text-slate-600 px-2.5 py-1 rounded-full text-xs font-bold">
            {t("bank.badge.unsolved")}
          </div>
        )}
      </div>

      <div className="text-xs font-bold tracking-wider text-primary mb-2 uppercase">
        {problem.topic[language]}
      </div>
      <h3 className="font-semibold text-slate-800 mb-4 pr-16 line-clamp-1" title={problem.title[language]}>
        {problem.title[language]}
      </h3>

      <div className="flex-1 bg-white rounded-xl border border-slate-100 p-4 flex items-center justify-center mb-6">
        <div className="text-lg w-full overflow-x-auto text-center font-serif py-2 overflow-y-hidden" style={{ minHeight: "4rem" }}>
          <BlockMath math={problem.mathString} />
        </div>
      </div>

      <Button
        onClick={() => onSelectProblem(problem)}
        className="w-full bg-slate-800 hover:bg-primary transition-colors gap-2"
      >
        <RotateCcw className="w-4 h-4" />
        {t("bank.btn.retry")}
      </Button>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-8 flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b">
        <div className="p-3 bg-secondary/30 rounded-xl text-secondary-foreground">
          <BookMarked className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{t("bank.title")}</h2>
          <p className="text-slate-500 text-sm mt-1">{t("bank.description")}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 pb-10 space-y-10">
        {sections.map(
          (section, idx) =>
            section.problems.length > 0 && (
              <div key={idx}>
                <div className="flex items-center gap-2 mb-4">
                  {section.icon}
                  <h3 className="text-lg font-bold text-slate-800">{section.title}</h3>
                  <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                    {section.problems.length}
                  </span>
                </div>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {section.problems.map((problem) => (
                    <ProblemCard key={problem.id} problem={problem} />
                  ))}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}
