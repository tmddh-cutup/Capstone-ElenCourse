"use client";

import { useState } from "react";
import { SocraticDialogue } from "@/components/SocraticDialogue";
import { MathProblemPane } from "@/components/MathProblemPane";
import { Progress } from "@/components/ui/progress";
import { User, BookOpen } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProblemBank } from "@/components/ProblemBank";
import { MOCK_PROBLEMS, type Problem } from "@/lib/mockProblems";

const CURRENT_YEAR = new Date().getFullYear();

const studentInfo = {
  name: "김엘렌",
  gender: "여성",
  school: "엘렌고등학교",
  birthYear: 2010,
};

function getGrade(birthYear: number) {
  const age = CURRENT_YEAR - birthYear;
  if (age === 16) return "고1";
  if (age === 17) return "고2";
  if (age === 18) return "고3";
  if (age === 15) return "중3";
  if (age === 14) return "중2";
  if (age === 13) return "중1";
  return `${age}세`;
}

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [currentProblem, setCurrentProblem] = useState<Problem>(MOCK_PROBLEMS[0]);
  const [activeTab, setActiveTab] = useState("workspace");

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl text-primary">
              <BookOpen className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">ElenCourse</h1>
          </div>

          <div className="flex-1 max-w-sm mx-10">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
              <span>현재 학습중: {currentProblem.topic}</span>
              <span className="text-primary">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-slate-100" />
          </div>

          <Popover>
            <PopoverTrigger className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors text-sm font-medium text-slate-600 outline-none focus:ring-2 focus:ring-primary/50">
              <div className="bg-slate-200 p-1 rounded-full"><User className="w-4 h-4 text-slate-600" /></div>
              <span>{studentInfo.name}</span>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-4 rounded-xl shadow-lg border-slate-100 mr-4" align="end">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 border-b pb-3">
                  <div className="bg-primary/10 p-2 rounded-full hidden sm:block">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 tracking-tight">{studentInfo.name}</h4>
                    <p className="text-[11px] text-slate-500">{studentInfo.school}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs">
                  <div className="flex flex-col">
                    <span className="text-slate-400 font-medium">성별</span>
                    <span className="font-semibold text-slate-700">{studentInfo.gender}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-slate-400 font-medium">출생</span>
                    <span className="font-semibold text-slate-700">{studentInfo.birthYear}년생</span>
                  </div>
                  <div className="flex flex-col col-span-2 mt-1">
                    <span className="text-slate-400 font-medium mb-1">현재 학년</span>
                    <span className="font-semibold text-primary bg-primary/10 px-2 py-1 rounded w-fit">
                      {getGrade(studentInfo.birthYear)} ({CURRENT_YEAR}년 기준)
                    </span>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </header>

      {/* Main Split Interface */}
      <main className="flex-1 container mx-auto px-4 py-6 flex flex-col">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold tracking-tight text-slate-800">
              {activeTab === "workspace" ? "📝 문제 학습 공간" : "📚 문제은행"}
            </h2>
            <TabsList className="bg-slate-200/50 p-1">
              <TabsTrigger value="workspace">학습 (Workspace)</TabsTrigger>
              <TabsTrigger value="bank">문제은행 (Bank)</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="workspace" className="flex-1 mt-0 outline-none grid lg:grid-cols-2 gap-6 items-stretch">
            <section className="h-[calc(100vh-12rem)]">
              <MathProblemPane 
                problemString={currentProblem.mathString} 
                tikzString={currentProblem.tikzString}
                latexString={currentProblem.latexString}
                serverProblem={currentProblem.serverProblem}
              />
            </section>
            <section className="h-[calc(100vh-12rem)]">
              <SocraticDialogue 
                onProgress={setProgress} 
                logicSteps={currentProblem.logicSteps}
                hints={currentProblem.hints}
              />
            </section>
          </TabsContent>

          <TabsContent value="bank" className="flex-1 mt-0 outline-none h-[calc(100vh-12rem)] rounded-2xl">
            <ProblemBank onSelectProblem={(p) => {
              setCurrentProblem(p);
              setActiveTab("workspace");
            }} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
