"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Scroll,
  Feather,
  Send,
  MapPin,
  Book,
  Compass,
  Shell,
  Sparkles,
  Coffee,
  PenTool,
} from "lucide-react";
import axios from "axios";

interface Message {
  id: string;
  type: "user" | "assistant" | "artifact" | "location" | "scroll" | "note";
  content: string;
  metadata?: {
    title?: string;
    period?: string;
    location?: string;
    artifactId?: string;
    sketches?: string[];
  };
  timestamp: Date;
}

const MessageDisplay = ({ message }: { message: Message }) => {
  switch (message.type) {
    case "user":
      return <UserMessage message={message} />;
    case "assistant":
      return <AssistantMessage message={message} />;
    case "artifact":
      return <ArtifactMessage message={message} />;
    case "location":
      return <LocationMessage message={message} />;
    case "scroll":
      return <ScrollMessage message={message} />;
    case "note":
      return <FieldNoteMessage message={message} />;
    default:
      return null;
  }
};

const UserMessage = ({ message }: { message: Message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className="flex justify-end"
    >
      <div className="max-w-[80%] bg-gradient-to-br from-amber-900/10 to-amber-900/20 rounded-lg p-4 border border-amber-900/20 relative group">
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-500/10 rounded-full blur-md group-hover:blur-lg transition-all" />

        <div className="relative">
          <div className="text-amber-100 font-['Noto_Serif'] leading-relaxed">
            {message.content}
          </div>
          <div className="mt-2 text-xs text-amber-200/40 flex items-center gap-2">
            <PenTool className="w-3 h-3" />
            <span>{message.timestamp.toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const AssistantMessage = ({ message }: { message: Message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="flex justify-start"
    >
      <div className="max-w-[80%] bg-stone-900/80 rounded-lg p-4 border border-stone-800 relative">
        <div className="absolute inset-0 bg-[url('/textures/stone-texture.png')] opacity-20 mix-blend-overlay rounded-lg" />

        <div className="relative">
          <div className="text-stone-200 leading-relaxed">
            {message.content}
          </div>
          <div className="mt-2 text-xs text-stone-400/40">
            {message.timestamp.toLocaleTimeString()}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ScrollMessage = ({ message }: { message: Message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex justify-center"
    >
      <div className="max-w-[90%] bg-[url('/textures/parchment.png')] rounded-lg p-6 border border-amber-900/20 relative">
        <div className="absolute left-0 top-0 w-8 h-full bg-gradient-to-r from-amber-900/20 to-transparent" />
        <div className="absolute right-0 top-0 w-8 h-full bg-gradient-to-l from-amber-900/20 to-transparent" />

        <div className="text-center space-y-4">
          <Scroll className="w-8 h-8 text-amber-500 mx-auto" />
          <p className="text-amber-100 font-serif text-lg">{message.content}</p>
        </div>
      </div>
    </motion.div>
  );
};

const ArtifactMessage = ({ message }: { message: Message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-start"
    >
      <div className="max-w-[80%] bg-stone-900/90 rounded-lg overflow-hidden border border-amber-900/20">
        {message.metadata?.sketches && (
          <div className="h-48 bg-amber-900/10 border-b border-amber-900/20 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-amber-200/30 text-sm">Artifact Sketch</div>
            </div>
          </div>
        )}

        <div className="p-4 space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-amber-900/20 flex items-center justify-center">
              <Shell className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <h3 className="text-amber-100 font-serif">
                {message.metadata?.title || "Ancient Artifact"}
              </h3>
              <p className="text-sm text-amber-200/60">
                {message.metadata?.period}
              </p>
            </div>
          </div>

          <div className="text-amber-100/80">{message.content}</div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2 text-amber-200/40">
              <MapPin className="w-4 h-4" />
              <span>{message.metadata?.location}</span>
            </div>
            <div className="flex items-center gap-2 text-amber-200/40">
              <Book className="w-4 h-4" />
              <span>ID: {message.metadata?.artifactId}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const LocationMessage = ({ message }: { message: Message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex justify-start"
    >
      <div className="max-w-[80%] bg-stone-900/80 rounded-lg border border-amber-900/20 overflow-hidden">
        <div className="h-40 bg-amber-900/10 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <Compass className="w-8 h-8 text-amber-500/50" />
          </div>
        </div>

        <div className="p-4 space-y-3">
          <h3 className="text-amber-100 font-serif flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {message.metadata?.location}
          </h3>
          <p className="text-amber-200/60 text-sm">{message.content}</p>
        </div>
      </div>
    </motion.div>
  );
};

const FieldNoteMessage = ({ message }: { message: Message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, rotateZ: -2 }}
      animate={{ opacity: 1, rotateZ: 0 }}
      className="flex justify-start"
    >
      <div className="max-w-[80%] bg-amber-100/5 rounded-lg p-4 border border-amber-900/20 relative transform rotate-[-0.5deg]">
        <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-amber-500/10 to-transparent rounded-bl-3xl" />

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-amber-500">
            <Feather className="w-4 h-4" />
            <span className="text-sm font-serif">Field Notes</span>
          </div>

          <div className="text-amber-100/90 font-['Noto_Serif'] leading-relaxed">
            {message.content}
          </div>

          <div className="text-xs text-amber-200/40 italic">
            {new Date(message.timestamp).toLocaleDateString()} -{" "}
            {message.metadata?.location}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const WritingIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex justify-start"
    >
      <div className="bg-stone-900/50 rounded-lg px-4 py-3 border border-amber-900/20">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-amber-500"
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
          <span className="text-sm text-amber-200/40">
            Consulting ancient texts...
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "scroll",
      content:
        "Bienvenue, chercheur de sagesse ancienne. Quels secrets souhaitez-vous dévoiler ?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isWriting, setIsWriting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [sourceId, setSourceId] = useState<string | null>(null);
  const [pdfQuestion, setPdfQuestion] = useState<string>("");
  const [pdfAnswer, setPdfAnswer] = useState<string | null>(null);
  const [loadingPdfAnswer, setLoadingPdfAnswer] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current;
      scrollContainer.scrollTo({
        top: scrollContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);
  useEffect(() => {
    const fetchSourceId = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/get-source-id");
        setSourceId(response.data.source_id);
      } catch (error) {
        setErrorMessage("Error fetching PDF source ID. Make sure the server is running.");
      }
    };
    fetchSourceId();
  }, []);
  
  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${Math.min(
        inputRef.current.scrollHeight,
        120
      )}px`;
    }
  }, [input]);

  const simulateResponse = async (userInput: string) => {
    setIsWriting(true);
    await new Promise((r) => setTimeout(r, 1000)); // Reduced delay
  
    const newMessage: Message = {
      id: Date.now().toString(),
      type: "note", // Always use 'note' type for Field Notes
      content: `Here's some ancient wisdom about ${userInput}...`,
      metadata: {
        location: "Eastern Temple Complex",
      },
      timestamp: new Date(),
    };
  
    setMessages((prev) => [...prev, newMessage]);
    setIsWriting(false);
  };
  

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    simulateResponse(input);
  };

 const handleAskPdfQuestion = async () => {
  if (!sourceId || !pdfQuestion.trim()) {
    alert("Please upload a PDF and ask a question.");
    return;
  }

  setLoadingPdfAnswer(true);
  setErrorMessage(null);
  const questionTimestamp = Date.now();
  
  setMessages((prev) => [...prev, { id: questionTimestamp.toString(), type: "user", content: pdfQuestion, timestamp: new Date() }]);
  setPdfQuestion("");
  
  try {
    const response = await axios.post("http://127.0.0.1:5000/chat", {
      source_id: sourceId,
      question: pdfQuestion,
    });

    if (response.data && response.data.answer) {
      setPdfAnswer(response.data.answer);
      
      setMessages((prev) => [
        ...prev,
        {
          id: (questionTimestamp + 1).toString(),
          type: "assistant",
          content: response.data.answer,
          timestamp: new Date(),
        },
      ]);
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Error fetching PDF answer:", error);
    setErrorMessage("Error getting an answer. Please try again.");
  } finally {
    setLoadingPdfAnswer(false);
  }
};

  
  return (
    <div className="min-h-screen pt-16">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/textures/parchment-bg.png')] opacity-5" />
        <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto pb-4 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Chat Container */}
          <div className="relative bg-stone-900/40 rounded-lg border border-amber-900/20 backdrop-blur-sm shadow-2xl h-[calc(100vh-8rem)] flex flex-col">
            {/* Messages Area */}
            <ScrollArea
              ref={scrollRef}
              className="flex-1 px-6 py-4 overflow-y-auto"
            >
              <div className="space-y-8 pb-8">
                <AnimatePresence mode="popLayout">
                  {messages.map((message) => (
                    <MessageDisplay key={message.id} message={message} />
                  ))}
                  {isWriting && <WritingIndicator />}
                </AnimatePresence>
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 border-t border-amber-900/20 bg-stone-950/50">

  <div className="mt-2 flex gap-4 items-end">
    <div className="relative flex-1">
      <textarea
        value={pdfQuestion}
        onChange={(e) => setPdfQuestion(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        placeholder="Ask something about the PDF..."
        className="w-full min-h-[3rem] max-h-32 px-4 py-2 bg-stone-900/80 border border-amber-900/20 rounded-lg text-amber-100 placeholder:text-amber-200/30 focus:outline-none focus:ring-2 focus:ring-amber-500/20 resize-none"
        rows={1}
      />
    </div>

    <button
      onClick={handleAskPdfQuestion}
      disabled={!pdfQuestion.trim() || loadingPdfAnswer}
      className="flex-none w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 hover:bg-amber-500/20 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Send className="w-5 h-5" />
    </button>
  </div>
</div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;