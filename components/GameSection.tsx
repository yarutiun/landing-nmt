'use client'

import React, { useState, useRef, useCallback } from 'react'
import { track } from '@/lib/amplitude'
import MascotCat from './MascotCat'
import MascotDog from './MascotDog'
import PixelHeart from './PixelHeart'

const QUESTIONS = [
  { subj: 'math', q: 'Обчисли: 2³ + 3²', opts: ['13', '15', '17', '19'], correct: 2, good: '2³ = 8, 3² = 9, разом 17. Чисто!', bad: '2³ = 8, а 3² = 9. Разом виходить 17.' },
  { subj: 'ukr', q: 'Яка частина мови — слово «швидко»?', opts: ['Іменник', 'Дієслово', 'Прислівник', 'Прикметник'], correct: 2, good: '«Швидко» відповідає на питання «як?» — це прислівник.', bad: '«Швидко» відповідає на питання «як?», отже це прислівник.' },
  { subj: 'math', q: "Розв'яжи рівняння: 2x + 6 = 14. Чому дорівнює x?", opts: ['2', '4', '5', '8'], correct: 1, good: '2x = 14 − 6 = 8, тож x = 4.', bad: '2x = 14 − 6 = 8, звідси x = 4.' },
  { subj: 'ukr', q: 'Скільки звуків у слові «їжак»?', opts: ['3', '4', '5', '6'], correct: 2, good: '«Ї» = два звуки [й][і], далі ж, а, к — разом 5 звуків.', bad: '«Ї» на початку дає два звуки [й][і]: й-і-ж-а-к = 5 звуків.' },
  { subj: 'math', q: 'Скільки відсотків становить число 30 від 200?', opts: ['10%', '15%', '20%', '25%'], correct: 1, good: '30 / 200 = 0,15 = 15%. Точно в ціль!', bad: '30 поділити на 200 = 0,15, тобто 15%.' },
]

const catLines = ['Мяу! Тримай!', 'Лови, Босе!', 'Це за НМТ!', 'Хто тут хазяїн?']
const dogLines = ['Гав! Кусаю!', 'Слабенько…', 'Мінус бал!', 'Гр-р-р!']
const keys = ['А', 'Б', 'В', 'Г']
const confettiColors = ['#ffd27a', '#54e0a0', '#33d6c2', '#9b8cff', '#ff9ab0', '#ff8a52']

type Phase = 'playing' | 'won' | 'lost'

