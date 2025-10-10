const saveWorkoutBtn = document.querySelector("#save-btn");
const workoutForm = document.querySelector("#createWorkout");
const exerciseSelect = document.querySelector("#exerciseName");
const workoutsContainer = document.querySelector("#routines-list");
const generateWorkoutBtn = document.querySelector("#generate-btn");
const favoritesContainer = document.querySelector("#favorites-list");
const exerciseListContainer = document.querySelector(".exercise-list");

let workoutList = JSON.parse(localStorage.getItem("workout")) || [];
let favoriteWorkouts = JSON.parse(localStorage.getItem("favorite")) || [];
let currentExercises = [];

const availableExercises = [
  { name: "Push-Ups", icon: "🤸", type: "upper body" },
  { name: "Knee Push-Ups", icon: "🦵", type: "upper body" },
  { name: "Tricep Dips (using chair)", icon: "💺", type: "upper body" },
  { name: "Arm Circles", icon: "🌀", type: "upper body" },
  { name: "Wall Push-Ups", icon: "🧱", type: "upper body" },
  { name: "Bench Press", icon: "🏋️", type: "upper body" },
  { name: "Overhead Press", icon: "🏋️‍♂️", type: "upper body" },
  { name: "Bicep Curls (dumbbells)", icon: "💪", type: "upper body" },

  { name: "Squats", icon: "🦵", type: "lower body" },
  { name: "Lunges", icon: "🚶‍♂️", type: "lower body" },
  { name: "Step-Ups (using chair)", icon: "🪑", type: "lower body" },
  { name: "Calf Raises", icon: "🦶", type: "lower body" },
  { name: "Leg Press", icon: "🦵🏋️‍♂️", type: "lower body" },
  { name: "Deadlifts", icon: "⚰️", type: "lower body" },

  { name: "Plank", icon: "🪵", type: "core" },
  { name: "Crunches", icon: "🍪", type: "core" },
  { name: "Russian Twists", icon: "🇷🇺", type: "core" },
  { name: "Leg Raises", icon: "🪜", type: "core" },
  { name: "Bicycle Crunches", icon: "🚴", type: "core" },

  { name: "Jumping Jacks", icon: "🕺", type: "cardio" },
  { name: "Burpees", icon: "🔥", type: "cardio" },
  { name: "High Knees", icon: "🏃", type: "cardio" },
  { name: "Mountain Climbers", icon: "⛰️", type: "cardio" },
  { name: "Running in Place", icon: "🏃‍♂️", type: "cardio" },

  { name: "Yoga", icon: "🧘", type: "mobility" },
  { name: "Foam Rolling", icon: "🔵", type: "mobility" },
  { name: "Hamstring Stretch", icon: "🦵", type: "mobility" },
  { name: "Shoulder Stretch", icon: "🤲", type: "mobility" },
];

const saveToStorage = () => {
  localStorage.setItem("workout", JSON.stringify(workoutList));
  localStorage.setItem("favorite", JSON.stringify(favoriteWorkouts));
};

const renderWorkout = (workout, container, isFavorite = false) => {
  const card = document.createElement("div");
  card.classList.add("workout-card");
  card.innerHTML = `
    <h2>${workout.title}</h2>
    <ul class="exercise-list">
      ${workout.exercises.map((ex) => `<li>${ex}</li>`).join("")}
    </ul>
    ${
      isFavorite
        ? `<button class="btn-primary" data-action="remove-fav" data-id="${workout.id}">Remove from Favorites</button>`
        : `<button class="btn-primary" data-action="favorite" data-id="${workout.id}">Add to Favorites</button>
           <button class="btn-remove" data-action="remove" data-id="${workout.id}">Remove</button>`
    }
  `;
  container.appendChild(card);
};

const renderAllWorkouts = () => {
  workoutsContainer.innerHTML = workoutList.length
    ? ""
    : "<li>Your workout library is empty. Generate a workout to get started!</li>";
  favoritesContainer.innerHTML = favoriteWorkouts.length
    ? ""
    : "<li>Your favorites list is empty. Generate a workout to add one!</li>";
  workoutList.forEach((w) => renderWorkout(w, workoutsContainer, false));
  favoriteWorkouts.forEach((w) => renderWorkout(w, favoritesContainer, true));
};

const handleWorkoutClick = (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const id = btn.dataset.id;
  const action = btn.dataset.action;

  if (action === "favorite") {
    const workout = workoutList.find((w) => w.id === id);
    favoriteWorkouts.push(workout);
    workoutList = workoutList.filter((w) => w.id !== id);
  }

  if (action === "remove") {
    workoutList = workoutList.filter((w) => w.id !== id);
  }

  if (action === "remove-fav") {
    const workout = favoriteWorkouts.find((w) => w.id === id);
    workoutList.push(workout);
    favoriteWorkouts = favoriteWorkouts.filter((w) => w.id !== id);
  }

  saveToStorage();
  renderAllWorkouts();
};

const renderCurrentExercises = () => {
  exerciseListContainer.innerHTML = currentExercises
    .map(
      (ex) => `
        <li class="exercise">
          <span>${ex.exercise} — ${ex.sets} sets × ${ex.reps} reps</span>
          <button data-id="${ex.id}" class="delete-exercise">✖</button>
        </li>`
    )
    .join("");
};

exerciseListContainer?.addEventListener("click", (e) => {
  if (!e.target.classList.contains("delete-exercise")) return;
  const id = e.target.dataset.id;
  currentExercises = currentExercises.filter((ex) => ex.id !== id);
  renderCurrentExercises();
  if (!currentExercises.length)
    exerciseListContainer.innerHTML =
      "<li>Select exercises to build your workout.</li>";
});

workoutForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(workoutForm);
  const data = Object.fromEntries(formData.entries());
  currentExercises.push({
    ...data,
    id: Math.random().toString(36).slice(2, 9),
  });
  renderCurrentExercises();
  workoutForm.reset();
});

saveWorkoutBtn?.addEventListener("click", () => {
  if (!currentExercises.length) return;
  workoutList.push({
    id: Math.random().toString(36).slice(2, 9),
    title: `Workout ${workoutList.length + favoriteWorkouts.length + 1}`,
    exercises: currentExercises.map(
      (ex) => `${ex.exercise} — ${ex.sets} sets × ${ex.reps} reps`
    ),
  });

  currentExercises = [];
  renderCurrentExercises();
  saveToStorage();
  renderAllWorkouts();
  exerciseListContainer.innerHTML =
    "<li>Select exercises to build your workout.</li>";
});

generateWorkoutBtn?.addEventListener("click", () => {
  currentExercises = Array.from({ length: 6 }, () => {
    const random =
      availableExercises[Math.floor(Math.random() * availableExercises.length)];
    return {
      exercise: `${random.icon} ${random.name} — ${random.type}`,
      reps: "12",
      sets: "3",
      id: Math.random().toString(36).slice(2, 9),
    };
  });
  renderCurrentExercises();
});

workoutsContainer?.addEventListener("click", handleWorkoutClick);
favoritesContainer?.addEventListener("click", handleWorkoutClick);

if (exerciseSelect) {
  exerciseSelect.innerHTML += availableExercises
    .map(
      (ex) =>
        `<option value="${ex.icon} ${ex.name} — ${ex.type}">${ex.icon} ${ex.name} — ${ex.type}</option>`
    )
    .join("");
}

renderAllWorkouts();
