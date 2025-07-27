let currentPassage = 0;
const answers = {};
const highlights = {};
let currentRange = null;

function renderPassage() {
  const passage = passages[currentPassage];
  const passageTextEl = document.getElementById("passage-text");
  passageTextEl.textContent = passage.text;

  document.getElementById("passage-title").textContent = passage.title;

  const container = document.getElementById("questions");
  container.innerHTML = "";
  passage.questions.forEach((q, i) => {
    const key = `${currentPassage}-${i}`;
    let html = `<p class="font-semibold mb-1">${i + 1}. ${q.question}</p>`;
    if (q.type === "mcq") {
      html += q.options.map((opt, idx) => `
        <label class="block">
          <input type="radio" name="q${currentPassage}-${i}" value="${idx}" ${answers[key] == idx ? "checked" : ""}> ${opt}
        </label>
      `).join("");
    } else if (q.type === "truefalse") {
      html += `
        <label><input type="radio" name="q${currentPassage}-${i}" value="true" ${answers[key] == "true" ? "checked" : ""}> True</label>
        <label class="ml-4"><input type="radio" name="q${currentPassage}-${i}" value="false" ${answers[key] == "false" ? "checked" : ""}> False</label>
      `;
    } else if (q.type === "fillblank") {
      html += `<input type="text" name="q${currentPassage}-${i}" value="${answers[key] || ""}" class="border rounded px-2 py-1 w-full mt-1">`;
    }
    container.innerHTML += `<div id="q-block-${i}" class="mb-4">${html}</div>`;
  });

  container.querySelectorAll("input").forEach((input, index) => {
    input.addEventListener("change", (e) => {
      const name = e.target.name.replace("q", "");
      answers[name] = e.target.type === "radio" ? e.target.value : e.target.value.trim();
      updateQuestionNav();
    });
  });

  // Highlightlarni tiklash
  if (highlights[currentPassage]) {
    highlights[currentPassage].forEach(text => {
      const regex = new RegExp(`(${text})`, "i");
      passageTextEl.innerHTML = passageTextEl.innerHTML.replace(regex, `<span class="bg-yellow-300 px-1 rounded">$1</span>`);
    });
  }

  renderQuestionNav();

  document.getElementById("prevBtn").classList.toggle("hidden", currentPassage === 0);
  document.getElementById("nextBtn").classList.toggle("hidden", currentPassage === passages.length - 1);
  document.getElementById("submit-section").classList.toggle("hidden", currentPassage !== passages.length - 1);
}

function renderQuestionNav() {
  const navContainer = document.getElementById("question-nav");
  navContainer.innerHTML = "";
  const passage = passages[currentPassage];

  passage.questions.forEach((q, i) => {
    const key = `${currentPassage}-${i}`;
    let statusClass = "empty";
    if (answers[key]) statusClass = "answered";

    const btn = document.createElement("div");
    btn.className = `q-btn ${statusClass}`;
    btn.textContent = i + 1;
    btn.addEventListener("click", () => {
      document.getElementById(`q-block-${i}`).scrollIntoView({ behavior: "smooth" });
    });

    navContainer.appendChild(btn);
  });
}

function updateQuestionNav() {
  const navBtns = document.querySelectorAll("#question-nav .q-btn");
  navBtns.forEach((btn, i) => {
    const key = `${currentPassage}-${i}`;
    btn.classList.remove("empty", "answered", "missed");
    if (answers[key]) {
      btn.classList.add("answered");
    } else {
      btn.classList.add("empty");
    }
  });
}

document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentPassage > 0) {
    currentPassage--;
    renderPassage();
  }
});

document.getElementById("nextBtn").addEventListener("click", () => {
  const passage = passages[currentPassage];
  passage.questions.forEach((q, i) => {
    const key = `${currentPassage}-${i}`;
    if (!answers[key]) {
      const navBtn = document.querySelectorAll("#question-nav .q-btn")[i];
      navBtn.classList.remove("empty");
      navBtn.classList.add("missed");
    }
  });

  if (currentPassage < passages.length - 1) {
    currentPassage++;
    renderPassage();
  }
});

