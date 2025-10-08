
const grid = document.getElementById('itemsGrid');
const form = document.getElementById('itemForm');
const titleEl = document.getElementById('title');
const descriptionEl = document.getElementById('description');
const languageEl = document.getElementById('language');
const refreshBtn = document.getElementById('refreshBtn');

refreshBtn.addEventListener('click', fetchAndRenderItems);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const newItem = {
    title: titleEl.value.trim(),
    description: descriptionEl.value.trim(),
    language: languageEl.value
  };
  if (!newItem.title || !newItem.description) return;
  await createItem(newItem);
  form.reset();
  await fetchAndRenderItems();
});


async function fetchAndRenderItems() {
  grid.innerHTML = '';
  try {
    const items = await fetchItems();
    if (!Array.isArray(items)) return;
    items.forEach((it) => grid.appendChild(renderItemCard(it)));
  } catch (err) {
    grid.innerHTML = `<div class="card"><p>Failed to load items from ${getApiBase()}. Is the backend running?</p></div>`;
  }
}


// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize UX4G Map
    if (typeof UX4G !== 'undefined' && UX4G.map) {
        UX4G.map.init({
            container: 'ux4g-map',
            // Optional configurations
            theme: 'light', // or 'dark'
            interactive: true,
            showStateNames: true
        });
    } else {
        console.error('UX4G Map library not loaded properly');
    }
});


// Initial load
fetchAndRenderItems();
const features = [
  {
    icon: "🌐",
    title: "22+ Indian Languages",
    description: "Support for all major Indian regional languages and dialects for inclusive learning.",
  },
  {
    icon: "🧭",
    title: "Cultural Adaptation",
    description: "Content culturally adapted to resonate with learners across different regions.",
  },
  {
    icon: "🎙️",
    title: "Speech Features",
    description: "Advanced speech-to-text and text-to-speech for accessibility.",
  },
  {
    icon: "📄",
    title: "Multi-Format Support",
    description: "Translate text, audio, video, and assessment materials seamlessly.",
  },
  {
    icon: "📊",
    title: "Domain-Specific",
    description: "Industry and skill-specific terminology banks for accuracy.",
  },
  {
    icon: "⚡",
    title: "AI-Powered",
    description: "Continuous improvement through ML feedback loops and AI optimization.",
  },
];

const featuresGrid = document.getElementById("features-grid");

features.forEach(feature => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <div class="card-icon" style="font-size: 2rem; margin-bottom: 1rem;">${feature.icon}</div>
    <h3>${feature.title}</h3>
    <p>${feature.description}</p>
  `;
  featuresGrid.appendChild(card);
});



/*Translation section*/
document.addEventListener("DOMContentLoaded", () => {
  const langs = [
    { value: "english", label: "English" },
    { value: "hindi", label: "Hindi (हिंदी)" },
    { value: "bengali", label: "Bengali (বাংলা)" },
    { value: "telugu", label: "Telugu (తెలుగు)" },
    { value: "marathi", label: "Marathi (मराठी)" },
    { value: "tamil", label: "Tamil (தமிழ்)" },
    { value: "gujarati", label: "Gujarati (ગુજરાતી)" },
    { value: "urdu", label: "Urdu (اردو)" },
    { value: "kannada", label: "Kannada (ಕನ್ನಡ)" },
    { value: "odia", label: "Odia (ଓଡ଼ିଆ)" },
    { value: "malayalam", label: "Malayalam (മലയാളം)" },
    { value: "punjabi", label: "Punjabi (ਪੰਜਾਬੀ)" }
  ];

  const sourceSelect = document.getElementById("sourceLang");
  const targetSelect = document.getElementById("targetLang");

  langs.forEach(lang => {
    const opt1 = document.createElement("option");
    opt1.value = lang.value;
    opt1.textContent = lang.label;
    sourceSelect.appendChild(opt1);

    const opt2 = document.createElement("option");
    opt2.value = lang.value;
    opt2.textContent = lang.label;
    targetSelect.appendChild(opt2);
  });

  sourceSelect.value = "english";
  targetSelect.value = "hindi";

  // Add your translateBtn click listener here or separately but also inside DOMContentLoaded or after elements exist
  document.getElementById("translateBtn").addEventListener("click", () => {
    const text = document.getElementById("sourceText").value.trim();
    const toastMsg = document.getElementById("toastMsg");
    const translateBtn = document.getElementById("translateBtn");
    const translatedText = document.getElementById("translatedText");

    if (!text) {
      toastMsg.style.color = "red";
      toastMsg.textContent = "❌ Please enter text to translate.";
      return;
    }

    toastMsg.style.color = "black";
    toastMsg.textContent = "⏳ Translating...";
    translateBtn.disabled = true;

    setTimeout(() => {
      const translated = `✨ [Translated ${targetSelect.value} version of your text]`;
      translatedText.value = translated;

      toastMsg.style.color = "green";
      toastMsg.textContent = "✅ Translation completed successfully!";
      translateBtn.disabled = false;
    }, 1200);
  });
});



/*dashboard section*/
const dashTrans = [
  { title: "Welding Safety Guide", source: "English", target: "Hindi", status: "completed", date: "2025-09-15" },
  { title: "Plumbing Basics", source: "English", target: "Tamil", status: "processing", date: "2025-03-15" },
  { title: "Electrical Wiring Manual", source: "English", target: "Bengali", status: "completed", date: "2024-09-14" },
  { title: "Carpentry Assessment", source: "Hindi", target: "Marathi", status: "completed", date: "2025-09-14" },
  { title: "HVAC Training Module", source: "English", target: "Telugu", status: "pending", date: "2025-09-13" }
];

// Fill Table
const dashTable = document.querySelector("#recentTable tbody");
dashTrans.forEach(item => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${item.title}</td>
    <td>${item.source}</td>
    <td>${item.target}</td>
    <td><span class="status-badge status-${item.status}">${item.status}</span></td>
    <td>${item.date}</td>
  `;
  dashTable.appendChild(row);
});

