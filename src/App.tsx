import { useCallback, useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

import viteLogo from '/vite.svg';
import reactLogo from './assets/react.svg';
import { Button } from './components/ui/button';
import useInterval from './utils/use-interval';

const row1 = 'qwertyuiop'.split('');
const row2 = 'asdfghjkl'.split('');
const row3 = 'zxcvbnm'.split('');

function App() {
  const [isRunning, setIsRunning] = useState(true);
  const [timerStartTime, setTimerStartTime] = useState<number>();
  const [countDownSecs, setCountDownSecs] = useState<number>(10);
  useInterval(
    () => {
      if (!timerStartTime) return setTimerStartTime(Date.now());
      const newCountDownSecs = 10 - Math.floor((Date.now() - timerStartTime) / 1000);
      if (newCountDownSecs !== countDownSecs) setCountDownSecs(newCountDownSecs);
      if (newCountDownSecs === 0) setIsRunning(false);
    },
    isRunning ? 500 : null,
  );
  const [prompt, setPrompt] = useState('Types of cheese');
  const [usedLetters, setUsedLetters] = useState<string[]>([]);
  const onLetterClick = useCallback(
    (e: React.MouseEvent) => {
      if (!isRunning) return;
      const letter = e.currentTarget.getAttribute('data-letter');
      console.log({ letter });
      if (letter) setUsedLetters([...usedLetters, letter]);
    },
    [setUsedLetters, usedLetters, isRunning],
  );

  const countdownTimeStr = `00:${String(countDownSecs).padStart(2, '0')}`;

  return (
    <div className="p-4 space-y-8">
      <p className="text-5xl text-center">"{prompt}"</p>
      <div className="text-center text-4xl">{countdownTimeStr}</div>
      <div className="flex flex-col items-center space-y-2">
        <KeyRow letters={row1} usedLetters={usedLetters} onLetterClick={onLetterClick} />
        <KeyRow letters={row2} usedLetters={usedLetters} onLetterClick={onLetterClick} />
        <KeyRow letters={row3} usedLetters={usedLetters} onLetterClick={onLetterClick} />
      </div>
      <div className="flex justify-center">
        <Button className="bg-green-600 text-white">Done</Button>
      </div>
    </div>
  );
}

type KeyRowProps = {
  letters: string[];
  usedLetters: string[];
  onLetterClick: (letter: string) => void;
};
const KeyRow = (props: KeyRowProps) => {
  const { letters, usedLetters, onLetterClick } = props;
  return (
    <div className="flex space-x-2">
      {letters.map((letter) => {
        const letterUpper = letter.toUpperCase();
        const isDisabled = usedLetters.includes(letter);
        return (
          <Button key={`key-${letterUpper}`} data-letter={letter} disabled={isDisabled} onClick={onLetterClick}>
            {letterUpper}
          </Button>
        );
      })}
    </div>
  );
};

export default App;
