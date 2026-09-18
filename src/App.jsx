import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import config from "./config";

const memories = [
  {
    image: "/memories/photo1.jpg",
    caption: "a beautiful moment ✨",
  },
  {
    image: "/memories/photo2.jpg",
    caption: "one of my favorite memories ❤️",
  },
  {
    image: "/memories/photo3.jpg",
    caption: "just us being us",
  },
  {
    image: "/memories/photo4.jpg",
    caption: "another memory worth keeping",
  },
  {
    image: "/memories/photo5.jpg",
    caption: "and there are many more...",
  },
];

const balloonData = [
  {
    id: 1,
    color: "pink",
    message: "For all the smiles you bring ❤️",
    x: "15%",
    y: "20%",
  },
  {
    id: 2,
    color: "purple",
    message: "For every beautiful memory ✨",
    x: "72%",
    y: "18%",
  },
  {
    id: 3,
    color: "blue",
    message: "For always being there 💫",
    x: "35%",
    y: "48%",
  },
  {
    id: 4,
    color: "red",
    message: "For all the crazy moments 😂",
    x: "78%",
    y: "52%",
  },
  {
    id: 5,
    color: "yellow",
    message: "And simply because you're you 💕",
    x: "12%",
    y: "65%",
  },
];

function App() {
  const [screen, setScreen] = useState("intro");
  const [popped, setPopped] = useState([]);
  const [memoryIndex, setMemoryIndex] = useState(0);
  const [letterVisible, setLetterVisible] = useState(0);
  const particles = Array.from({ length: 18 }, (_, i) => i);
  
  const audioRef = useRef(null);
  const [musicPlaying, setMusicPlaying] = useState(false);

useEffect(() => {
  const audio = audioRef.current;

  if (!audio) return;

  audio.loop = true;
  audio.volume = 0.35;

  const startMusic = () => {
    audio.play()
      .then(() => {
        setMusicPlaying(true);
      })
      .catch(() => {
        // Browser blocked autoplay
      });

    window.removeEventListener("click", startMusic);
    window.removeEventListener("touchstart", startMusic);
  };

  window.addEventListener("click", startMusic);
  window.addEventListener("touchstart", startMusic);

  return () => {
    window.removeEventListener("click", startMusic);
    window.removeEventListener("touchstart", startMusic);
  };
}, []);

const toggleMusic = () => {
  const audio = audioRef.current;

  if (!audio) return;

  if (musicPlaying) {
    audio.pause();
    setMusicPlaying(false);
  } else {
    audio.play();
    setMusicPlaying(true);
  }
};

  const handleDragEnd = (_, info) => {
    if (info.offset.y > 120) {
      setScreen("cake");
    }
  };

  const popBalloon = (balloon) => {
    if (popped.includes(balloon.id)) return;

    setPopped((previous) => [...previous, balloon.id]);
  };

  const resetBalloons = () => {
    setPopped([]);
  };

  return (
    <main className="birthday-app">

      <AnimatePresence mode="wait">

        <audio
  ref={audioRef}
  src="/music/birthday.mp3"
  loop
/>

        <button
  className="music-button"
  onClick={toggleMusic}
>
  {musicPlaying ? "🔊" : "🔇"}
</button>

<div className="ambient-particles">
  {particles.map((particle) => (
    <motion.span
      key={particle}
      className="ambient-particle"
      initial={{
        opacity: 0,
        y: "100vh",
        x: `${(particle * 37) % 100}vw`,
      }}
      animate={{
        opacity: [0, 0.7, 0],
        y: "-10vh",
      }}
      transition={{
        duration: 8 + (particle % 5),
        delay: particle * 0.35,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {particle % 3 === 0 ? "♥" : "✦"}
    </motion.span>
  ))}
</div>

        {/* ==================================================
            SCREEN 1 — INTRO
        ================================================== */}

        {screen === "intro" && (
          <motion.section
            key="intro"
            className="intro-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
          >

            <div className="particles">
              {Array.from({ length: 25 }).map((_, index) => (
                <span
                  key={index}
                  className="particle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 4}s`,
                    animationDuration: `${4 + Math.random() * 5}s`,
                  }}
                />
              ))}
            </div>

            <motion.div
              className="intro-content"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >

              <motion.p
                className="small-text"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                a little something,
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                for you
              </motion.h1>

              <motion.p
                className="instruction"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                pull the heart down
              </motion.p>

              <motion.div
                className="heart-area"
                drag="y"
                dragConstraints={{
                  top: 0,
                  bottom: 190,
                }}
                dragElastic={0.15}
                onDragEnd={handleDragEnd}
                whileDrag={{
                  scale: 1.12,
                  cursor: "grabbing",
                }}
              >

                <div className="heart-glow" />

                <motion.div
                  className="heart"
                  animate={{
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  ❤️
                </motion.div>

                <div className="heart-line" />

              </motion.div>

              <motion.div
                className="drag-text"
                animate={{
                  y: [0, 8, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              >
                ↓
              </motion.div>

            </motion.div>

          </motion.section>
        )}


        {/* ==================================================
            SCREEN 2 — CAKE
        ================================================== */}

        {screen === "cake" && (
          <motion.section
            key="cake"
            className="cake-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1 }}
          >

            <div className="cake-stars">

              <span>✦</span>
              <span>✧</span>
              <span>✦</span>
              <span>·</span>
              <span>✧</span>

            </div>

            <motion.div
              className="cake-content"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.3,
              }}
            >

              <p className="cake-small-text">
                first things first...
              </p>

              <h2 className="cake-title">
                make a wish
              </h2>

              <motion.div
                className="cake-container"
                initial={{
                  scale: 0.7,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.7,
                  type: "spring",
                }}
              >

                <div className="candles">

                  <div className="candle">

                    <motion.div
                      className="flame"
                      animate={{
                        scale: [1, 1.15, 0.9, 1],
                        rotate: [-3, 3, -2, 0],
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                      }}
                    >
                      🔥
                    </motion.div>

                    <div className="candle-stick" />

                  </div>

                  <div className="candle candle-center">

                    <motion.div
                      className="flame"
                      animate={{
                        scale: [1, 1.2, 0.9, 1],
                        rotate: [3, -3, 2, 0],
                      }}
                      transition={{
                        duration: 0.7,
                        repeat: Infinity,
                      }}
                    >
                      🔥
                    </motion.div>

                    <div className="candle-stick" />

                  </div>

                  <div className="candle">

                    <motion.div
                      className="flame"
                      animate={{
                        scale: [1, 1.15, 0.9, 1],
                      }}
                      transition={{
                        duration: 0.9,
                        repeat: Infinity,
                      }}
                    >
                      🔥
                    </motion.div>

                    <div className="candle-stick" />

                  </div>

                </div>

                <div className="cake-top">

                  <div className="cake-cream" />

                  <div className="cake-sprinkles">
                    ✦　•　✦　•　✦
                  </div>

                </div>

                <div className="cake-body">

                  <div className="cake-layer layer-one" />

                  <div className="cake-layer layer-two" />

                  <div className="cake-drip drip-one" />
                  <div className="cake-drip drip-two" />
                  <div className="cake-drip drip-three" />

                </div>

                <div className="cake-plate" />

              </motion.div>

              <motion.p
                className="wish-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 1.7,
                }}
              >
                close your eyes and make a wish ✨
              </motion.p>

              <motion.button
                className="continue-button"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 2.2,
                }}
                onClick={() => setScreen("balloons")}
              >
                continue
                <span>→</span>
              </motion.button>

            </motion.div>

          </motion.section>
        )}


        {/* ==================================================
            SCREEN 3 — BALLOONS
        ================================================== */}

        {screen === "balloons" && (
          <motion.section
            key="balloons"
            className="balloon-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >

            {/* Background stars */}

            <div className="balloon-background-stars">

              <span>✦</span>
              <span>✧</span>
              <span>·</span>
              <span>✦</span>
              <span>✧</span>
              <span>·</span>

            </div>


            {/* Heading */}

            <motion.div
              className="balloon-heading"
              initial={{
                opacity: 0,
                y: -30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
              }}
            >

              <p className="small-text">
                one more thing...
              </p>

              <h2>
                pop the balloons
              </h2>

              <p className="balloon-instruction">
                click each balloon 🎈
              </p>

            </motion.div>


            {/* Balloon area */}

            <div className="balloon-area">

              {balloonData.map((balloon) => {

                const isPopped = popped.includes(balloon.id);

                return (
                  <AnimatePresence key={balloon.id}>

                    {!isPopped && (

                      <motion.button
                        className={`balloon balloon-${balloon.color}`}
                        style={{
                          left: balloon.x,
                          top: balloon.y,
                        }}
                        initial={{
                          opacity: 0,
                          scale: 0,
                        }}
                        animate={{
                          opacity: 1,
                          scale: [1, 1.04, 1],
                          y: [0, -8, 0],
                        }}
                        exit={{
                          opacity: 0,
                          scale: 1.6,
                          rotate: 20,
                        }}
                        transition={{
                          opacity: {
                            duration: 0.4,
                          },
                          scale: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                          y: {
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                          exit: {
                            duration: 0.25,
                          },
                        }}
                        onClick={() => popBalloon(balloon)}
                        aria-label={`Pop balloon ${balloon.id}`}
                      >

                        <span className="balloon-shine" />

                        <span className="balloon-knot" />

                        <span className="balloon-string" />

                      </motion.button>

                    )}

                  </AnimatePresence>
                );

              })}


              {/* Messages */}

              <AnimatePresence>

                {popped.map((id, index) => {
  const balloon = balloonData.find(
    (item) => item.id === id
  );

  return (
    <motion.div
      key={`message-${id}`}
      className="balloon-message"
      style={{
        "--message-index": index,
        left: balloon.x,
        top: `calc(${balloon.y} + 20px)`,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <span>✦</span>
      {balloon.message}
    </motion.div>
  );
})}

              </AnimatePresence>

            </div>


            {/* Completion */}

            {popped.length === balloonData.length && (

              <motion.div
                className="balloon-complete"
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                }}
              >

                <div className="balloon-success">
  <div className="complete-heart">
    ❤️
  </div>

  <h3>
    you did it!
  </h3>

  <p>
    every little piece of this surprise
    is just for you.
  </p>

  <button
    className="continue-button"
    onClick={() => setScreen("memories")}
  >
    continue
    <span>→</span>
  </button>
</div>

              </motion.div>

            )}

          </motion.section>
        )}


        {/* ==================================================
            SCREEN 4 — TEMPORARY MEMORY SCREEN
        ================================================== */}

        {screen === "memories" && (

  <motion.section
    key="memories"
    className="memory-screen"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8 }}
  >

    <motion.div
      className="memory-heading"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >

      <p className="small-text">
        some moments...
      </p>

      <h2>
        memory lane
      </h2>

      <p className="memory-subtitle">
        because some memories deserve to be kept forever ✨
      </p>

    </motion.div>


    {/* PHOTO CARD */}

    <div className="memory-card-area">

      <AnimatePresence mode="wait">

        <motion.div
          key={memoryIndex}
          className="memory-card"
          initial={{
            opacity: 0,
            scale: 0.85,
            rotate: memoryIndex % 2 === 0 ? -5 : 5,
            x: 80,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: memoryIndex % 2 === 0 ? -2 : 2,
            x: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.85,
            x: -80,
            rotate: -8,
          }}
          transition={{
            duration: 0.6,
          }}
        >

          <div className="photo-frame">

            <img
              src={memories[memoryIndex].image}
              alt={`Memory ${memoryIndex + 1}`}
            />

          </div>

          <p className="photo-caption">
            {memories[memoryIndex].caption}
          </p>

        </motion.div>

      </AnimatePresence>

    </div>


    {/* CONTROLS */}

    <div className="memory-controls">

      <button
        className="memory-arrow"
        disabled={memoryIndex === 0}
        onClick={() =>
          setMemoryIndex((current) =>
            Math.max(0, current - 1)
          )
        }
      >
        ←
      </button>


      <div className="memory-dots">

        {memories.map((_, index) => (

          <button
            key={index}
            className={
              index === memoryIndex
                ? "memory-dot active"
                : "memory-dot"
            }
            onClick={() => setMemoryIndex(index)}
          />

        ))}

      </div>


      <button
        className="memory-arrow"
        disabled={memoryIndex === memories.length - 1}
        onClick={() =>
          setMemoryIndex((current) =>
            Math.min(
              memories.length - 1,
              current + 1
            )
          )
        }
      >
        →
      </button>

    </div>


    {/* CONTINUE */}

    {memoryIndex === memories.length - 1 && (

      <motion.button
        className="continue-button memory-continue"
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        onClick={() => {
          setScreen("letter");
          setLetterVisible(0);

          setTimeout(() => {
            setLetterVisible(1);
          }, 500);
        }}
      >
        there's more
        <span>→</span>
      </motion.button>

    )}

  </motion.section>

)}

