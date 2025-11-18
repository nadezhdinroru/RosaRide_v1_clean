/* ===== Rosa Ride v3 – App Shell ===== */

const SCREENS = {
  roleSelect: document.getElementById("screen-role-select"),
  student: document.getElementById("screen-student-flow"),
  instructor: document.getElementById("screen-instructor"),
  partner: document.getElementById("screen-partner"),
  admin: document.getElementById("screen-admin")
};

const currentRoleLabel = document.getElementById("current-role-label");

/* ===== Мок-данные инструкторов (потом заменим на API) ===== */
const MOCK_INSTRUCTORS = [
  {
    id: 1,
    name: "Анна Ковалёва",
    category: "B",
    resort: "rosa-khutor",
    sport: "ski",
    days: ["2025-01-20", "2025-01-21", "2025-01-22"],
    price: 8000
  },
  {
    id: 2,
    name: "Илья Смирнов",
    category: "A",
    resort: "krasnaya-polyana",
    sport: "snowboard",
    days: ["2025-01-20", "2025-01-23"],
    price: 10000
  },
  {
    id: 3,
    name: "Мария Лесная",
    category: "A",
    resort: "rosa-khutor",
    sport: "ski",
    days: ["2025-01-21", "2025-01-22"],
    price: 10000
  },
  {
    id: 4,
    name: "Дмитрий Орлов",
    category: "C",
    resort: "laura",
    sport: "ski",
    days: ["2025-01-20"],
    price: 5000
  }
];

/* ===== Состояние бронирования ученика ===== */
const bookingState = {
  sport: null,
  resort: null,
  date: null
};

/* ===== Сервисные функции ===== */
function setRole(roleKey) {
  let label = "Роль: не выбрана";

  switch (roleKey) {
    case "student":
      label = "Роль: Ученик";
      break;
    case "instructor":
      label = "Роль: Инструктор";
      break;
    case "partner":
      label = "Роль: Партнёр";
      break;
    case "admin":
      label = "Роль: Админ";
      break;
    default:
      break;
  }

  currentRoleLabel.textContent = label;
}

function showScreen(screenId) {
  Object.values(SCREENS).forEach(s => s.classList.remove("is-active"));

  const toShow = SCREENS[screenId];
  if (toShow) {
    toShow.classList.add("is-active");
  }
}

/* ===== Навигация по ролям ===== */
document.querySelectorAll(".role-card").forEach(btn => {
  btn.addEventListener("click", () => {
    const role = btn.dataset.role;
    setRole(role);

    if (role === "student") {
      showScreen("student");
    } else if (role === "instructor") {
      showScreen("instructor");
    } else if (role === "partner") {
      showScreen("partner");
    } else if (role === "admin") {
      showScreen("admin");
    }
  });
});

/* ===== Кнопки “назад к выбору роли” ===== */
document.getElementById("btn-back-to-role-from-student").addEventListener("click", () => {
  showScreen("roleSelect");
  setRole(null);
});

document.getElementById("btn-back-to-role-from-instructor").addEventListener("click", () => {
  showScreen("roleSelect");
  setRole(null);
});

document.getElementById("btn-back-to-role-from-partner").addEventListener("click", () => {
  showScreen("roleSelect");
  setRole(null);
});

document.getElementById("btn-back-to-role-from-admin").addEventListener("click", () => {
  showScreen("roleSelect");
  setRole(null);
});

/* ===== Логика выбора спорта / курорта / даты для ученика ===== */
const sportOptions = document.getElementById("sport-options");
const resortOptions = document.getElementById("resort-options");
const dateInput = document.getElementById("lesson-date");
const instructorsList = document.getElementById("instructors-list");

sportOptions.addEventListener("click", e => {
  if (!(e.target instanceof HTMLButtonElement)) return;
  const value = e.target.dataset.value;
  if (!value) return;

  bookingState.sport = value;
  markActiveChip(sportOptions, e.target);
  updateInstructorsList();
});

resortOptions.addEventListener("click", e => {
  if (!(e.target instanceof HTMLButtonElement)) return;
  const value = e.target.dataset.value;
  if (!value) return;

  bookingState.resort = value;
  markActiveChip(resortOptions, e.target);
  updateInstructorsList();
});

dateInput.addEventListener("change", e => {
  const value = e.target.value;
  bookingState.date = value || null;
  updateInstructorsList();
});

/* ===== Подсветка активного chip ===== */
function markActiveChip(container, activeBtn) {
  container.querySelectorAll(".chip").forEach(chip => {
    chip.classList.remove("is-active");
  });
  activeBtn.classList.add("is-active");
}

/* ===== Фильтрация инструкторов по состоянию ===== */
function updateInstructorsList() {
  const { sport, resort, date } = bookingState;

  if (!sport || !resort || !date) {
    instructorsList.innerHTML = `
      <p class="muted">
        Выберите вид спорта, курорт и дату — и мы покажем, кто свободен.
      </p>
    `;
    return;
  }

  const filtered = MOCK_INSTRUCTORS.filter(inst => {
    return inst.sport === sport && inst.resort === resort && inst.days.includes(date);
  });

  if (!filtered.length) {
    instructorsList.innerHTML = `
      <p class="muted">
        На выбранную дату нет свободных инструкторов по этим параметрам.
        Попробуйте изменить дату или курорт.
      </p>
    `;
    return;
  }

  const html = filtered
    .map(inst => {
      const categoryLabel =
        inst.category === "A" ? "Категория A · PRO" : inst.category === "B" ? "Категория B" : "Категория C";

      return `
        <button class="instructor-card" data-id="${inst.id}">
          <div class="instructor-main">
            <div class="instructor-name">${inst.name}</div>
            <div class="instructor-meta">
              ${categoryLabel} · ${
                inst.resort === "rosa-khutor"
                  ? "Роза Хутор"
                  : inst.resort === "krasnaya-polyana"
                    ? "Красная Поляна"
                    : "Лаура"
              } · ${inst.price.toLocaleString("ru-RU")} ₽
            </div>
          </div>
          <div class="instructor-pill">Выбрать</div>
        </button>
      `;
    })
    .join("");

  instructorsList.innerHTML = html;
}

/* ===== Навигация нижнего меню (пока только маркер active) ===== */
document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    // Здесь позже добавим реальные экраны: брони / профиль и т.п.
  });
});

/* ===== Стартовое состояние ===== */
showScreen("roleSelect");
setRole(null);