// ================= Highlight Toolbar =================
const passageEl = document.getElementById("passage-text");
const toolbar = document.getElementById("toolbar");
const highlightBtn = document.getElementById("highlightBtn");
const removeBtn = document.getElementById("removeBtn");
const clearBtn = document.getElementById("clearBtn");

passageEl.addEventListener("mouseup", () => {
  const selection = window.getSelection();
  if (!selection.rangeCount || selection.toString().trim() === "") {
    toolbar.classList.remove("show");
    toolbar.style.display = "none";
    return;
  }

  currentRange = selection.getRangeAt(0);

  if (window.innerWidth <= 768) {
    toolbar.style.position = "fixed";
    toolbar.style.bottom = "20px";
    toolbar.style.left = "50%";
    toolbar.style.transform = "translateX(-50%)";
  } else {
    const rect = currentRange.getBoundingClientRect();
    toolbar.style.position = "absolute";
    toolbar.style.top = `${rect.top + window.scrollY - 50}px`;
    toolbar.style.left = `${rect.left + rect.width / 2 - 70}px`;
  }

  toolbar.style.display = "flex";
  setTimeout(() => toolbar.classList.add("show"), 10);
});

highlightBtn.addEventListener("click", () => {
  if (!currentRange) return;
  const span = document.createElement("span");
  span.className = "bg-yellow-300 px-1 rounded";
  const text = currentRange.toString();
  currentRange.surroundContents(span);
  if (!highlights[currentPassage]) highlights[currentPassage] = [];
  highlights[currentPassage].push(text);
  toolbar.classList.remove("show");
  toolbar.style.display = "none";
  window.getSelection().removeAllRanges();
});

removeBtn.addEventListener("click", () => {
  const selection = window.getSelection();
  if (selection.rangeCount) {
    const range = selection.getRangeAt(0);
    let parent = range.commonAncestorContainer;
    if (parent.nodeType === 3) parent = parent.parentNode;
    if (parent.tagName === "SPAN" && parent.classList.contains("bg-yellow-300")) {
      const text = parent.textContent;
      parent.replaceWith(document.createTextNode(text));
      if (highlights[currentPassage]) {
        highlights[currentPassage] = highlights[currentPassage].filter(item => item !== text);
      }
    }
  }
  toolbar.classList.remove("show");
  toolbar.style.display = "none";
});

clearBtn.addEventListener("click", () => {
  passageEl.querySelectorAll("span.bg-yellow-300").forEach(span => {
    const text = document.createTextNode(span.textContent);
    span.replaceWith(text);
  });
  highlights[currentPassage] = [];
  toolbar.classList.remove("show");
  toolbar.style.display = "none";
});

// Timer
let totalSeconds = 60 * 60;
const timerElement = document.getElementById("timer");
function startTimer() {
  const interval = setInterval(() => {
    totalSeconds--;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    timerElement.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    if (totalSeconds <= 0) {
      clearInterval(interval);
      alert("⏳ Time is up! Submitting your answers...");
      submitTest();
    }
  }, 1000);
}
startTimer();

function submitTest() {
  let score = 0;
  let total = 0;
  let resultHTML = "";
  passages.forEach((p, pIndex) => {
    resultHTML += `<h3 class="font-semibold text-lg mt-4">${p.title}</h3>`;
    p.questions.forEach((q, qIndex) => {
      total++;
      const key = `${pIndex}-${qIndex}`;
      const userAnswer = answers[key] || "No answer";
      let correctAnswer = q.type === "mcq" ? q.options[q.correct] : q.correct.toString();
      const isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();
      if (isCorrect) score++;
      resultHTML += `<div class="text-sm ${isCorrect ? 'text-green-600' : 'text-red-600'}">
        Q${qIndex + 1}: Your answer: <strong>${userAnswer}</strong> | Correct: <strong>${correctAnswer}</strong>
      </div>`;
    });
  });
  document.getElementById("result-score").textContent = `✅ You scored ${score} out of ${total}`;
  document.getElementById("detailed-result").innerHTML = resultHTML;
  document.getElementById("result-section").classList.remove("hidden");
  document.querySelector("section").classList.add("hidden");
  document.getElementById("submit-section").classList.add("hidden");
}

function restartTest() {
  location.reload();
}

renderPassage();
