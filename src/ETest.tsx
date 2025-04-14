import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

function ETest() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('emotion-log');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const saveLog = (entry: string) => {
    const newHistory = [...history, entry];
    setHistory(newHistory);
    localStorage.setItem('emotion-log', JSON.stringify(newHistory));
  };

  const handleSubmit = async () => {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_OPEN_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `당신은 감정 루프 분석가이자 감정 시뮬레이션 설계자입니다.
          다음 사용자의 감정 표현을 분석해 아래 JSON 형식으로 응답하세요:
          
          {
            "loop": "감정 루프 명 (예: 회피 루프 - 표현 억제형)",
            "gps": ["감정 흐름 단계 배열 (예: 욕구 인식 → 불안 → 침묵)"],
            "reason": "해당 감정 흐름이 반복되는 심리적 이유",
            "reflection": "사용자가 스스로 성찰할 수 있는 질문 1개",
            "defense": "사용된 방어기제 (예: 회피, 합리화 등)",
            "needs": ["미충족 욕구 (예: 안정감, 표현의 자유)"],
            "truthScore": 숫자 (0~100, 진심 표현 강도),
            "soothing": "추천 감정 완충 행동 (예: 산책, 말로 풀기 등)",
            "talkGuide": "상대에게 말하는 데 도움이 될 수 있는 문장",
            "simFuture": "이 감정을 무시했을 경우 예상 흐름",
            "dna": "반복 루프/방어기제/사고 패턴을 요약한 감정 유전자 표현",
            "cinema": "이 감정을 영화 한 장면처럼 표현한 묘사",
            "forgiveness": "이 감정을 받아들였을 때 생기는 심리적 회복 흐름"
          }`,
          },
          {
            role: 'user',
            content: input,
          },
        ],
      }),
    });
    console.log(res);

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content || '응답 실패';
    setResult(content);
    saveLog(`입력: ${input}\n응답: ${content}`);
    if (/(고마워|위로됐어|괜찮아|웃기지|정리된 느낌|편해졌어)/.test(input)) {
      setShowOptions(true);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>감정 시뮬레이션 시스템 (this-model)</h1>
      <textarea
        rows={5}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: '100%', marginBottom: '1rem' }}
        placeholder="지금 어떤 감정이 떠오르나요?"
      />
      <Button onClick={handleSubmit}>GPT 감정 분석</Button>
      {result && (
        <div style={{ marginTop: '2rem' }}>
          <h3>GPT 응답</h3>
          <pre style={{ whiteSpace: 'pre-wrap', background: '#f0f0f0', padding: '1rem' }}>{result}</pre>
        </div>
      )}
      {showOptions && (
        <div style={{ marginTop: '2rem' }}>
          <h4>이 감정을 어떻게 할까요?</h4>
          <button style={{ marginRight: '1rem' }}>마무리할래</button>
          <button>계속 이어갈래</button>
        </div>
      )}
      <div style={{ marginTop: '3rem' }}>
        <h3>감정 로그</h3>
        <ul>
          {history.map((item, idx) => (
            <li
              key={idx}
              style={{ marginBottom: '1rem', whiteSpace: 'pre-wrap' }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ETest;
