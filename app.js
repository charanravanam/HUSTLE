// app.js
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burgerBtn');
    const navMenu = document.getElementById('navMenu');
    const darkToggle = document.getElementById('darkToggle');

    if (burger) burger.addEventListener('click', () => navMenu.classList.toggle('hidden'));
    if (darkToggle) darkToggle.addEventListener('click', () => document.body.classList.toggle('dark'));
});


// Profile handling
const profileForm = document.getElementById('profileForm');
if (profileForm) {
    const previewPic = document.getElementById('previewPic');
    const fileInput = document.getElementById('profilePic');
    fileInput.addEventListener('change', e => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => { previewPic.src = reader.result; };
            reader.readAsDataURL(file);
        }
    });

    profileForm.addEventListener('submit', e => {
        e.preventDefault();
        const profileData = {
            name: document.getElementById('profileName').value,
            college: document.getElementById('collegeName').value,
            mobile: document.getElementById('mobileNumber').value,
            photo: previewPic.src,
        };
        localStorage.setItem('userProfile', JSON.stringify(profileData));
        showToast('Profile Saved Successfully!');
    });

    // Load from localStorage if exists
    const saved = JSON.parse(localStorage.getItem('userProfile') || '{}');
    if (saved.name) {
        document.getElementById('profileName').value = saved.name;
        document.getElementById('collegeName').value = saved.college;
        document.getElementById('mobileNumber').value = saved.mobile;
        previewPic.src = saved.photo || previewPic.src;
    }
}

// const grid = document.getElementById('opportunitiesGrid');
// if (grid) renderEvents();


function renderEvents() {
    const grid = document.getElementById('opportunitiesGrid');
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    if (!grid) return;
    grid.innerHTML = events.length
        ? events.map(evt => `
      <div class="card">
        <img src="${evt.image}" alt="">
        <div class="card-content">
          <h3>${evt.title}</h3>
          <p>${evt.organizer} • ${evt.location}</p>
        </div>
      </div>`).join('')
        : '<p style="text-align:center;padding:2rem;">No opportunities currently available.</p>';
}

function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => toast.remove(), 3500);
}

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        showToast('Message sent successfully!');
        contactForm.reset();
    });
}

// Assuming event data objects have details for title, organizer, logo, prize, registered, daysLeft, description and applyLink

// Example static list (replace with your real events or localStorage)
const events = [
    {
        id: 1,
        title: "Founders on the Loose: AI Pitch‑Off",
        organizer: "Ashoka University",
        logo: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Hackathon_logo.png",
        prize: "₹ 30,000",
        registered: "8,077 Impressions",
        daysLeft: "27 days left",
        description: "An AI pitch-off event connecting founders with investors in an exciting competition.",
        applyLink: "https://example.com/apply"
    },
    // Add more events here...
];

// Render Event List dynamically with click handler
function renderEvents() {
    const grid = document.getElementById('opportunitiesGrid');
    if (!grid) return;

    grid.innerHTML = events.map((evt, idx) => `
    <div class="event-item" data-id="${evt.id}">
      <div class="event-top">
        <img src="${evt.logo}" alt="Logo" class="event-icon"/>
        <div class="event-info">
          <h3>${evt.title}</h3>
          <p class="organizer">by ${evt.organizer}</p>
        </div>
      </div>
      <div class="event-middle">
        <span class="prize">🏆 ${evt.prize}</span>
        <span class="registered">👁 ${evt.registered}</span>
        <span class="days-left">🕒 ${evt.daysLeft}</span>
      </div>
    </div>
  `).join('');

    // Add click event on each card:
    document.querySelectorAll('.event-item').forEach(item => {
        item.addEventListener('click', () => {
            const id = parseInt(item.getAttribute('data-id'));
            openEventDetails(id);
        });
    });
}

// Show modal with event details
function openEventDetails(id) {
    const event = events.find(e => e.id === id);
    if (!event) return;

    document.getElementById('modalTitle').textContent = event.title;
    document.getElementById('modalOrganizer').textContent = `by ${event.organizer}`;
    document.getElementById('modalLogo').src = event.logo;
    document.getElementById('modalPrize').textContent = `🏆 ${event.prize}`;
    document.getElementById('modalRegistered').textContent = `👁 ${event.registered}`;
    document.getElementById('modalDaysLeft').textContent = `🕒 ${event.daysLeft}`;
    document.getElementById('modalDescription').textContent = event.description;
    const applyBtn = document.getElementById('modalApplyLink');
    applyBtn.href = event.applyLink;

    document.getElementById('eventDetailModal').classList.remove('hidden');
}

document.getElementById('modalCloseBtn').addEventListener('click', () => {
    document.getElementById('eventDetailModal').classList.add('hidden');
});

// Initialize render on dom ready
document.addEventListener('DOMContentLoaded', () => {
    //renderEvents();
});

