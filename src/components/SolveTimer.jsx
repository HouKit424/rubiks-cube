import { useState, useEffect, useRef } from "react";
import { invertAlgorithm, movesToAlgString } from "../data/algorithms";

// WCA standard 3x3x3 random scramble generator
function generateScramble() {
  const faces = ["R", "L", "U", "D", "F", "B"];
  const modifiers = ["", "'", "2"];
  const scrambleMoves = [];
  let lastFace = "";
  
  for (let i = 0; i < 20; i++) {
    let face = faces[Math.floor(Math.random() * faces.length)];
    while (face === lastFace) {
      face = faces[Math.floor(Math.random() * faces.length)];
    }
    const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
    scrambleMoves.push(face + modifier);
    lastFace = face;
  }
  return scrambleMoves.join(" ");
}

export default function SolveTimer({ variant, hideScramble = false, onActiveScrambleChange }) {
  const [practiceMode, setPracticeMode] = useState("pll"); // "pll" | "full"
  const [timerState, setTimerState] = useState("idle"); // "idle" | "preparing" | "ready" | "running" | "finished"
  const [time, setTime] = useState(0); // in milliseconds
  const [solves, setSolves] = useState([]);
  const [personalBest, setPersonalBest] = useState(null);
  const [fullCubeScramble, setFullCubeScramble] = useState("");

  const timerIntervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const prepareTimerRef = useRef(null);
  const isHoldingSpaceRef = useRef(false);

  // 1. Determine active scramble string based on mode
  const pllScramble = (() => {
    if (!variant) return "";
    const allMoves = variant.chunks.flatMap((c) => c.moves);
    return movesToAlgString(invertAlgorithm(allMoves));
  })();

  const currentScramble = practiceMode === "pll" ? pllScramble : fullCubeScramble;

  // 2. Generate initial full cube scramble on mount or mode swap
  useEffect(() => {
    if (practiceMode === "full") {
      setFullCubeScramble(generateScramble());
    }
  }, [practiceMode]);

  // 3. Notify parent of active scramble changes (to update 3D Cube Viewer starting position)
  useEffect(() => {
    if (onActiveScrambleChange) {
      onActiveScrambleChange(currentScramble, practiceMode);
    }
  }, [currentScramble, practiceMode, onActiveScrambleChange]);

  // 4. Load solves and PBs from localStorage when mode/variant changes
  useEffect(() => {
    const storageKey =
      practiceMode === "pll"
        ? `cubetrainer_solves_${variant?.id ?? "unknown"}`
        : "cubetrainer_solves_full_cube";
        
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        const parsedSolves = JSON.parse(stored);
        setSolves(parsedSolves);
        if (parsedSolves.length > 0) {
          const times = parsedSolves.map((s) => s.time);
          setPersonalBest(Math.min(...times));
        } else {
          setPersonalBest(null);
        }
      } catch (e) {
        console.error("Error loading solves", e);
        setSolves([]);
        setPersonalBest(null);
      }
    } else {
      setSolves([]);
      setPersonalBest(null);
    }
    // Reset timer clock face on configuration swap
    setTimerState("idle");
    setTime(0);
  }, [variant, practiceMode]);

  // Synchronize document.body classes with timerState to deactivate App keyboard navigation
  useEffect(() => {
    if (timerState === "preparing" || timerState === "ready") {
      document.body.classList.add("timer-active");
    } else {
      document.body.classList.remove("timer-active");
    }

    if (timerState === "running") {
      document.body.classList.add("timer-running");
    } else {
      document.body.classList.remove("timer-running");
    }

    return () => {
      document.body.classList.remove("timer-active");
      document.body.classList.remove("timer-running");
    };
  }, [timerState]);

  // Handle keydown/keyup events for Stackmat timer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

      if (e.key === " ") {
        e.preventDefault();

        // 1. If currently running, stop immediately!
        if (timerState === "running") {
          stopTimer();
          return;
        }

        // 2. If finished or idle, prepare the timer on space hold
        if ((timerState === "idle" || timerState === "finished") && !isHoldingSpaceRef.current) {
          isHoldingSpaceRef.current = true;
          setTimerState("preparing");
          setTime(0);

          prepareTimerRef.current = setTimeout(() => {
            setTimerState("ready");
          }, 500); // Hold for 500ms to arm (turns neon green!)
        }
      } else {
        // Any other key stops the timer if it is running
        if (timerState === "running") {
          e.preventDefault();
          stopTimer();
        }
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === " ") {
        e.preventDefault();
        isHoldingSpaceRef.current = false;

        if (prepareTimerRef.current) {
          clearTimeout(prepareTimerRef.current);
        }

        // 3. If armed and ready, release to start!
        if (timerState === "ready") {
          startTimer();
        } else if (timerState === "preparing") {
          // If let go too early, go back to idle
          setTimerState("idle");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [timerState, variant, practiceMode, currentScramble]);

  const startTimer = () => {
    setTimerState("running");
    startTimeRef.current = performance.now();
    timerIntervalRef.current = setInterval(() => {
      const elapsed = performance.now() - startTimeRef.current;
      setTime(elapsed);
    }, 11);
  };

  const stopTimer = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    const finalTime = performance.now() - startTimeRef.current;
    setTime(finalTime);
    setTimerState("finished");

    // Add solve to list
    const newSolve = {
      id: Date.now().toString(),
      time: finalTime,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedSolves = [newSolve, ...solves];
    setSolves(updatedSolves);
    
    const storageKey =
      practiceMode === "pll"
        ? `cubetrainer_solves_${variant?.id ?? "unknown"}`
        : "cubetrainer_solves_full_cube";
    localStorage.setItem(storageKey, JSON.stringify(updatedSolves));

    // Update PB
    if (personalBest === null || finalTime < personalBest) {
      setPersonalBest(finalTime);
    }

    // If full cube solve, automatically generate a new scramble for the next round
    if (practiceMode === "full") {
      setFullCubeScramble(generateScramble());
    }
  };

  // Helper: Format time to 00.000 format
  const formatTime = (ms) => {
    if (ms === null || ms === undefined) return "--.--";
    const totalSeconds = ms / 1000;
    return totalSeconds.toFixed(3);
  };

  // Calculate Average of 5 (Ao5): drop worst and best, average the remaining 3
  const calculateAo5 = () => {
    if (solves.length < 5) return "N/A";
    const last5 = solves.slice(0, 5).map((s) => s.time);
    const sorted = [...last5].sort((a, b) => a - b);
    const middle3 = sorted.slice(1, 4);
    const average = middle3.reduce((sum, val) => sum + val, 0) / 3;
    return formatTime(average);
  };

  const handleDeleteSolve = (id) => {
    const updated = solves.filter((s) => s.id !== id);
    setSolves(updated);
    
    const storageKey =
      practiceMode === "pll"
        ? `cubetrainer_solves_${variant?.id ?? "unknown"}`
        : "cubetrainer_solves_full_cube";
    localStorage.setItem(storageKey, JSON.stringify(updated));

    if (updated.length > 0) {
      const times = updated.map((s) => s.time);
      setPersonalBest(Math.min(...times));
    } else {
      setPersonalBest(null);
    }
  };

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear your solves for this session?")) {
      setSolves([]);
      setPersonalBest(null);
      
      const storageKey =
        practiceMode === "pll"
          ? `cubetrainer_solves_${variant?.id ?? "unknown"}`
          : "cubetrainer_solves_full_cube";
      localStorage.removeItem(storageKey);
    }
  };

  const handleNewScrambleClick = (e) => {
    e.stopPropagation();
    setFullCubeScramble(generateScramble());
  };

  // Mouse/Touch triggers for mobile compatibility or click-based users
  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    if (timerState === "running") {
      stopTimer();
      return;
    }
    if (timerState === "idle" || timerState === "finished") {
      setTimerState("preparing");
      setTime(0);
      prepareTimerRef.current = setTimeout(() => {
        setTimerState("ready");
      }, 500);
    }
  };

  const handleMouseUp = () => {
    if (prepareTimerRef.current) {
      clearTimeout(prepareTimerRef.current);
    }
    if (timerState === "ready") {
      startTimer();
    } else if (timerState === "preparing") {
      setTimerState("idle");
    }
  };

  return (
    <div className="timer-card">
      <div className="timer-card-header">
        <div className="timer-mode-selector">
          <button
            className={`mode-tab-btn ${practiceMode === "pll" ? "mode-tab-btn--active" : ""}`}
            onClick={() => setPracticeMode("pll")}
            disabled={timerState === "running"}
          >
            PLL Case
          </button>
          <button
            className={`mode-tab-btn ${practiceMode === "full" ? "mode-tab-btn--active" : ""}`}
            onClick={() => setPracticeMode("full")}
            disabled={timerState === "running"}
          >
            3x3 Full
          </button>
        </div>
        
        {personalBest !== null && (
          <span className="pb-badge" title="Your Personal Best for this mode!">
            👑 PB: {formatTime(personalBest)}s
          </span>
        )}
      </div>

      {!hideScramble && (
        <div className="scramble-box">
          <div className="scramble-box-header">
            <span className="scramble-label">
              {practiceMode === "pll" ? "PLL Scramble:" : "Random Scramble:"}
            </span>
            {practiceMode === "full" && (
              <button
                className="new-scramble-btn"
                onClick={handleNewScrambleClick}
                disabled={timerState === "running"}
                title="Generate another random scramble"
              >
                🔄 New Scramble
              </button>
            )}
          </div>
          <code className="scramble-text">{currentScramble}</code>
        </div>
      )}

      {/* Main interactive clock face */}
      <div
        className={`timer-display-area timer-display--${timerState}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={(e) => {
          e.preventDefault();
          handleMouseDown({ button: 0 });
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          handleMouseUp();
        }}
        role="button"
        tabIndex={0}
        aria-label="Stopwatch. Hold spacebar or click to arm, release to start."
      >
        <div className="timer-clock">
          {formatTime(time)}
        </div>
        <div className="timer-instruction">
          {timerState === "idle" && "Hold Spacebar / Click to Arm"}
          {timerState === "preparing" && "Hold on..."}
          {timerState === "ready" && "RELEASE!"}
          {timerState === "running" && "Press any key to STOP"}
          {timerState === "finished" && "Hold Spacebar to reset and arm"}
        </div>
      </div>

      {/* Stats and history dashboard */}
      <div className="timer-dashboard">
        <div className="timer-stats">
          <div className="stat-pill">
            <span className="stat-label">Ao5</span>
            <span className="stat-value">{calculateAo5()}s</span>
          </div>
          <div className="stat-pill">
            <span className="stat-label">Solves</span>
            <span className="stat-value">{solves.length}</span>
          </div>
        </div>

        {solves.length > 0 ? (
          <div className="solves-history-wrapper">
            <div className="history-header">
              <span className="history-title">Recent Sessions</span>
              <button className="clear-history-btn" onClick={handleClearHistory}>
                Clear
              </button>
            </div>
            <div className="solves-list" role="list">
              {solves.slice(0, 5).map((solve, idx) => (
                <div key={solve.id} className="solve-item" role="listitem">
                  <span className="solve-index">#{solves.length - idx}</span>
                  <span className="solve-time-val">{formatTime(solve.time)}s</span>
                  <span className="solve-date">{solve.date}</span>
                  <button
                    className="delete-solve-btn"
                    onClick={() => handleDeleteSolve(solve.id)}
                    title="Delete this solve"
                    aria-label="Delete solve"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="timer-empty-state">
            Hold Space to arm, scramble your physical Rubik's cube, and test your speed!
          </div>
        )}
      </div>
    </div>
  );
}
