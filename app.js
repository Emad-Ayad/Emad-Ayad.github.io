// app.js

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderProjects();
    setupEventListeners();
    setupScrollAnimations();
    setupScrollSpy();
    setupMouseGlow();
});

// --- Theme Management ---
function initTheme() {
    const saved = localStorage.getItem("portfolio-theme") || "dark";
    document.documentElement.setAttribute("data-theme", saved);
    updateThemeIcon(saved);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    const target = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", target);
    localStorage.setItem("portfolio-theme", target);
    updateThemeIcon(target);
}

function updateThemeIcon(theme) {
    const btn = document.getElementById("themeToggle");
    if (btn) btn.textContent = theme === "dark" ? "☀️" : "🌙";
}

// --- Project Rendering ---
let isExpanded = false;
let currentFilter = "all";

function renderProjects() {
    const grid = document.getElementById("projectsGrid");
    const toggleBtn = document.getElementById("btnToggleProjects");
    
    if (!grid) return;

    const filtered = window.PROJECTS_DATA.filter(p => currentFilter === "all" || p.category === currentFilter);
    const toDisplay = (currentFilter === "all" && !isExpanded) ? filtered.slice(0, 3) : filtered;

    grid.innerHTML = toDisplay.map(proj => createProjectCardHtml(proj)).join("");

    if (toggleBtn) {
        if (filtered.length <= 3) {
            toggleBtn.style.display = 'none';
        } else {
            toggleBtn.style.display = 'inline-flex';
            toggleBtn.innerHTML = isExpanded 
                ? `<span>Show Less</span> <span>↑</span>`
                : `<span>Show All Projects (${filtered.length})</span> <span>↓</span>`;
        }
    }
}

function createProjectCardHtml(proj) {
    const badgesHtml = proj.badges.map(b => `<span class="badge" style="color: ${proj.themeColor}; background: ${proj.themeColor}22">${b}</span>`).join('');
    const platformIcon = proj.category === 'ios' ? ' Native iOS' : '⚡ Flutter & Dart';
    const hasCoverImage = proj.coverImage && !proj.coverImage.endsWith('title.webp');
    
    return `
    <article class="project-card fade-in" onclick="openProjectModal('${proj.id}')">
        <div class="project-card-header" style="background: linear-gradient(135deg, ${proj.themeColor}28, ${proj.themeColor}10);">
            <div class="project-platform-badge" style="border-color: ${proj.themeColor}44; color: ${proj.themeColor};">
                ${platformIcon}
            </div>
            ${hasCoverImage 
                ? `<div class="project-cover-container"><img src="${proj.coverImage}" alt="${proj.title}" class="project-cover-img" onerror="this.parentElement.innerHTML='<span class=\\'project-initials\\' style=\\'color:${proj.themeColor}\\'>${proj.title}</span>'"></div>`
                : `<div class="project-mockup-visual"><span class="project-initials" style="color: ${proj.themeColor}">${proj.title}</span></div>`
            }
        </div>
        <div class="project-content">
            <div class="project-badges">${badgesHtml}</div>
            <h3 class="project-title">${proj.title}</h3>
            <p class="project-tagline">${proj.tagline}</p>
            <p class="project-summary-short">${proj.summary.substring(0, 110)}...</p>
            <div class="project-links">
                <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="link-btn" onclick="event.stopPropagation()">GitHub ↗</a>
                <button class="btn-deep-dive" onclick="openProjectModal('${proj.id}'); event.stopPropagation()">Deep Dive →</button>
            </div>
        </div>
    </article>
    `;
}

function toggleProjects() {
    isExpanded = !isExpanded;
    renderProjects();
    setupScrollAnimations();
}

function setFilter(category, btnElement) {
    currentFilter = category;
    isExpanded = false; // Reset expansion when changing filters
    
    // Update active button state
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (btnElement) {
        btnElement.classList.add('active');
    } else {
        const matchingBtn = document.querySelector(`.filter-btn[onclick*="'${category}'"]`);
        if (matchingBtn) matchingBtn.classList.add('active');
    }

    renderProjects();
    setupScrollAnimations();
}

// --- Quick Copy Email ---
function copyEmail(btn) {
    const email = "emadayad228@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
        const badge = btn.querySelector('.copy-badge');
        if (badge) {
            const originalText = badge.textContent;
            badge.textContent = "Copied! ✓";
            badge.classList.add('copied');
            setTimeout(() => {
                badge.textContent = originalText;
                badge.classList.remove('copied');
            }, 2000);
        }
    }).catch(() => {
        window.location.href = `mailto:${email}`;
    });
}

