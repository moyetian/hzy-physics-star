/* Split from script.js. Loaded as a plain browser script. */
function createLearningState() {
  return {
    attempts: 0,
    correct: 0,
    labs: {},
    topics: {},
    mistakes: []
  };
}

function getLearningState() {
  const saved = readJson(storageKeys.learning, createLearningState());
  return {
    ...createLearningState(),
    ...saved,
    topics: saved.topics || {},
    labs: saved.labs || {},
    mistakes: Array.isArray(saved.mistakes) ? saved.mistakes : []
  };
}

function saveLearningState(state) {
  writeJson(storageKeys.learning, state);
}

function makeQuestionKey(type, item) {
  return `${type}:${item.topic || "实验"}:${item.question || item.prompt || item.title}`;
}

function recordLearningAttempt(type, item, isCorrect) {
  const state = getLearningState();
  const topic = item.topic || "实验模型";
  const topicState = state.topics[topic] || { attempts: 0, correct: 0, mistakes: 0 };

  state.attempts += 1;
  if (isCorrect) state.correct += 1;
  topicState.attempts += 1;
  if (isCorrect) topicState.correct += 1;
  else topicState.mistakes += 1;
  state.topics[topic] = topicState;

  if (!isCorrect) {
    const key = makeQuestionKey(type, item);
    const existing = state.mistakes.find((mistake) => mistake.key === key);
    if (existing) {
      existing.count += 1;
      existing.updatedAt = new Date().toISOString();
    } else {
      state.mistakes.unshift({
        key,
        type,
        topic,
        title: item.question || item.prompt || item.title,
        explain: item.explain,
        count: 1,
        updatedAt: new Date().toISOString()
      });
    }
    state.mistakes = state.mistakes
      .sort((a, b) => b.count - a.count || new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, 12);
  }

  saveLearningState(state);
  renderLearningCompanion();
  renderDataSummary();
}

function recordLabLearning(experiment) {
  const state = getLearningState();
  state.labs[experiment.id] = {
    title: experiment.title,
    completedAt: new Date().toISOString()
  };
  saveLearningState(state);
  renderLearningCompanion();
  renderDataSummary();
}

function clearMistakeNebula() {
  const state = getLearningState();
  state.mistakes = [];
  Object.values(state.topics).forEach((topic) => {
    topic.mistakes = 0;
  });
  saveLearningState(state);
  renderLearningCompanion();
  renderDataSummary();
}

function practiceMistakeTopic() {
  const state = getLearningState();
  const firstMistake = state.mistakes[0];
  if (!firstMistake) {
    quizFeedback.textContent = "错题星云现在是空的，先随便练几题也很好。";
    return;
  }

  const topicQuestions = quizQuestions.filter((question) => question.topic === firstMistake.topic);
  quizRoundQuestions = shuffleList(topicQuestions.length ? topicQuestions : quizQuestions).slice(0, QUIZ_ROUND_SIZE);
  quizIndex = 0;
  quizCorrect = 0;
  renderQuiz();
  quizFeedback.textContent = `这轮先回到“${firstMistake.topic}”。`;
  document.querySelector("#games").scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderLearningCompanion() {
  const state = getLearningState();
  renderMistakeNebula(state);
  renderKnowledgeMap(state);
  renderAchievements(state);
}

function renderMistakeNebula(state) {
  if (!mistakeList) return;
  mistakeCount.textContent = state.mistakes.reduce((sum, mistake) => sum + mistake.count, 0);
  reviewMistakeButton.disabled = state.mistakes.length === 0;
  clearMistakesButton.disabled = state.mistakes.length === 0;

  if (!state.mistakes.length) {
    mistakeList.innerHTML = `<p class="nebula-empty">这里会自动收集答错的快问题和配对题。现在很干净，可以继续探索。</p>`;
    return;
  }

  mistakeList.innerHTML = state.mistakes
    .slice(0, 4)
    .map(
      (mistake) => `
        <div class="nebula-item">
          <strong>${mistake.topic} · ${mistake.count} 次</strong>
          <span>${escapeHtml(mistake.title.replace(/^【[^】]+】/, ""))}</span>
          <span>${escapeHtml(mistake.explain)}</span>
        </div>
      `
    )
    .join("");
}

function renderKnowledgeMap(state) {
  if (!knowledgeMap) return;
  const topics = [...new Set([...quizKnowledgePoints, ...formulaKnowledgePoints].map((point) => point.topic))];
  const practicedTopics = topics.filter((topic) => state.topics[topic]?.attempts > 0).length;
  knowledgeTotal.textContent = `${Math.round((practicedTopics / topics.length) * 100)}%`;

  knowledgeMap.innerHTML = topics
    .map((topic) => {
      const item = state.topics[topic] || { attempts: 0, correct: 0, mistakes: 0 };
      const totalForTopic =
        quizQuestions.filter((question) => question.topic === topic).length +
        matchCards.filter((card) => card.prompt?.includes(`【${topic}】`)).length;
      const width = Math.min(100, Math.round((item.attempts / Math.max(6, totalForTopic * 0.12)) * 100));
      const accuracy = item.attempts ? `${Math.round((item.correct / item.attempts) * 100)}%` : "未练";
      return `
        <div class="knowledge-row">
          <strong>${escapeHtml(topic)}</strong>
          <span class="knowledge-track" style="--knowledge-width: ${width}%"><span></span></span>
          <span>${accuracy}</span>
        </div>
      `;
    })
    .join("");
}

function renderAchievements(state) {
  if (!achievementList) return;
  const missionState = readJson(storageKeys.missions, {});
  const achievements = [
    {
      title: "第一次点亮",
      text: "完成任意一道快问或配对。",
      unlocked: state.attempts >= 1
    },
    {
      title: "错题会发光",
      text: "把一道错题收进星云。",
      unlocked: state.mistakes.length >= 1
    },
    {
      title: "走过三片星域",
      text: "练过 3 个不同知识点。",
      unlocked: Object.values(state.topics).filter((topic) => topic.attempts > 0).length >= 3
    },
    {
      title: "实验记录员",
      text: "完成 3 个不同实验。",
      unlocked: Object.keys(state.labs).length >= 3
    },
    {
      title: "安静坚持",
      text: "完成 10 次练习。",
      unlocked: state.attempts >= 10
    },
    {
      title: "纪念册探索者",
      text: "星光清单完成 5 项。",
      unlocked: Object.values(missionState).filter(Boolean).length >= 5
    }
  ];
  const unlockedCount = achievements.filter((achievement) => achievement.unlocked).length;
  achievementCount.textContent = `${unlockedCount}/${achievements.length}`;
  achievementList.innerHTML = achievements
    .map(
      (achievement) => `
        <div class="achievement-item ${achievement.unlocked ? "is-unlocked" : ""}">
          <strong>${achievement.unlocked ? "已点亮" : "未点亮"} · ${escapeHtml(achievement.title)}</strong>
          <span>${escapeHtml(achievement.text)}</span>
        </div>
      `
    )
    .join("");
}