{/* ==================================================
    SCREEN 5 — PERSONAL LETTER
================================================== */}

{screen === "letter" && (

  <motion.section
    key="letter"
    className="letter-screen"
    initial={{
      opacity: 0,
    }}
    animate={{
      opacity: 1,
    }}
    exit={{
      opacity: 0,
    }}
    transition={{
      duration: 0.8,
    }}
  >

    <motion.div
      className="letter-heading"
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
      }}
    >

      <p className="small-text">
        one last thing...
      </p>

      <h2>
        a little note
      </h2>

    </motion.div>


    {/* LETTER */}

    <motion.div
      className="letter-paper"
      initial={{
        opacity: 0,
        y: 50,
        rotate: -2,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: 0,
      }}
      transition={{
        duration: 0.9,
        delay: 0.3,
      }}
    >

      <div className="paper-decoration">
        ✦
      </div>


      <div className="letter-content">

        {config.letter.map((paragraph, index) => (

          <motion.p
            key={index}
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={
              index < letterVisible
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {
                    opacity: 0,
                    y: 10,
                  }
            }
            transition={{
              duration: 0.6,
            }}
          >
            {paragraph}
          </motion.p>

        ))}

      </div>


      {/* Continue reading */}

      {letterVisible < config.letter.length && (

        <motion.button
          className="letter-next"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          onClick={() =>
            setLetterVisible(
              (current) =>
                Math.min(
                  current + 1,
                  config.letter.length
                )
            )
          }
        >
          keep reading
          <span>↓</span>
        </motion.button>

      )}

    </motion.div>


    {/* FINAL BUTTON */}

    {letterVisible >= config.letter.length && (

      <motion.button
        className="continue-button letter-continue"
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        onClick={() => setScreen("final")}
      >
        one last surprise
        <span>→</span>
      </motion.button>

    )}

  </motion.section>

)}

