import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Timer, RotateCcw, Play, CheckCircle, XCircle, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Question {
  num1: number;
  num2: number;
  answer: number;
  id: string;
}

interface GameStats {
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  timeElapsed: number;
  isComplete: boolean;
}

const MultiplicationGame: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameStats, setGameStats] = useState<GameStats>({
    totalQuestions: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    timeElapsed: 0,
    isComplete: false
  });
  const [startTime, setStartTime] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const { toast } = useToast();

  // Generate all multiplication questions (1-12 tables)
  const generateQuestions = useCallback((): Question[] => {
    const questions: Question[] = [];
    for (let i = 1; i <= 12; i++) {
      for (let j = 1; j <= 12; j++) {
        questions.push({
          num1: i,
          num2: j,
          answer: i * j,
          id: `${i}-${j}`
        });
      }
    }
    // Shuffle questions for random order
    return questions.sort(() => Math.random() - 0.5);
  }, []);

  // Start the game
  const startGame = () => {
    const newQuestions = generateQuestions();
    setQuestions(newQuestions);
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setGameStarted(true);
    setStartTime(Date.now());
    setGameStats({
      totalQuestions: newQuestions.length,
      correctAnswers: 0,
      wrongAnswers: 0,
      timeElapsed: 0,
      isComplete: false
    });
    setShowResult(false);
    setLastAnswerCorrect(null);
    
    toast({
      title: "Game Started!",
      description: `Answer all ${newQuestions.length} multiplication questions as fast as you can!`
    });
  };

  // Reset the game
  const resetGame = () => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setGameStarted(false);
    setStartTime(null);
    setGameStats({
      totalQuestions: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      timeElapsed: 0,
      isComplete: false
    });
    setShowResult(false);
    setLastAnswerCorrect(null);
  };

  // Handle answer submission
  const handleAnswerSubmit = () => {
    if (!userAnswer.trim() || currentQuestionIndex >= questions.length) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = parseInt(userAnswer) === currentQuestion.answer;
    
    setLastAnswerCorrect(isCorrect);
    setShowResult(true);

    setTimeout(() => {
      const newStats = {
        ...gameStats,
        correctAnswers: gameStats.correctAnswers + (isCorrect ? 1 : 0),
        wrongAnswers: gameStats.wrongAnswers + (isCorrect ? 0 : 1)
      };

      setGameStats(newStats);

      if (currentQuestionIndex + 1 >= questions.length) {
        // Game complete
        const endTime = Date.now();
        const totalTime = startTime ? (endTime - startTime) / 1000 : 0;
        
        setGameStats({
          ...newStats,
          timeElapsed: totalTime,
          isComplete: true
        });
        setGameStarted(false);
        
        toast({
          title: "Game Complete!",
          description: `Finished in ${totalTime.toFixed(1)}s with ${newStats.wrongAnswers} mistakes!`
        });
      } else {
        // Move to next question
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setUserAnswer('');
      }
      
      setShowResult(false);
      setLastAnswerCorrect(null);
    }, 1000);
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAnswerSubmit();
    }
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted && startTime) {
      interval = setInterval(() => {
        const currentTime = (Date.now() - startTime) / 1000;
        setGameStats(prev => ({ ...prev, timeElapsed: currentTime }));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [gameStarted, startTime]);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-game-bg flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center shadow-card">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Timer className="h-4 w-4 text-game-timer" />
              <span className="text-sm font-medium text-muted-foreground">Time</span>
            </div>
            <div className="text-2xl font-bold text-game-timer">
              {gameStats.timeElapsed.toFixed(1)}s
            </div>
          </Card>
          
          <Card className="p-4 text-center shadow-card">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span className="text-sm font-medium text-muted-foreground">Correct</span>
            </div>
            <div className="text-2xl font-bold text-success">
              {gameStats.correctAnswers}
            </div>
          </Card>
          
          <Card className="p-4 text-center shadow-card">
            <div className="flex items-center justify-center gap-2 mb-2">
              <XCircle className="h-4 w-4 text-error" />
              <span className="text-sm font-medium text-muted-foreground">Wrong</span>
            </div>
            <div className="text-2xl font-bold text-error">
              {gameStats.wrongAnswers}
            </div>
          </Card>
          
          <Card className="p-4 text-center shadow-card">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Target className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Progress</span>
            </div>
            <div className="text-2xl font-bold text-primary">
              {currentQuestionIndex + (gameStarted ? 1 : 0)}/{questions.length || 144}
            </div>
          </Card>
        </div>

        {/* Progress Bar */}
        {gameStarted && (
          <div className="w-full bg-muted rounded-full h-3 shadow-inner">
            <div 
              className="bg-gradient-primary h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Main Game Card */}
        <Card className="p-8 shadow-card">
          {!gameStarted && !gameStats.isComplete ? (
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Multiplication Flash Cards
                </h1>
                <p className="text-muted-foreground">
                  Test your multiplication skills with all tables from 1 to 12!
                </p>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-6 space-y-3">
                <h3 className="font-semibold">Game Rules:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Answer 144 multiplication questions (1×1 to 12×12)</li>
                  <li>• Questions appear in random order</li>
                  <li>• Your time and accuracy will be tracked</li>
                  <li>• Try to finish as fast as possible with fewest mistakes!</li>
                </ul>
              </div>
              
              <Button 
                onClick={startGame} 
                size="lg" 
                className="shadow-button hover:shadow-lg transition-all duration-200"
              >
                <Play className="mr-2 h-5 w-5" />
                Start Game
              </Button>
            </div>
          ) : gameStats.isComplete ? (
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-success">🎉 Congratulations!</h2>
                <p className="text-muted-foreground">You completed all multiplication tables!</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-success/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-success">{gameStats.timeElapsed.toFixed(1)}s</div>
                  <div className="text-sm text-muted-foreground">Total Time</div>
                </div>
                <div className="bg-primary/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary">
                    {((gameStats.correctAnswers / gameStats.totalQuestions) * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Accuracy</div>
                </div>
                <div className="bg-warning/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-warning">{gameStats.wrongAnswers}</div>
                  <div className="text-sm text-muted-foreground">Mistakes</div>
                </div>
              </div>
              
              <Button 
                onClick={resetGame} 
                size="lg" 
                variant="outline"
                className="shadow-button"
              >
                <RotateCcw className="mr-2 h-5 w-5" />
                Play Again
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Question */}
              <div className="text-center space-y-4">
                <Badge variant="secondary" className="text-sm">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </Badge>
                
                <div className={`text-6xl font-bold transition-all duration-300 ${
                  showResult ? (lastAnswerCorrect ? 'animate-pulse-correct text-success' : 'animate-pulse-incorrect text-error') : ''
                }`}>
                  {currentQuestion ? `${currentQuestion.num1} × ${currentQuestion.num2}` : ''}
                </div>
                
                {showResult && (
                  <div className={`text-2xl font-semibold animate-bounce-in ${
                    lastAnswerCorrect ? 'text-success' : 'text-error'
                  }`}>
                    {lastAnswerCorrect ? '✓ Correct!' : `✗ Wrong! Answer: ${currentQuestion?.answer}`}
                  </div>
                )}
              </div>
              
              {/* Answer Input */}
              {!showResult && (
                <div className="space-y-4">
                  <div className="flex gap-4 items-center justify-center">
                    <Input
                      type="number"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Your answer..."
                      className="text-center text-xl w-40 shadow-button"
                      autoFocus
                    />
                    <Button 
                      onClick={handleAnswerSubmit}
                      disabled={!userAnswer.trim()}
                      className="shadow-button"
                    >
                      Submit
                    </Button>
                  </div>
                  
                  <div className="text-center">
                    <Button 
                      onClick={resetGame} 
                      variant="ghost" 
                      size="sm"
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Restart Game
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default MultiplicationGame;