export default function GameSection() {
  const [qi, setQi] = useState(0)
  const [youHP, setYouHP] = useState(3)
  const [bossHP, setBossHP] = useState(3)
  const [answered, setAnswered] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const [feedback, setFeedback] = useState<{ text: string; good: boolean } | null>(null)
  const [showNext, setShowNext] = useState(false)
  const [phase, setPhase] = useState<Phase>('playing')
  const [youAttack, setYouAttack] = useState(false)
  const [bossAttack, setBossAttack] = useState(false)
  const [youHit, setYouHit] = useState(false)
  const [bossHit, setBossHit] = useState(false)
  const [arenaShake, setArenaShake] = useState(false)
  const [youSpeech, setYouSpeech] = useState('')
  const [bossSpeech, setBossSpeech] = useState('')
  const [showYouSpeech, setShowYouSpeech] = useState(false)
  const [showBossSpeech, setShowBossSpeech] = useState(false)
  const [confetti, setConfetti] = useState<{ id: number; left: number; color: string; delay: number; dur: number }[]>([])
  const arenaRef = useRef<HTMLDivElement>(null)
  const confettiId = useRef(0)

  const say = useCallback((who: 'you' | 'boss', text: string) => {
    if (who === 'you') {
      setYouSpeech(text)
      setShowYouSpeech(true)
      setTimeout(() => setShowYouSpeech(false), 1600)
    } else {
      setBossSpeech(text)
      setShowBossSpeech(true)
      setTimeout(() => setShowBossSpeech(false), 1600)
    }
  }, [])

  const doAttack = useCallback((attacker: 'you' | 'boss') => {
    if (attacker === 'you') {
      setYouAttack(true)
      setTimeout(() => {
        setBossHit(true)
        setArenaShake(true)
        setTimeout(() => { setBossHit(false); setArenaShake(false) }, 420)
      }, 180)
      setTimeout(() => setYouAttack(false), 520)
    } else {
      setBossAttack(true)
      setTimeout(() => {
        setYouHit(true)
        setArenaShake(true)
        setTimeout(() => { setYouHit(false); setArenaShake(false) }, 420)
      }, 180)
      setTimeout(() => setBossAttack(false), 520)
    }
  }, [])

  const confettiBurst = useCallback(() => {
    const items = Array.from({ length: 70 }, (_, i) => ({
      id: confettiId.current++,
      left: Math.random() * 100,
      color: confettiColors[i % confettiColors.length],
      delay: Math.random() * 300,
      dur: 1600 + Math.random() * 900,
    }))
    setConfetti(items)
    setTimeout(() => setConfetti([]), 2800)
  }, [])

  const handleAnswer = useCallback((i: number) => {
    if (answered) return
    setAnswered(true)
    setSelectedIdx(i)
    const Q = QUESTIONS[qi]
    const correct = i === Q.correct
    track('game_answer', { correct, subject: Q.subj, question_index: qi })

    if (correct) {
      setFeedback({ text: '✓ Правильно! ' + Q.good, good: true })
      doAttack('you')
      say('you', catLines[Math.floor(Math.random() * catLines.length)])
      const newBossHP = bossHP - 1
      setBossHP(newBossHP)
      setCorrectCount(c => c + 1)
      setTimeout(() => {
        if (newBossHP <= 0) { endGame(true, qi, correctCount + 1); return }
        if (qi >= QUESTIONS.length - 1) { endGame(newBossHP < youHP || (newBossHP <= youHP && correctCount + 1 >= 2), qi, correctCount + 1); return }
        setShowNext(true)
      }, 900)
    } else {
      setFeedback({ text: '✗ Не зовсім. ' + Q.bad, good: false })
      doAttack('boss')
      say('boss', dogLines[Math.floor(Math.random() * dogLines.length)])
      const newYouHP = youHP - 1
      setYouHP(newYouHP)
      setTimeout(() => {
        if (newYouHP <= 0) { endGame(false, qi, correctCount); return }
        if (qi >= QUESTIONS.length - 1) { endGame(bossHP < newYouHP || (bossHP <= newYouHP && correctCount >= 2), qi, correctCount); return }
        setShowNext(true)
      }, 900)
    }
  }, [answered, qi, bossHP, youHP, correctCount, doAttack, say])

  function endGame(win: boolean, qIndex: number, score: number) {
    track('game_completed', { won: win, score })
    setPhase(win ? 'won' : 'lost')
    if (win) confettiBurst()
  }

  const handleNext = () => {
    setQi(q => q + 1)
    setAnswered(false)
    setSelectedIdx(null)
    setFeedback(null)
    setShowNext(false)
  }

  const handleReplay = () => {
    setQi(0)
    setYouHP(3)
    setBossHP(3)
    setAnswered(false)
    setCorrectCount(0)
    setSelectedIdx(null)
    setFeedback(null)
    setShowNext(false)
    setPhase('playing')
  }

  const Q = QUESTIONS[qi]
  const qProgress = ((qi) / QUESTIONS.length) * 100

  const catCharStyle: React.CSSProperties = {
    width: 'clamp(108px,17vw,168px)',
    transformOrigin: 'bottom center',
    animation: youAttack ? 'lungeR .5s cubic-bezier(.5,-.4,.5,1.4)' : youHit ? 'hitShake .4s' : 'idleY 2.8s ease-in-out infinite',
  }

  const dogCharStyle: React.CSSProperties = {
    width: 'clamp(108px,17vw,168px)',
    transformOrigin: 'bottom center',
    animation: bossAttack ? 'lungeL .5s cubic-bezier(.5,-.4,.5,1.4)' : bossHit ? 'hitShake .4s' : 'idleB 3.1s ease-in-out infinite',
  }

  return (
    <section id="game" style={{ padding: '50px 0 60px' }}>
<div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 clamp(16px,4vw,28px)', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 30 }} className="reveal">
          <h2 style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: 'clamp(30px,5vw,52px)', lineHeight: 1.05, margin: '18px 0 12px' }}>
            Дуель: <span style={{ color: 'var(--teal-deep)' }}>Ти</span> проти <span style={{ color: 'var(--ember)' }}>Боса</span>
          </h2>
          <p style={{ color: 'var(--ink-soft)', fontSize: 'clamp(15px,1.8vw,18px)', maxWidth: 620, lineHeight: 1.6, margin: '0 auto' }}>
            У кожного по 3 серця. Відповідай правильно — і Бос втрачає серце. Помилишся — серце втрачаєш ти. Збий усі 3 серця Боса, поки він не з&#39;їв твої. Поїхали!
          </p>
        </div>

        <div
          ref={arenaRef}
          className="reveal"
          style={{
            position: 'relative',
            borderRadius: 34,
            overflow: 'hidden',
            border: '2px solid var(--glass-line)',
            boxShadow: 'var(--shadow),0 0 0 1px rgba(255,255,255,.6) inset',
            background: 'radial-gradient(700px 320px at 50% -10%,rgba(255,236,180,.7),transparent 60%),radial-gradient(620px 380px at 50% 122%,rgba(79,191,131,.28),transparent 60%),linear-gradient(180deg,#d7f1f6 0%,#e2f6ee 55%,#eafbf2 100%)',
            animation: arenaShake ? 'shake .42s cubic-bezier(.36,.07,.19,.97)' : undefined,
          }}
        >
          {/* Arena top bar */}
          <div style={{
            padding: '8px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'rgba(255,255,255,.5)', borderBottom: '1.5px solid var(--glass-line)',
            fontSize: 13, fontWeight: 700, color: 'var(--ink-soft)',
          }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1.05em', height: '1.05em' }}>
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/>
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
              </svg>
              Дуель
            </span>
            <div style={{ flex: 1, maxWidth: 240, height: 9, borderRadius: 9, background: 'rgba(15,92,84,.12)', overflow: 'hidden', margin: '0 14px' }}>
              <div style={{ height: '100%', width: `${qProgress}%`, borderRadius: 9, background: 'linear-gradient(90deg,var(--green),var(--gold))', transition: 'width .5s' }} />
            </div>
            <span style={{ color: '#a9772e' }}>Питання {Math.min(qi + 1, QUESTIONS.length)}/{QUESTIONS.length}</span>
          </div>

          {/* Fighters */}
          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '26px 22px 8px', alignItems: 'end' }}>
            {/* VS */}
            <div style={{
              content: 'VS', position: 'absolute', top: '42%', left: '50%',
              transform: 'translate(-50%,-50%) rotate(-8deg)',
              fontFamily: 'var(--fd)', fontWeight: 900, fontSize: 'clamp(34px,7vw,64px)',
              background: 'linear-gradient(135deg,var(--gold),var(--ember))',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
              textShadow: '0 0 30px rgba(255,138,82,.4)', zIndex: 3, pointerEvents: 'none',
              animation: 'vspulse 2.4s ease-in-out infinite',
            }}>VS</div>

            {/* You */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, position: 'relative' }}>
              {/* Speech */}
              <div style={{
                position: 'absolute', top: 60, left: '50%', width: 'max-content', maxWidth: 150,
                textAlign: 'center', padding: '8px 13px', borderRadius: 16, fontSize: 12.5, fontWeight: 700, lineHeight: 1.3,
                background: '#fff', color: '#163a36', boxShadow: '0 12px 26px -12px rgba(10,59,56,.5)',
                opacity: showYouSpeech ? 1 : 0, transform: showYouSpeech ? 'translateX(-50%) scale(1)' : 'translateX(-50%) scale(.5)',
                transformOrigin: 'bottom center', transition: '.25s', zIndex: 6, pointerEvents: 'none',
              }}>
                {youSpeech}
                <span style={{ position: 'absolute', bottom: -7, left: '50%', marginLeft: -7, width: 14, height: 14, background: '#fff', transform: 'rotate(45deg)', display: 'block' }} />
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 7, padding: '5px 14px', borderRadius: 30,
                fontFamily: 'var(--fd)', fontWeight: 800, fontSize: 17, background: 'var(--glass)',
                border: '1.5px solid rgba(31,158,146,.5)', boxShadow: '0 6px 16px -10px rgba(10,59,56,.5)',
                color: 'var(--teal-deep)',
              }}>Ти</div>
              <div style={{ display: 'flex', gap: 5 }}>
                {[0, 1, 2].map(i => <div key={i} style={{ width: 26, height: 26 }}><PixelHeart full={i < youHP} /></div>)}
              </div>
              <div style={catCharStyle}><MascotCat /></div>
            </div>

            {/* Boss */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, position: 'relative' }}>
              <div style={{
                position: 'absolute', top: 60, left: '50%', width: 'max-content', maxWidth: 150,
                textAlign: 'center', padding: '8px 13px', borderRadius: 16, fontSize: 12.5, fontWeight: 700, lineHeight: 1.3,
                background: '#fff', color: '#163a36', boxShadow: '0 12px 26px -12px rgba(10,59,56,.5)',
                opacity: showBossSpeech ? 1 : 0, transform: showBossSpeech ? 'translateX(-50%) scale(1)' : 'translateX(-50%) scale(.5)',
                transformOrigin: 'bottom center', transition: '.25s', zIndex: 6, pointerEvents: 'none',
              }}>
                {bossSpeech}
                <span style={{ position: 'absolute', bottom: -7, left: '50%', marginLeft: -7, width: 14, height: 14, background: '#fff', transform: 'rotate(45deg)', display: 'block' }} />
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 7, padding: '5px 14px', borderRadius: 30,
                fontFamily: 'var(--fd)', fontWeight: 800, fontSize: 17, background: 'var(--glass)',
                border: '1.5px solid rgba(232,121,74,.5)', boxShadow: '0 6px 16px -10px rgba(10,59,56,.5)',
                color: 'var(--ember)',
              }}>Бос</div>
              <div style={{ display: 'flex', gap: 5 }}>
                {[0, 1, 2].map(i => <div key={i} style={{ width: 26, height: 26 }}><PixelHeart full={i < bossHP} /></div>)}
              </div>
              <div style={dogCharStyle}><MascotDog /></div>
            </div>
          </div>

          {/* Ground */}
          <div style={{
            height: 34,
            background: 'repeating-linear-gradient(90deg,rgba(79,191,131,.35) 0 22px,rgba(79,191,131,.18) 22px 44px),linear-gradient(180deg,transparent,rgba(31,122,85,.3))',
            borderTop: '3px solid rgba(79,191,131,.6)',
          }} />

          {/* Question zone */}
          {phase === 'playing' && (
            <div style={{ padding: '22px clamp(16px,3vw,30px) 28px', background: 'rgba(255,255,255,.42)', borderTop: '1.5px solid var(--glass-line)' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 13px', borderRadius: 24,
                fontSize: 11.5, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 12,
                color: Q.subj === 'math' ? 'var(--water-deep)' : '#c2557a',
                background: Q.subj === 'math' ? 'rgba(76,196,214,.16)' : 'rgba(239,154,168,.18)',
                border: Q.subj === 'math' ? '1.5px solid rgba(76,196,214,.4)' : '1.5px solid rgba(239,154,168,.45)',
              }}>
                {Q.subj === 'math' ? 'МАТЕМАТИКА' : 'УКР МОВА'}
              </span>
              <div style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: 'clamp(20px,3vw,28px)', lineHeight: 1.35, marginBottom: 20, color: 'var(--teal-deep)' }}>
                {Q.q}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {Q.opts.map((opt, i) => {
                  let borderColor = 'var(--glass-line)'
                  let bg = 'var(--glass)'
                  let keyBg = 'rgba(31,158,146,.16)'
                  let keyColor = 'var(--teal-deep)'
                  if (answered && i === Q.correct) { borderColor = 'var(--green)'; bg = 'rgba(79,191,131,.18)'; keyBg = 'var(--green)'; keyColor = '#fff' }
                  else if (answered && i === selectedIdx && i !== Q.correct) { borderColor = 'var(--red)'; bg = 'rgba(232,96,122,.16)'; keyBg = 'var(--red)'; keyColor = '#fff' }
                  return (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      disabled={answered}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 14, padding: '15px 18px', borderRadius: 16,
                        textAlign: 'left', fontSize: 16, fontWeight: 600, color: 'var(--ink)',
                        background: bg, border: `2px solid ${borderColor}`,
                        boxShadow: '0 12px 26px -18px rgba(10,59,56,.5)',
                        transition: 'transform .15s,border-color .2s,background .2s',
                        cursor: answered ? 'default' : 'pointer',
                        opacity: answered && i !== Q.correct && i !== selectedIdx ? 0.7 : 1,
                        fontFamily: 'var(--fu)',
                      }}
                    >
                      <span style={{
                        width: 34, height: 34, borderRadius: 10, display: 'grid', placeItems: 'center',
                        fontFamily: 'var(--fd)', fontWeight: 800, fontSize: 15, flexShrink: 0,
                        background: keyBg, color: keyColor, transition: '.2s',
                      }}>{keys[i]}</span>
                      <span>{opt}</span>
                    </button>
                  )
                })}
              </div>
              {feedback && (
                <div style={{
                  marginTop: 16, padding: '14px 18px', borderRadius: 14, fontWeight: 600, fontSize: 14.5, lineHeight: 1.5,
                  animation: 'fade .4s',
                  background: feedback.good ? 'rgba(79,191,131,.16)' : 'rgba(232,121,74,.14)',
                  color: feedback.good ? 'var(--leaf-deep)' : '#b14a26',
                  border: feedback.good ? '1.5px solid rgba(79,191,131,.4)' : '1.5px solid rgba(232,121,74,.4)',
                }}>
                  {feedback.text}
                </div>
              )}
              {showNext && (
                <div style={{ marginTop: 18, display: 'flex', justifyContent: 'center' }}>
                  <button
                    onClick={handleNext}
                    style={{
                      padding: '14px 32px', borderRadius: 40, fontWeight: 700, fontSize: 16, color: '#06241f',
                      background: 'linear-gradient(135deg,var(--green),var(--leaf-deep))',
                      boxShadow: '0 14px 28px -10px rgba(31,122,85,.55)',
                      transition: 'transform .2s', border: 'none', cursor: 'pointer', fontFamily: 'var(--fu)',
                      animation: 'fade .4s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = ''}
                  >
                    Далі →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* End screen */}
          {phase !== 'playing' && (
            <div style={{ padding: '46px 24px', textAlign: 'center', animation: 'fade .5s', position: 'relative' }}>
              {/* Confetti */}
              {confetti.map(c => (
                <div key={c.id} style={{
                  position: 'absolute', top: -10, width: 11, height: 11, zIndex: 20, pointerEvents: 'none',
                  borderRadius: 2, background: c.color, left: `${c.left}%`,
                  animation: `confettiFall ${c.dur}ms cubic-bezier(.2,.6,.3,1) ${c.delay}ms both`,
                }} />
              ))}
              <div style={{
                fontSize: 64, marginBottom: 14, animation: 'bob 1.6s ease-in-out infinite',
                color: phase === 'won' ? 'var(--gold)' : undefined,
                filter: phase === 'won' ? 'drop-shadow(0 8px 16px rgba(243,194,90,.5))' : undefined,
              }}>
                {phase === 'won' ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 74, height: 74, margin: '0 auto' }}>
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/>
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                  </svg>
                ) : (
                  <div style={{ width: 74, height: 74, margin: '0 auto' }}><MascotDog /></div>
                )}
              </div>
              <div style={{
                fontFamily: 'var(--fd)', fontWeight: 900, fontSize: 'clamp(34px,7vw,64px)', lineHeight: 1, marginBottom: 10,
                background: phase === 'won'
                  ? 'linear-gradient(120deg,var(--gold),var(--green),var(--teal-bright))'
                  : 'linear-gradient(120deg,var(--ember),var(--red))',
                WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
              }}>
                {phase === 'won' ? 'ПЕРЕМОГА!' : 'БОС ПЕРЕМІГ…'}
              </div>
              <p style={{ color: 'var(--ink-soft)', fontSize: 16, marginBottom: 8 }}>
                {phase === 'won' ? 'Ти переміг Боса! Справжній молодець!' : 'Цього разу Бос виявився хитрішим. Але це лише тренування — реванш чекає.'}
              </p>
              <button
                onClick={handleReplay}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px',
                  borderRadius: 40, fontWeight: 700, fontSize: 15, color: '#06241f',
                  background: 'linear-gradient(135deg,var(--teal-bright),var(--green))',
                  boxShadow: '0 14px 30px -10px rgba(84,224,160,.7),inset 0 2px 0 rgba(255,255,255,.4)',
                  border: 'none', cursor: 'pointer', fontFamily: 'var(--fu)',
                  transition: 'transform .2s,box-shadow .2s', marginTop: 8,
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 20px 38px -10px rgba(84,224,160,.85)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 14px 30px -10px rgba(84,224,160,.7),inset 0 2px 0 rgba(255,255,255,.4)' }}
              >
                ↻ Реванш
              </button>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes confettiFall {
          from { transform: translateY(0) rotate(0); opacity: 1; }
          to { transform: translateY(400px) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </section>
  )
}
