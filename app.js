const express = require('express');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// ─── In-Memory Data ───────────────────────────────────────────────────────────

let habits = [
  { id: 1, name: 'Drink 8 Glasses of Water', completed: false },
  { id: 2, name: 'Study for 1 Hour', completed: false },
  { id: 3, name: 'Exercise / Walk', completed: false },
  { id: 4, name: 'Read 10 Pages', completed: false },
];

let moods = [
  { id: 1, emoji: '😎', label: 'Thriving', note: 'Ready to conquer the day!', date: 'Today' }
];

let goals = [
  { id: 1, title: 'Improve Coding Skills', status: 'In Progress' },
  { id: 2, title: 'Exercise 3x Weekly', status: 'Not Started' },
];

const quotes = [
  { text: "Small steps every day lead to big changes.", author: "Unknown" },
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { text: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
  { text: "Your future self is watching you right now through your memories.", author: "Aubrey de Grey" },
  { text: "Be so good they can't ignore you.", author: "Steve Martin" },
  { text: "The only bad workout is the one that didn't happen.", author: "Unknown" },
];

let nextHabitId = habits.length + 1;
let nextMoodId = moods.length + 1;
let nextGoalId = goals.length + 1;

// ─── Routes ──────────────────────────────────────────────────────────────────

// Home / Dashboard
app.get('/', (req, res) => {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  const completedHabits = habits.filter(h => h.completed).length;
  const latestMood = moods[moods.length - 1] || null;
  const activeGoals = goals.filter(g => g.status !== 'Completed').length;
  res.render('index', { quote, completedHabits, totalHabits: habits.length, latestMood, activeGoals, totalGoals: goals.length });
});

// ─── Habits ──────────────────────────────────────────────────────────────────

app.get('/habits', (req, res) => {
  res.render('habits', { habits });
});

app.post('/habits/add', (req, res) => {
  const { name } = req.body;
  if (name && name.trim()) {
    habits.push({ id: nextHabitId++, name: name.trim(), completed: false });
  }
  res.redirect('/habits');
});

app.post('/habits/toggle/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const habit = habits.find(h => h.id === id);
  if (habit) habit.completed = !habit.completed;
  res.redirect('/habits');
});

app.post('/habits/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  habits = habits.filter(h => h.id !== id);
  res.redirect('/habits');
});

// ─── Mood Tracker ─────────────────────────────────────────────────────────────

app.get('/mood', (req, res) => {
  res.render('mood', { moods: moods.slice().reverse() });
});

app.post('/mood/add', (req, res) => {
  const { emoji, label, note } = req.body;
  const today = new Date().toLocaleDateString('en-SG', { day: 'numeric', month: 'short', year: 'numeric' });
  moods.push({ id: nextMoodId++, emoji, label, note: note || '', date: today });
  res.redirect('/mood');
});

// ─── Goals ───────────────────────────────────────────────────────────────────

app.get('/goals', (req, res) => {
  res.render('goals', { goals });
});

app.post('/goals/add', (req, res) => {
  const { title } = req.body;
  if (title && title.trim()) {
    goals.push({ id: nextGoalId++, title: title.trim(), status: 'Not Started' });
  }
  res.redirect('/goals');
});

app.post('/goals/update/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;
  const goal = goals.find(g => g.id === id);
  if (goal) goal.status = status;
  res.redirect('/goals');
});

app.post('/goals/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  goals = goals.filter(g => g.id !== id);
  res.redirect('/goals');
});

// ─── Start ───────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`✨ GlowUp Planner running at http://localhost:${PORT}`);
});