{/* ==================================================
    SCREEN 6 — PROPOSAL
================================================== */}

{screen === "final" && (

  <motion.section
    key="final"
    className="proposal-screen"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1.2 }}
  >

    {/* Background hearts */}

    <div className="proposal-hearts">

      <span>♡</span>
      <span>♡</span>
      <span>♥</span>
      <span>♡</span>
      <span>♡</span>
      <span>♥</span>

    </div>


    {/* Main content */}

    <motion.div
      className="proposal-content"
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 1,
        delay: 0.5,
      }}
    >

      <motion.p
        className="proposal-intro"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        there's one more thing...
      </motion.p>


      <motion.h2
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 1.5,
          duration: 0.8,
        }}
      >
        I have a question
      </motion.h2>


      <motion.div
        className="proposal-divider"
        initial={{
          width: 0,
          opacity: 0,
        }}
        animate={{
          width: 80,
          opacity: 1,
        }}
        transition={{
          delay: 2.2,
          duration: 0.6,
        }}
      />


      <motion.p
        className="proposal-message"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 2.6,
          duration: 1,
        }}
      >
        Birthday wishes are easy...
        <br />
        but there's something else
        <br />
        I've been wishing for.
      </motion.p>


      {/* Heart */}

      <motion.div
        className="proposal-heart"
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          delay: 3.5,
          duration: 0.8,
          type: "spring",
        }}
      >

        <motion.span
          animate={{
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ❤️
        </motion.span>

      </motion.div>


      {/* Proposal */}

      <motion.div
        className="proposal-question"
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 4.2,
          duration: 1,
        }}
      >

        <p>
          {config.nickname}...
        </p>

        <h3>
          {config.proposalQuestion}
        </h3>

      </motion.div>


      {/* Buttons */}

      <motion.div
        className="proposal-buttons"
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 5,
          duration: 0.8,
        }}
      >

        <button
          className="yes-button"
          onClick={() => setScreen("yes")}
        >
          Yes ❤️
        </button>


        <button
          className="think-button"
          onClick={() => setScreen("think")}
        >
          Let me think 💕
        </button>

      </motion.div>

    </motion.div>

  </motion.section>

)}

