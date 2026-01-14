import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SquareIcon, CheckSquare, Square, Plus, Clock, Target, Brain, TrendingUp, Users, Bell, Settings, Home, Calendar, BarChart3, Award, Zap, Coffee, Moon, Sun, X, ChevronRight, AlertCircle, Trophy, Flame, Lock, Unlock, Search, Filter, MoreVertical, Share2, Download, Eye, EyeOff, Timer, BookOpen, Dumbbell, Heart, Sparkles, MessageSquare, CheckCircle, XCircle } from 'lucide-react';

const ProductivityApp = () => {
  const [currentView, setCurrentView] = useState('home');
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete project proposal', priority: 'high', completed: false, project: 'Work', timeSpent: 0, estimatedTime: 120 },
    { id: 2, title: 'Study for algorithms exam', priority: 'high', completed: false, project: 'Study', timeSpent: 0, estimatedTime: 180 },
    { id: 3, title: 'Morning workout', priority: 'medium', completed: true, project: 'Health', timeSpent: 45, estimatedTime: 45 },
  ]);
  
  const [habits, setHabits] = useState([
    { id: 1, name: 'Morning Exercise', streak: 12, completed: true, icon: '💪' },
    { id: 2, name: 'Read 30 mins', streak: 8, completed: false, icon: '📚' },
    { id: 3, name: 'Meditate', streak: 5, completed: true, icon: '🧘' },
    { id: 4, name: 'No social media before 12PM', streak: 3, completed: false, icon: '🚫' },
  ]);

  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [pomodoroActive, setPomodoroActive] = useState(false);
  const [pomodoroMode, setPomodoroMode] = useState('work'); // work, break, longBreak
  const [focusMode, setFocusMode] = useState(false);
  const [blockedSites, setBlockedSites] = useState(['facebook.com', 'twitter.com', 'instagram.com', 'youtube.com']);
  
  const [showSurvey, setShowSurvey] = useState(false);
  const [surveyData, setSurveyData] = useState({
    energyMorning: 5,
    energyAfternoon: 5,
    energyEvening: 5,
    focusQuality: 5,
    mood: 5,
    sleepHours: 7,
    sleepQuality: 5,
    wins: '',
    challenges: '',
    distractions: 0
  });

  const [stats, setStats] = useState({
    todayFocus: 145,
    weeklyGoal: 1200,
    weeklyProgress: 780,
    productivity: 87,
    streakDays: 12,
    tasksCompleted: 24,
    totalTasks: 31
  });

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', priority: 'medium', project: 'Personal', estimatedTime: 30 });
  const [activeAlarm, setActiveAlarm] = useState(null);
  const [alarmChallenge, setAlarmChallenge] = useState(null);

  const timerRef = useRef(null);

  useEffect(() => {
    if (pomodoroActive) {
      timerRef.current = setInterval(() => {
        setPomodoroTime(prev => {
          if (prev <= 1) {
            setPomodoroActive(false);
            handlePomodoroComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [pomodoroActive]);

  // Check for end-of-day survey (simulated at 9 PM)
  useEffect(() => {
    const now = new Date();
    if (now.getHours() === 21 && now.getMinutes() === 0) {
      setShowSurvey(true);
    }
  }, []);

  const handlePomodoroComplete = () => {
    if (pomodoroMode === 'work') {
      setPomodoroMode('break');
      setPomodoroTime(5 * 60);
    } else {
      setPomodoroMode('work');
      setPomodoroTime(25 * 60);
    }
  };

  const togglePomodoro = () => {
    setPomodoroActive(!pomodoroActive);
  };

  const resetPomodoro = () => {
    setPomodoroActive(false);
    setPomodoroTime(25 * 60);
    setPomodoroMode('work');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const toggleHabit = (id) => {
    setHabits(habits.map(habit => 
      habit.id === id ? { 
        ...habit, 
        completed: !habit.completed,
        streak: !habit.completed ? habit.streak + 1 : habit.streak 
      } : habit
    ));
  };

  const addTask = () => {
    if (newTask.title.trim()) {
      setTasks([...tasks, { 
        id: Date.now(), 
        ...newTask, 
        completed: false, 
        timeSpent: 0 
      }]);
      setNewTask({ title: '', priority: 'medium', project: 'Personal', estimatedTime: 30 });
      setShowTaskModal(false);
    }
  };

  const submitSurvey = () => {
    // Save survey data (in production, this would sync to backend)
    console.log('Survey submitted:', surveyData);
    setShowSurvey(false);
    // Show insights based on survey
    alert('Thanks for completing your daily reflection! Check your insights in the Analytics tab.');
  };

  const triggerAlarm = () => {
    const challenges = ['math', 'shake', 'memory'];
    const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    
    if (randomChallenge === 'math') {
      const num1 = Math.floor(Math.random() * 50) + 10;
      const num2 = Math.floor(Math.random() * 50) + 10;
      setAlarmChallenge({ type: 'math', question: `${num1} + ${num2}`, answer: num1 + num2, userAnswer: '' });
    } else if (randomChallenge === 'shake') {
      setAlarmChallenge({ type: 'shake', shakes: 0, required: 30 });
    } else {
      const sequence = Array.from({ length: 4 }, () => Math.floor(Math.random() * 4));
      setAlarmChallenge({ type: 'memory', sequence, userSequence: [], showSequence: true });
      setTimeout(() => {
        setAlarmChallenge(prev => ({ ...prev, showSequence: false }));
      }, 3000);
    }
    setActiveAlarm(true);
  };

  const solveAlarmChallenge = () => {
    setActiveAlarm(false);
    setAlarmChallenge(null);
  };

  // Render different views
  const renderHome = () => (
    <div className="space-y-6 pb-24">
      {/* Hero Stats */}
      <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Welcome back, Champion! 🎯</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/20 backdrop-blur rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5" />
              <span className="text-sm opacity-90">Streak</span>
            </div>
            <p className="text-3xl font-bold">{stats.streakDays}</p>
            <p className="text-xs opacity-75">days strong</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5" />
              <span className="text-sm opacity-90">Productivity</span>
            </div>
            <p className="text-3xl font-bold">{stats.productivity}%</p>
            <p className="text-xs opacity-75">this week</p>
          </div>
        </div>
      </div>

      {/* Focus Mode Toggle */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {focusMode ? <Lock className="w-6 h-6 text-red-500" /> : <Unlock className="w-6 h-6 text-gray-400" />}
            <div>
              <h3 className="font-semibold">Focus Mode</h3>
              <p className="text-xs text-gray-500">Block distractions</p>
            </div>
          </div>
          <button
            onClick={() => setFocusMode(!focusMode)}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              focusMode 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            {focusMode ? 'ON' : 'OFF'}
          </button>
        </div>
        {focusMode && (
          <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-xl">
            <p className="text-sm text-red-700 dark:text-red-300 font-medium">
              🚫 Blocking: {blockedSites.join(', ')}
            </p>
          </div>
        )}
      </div>

      {/* Pomodoro Timer */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Timer className="w-5 h-5 text-purple-500" />
            Pomodoro Timer
          </h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            pomodoroMode === 'work' 
              ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
              : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
          }`}>
            {pomodoroMode === 'work' ? 'Work' : 'Break'}
          </span>
        </div>
        <div className="text-center">
          <div className="text-6xl font-bold mb-6 font-mono">{formatTime(pomodoroTime)}</div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={togglePomodoro}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-all"
            >
              {pomodoroActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {pomodoroActive ? 'Pause' : 'Start'}
            </button>
            <button
              onClick={resetPomodoro}
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
            >
              <SquareIcon className="w-5 h-5" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Today's Tasks */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-500" />
            Today's Tasks ({tasks.filter(t => !t.completed).length})
          </h3>
          <button
            onClick={() => setShowTaskModal(true)}
            className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-2">
          {tasks.slice(0, 5).map(task => (
            <div
              key={task.id}
              className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                task.completed
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                  : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600'
              }`}
            >
              <button onClick={() => toggleTask(task.id)}>
                {task.completed ? (
                  <CheckSquare className="w-6 h-6 text-green-600" />
                ) : (
                  <Square className="w-6 h-6 text-gray-400" />
                )}
              </button>
              <div className="flex-1">
                <p className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                  {task.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    task.priority === 'high' 
                      ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                      : task.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-300'
                  }`}>
                    {task.priority}
                  </span>
                  <span className="text-xs text-gray-500">{task.project}</span>
                  <span className="text-xs text-gray-500">• {task.estimatedTime}m</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Habits */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow">
        <h3 className="font-semibold flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-yellow-500" />
          Daily Habits
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {habits.map(habit => (
            <button
              key={habit.id}
              onClick={() => toggleHabit(habit.id)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                habit.completed
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700'
                  : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600'
              }`}
            >
              <div className="text-2xl mb-2">{habit.icon}</div>
              <p className="font-medium text-sm mb-1">{habit.name}</p>
              <div className="flex items-center gap-1 text-xs text-orange-600 dark:text-orange-400">
                <Flame className="w-3 h-3" />
                <span>{habit.streak} days</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={triggerAlarm}
          className="p-4 bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
        >
          <Bell className="w-6 h-6 mx-auto mb-2" />
          <p className="text-xs font-semibold">Test Alarm</p>
        </button>
        <button
          onClick={() => setShowSurvey(true)}
          className="p-4 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
        >
          <MessageSquare className="w-6 h-6 mx-auto mb-2" />
          <p className="text-xs font-semibold">Daily Survey</p>
        </button>
        <button
          onClick={() => setCurrentView('analytics')}
          className="p-4 bg-gradient-to-br from-green-500 to-teal-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
        >
          <TrendingUp className="w-6 h-6 mx-auto mb-2" />
          <p className="text-xs font-semibold">Insights</p>
        </button>
      </div>
    </div>
  );

  const renderTasks = () => (
    <div className="space-y-4 pb-24">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">All Tasks</h2>
        <button
          onClick={() => setShowTaskModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Task
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {['All', 'Work', 'Study', 'Health', 'Personal'].map(filter => (
          <button
            key={filter}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-xl text-sm font-medium whitespace-nowrap hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {tasks.map(task => (
          <div
            key={task.id}
            className={`p-4 rounded-xl border-2 ${
              task.completed
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
            }`}
          >
            <div className="flex items-start gap-3">
              <button onClick={() => toggleTask(task.id)} className="mt-1">
                {task.completed ? (
                  <CheckSquare className="w-6 h-6 text-green-600" />
                ) : (
                  <Square className="w-6 h-6 text-gray-400" />
                )}
              </button>
              <div className="flex-1">
                <p className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                  {task.title}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    task.priority === 'high' 
                      ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                      : task.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-300'
                  }`}>
                    {task.priority}
                  </span>
                  <span className="text-xs text-gray-500">{task.project}</span>
                </div>
                <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Est: {task.estimatedTime}m
                  </span>
                  <span className="flex items-center gap-1">
                    <Timer className="w-3 h-3" />
                    Spent: {task.timeSpent}m
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6 pb-24">
      <h2 className="text-2xl font-bold">Your Insights</h2>

      {/* Weekly Progress */}
      <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
        <h3 className="font-semibold mb-4">Weekly Focus Goal</h3>
        <div className="mb-3">
          <div className="flex justify-between text-sm mb-2">
            <span>{stats.weeklyProgress} minutes</span>
            <span>{stats.weeklyGoal} minutes</span>
          </div>
          <div className="w-full bg-white/30 rounded-full h-3">
            <div
              className="bg-white rounded-full h-3 transition-all"
              style={{ width: `${(stats.weeklyProgress / stats.weeklyGoal) * 100}%` }}
            />
          </div>
        </div>
        <p className="text-sm opacity-90">
          {Math.round((stats.weeklyProgress / stats.weeklyGoal) * 100)}% complete • {stats.weeklyGoal - stats.weeklyProgress} mins to go
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow">
          <div className="flex items-center gap-2 mb-2 text-blue-600 dark:text-blue-400">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Tasks Done</span>
          </div>
          <p className="text-3xl font-bold">{stats.tasksCompleted}</p>
          <p className="text-xs text-gray-500 mt-1">of {stats.totalTasks} total</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow">
          <div className="flex items-center gap-2 mb-2 text-orange-600 dark:text-orange-400">
            <Flame className="w-5 h-5" />
            <span className="text-sm font-medium">Best Streak</span>
          </div>
          <p className="text-3xl font-bold">{stats.streakDays}</p>
          <p className="text-xs text-gray-500 mt-1">days in a row</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow">
          <div className="flex items-center gap-2 mb-2 text-green-600 dark:text-green-400">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium">Productivity</span>
          </div>
          <p className="text-3xl font-bold">{stats.productivity}%</p>
          <p className="text-xs text-gray-500 mt-1">this week</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow">
          <div className="flex items-center gap-2 mb-2 text-purple-600 dark:text-purple-400">
            <Clock className="w-5 h-5" />
            <span className="text-sm font-medium">Focus Time</span>
          </div>
          <p className="text-3xl font-bold">{stats.todayFocus}</p>
          <p className="text-xs text-gray-500 mt-1">minutes today</p>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-500" />
          AI-Powered Insights
        </h3>
        <div className="space-y-3">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <p className="text-sm font-medium text-blue-900 dark:text-blue-300">
              📊 You're most productive between 9-11 AM
            </p>
            <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
              Schedule deep work during these hours for best results
            </p>
          </div>
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
            <p className="text-sm font-medium text-green-900 dark:text-green-300">
              💤 8+ hours sleep = 40% more focus
            </p>
            <p className="text-xs text-green-700 dark:text-green-400 mt-1">
              Your data shows strong correlation between sleep and productivity
            </p>
          </div>
          <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
            <p className="text-sm font-medium text-orange-900 dark:text-orange-300">
              ⚠️ Stress levels trending up
            </p>
            <p className="text-xs text-orange-700 dark:text-orange-400 mt-1">
              Consider adding more breaks and mindfulness sessions
            </p>
          </div>
        </div>
      </div>

      {/* Export Data */}
      <button className="w-full flex items-center justify-center gap-2 p-4 bg-gray-200 dark:bg-gray-700 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">
        <Download className="w-5 h-5" />
        Export Your Data (CSV)
      </button>
    </div>
  );

  const renderCommunity = () => (
    <div className="space-y-6 pb-24">
      <h2 className="text-2xl font-bold">Community</h2>

      {/* Leaderboard */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          This Week's Champions
        </h3>
        <div className="space-y-3">
          {[
            { rank: 1, name: 'You', score: 2847, badge: '🥇' },
            { rank: 2, name: 'Sarah K.', score: 2756, badge: '🥈' },
            { rank: 3, name: 'Mike R.', score: 2689, badge: '🥉' },
            { rank: 4, name: 'Emma L.', score: 2543, badge: '' },
            { rank: 5, name: 'Alex T.', score: 2489, badge: '' },
          ].map(user => (
            <div
              key={user.rank}
              className={`flex items-center gap-3 p-3 rounded-xl ${
                user.rank === 1 
                  ? 'bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30' 
                  : 'bg-gray-50 dark:bg-gray-700/50'
              }`}
            >
              <div className="text-2xl">{user.badge || `#${user.rank}`}</div>
              <div className="flex-1">
                <p className="font-semibold">{user.name}</p>
                <p className="text-xs text-gray-500">{user.score} points</p>
              </div>
              {user.rank === 1 && (
                <Trophy className="w-6 h-6 text-yellow-600" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Community Stats */}
      <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl p-6 text-white shadow-lg">
        <h3 className="font-semibold mb-4">You're in the top 10%! 🎉</h3>
        <p className="text-sm opacity-90 mb-3">
          Your productivity score is higher than 90% of users this week
        </p>
        <div className="flex items-center gap-2 text-sm">
          <TrendingUp className="w-4 h-4" />
          <span>Keep up the amazing work!</span>
        </div>
      </div>

      {/* Shared Insights */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-500" />
          Community Insights
        </h3>
        <div className="space-y-3">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <p className="text-sm font-medium">Most successful users work in 90-min blocks</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Try this pattern for better results</p>
          </div>
          <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
            <p className="text-sm font-medium">Average morning routine: 45 minutes</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Exercise + meditation combo is most popular</p>
          </div>
        </div>
      </div>

      {/* Accountability Partner */}
      <button className="w-full p-5 bg-white dark:bg-gray-800 rounded-2xl shadow text-left hover:shadow-lg transition-all">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
            <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold">Find Accountability Partner</h4>
            <p className="text-sm text-gray-500">Connect with someone on a similar journey</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </button>
    </div>
  );

  // Task Modal
  const TaskModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-t-3xl md:rounded-3xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Add New Task</h3>
          <button
            onClick={() => setShowTaskModal(false)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Task Title</label>
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              placeholder="What needs to be done?"
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl border-2 border-transparent focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Priority</label>
            <div className="grid grid-cols-3 gap-2">
              {['low', 'medium', 'high'].map(priority => (
                <button
                  key={priority}
                  onClick={() => setNewTask({ ...newTask, priority })}
                  className={`py-3 rounded-xl font-medium transition-all ${
                    newTask.priority === priority
                      ? priority === 'high'
                        ? 'bg-red-500 text-white'
                        : priority === 'medium'
                        ? 'bg-yellow-500 text-white'
                        : 'bg-gray-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}
                >
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Project</label>
            <select
              value={newTask.project}
              onChange={(e) => setNewTask({ ...newTask, project: e.target.value })}
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl border-2 border-transparent focus:border-blue-500 outline-none transition-all"
            >
              <option>Work</option>
              <option>Study</option>
              <option>Health</option>
              <option>Personal</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Estimated Time (minutes)</label>
            <input
              type="number"
              value={newTask.estimatedTime}
              onChange={(e) => setNewTask({ ...newTask, estimatedTime: parseInt(e.target.value) || 30 })}
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl border-2 border-transparent focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <button
            onClick={addTask}
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );

  // Daily Survey Modal
  const SurveyModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-t-3xl md:rounded-3xl w-full max-w-2xl p-6 my-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Daily Reflection Survey</h3>
          <button
            onClick={() => setShowSurvey(false)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
          {/* Energy Levels */}
          <div>
            <label className="block font-medium mb-3">How was your energy throughout the day?</label>
            <div className="space-y-3">
              {['Morning', 'Afternoon', 'Evening'].map((time, idx) => (
                <div key={time}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">{time}</span>
                    <span className="text-sm font-semibold text-blue-600">
                      {idx === 0 ? surveyData.energyMorning : idx === 1 ? surveyData.energyAfternoon : surveyData.energyEvening}/10
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={idx === 0 ? surveyData.energyMorning : idx === 1 ? surveyData.energyAfternoon : surveyData.energyEvening}
                    onChange={(e) => setSurveyData({
                      ...surveyData,
                      [idx === 0 ? 'energyMorning' : idx === 1 ? 'energyAfternoon' : 'energyEvening']: parseInt(e.target.value)
                    })}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Focus Quality */}
          <div>
            <label className="block font-medium mb-3">How was your focus quality today?</label>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Poor</span>
              <span className="text-sm font-semibold text-purple-600">{surveyData.focusQuality}/10</span>
              <span className="text-sm">Excellent</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={surveyData.focusQuality}
              onChange={(e) => setSurveyData({ ...surveyData, focusQuality: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Mood */}
          <div>
            <label className="block font-medium mb-3">Overall mood today?</label>
            <div className="grid grid-cols-5 gap-2">
              {[
                { emoji: '😫', label: 'Terrible', value: 1 },
                { emoji: '😕', label: 'Bad', value: 2 },
                { emoji: '😐', label: 'Okay', value: 3 },
                { emoji: '🙂', label: 'Good', value: 4 },
                { emoji: '😄', label: 'Great', value: 5 },
              ].map(mood => (
                <button
                  key={mood.value}
                  onClick={() => setSurveyData({ ...surveyData, mood: mood.value })}
                  className={`p-4 rounded-xl transition-all ${
                    surveyData.mood === mood.value
                      ? 'bg-blue-500 text-white scale-110'
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}
                >
                  <div className="text-3xl mb-1">{mood.emoji}</div>
                  <p className="text-xs">{mood.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Sleep */}
          <div>
            <label className="block font-medium mb-3">Sleep last night</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Hours slept</span>
                <input
                  type="number"
                  min="0"
                  max="12"
                  step="0.5"
                  value={surveyData.sleepHours}
                  onChange={(e) => setSurveyData({ ...surveyData, sleepHours: parseFloat(e.target.value) })}
                  className="w-full mt-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl border-2 border-transparent focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Quality (1-10)</span>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={surveyData.sleepQuality}
                  onChange={(e) => setSurveyData({ ...surveyData, sleepQuality: parseInt(e.target.value) })}
                  className="w-full mt-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl border-2 border-transparent focus:border-blue-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Distractions */}
          <div>
            <label className="block font-medium mb-3">How many times were you distracted?</label>
            <input
              type="number"
              min="0"
              value={surveyData.distractions}
              onChange={(e) => setSurveyData({ ...surveyData, distractions: parseInt(e.target.value) || 0 })}
              placeholder="Number of distractions"
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl border-2 border-transparent focus:border-blue-500 outline-none"
            />
          </div>

          {/* Wins */}
          <div>
            <label className="block font-medium mb-3">What went well today? 🎉</label>
            <textarea
              value={surveyData.wins}
              onChange={(e) => setSurveyData({ ...surveyData, wins: e.target.value })}
              placeholder="Celebrate your wins..."
              rows={3}
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl border-2 border-transparent focus:border-blue-500 outline-none resize-none"
            />
          </div>

          {/* Challenges */}
          <div>
            <label className="block font-medium mb-3">What challenges did you face? 🤔</label>
            <textarea
              value={surveyData.challenges}
              onChange={(e) => setSurveyData({ ...surveyData, challenges: e.target.value })}
              placeholder="What could be improved..."
              rows={3}
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl border-2 border-transparent focus:border-blue-500 outline-none resize-none"
            />
          </div>

          <button
            onClick={submitSurvey}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Submit & Get Insights
          </button>
        </div>
      </div>
    </div>
  );

  // Alarm Challenge Modal
  const AlarmChallengeModal = () => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl w-full max-w-md p-8 text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-red-500 rounded-full mx-auto flex items-center justify-center mb-4 animate-pulse">
            <Bell className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Wake Up Challenge!</h3>
          <p className="text-gray-600 dark:text-gray-400">Complete the challenge to stop the alarm</p>
        </div>

        {alarmChallenge?.type === 'math' && (
          <div className="space-y-4">
            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
              <p className="text-4xl font-bold mb-4">{alarmChallenge.question} = ?</p>
              <input
                type="number"
                value={alarmChallenge.userAnswer}
                onChange={(e) => setAlarmChallenge({ ...alarmChallenge, userAnswer: e.target.value })}
                placeholder="Your answer"
                className="w-full px-6 py-4 text-2xl text-center bg-white dark:bg-gray-700 rounded-xl border-2 border-blue-500 outline-none"
                autoFocus
              />
            </div>
            <button
              onClick={() => {
                if (parseInt(alarmChallenge.userAnswer) === alarmChallenge.answer) {
                  solveAlarmChallenge();
                } else {
                  alert('Wrong answer! Try again.');
                }
              }}
              className="w-full py-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all"
            >
              Submit Answer
            </button>
          </div>
        )}

        {alarmChallenge?.type === 'shake' && (
          <div className="space-y-4">
            <div className="p-6 bg-orange-50 dark:bg-orange-900/20 rounded-2xl">
              <p className="text-lg mb-4">Shake your device!</p>
              <div className="text-6xl font-bold">{alarmChallenge.shakes}/{alarmChallenge.required}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">shakes remaining</p>
            </div>
            <button
              onClick={() => {
                const newShakes = alarmChallenge.shakes + 1;
                if (newShakes >= alarmChallenge.required) {
                  solveAlarmChallenge();
                } else {
                  setAlarmChallenge({ ...alarmChallenge, shakes: newShakes });
                }
              }}
              className="w-full py-4 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-all"
            >
              Shake (Tap to simulate)
            </button>
          </div>
        )}

        {alarmChallenge?.type === 'memory' && (
          <div className="space-y-4">
            <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-2xl">
              <p className="text-lg mb-4">Remember the sequence!</p>
              <div className="grid grid-cols-2 gap-3">
                {[0, 1, 2, 3].map(idx => (
                  <button
                    key={idx}
                    className={`h-24 rounded-xl font-bold text-2xl transition-all ${
                      alarmChallenge.showSequence && alarmChallenge.sequence.includes(idx)
                        ? 'bg-purple-600 text-white scale-105'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                    onClick={() => {
                      if (!alarmChallenge.showSequence) {
                        const newUserSeq = [...alarmChallenge.userSequence, idx];
                        if (JSON.stringify(newUserSeq) === JSON.stringify(alarmChallenge.sequence)) {
                          solveAlarmChallenge();
                        } else if (newUserSeq.length === alarmChallenge.sequence.length) {
                          alert('Wrong sequence! Try again.');
                          setAlarmChallenge({ ...alarmChallenge, userSequence: [], showSequence: true });
                          setTimeout(() => setAlarmChallenge(prev => ({ ...prev, showSequence: false })), 3000);
                        } else {
                          setAlarmChallenge({ ...alarmChallenge, userSequence: newUserSeq });
                        }
                      }
                    }}
                    disabled={alarmChallenge.showSequence}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Bottom Navigation
  const BottomNav = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t-2 border-gray-200 dark:border-gray-700 px-4 py-3 safe-area-bottom z-40">
      <div className="flex justify-around items-center max-w-2xl mx-auto">
        {[
          { id: 'home', icon: Home, label: 'Home' },
          { id: 'tasks', icon: CheckSquare, label: 'Tasks' },
          { id: 'analytics', icon: BarChart3, label: 'Analytics' },
          { id: 'community', icon: Users, label: 'Community' },
        ].map(nav => (
          <button
            key={nav.id}
            onClick={() => setCurrentView(nav.id)}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
              currentView === nav.id
                ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <nav.icon className="w-6 h-6" />
            <span className="text-xs font-medium">{nav.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b-2 border-gray-200 dark:border-gray-700 px-4 py-4">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div>
            <h1 className="text-xl font-bold">Discipline Hub</h1>
            <p className="text-xs text-gray-500">Your path to excellence</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {currentView === 'home' && renderHome()}
        {currentView === 'tasks' && renderTasks()}
        {currentView === 'analytics' && renderAnalytics()}
        {currentView === 'community' && renderCommunity()}
      </div>

      {/* Modals */}
      {showTaskModal && <TaskModal />}
      {showSurvey && <SurveyModal />}
      {activeAlarm && alarmChallenge && <AlarmChallengeModal />}

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default ProductivityApp;