// --- Modal Management ---
function openProjectModal(projectId) {
    const proj = window.PROJECTS_DATA.find(p => p.id === projectId);
    if (!proj) return;

    const modal = document.getElementById("projectModal");
    const modalContent = document.getElementById("modalContent");
    if (!modal || !modalContent) return;

    modalContent.innerHTML = `
        <div class="modal-header">
            <h2 style="color: ${proj.themeColor}">${proj.title}</h2>
            <button class="modal-close" onclick="closeModal()">×</button>
        </div>
        <div class="modal-body">
            <p class="modal-tagline">${proj.tagline}</p>
            
            ${(proj.gallery && proj.gallery.some(img => !img.endsWith('title.webp'))) ? `
            <div class="modal-section">
                <h3>App Screenshots</h3>
                <div class="modal-gallery-scroll">
                    ${proj.gallery.filter(img => !img.endsWith('title.webp')).map(img => `
                        <div class="modal-screenshot-frame">
                            <img src="${img}" alt="${proj.title} screenshot" class="modal-screenshot-img" loading="lazy">
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}

            <div class="modal-section">
                <h3>Overview</h3>
                <p>${proj.summary}</p>
                <ul>
                    ${proj.highlights.map(h => `<li>${h}</li>`).join('')}
                </ul>
            </div>
            
            <div class="modal-section">
                <h3>Architecture & Tech Stack</h3>
                <div class="tech-stack-tags">
                    ${proj.techStack.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                </div>
                <div class="architecture-details">
                    <p><strong>Pattern:</strong> ${proj.architecture.pattern}</p>
                    <p><strong>Layers:</strong> ${proj.architecture.layers}</p>
                    <p><strong>Key Decisions:</strong> ${proj.architecture.keyDecisions}</p>
                </div>
            </div>

            <div class="modal-footer">
                <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn primary-btn" style="background-color: ${proj.themeColor}; color: #1a212b; font-weight: 700;">View Source Code ↗</a>
            </div>
        </div>
    `;

    modal.classList.add("active");
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeModal() {
    const modal = document.getElementById("projectModal");
    if (modal) {
        modal.classList.remove("active");
        document.body.style.overflow = ''; 
    }
}

// --- Contact Form ---
async function handleContactSubmit(event) {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const statusMsg = document.getElementById("formStatusMsg");
    const submitBtn = document.getElementById("submitContact");
    
    // Using Emad's email from CV
    const targetEmail = "emadayad228@gmail.com";

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
        const res = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify({ name, email, message, _subject: `Portfolio Inquiry from ${name}` })
        });

        const data = await res.json();

        if (res.ok && data.success === "true") {
            statusMsg.className = "form-status-msg success";
            statusMsg.textContent = "✓ Message sent successfully! I'll get back to you soon.";
            document.getElementById("contactForm").reset();
        } else {
            // Formsubmit might require activation on the first run
            if (data.message && data.message.includes("activation")) {
                statusMsg.className = "form-status-msg success";
                statusMsg.textContent = "Activation required! Please check your email inbox to activate FormSubmit.";
            } else {
                throw new Error("FormSubmit Error");
            }
        }
    } catch (err) {
        // Fallback: Mailto link
        window.location.href = `mailto:${targetEmail}?subject=Portfolio Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}`;
        statusMsg.className = "form-status-msg success";
        statusMsg.textContent = "Opening your email client as fallback...";
    } finally {
        submitBtn.textContent = "Send Message";
        submitBtn.disabled = false;
    }
}

// --- Event Listeners Setup ---
function setupEventListeners() {
    const themeBtn = document.getElementById("themeToggle");
    if (themeBtn) themeBtn.addEventListener("click", toggleTheme);

    const toggleProjBtn = document.getElementById("btnToggleProjects");
    if (toggleProjBtn) toggleProjBtn.addEventListener("click", toggleProjects);

    const contactForm = document.getElementById("contactForm");
    if (contactForm) contactForm.addEventListener("submit", handleContactSubmit);

    // Close modal on outside click
    const modal = document.getElementById("projectModal");
    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // Escape key to close modal
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });
}

// --- Scroll Animations ---
function setupScrollAnimations() {
    const faders = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
}

// --- ScrollSpy for Navigation ---
function setupScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    function onScroll() {
        const scrollY = window.pageYOffset + 140;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('nav-active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('nav-active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

// --- Mouse Glow Effect (Optimized with requestAnimationFrame) ---
function setupMouseGlow() {
    const glow = document.getElementById('mouse-glow');
    if (!glow) return;

    let mouseX = 0, mouseY = 0;
    let ticking = false;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!ticking) {
            window.requestAnimationFrame(() => {
                glow.style.transform = `translate(${mouseX - 300}px, ${mouseY - 300}px)`;
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}
