import { Problem, MOCK_PROBLEMS } from "@/lib/mockProblems";
import { Button } from "@/components/ui/button";
import { BookMarked, CheckCircle2, RotateCcw, Clock } from "lucide-react";
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

type ProblemBankProps = {
  onSelectProblem: (problem: Problem) => void;
};

export function ProblemBank({ onSelectProblem }: ProblemBankProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-8 flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center gap-3 mb-8 pb-4 border-b">
        <div className="p-3 bg-secondary/30 rounded-xl text-secondary-foreground">
          <BookMarked className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">문제은행 (Problem Bank)</h2>
          <p className="text-slate-500 text-sm mt-1">이전에 학습했던 문제들을 다시 풀어보거나 복습할 수 있습니다.</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 pb-10">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {MOCK_PROBLEMS.map((problem) => (
            <div 
              key={problem.id} 
              className="group flex flex-col bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:shadow-md transition-all hover:border-primary/20 relative overflow-hidden"
            >
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                {problem.status === "solved" ? (
                  <div className="flex items-center gap-1.5 bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    해결완료
                  </div>
                ) : problem.status === "learning" ? (
                  <div className="flex items-center gap-1.5 bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full text-xs font-bold">
                    <Clock className="w-3.5 h-3.5" />
                    학습중
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 bg-slate-200 text-slate-600 px-2.5 py-1 rounded-full text-xs font-bold">
                    미해결
                  </div>
                )}
              </div>

              <div className="text-xs font-bold tracking-wider text-primary mb-2 uppercase">
                {problem.topic}
              </div>
              <h3 className="font-semibold text-slate-800 mb-4 pr-16 line-clamp-1" title={problem.title}>
                {problem.title}
              </h3>

              <div className="flex-1 bg-white rounded-xl border border-slate-100 p-4 flex items-center justify-center mb-6">
                <div className="text-lg w-full overflow-x-auto text-center font-serif py-2 overflow-y-hidden" style={{ minHeight: "4rem" }}>
                  <BlockMath math={problem.mathString} />
                </div>
              </div>

              <Button 
                onClick={() => onSelectProblem(problem)}
                className="w-full bg-slate-800 hover:bg-slate-900 group-hover:bg-primary transition-colors gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                다시 풀기
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
