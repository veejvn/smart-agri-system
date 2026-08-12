"use client";

import { Pill, Shield, CreditCard, Mic, Image, Send, Sparkles, BarChart2, Upload, Brain } from "lucide-react";

import { useState, useRef, useEffect } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import type { Message } from "@/types";


export default function AgroAI() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "user",
      text: "Can you diagnose this leaf? I found several plants in the north section with these spots.",
      time: "10:42 AM",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA-cVhCrTjlYYN1iXzn_emt7qV4l0hAaVhrcH8OBQlCxfmNc48f_WGE_Pbh1XFIsMQK9_g1raCYtAESMLp5IWntVnRWtuuSdf9gOv9aeWeWPqkCRGUwJph1E3TZ7oUBKThTsgDga4KleCvcq_1nTkzC4X0cdBgw0yHWBjA214n8tgHJs0Jvzg-j3yIw_J5sIR7GtPXRtD8aYTNL9xl1WQIwmo8Zt_L1NC11vcOqUnV2AR0m-AaKs_e6cbbg6A8Gw8bexDkzMhwvQQ",
    },
    {
      id: "2",
      sender: "ai",
      text: "Based on visual analysis, I have identified a fungal infection. Here are the details and recommended actions:",
      time: "10:43 AM",
      diagnosis: {
        condition: "CRITICAL",
        disease: "Puccinia sorghi (Common Rust)",
        confidence: "94%",
        treatment: "Apply foliar fungicides containing pyraclostrobin or azoxystrobin immediately.",
        prevention: "Plant resistant hybrids in the next cycle and ensure proper residue management.",
      },
    },
  ]);

  const [inputVal, setInputVal] = useState("");
  const [showVoiceOverlay, setShowVoiceOverlay] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputVal]);

  const handleSendMessage = () => {
    if (!inputVal.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: inputVal,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputVal("");

    // Simulate AI response after 1s
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: `Thanks for asking about "${newMsg.text}". Let me check our agricultural database...`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceTrigger = () => {
    setShowVoiceOverlay(true);
    // Auto turn off voice simulation after 3s
    setTimeout(() => {
      setShowVoiceOverlay(false);
      setInputVal("How can I optimize the irrigation schedule for my tomatoes?");
    }, 3000);
  };

  return (
    <DashboardLayout
      contentClassName="flex-1 overflow-y-auto p-md md:p-xl flex flex-col items-center"
    >
        <section className="flex-1 overflow-y-auto p-md md:p-xl flex flex-col items-center">
          <div className="w-full max-w-3xl flex flex-col gap-xl">
            {/* Welcome State */}
            <div className="flex flex-col items-center text-center py-xl">
              <div className="w-16 h-16 bg-secondary-container rounded-2xl flex items-center justify-center text-on-secondary-container mb-md shadow-inner">
                <Brain className="w-8 h-8 shrink-0" />
              </div>
              <h2 className="text-headline-lg font-headline-lg text-on-surface mb-xs font-bold">
                How can I assist your farm today?
              </h2>
              <p className="text-body-md font-body-md text-on-surface-variant">
                Diagnose pests, check market trends, or optimize your irrigation schedule with AI-driven insights.
              </p>
            </div>

            {/* Message History Container */}
            <div className="flex flex-col gap-lg pb-xxl">
              {messages.map((msg) => {
                const isUser = msg.sender === "user";
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col gap-sm ${isUser ? "items-end" : "items-start"} animate-in fade-in duration-300`}
                  >
                    {isUser ? (
                      <div className="bg-primary text-on-primary p-md rounded-2xl rounded-tr-none shadow-sm max-w-[85%]">
                        {msg.image && (
                          <div className="rounded-lg overflow-hidden mb-sm border border-white/20">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img className="w-full h-48 object-cover" alt="Uploaded plant issue" src={msg.image} />
                          </div>
                        )}
                        <p className="text-body-md font-body-md leading-relaxed">{msg.text}</p>
                      </div>
                    ) : (
                      <div className="flex gap-md items-start max-w-[90%] md:max-w-[80%]">
                        <div className="w-8 h-8 rounded-lg bg-secondary-container shrink-0 flex items-center justify-center text-on-secondary-container shadow-sm">
                          <Sparkles className="text-[18px] shrink-0"  />
                        </div>
                        <div className="flex flex-col gap-md">
                          <div className="bg-white border border-outline-variant p-md rounded-2xl rounded-tl-none shadow-sm">
                            <p className="text-body-md font-body-md text-on-surface leading-relaxed">{msg.text}</p>
                          </div>

                          {msg.diagnosis && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-md w-full">
                              <div className="col-span-1 md:col-span-2 bg-white border border-outline-variant rounded-xl p-md flex flex-col gap-sm shadow-sm">
                                <div className="flex justify-between items-center">
                                  <span className="text-label-sm font-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
                                    Condition
                                  </span>
                                  <div className="bg-error-container text-on-error-container px-sm py-1 rounded-full text-[10px] font-bold">
                                    {msg.diagnosis.condition}
                                  </div>
                                </div>
                                <div className="flex items-center gap-md">
                                  <h3 className="text-title-md font-title-md text-primary font-bold">{msg.diagnosis.disease}</h3>
                                  <div className="ml-auto flex items-center gap-sm">
                                    <div className="text-right">
                                      <p className="text-[10px] font-bold text-outline-variant leading-none">CONFIDENCE</p>
                                      <p className="text-title-md font-title-md text-secondary font-bold">
                                        {msg.diagnosis.confidence}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="bg-white border border-outline-variant rounded-xl p-md flex flex-col gap-base shadow-sm">
                                <Pill className="text-secondary mb-xs shrink-0"  />
                                <h4 className="text-label-sm font-bold text-on-surface">Treatment</h4>
                                <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
                                  {msg.diagnosis.treatment}
                                </p>
                              </div>

                              <div className="bg-white border border-outline-variant rounded-xl p-md flex flex-col gap-base shadow-sm">
                                <Shield className="text-secondary mb-xs shrink-0"  />
                                <h4 className="text-label-sm font-bold text-on-surface">Prevention</h4>
                                <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
                                  {msg.diagnosis.prevention}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    <span className={`text-[10px] text-on-surface-variant font-bold uppercase ${isUser ? "px-sm" : "ml-10 px-xl"}`}>
                      {msg.time} • {isUser ? "You" : "AgriSmart AI"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Suggested Prompts & Input Area */}
        <div className="w-full bg-surface py-md md:py-xl border-t border-outline-variant/30 flex flex-col items-center sticky bottom-0 z-30">
          {/* Suggested Prompts */}
          <div className="w-full max-w-3xl flex gap-sm px-md mb-md overflow-x-auto no-scrollbar">
            <button
              onClick={() => setInputVal("Give me some yield optimization tips for my crops.")}
              className="whitespace-nowrap px-md py-sm bg-white border border-outline-variant rounded-full text-body-md font-body-md hover:bg-surface-container transition-colors flex items-center gap-xs shadow-sm"
            >
              <BarChart2 className="text-[18px] text-secondary shrink-0"  />
              Yield optimization tips
            </button>
            <button
              onClick={() => setInputVal("What is the current market price for Durian?")}
              className="whitespace-nowrap px-md py-sm bg-white border border-outline-variant rounded-full text-body-md font-body-md hover:bg-surface-container transition-colors flex items-center gap-xs shadow-sm"
            >
              <CreditCard className="text-[18px] text-secondary shrink-0"  />
              Market price for Durian
            </button>
            <button
              onClick={() => setInputVal("Diagnose this crop leaf issue.")}
              className="whitespace-nowrap px-md py-sm bg-white border border-outline-variant rounded-full text-body-md font-body-md hover:bg-surface-container transition-colors flex items-center gap-xs shadow-sm"
            >
              <Upload className="text-[18px] text-secondary shrink-0"  />
              Diagnose this leaf
            </button>
          </div>

          {/* Input Controls */}
          <div className="w-full max-w-3xl px-md">
            <div className="relative bg-white rounded-2xl border border-outline-variant shadow-lg focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <textarea
                ref={textareaRef}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent border-none focus:ring-0 py-md pl-md pr-xxl text-body-lg font-body-lg resize-none min-h-[56px] max-h-48 outline-none"
                placeholder="Ask AgriSmart about your crops, weather, or market prices..."
                rows={1}
              />
              <div className="absolute right-md bottom-base flex items-center gap-sm mb-base">
                <button
                  onClick={handleVoiceTrigger}
                  className="w-10 h-10 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant transition-colors group"
                  title="Voice Interaction"
                >
                  <Mic className="group-active:text-error shrink-0"  />
                </button>
                <button
                  className="w-10 h-10 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant transition-colors"
                  title="Upload Image"
                >
                  <Image className=" shrink-0"  />
                </button>
                <button
                  onClick={handleSendMessage}
                  className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center hover:opacity-90 transition-opacity"
                >
                  <Send className=" shrink-0"  />
                </button>
              </div>
            </div>
            <p className="text-center text-label-sm font-label-sm text-outline mt-sm">
              AgriSmart AI can provide data-driven insights. Verify critical agricultural decisions with on-field experts.
            </p>
          </div>
        </div>

        {/* Voice Feedback Overlay */}
        {showVoiceOverlay && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center transition-opacity duration-300">
            <div className="bg-white p-xl rounded-3xl shadow-2xl flex flex-col items-center gap-lg max-w-sm text-center">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-on-primary relative z-10">
                  <Mic className="text-[40px] shrink-0"  />
                </div>
              </div>
              <div>
                <h3 className="text-title-md font-title-md text-on-surface font-bold">Listening...</h3>
                <p className="text-body-md font-body-md text-on-surface-variant mt-xs">
                  Ask anything about your farm operation
                </p>
              </div>
              <button
                onClick={() => setShowVoiceOverlay(false)}
                className="bg-surface-container-high px-lg py-sm rounded-full text-label-sm font-bold hover:bg-surface-container-highest transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
    </DashboardLayout>
  );
}