// Language Distribution
const dashLangs = [
  { name: "Hindi", count: 342, percent: 35 },
  { name: "Tamil", count: 289, percent: 30 },
  { name: "Bengali", count: 234, percent: 25 },
  { name: "Telugu", count: 156, percent: 16 },
  { name: "Marathi", count: 123, percent: 13 }
];

const langContainer = document.getElementById("langList");
dashLangs.forEach(lang => {
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="lang-item">
      <strong>${lang.name}</strong> - ${lang.count} translations
      <div class="progress"><div class="progress-fill" style="width:${lang.percent}%"></div></div>
    </div>
  `;
  langContainer.appendChild(div);
});

// Content Types
const dashContent = [
  { type: "Text Documents", count: 523 },
  { type: "Video Subtitles", count: 412 },
  { type: "Audio Transcripts", count: 189 },
  { type: "Assessments", count: 123 }
];

const contentContainer = document.getElementById("contentList");
dashContent.forEach(c => {
  const div = document.createElement("div");
  div.classList.add("content-item");
  div.innerHTML = `
    <span>${c.type}</span>
    <span>${c.count}</span>
  `;
  contentContainer.appendChild(div);
});



/*Dev section*/
const dev = [
  {
    icon: "🎯",
    title: "Mission",
    description:
      "To democratize access to skill education by breaking language barriers and making vocational training accessible to every Indian learner, regardless of their linguistic background.",
  },
  {
    icon: "🤝",
    title: "Inclusivity",
    description:
      "We believe that language should never be a barrier to learning. Our platform ensures that quality skill training content reaches learners in their native language.",
  },
  {
    icon: "💡",
    title: "Innovation",
    description:
      "Leveraging cutting-edge AI and machine learning to continuously improve translation quality and cultural adaptation for better learning outcomes.",
  },
  {
    icon: "🏆",
    title: "Excellence",
    description:
      "Committed to maintaining the highest standards in translation accuracy, domain-specific terminology, and cultural sensitivity.",
  },
];

// Render Dev Section
const devContainer = document.getElementById("dev");
if (devContainer) {
  dev.forEach((item) => {
    const div = document.createElement("div");
    div.className = "dev-xoxo";
    div.innerHTML = `
      <div class="dev-icon">${item.icon}</div>
      <h4>${item.title}</h4>
      <p>${item.description}</p>
    `;
    devContainer.appendChild(div);
  });
} else {
  console.warn('#dev container not found; skipping Core Values render.');
}



/*Contact form section*/
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const submitBtn = document.getElementById("submitBtn");
  const responseMsg = document.getElementById("responseMsg");

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  setTimeout(() => {
    responseMsg.textContent = "✅ Message Sent! Thank you for contacting us. We'll get back to you soon.";
    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message";
    this.reset();
  }, 1000);
});

document.getElementById("apiBtn").addEventListener("click", () => {
  alert("📘 API documentation request feature coming soon!");
});



/*footer section*/
// Simple script to show a small animation on footer links

const linkHoverList = document.querySelectorAll(".foot-link");

linkHoverList.forEach((anchor) => {
  anchor.addEventListener("mouseenter", () => {
    anchor.style.fontWeight = "600";
    anchor.style.transform = "scale(1.05)";
  });

  anchor.addEventListener("mouseleave", () => {
    anchor.style.fontWeight = "400";
    anchor.style.transform = "scale(1)";
  });
});

// Add subtle color flash for contact info
const contactItems = document.querySelectorAll(".foot-list li");
contactItems.forEach((item) => {
  item.addEventListener("mouseover", () => {
    item.style.color = "#0d6efd";
  });
  item.addEventListener("mouseout", () => {
    item.style.color = "#555";
  });
});