{/* ==================================================
    SCREEN 7 — YES
================================================== */}

{screen === "yes" && (

  <motion.section
    key="yes"
    className="yes-screen"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >

    <div className="confetti">

      {Array.from({ length: 35 }).map((_, index) => (

        <span
          key={index}
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        >
          {index % 2 === 0 ? "♥" : "✦"}
        </span>

      ))}

    </div>


    <motion.div
      className="yes-content"
      initial={{
        opacity: 0,
        scale: 0.7,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 1,
        type: "spring",
      }}
    >

      <motion.div
        className="big-heart"
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 1.3,
          repeat: Infinity,
        }}
      >
        ❤️
      </motion.div>


      <p className="yes-small">
        you just made my heart
      </p>


      <h2>
        the happiest
      </h2>


      <p className="yes-message">
        {config.finalMessage[0]}
        {config.finalMessage[1]}
      </p>


      <p className="signature">
        — {config.sender}
      </p>

    </motion.div>

  </motion.section>

)}

{/* ==================================================
    SCREEN 8 — THINK
================================================== */}

{screen === "think" && (

  <motion.section
    key="think"
    className="think-screen"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
  >

    <motion.div
      className="think-content"
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
      }}
    >

      <div className="think-heart">
        💕
      </div>


      <h2>
        take your time
      </h2>


      <p>
        No pressure.
        <br />
        Some questions deserve a little thought.
      </p>


      <button
        className="continue-button"
        onClick={() => setScreen("final")}
      >
        read the question again
      </button>

    </motion.div>

  </motion.section>

)}

      </AnimatePresence>

    </main>
  );
}

export default App;