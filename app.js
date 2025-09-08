// Application Data
const appData = {
  projects: [
    {id: 1, name: "Downtown Office Complex", status: "In Progress", progress: 65, startDate: "2024-08-01", endDate: "2025-02-15", client: "Metro Developments", location: "Downtown District"},
    {id: 2, name: "Residential Villa", status: "In Progress", progress: 40, startDate: "2024-09-15", endDate: "2024-12-30", client: "Johnson Family", location: "Hillside Avenue"},
    {id: 3, name: "Shopping Center Renovation", status: "Planning", progress: 15, startDate: "2024-10-01", endDate: "2025-04-20", client: "Retail Properties Inc", location: "Main Street Mall"}
  ],
  workers: [
    {id: 1, name: "John Martinez", role: "Foreman", avatar: "JM", status: "online", projects: [1, 2]},
    {id: 2, name: "Sarah Chen", role: "Electrician", avatar: "SC", status: "online", projects: [1, 3]},
    {id: 3, name: "Mike Rodriguez", role: "Plumber", avatar: "MR", status: "offline", projects: [2]},
    {id: 4, name: "Lisa Thompson", role: "Painter", avatar: "LT", status: "online", projects: [1]}
  ],
  updates: [
    {id: 1, workerId: 1, workerName: "John Martinez", projectId: 1, projectName: "Downtown Office Complex", description: "Foundation pouring completed for the east wing. Concrete quality looks excellent, ready for curing.", timestamp: "2024-09-08T10:30:00", workType: "Foundation", location: "East Wing", photoUrl: "construction-photo-1.jpg"},
    {id: 2, workerId: 2, workerName: "Sarah Chen", projectId: 1, projectName: "Downtown Office Complex", description: "Electrical rough-in completed for floors 2-4. All conduits installed and tested.", timestamp: "2024-09-08T14:15:00", workType: "Electrical", location: "Floors 2-4", photoUrl: "construction-photo-2.jpg"},
    {id: 3, workerId: 1, workerName: "John Martinez", projectId: 2, projectName: "Residential Villa", description: "Framing work 80% complete. Master bedroom and living room frames are ready for inspection.", timestamp: "2024-09-07T16:45:00", workType: "Framing", location: "Main Level", photoUrl: "construction-photo-3.jpg"},
    {id: 4, workerId: 3, workerName: "Mike Rodriguez", projectId: 2, projectName: "Residential Villa", description: "Plumbing rough-in started in bathrooms. Water lines installed for master bath.", timestamp: "2024-09-07T09:20:00", workType: "Plumbing", location: "Master Bathroom", photoUrl: "construction-photo-4.jpg"}
  ],
  workTypes: ["Foundation", "Framing", "Electrical", "Plumbing", "Drywall", "Flooring", "Painting", "Roofing", "HVAC", "Insulation"],
  stats: {activeProjects: 3, workersOnline: 3, photosToday: 8, tasksCompleted: 15}
};

// DOM Elements
const elements = {
  navLinks: document.querySelectorAll('.nav-link'),
  views: document.querySelectorAll('.view'),
  mobileMenuToggle: document.querySelector('.mobile-menu-toggle'),
  sidebar: document.querySelector('.sidebar'),
  uploadForm: document.getElementById('uploadForm'),
  successMessage: document.getElementById('successMessage'),
  photoInput: document.getElementById('photoInput'),
  photoPreview: document.getElementById('photoPreview'),
  photoModal: document.getElementById('photoModal'),
  modalOverlay: document.getElementById('modalOverlay'),
  modalClose: document.getElementById('modalClose'),
  modalBody: document.getElementById('modalBody')
};

// Application State
let currentView = 'dashboard';
let nextUpdateId = 5;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
  setupEventListeners();
  renderDashboard();
  simulateLiveUpdates();
});

function initializeApp() {
  // Populate form selects
  populateProjectSelects();
  populateWorkTypeSelects();
  populateFilterSelects();
  
  // Update stats
  updateStats();
}

function setupEventListeners() {
  // Navigation
  elements.navLinks.forEach(link => {
    link.addEventListener('click', function() {
      const viewName = this.dataset.view;
      switchView(viewName);
    });
  });
  
  // Mobile menu toggle
  elements.mobileMenuToggle?.addEventListener('click', toggleMobileMenu);
  
  // Upload form
  elements.uploadForm?.addEventListener('submit', handleUploadSubmit);
  
  // Photo input
  elements.photoInput?.addEventListener('change', handlePhotoPreview);
  
  // Modal
  elements.modalOverlay?.addEventListener('click', closeModal);
  elements.modalClose?.addEventListener('click', closeModal);
  
  // Filters
  document.getElementById('projectFilter')?.addEventListener('change', filterPhotos);
  document.getElementById('workTypeFilter')?.addEventListener('change', filterPhotos);
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!elements.sidebar?.contains(e.target) && !elements.mobileMenuToggle?.contains(e.target)) {
      elements.sidebar?.classList.remove('open');
    }
  });
}

function switchView(viewName) {
  // Update navigation
  elements.navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.dataset.view === viewName) {
      link.classList.add('active');
    }
  });
  
  // Update views
  elements.views.forEach(view => {
    view.classList.remove('active');
    if (view.id === viewName) {
      view.classList.add('active');
    }
  });
  
  currentView = viewName;
  
  // Render view-specific content
  switch(viewName) {
    case 'dashboard':
      renderDashboard();
      break;
    case 'projects':
      renderProjects();
      break;
    case 'photos':
      renderPhotoGallery();
      break;
    case 'workers':
      renderWorkers();
      break;
  }
  
  // Close mobile menu
  elements.sidebar?.classList.remove('open');
}

function toggleMobileMenu() {
  elements.sidebar?.classList.toggle('open');
}

function renderDashboard() {
  renderProjectProgress();
  renderRecentUpdates();
}

function renderProjectProgress() {
  const container = document.getElementById('projectProgress');
  if (!container) return;
  
  container.innerHTML = appData.projects.map(project => `
    <div class="progress-item">
      <div class="progress-header">
        <span class="progress-name">${project.name}</span>
        <span class="progress-percentage">${project.progress}%</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${project.progress}%"></div>
      </div>
    </div>
  `).join('');
}

function renderRecentUpdates() {
  const container = document.getElementById('recentUpdates');
  if (!container) return;
  
  const recentUpdates = [...appData.updates]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 5);
  
  container.innerHTML = recentUpdates.map(update => {
    const worker = appData.workers.find(w => w.id === update.workerId);
    const timeAgo = getTimeAgo(update.timestamp);
    
    return `
      <div class="update-item">
        <div class="update-avatar">${worker?.avatar || 'W'}</div>
        <div class="update-content">
          <div class="update-header">
            <span class="update-worker">${update.workerName}</span>
            <span class="update-project">• ${update.projectName}</span>
            <span class="update-timestamp">${timeAgo}</span>
          </div>
          <div class="update-description">${update.description}</div>
        </div>
      </div>
    `;
  }).join('');
}

function renderProjects() {
  const container = document.getElementById('projectsGrid');
  if (!container) return;
  
  container.innerHTML = appData.projects.map(project => `
    <div class="project-card">
      <div class="project-header">
        <h3 class="project-name">${project.name}</h3>
        <p class="project-client">${project.client}</p>
      </div>
      <div class="project-body">
        <div class="project-details">
          <div class="project-detail">
            <div class="project-detail-label">Location</div>
            <div class="project-detail-value">${project.location}</div>
          </div>
          <div class="project-detail">
            <div class="project-detail-label">Status</div>
            <div class="project-detail-value">
              <span class="project-status project-status--${project.status.toLowerCase().replace(' ', '')}">${project.status}</span>
            </div>
          </div>
          <div class="project-detail">
            <div class="project-detail-label">Start Date</div>
            <div class="project-detail-value">${formatDate(project.startDate)}</div>
          </div>
          <div class="project-detail">
            <div class="project-detail-label">End Date</div>
            <div class="project-detail-value">${formatDate(project.endDate)}</div>
          </div>
        </div>
        <div class="progress-item">
          <div class="progress-header">
            <span class="progress-name">Overall Progress</span>
            <span class="progress-percentage">${project.progress}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${project.progress}%"></div>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function renderPhotoGallery() {
  const container = document.getElementById('photoGallery');
  if (!container) return;
  
  let filteredUpdates = [...appData.updates];
  
  const projectFilter = document.getElementById('projectFilter')?.value;
  const workTypeFilter = document.getElementById('workTypeFilter')?.value;
  
  if (projectFilter) {
    filteredUpdates = filteredUpdates.filter(update => update.projectId === parseInt(projectFilter));
  }
  
  if (workTypeFilter) {
    filteredUpdates = filteredUpdates.filter(update => update.workType === workTypeFilter);
  }
  
  container.innerHTML = filteredUpdates.map(update => `
    <div class="photo-item" onclick="openPhotoModal(${update.id})">
      <div class="photo-placeholder">📷</div>
      <div class="photo-info">
        <div class="photo-project">${update.projectName}</div>
        <div class="photo-description">${update.description}</div>
        <div class="photo-meta">
          <span class="photo-tag">${update.workType}</span>
          <span>${formatDate(update.timestamp.split('T')[0])}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function renderWorkers() {
  const container = document.getElementById('workersGrid');
  if (!container) return;
  
  container.innerHTML = appData.workers.map(worker => {
    const assignedProjects = appData.projects.filter(p => worker.projects.includes(p.id));
    
    return `
      <div class="worker-card">
        <div class="worker-avatar">${worker.avatar}</div>
        <h3 class="worker-name">${worker.name}</h3>
        <p class="worker-role">${worker.role}</p>
        <div class="worker-status">
          <div class="status-dot status-dot--${worker.status}"></div>
          ${worker.status === 'online' ? 'Online' : 'Offline'}
        </div>
        <div style="margin-top: 16px; font-size: 12px; color: var(--color-text-secondary);">
          <strong>Projects:</strong><br>
          ${assignedProjects.map(p => p.name).join(', ')}
        </div>
      </div>
    `;
  }).join('');
}

function populateProjectSelects() {
  const selects = document.querySelectorAll('#projectSelect, #projectFilter');
  selects.forEach(select => {
    if (select.id === 'projectSelect') {
      select.innerHTML = '<option value="">Select a project...</option>' +
        appData.projects.map(project => 
          `<option value="${project.id}">${project.name}</option>`
        ).join('');
    } else {
      select.innerHTML = '<option value="">All Projects</option>' +
        appData.projects.map(project => 
          `<option value="${project.id}">${project.name}</option>`
        ).join('');
    }
  });
}

function populateWorkTypeSelects() {
  const selects = document.querySelectorAll('#workTypeSelect, #workTypeFilter');
  selects.forEach(select => {
    if (select.id === 'workTypeSelect') {
      select.innerHTML = '<option value="">Select work type...</option>' +
        appData.workTypes.map(type => 
          `<option value="${type}">${type}</option>`
        ).join('');
    } else {
      select.innerHTML = '<option value="">All Work Types</option>' +
        appData.workTypes.map(type => 
          `<option value="${type}">${type}</option>`
        ).join('');
    }
  });
}

function populateFilterSelects() {
  populateProjectSelects();
  populateWorkTypeSelects();
}

function updateStats() {
  document.getElementById('activeProjects').textContent = appData.stats.activeProjects;
  document.getElementById('workersOnline').textContent = appData.stats.workersOnline;
  document.getElementById('photosToday').textContent = appData.stats.photosToday;
  document.getElementById('tasksCompleted').textContent = appData.stats.tasksCompleted;
}

function handleUploadSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const projectId = parseInt(document.getElementById('projectSelect').value);
  const workType = document.getElementById('workTypeSelect').value;
  const location = document.getElementById('locationInput').value;
  const description = document.getElementById('descriptionInput').value;
  
  const project = appData.projects.find(p => p.id === projectId);
  const currentWorker = appData.workers[0]; // Simulate current worker as John Martinez
  
  // Create new update
  const newUpdate = {
    id: nextUpdateId++,
    workerId: currentWorker.id,
    workerName: currentWorker.name,
    projectId: projectId,
    projectName: project.name,
    description: description,
    timestamp: new Date().toISOString(),
    workType: workType,
    location: location,
    photoUrl: `construction-photo-${nextUpdateId}.jpg`
  };
  
  // Add to updates
  appData.updates.unshift(newUpdate);
  
  // Update stats
  appData.stats.photosToday++;
  appData.stats.tasksCompleted++;
  updateStats();
  
  // Show success message
  elements.uploadForm.style.display = 'none';
  elements.successMessage.classList.remove('hidden');
  
  // Reset form and show it again after 3 seconds
  setTimeout(() => {
    elements.uploadForm.reset();
    elements.photoPreview.innerHTML = '';
    elements.uploadForm.style.display = 'block';
    elements.successMessage.classList.add('hidden');
  }, 3000);
  
  // Update dashboard if currently viewing it
  if (currentView === 'dashboard') {
    renderRecentUpdates();
  }
}

function handlePhotoPreview(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      elements.photoPreview.innerHTML = `<img src="${e.target.result}" alt="Photo preview">`;
    };
    reader.readAsDataURL(file);
  }
}

function filterPhotos() {
  renderPhotoGallery();
}

function openPhotoModal(updateId) {
  const update = appData.updates.find(u => u.id === updateId);
  if (!update) return;
  
  elements.modalBody.innerHTML = `
    <div style="text-align: center;">
      <div style="width: 100%; height: 400px; background: linear-gradient(135deg, var(--color-bg-3), var(--color-bg-1)); display: flex; align-items: center; justify-content: center; font-size: 4rem; margin-bottom: 24px; border-radius: 8px;">
        📷
      </div>
      <h3>${update.projectName}</h3>
      <p style="color: var(--color-text-secondary); margin-bottom: 16px;">
        <strong>Work Type:</strong> ${update.workType} • <strong>Location:</strong> ${update.location}
      </p>
      <p style="color: var(--color-text-secondary); margin-bottom: 16px;">
        <strong>Worker:</strong> ${update.workerName} • <strong>Date:</strong> ${formatDate(update.timestamp.split('T')[0])}
      </p>
      <p style="color: var(--color-text); line-height: 1.5;">
        ${update.description}
      </p>
    </div>
  `;
  
  elements.photoModal.classList.remove('hidden');
}

function closeModal() {
  elements.photoModal.classList.add('hidden');
}

function simulateLiveUpdates() {
  const sampleUpdates = [
    {
      workerId: 4,
      workerName: "Lisa Thompson",
      projectId: 1,
      projectName: "Downtown Office Complex",
      description: "First coat of primer applied to main lobby walls. Surface preparation excellent.",
      workType: "Painting",
      location: "Main Lobby"
    },
    {
      workerId: 2,
      workerName: "Sarah Chen",
      projectId: 3,
      projectName: "Shopping Center Renovation",
      description: "Electrical panel installation completed for food court area. All circuits tested and operational.",
      workType: "Electrical",
      location: "Food Court"
    }
  ];
  
  let updateIndex = 0;
  
  setInterval(() => {
    if (updateIndex < sampleUpdates.length) {
      const sampleUpdate = sampleUpdates[updateIndex];
      
      const newUpdate = {
        id: nextUpdateId++,
        ...sampleUpdate,
        timestamp: new Date().toISOString(),
        photoUrl: `construction-photo-${nextUpdateId}.jpg`
      };
      
      appData.updates.unshift(newUpdate);
      appData.stats.photosToday++;
      appData.stats.tasksCompleted++;
      
      updateStats();
      
      if (currentView === 'dashboard') {
        renderRecentUpdates();
      }
      
      updateIndex++;
    }
  }, 15000); // Add new update every 15 seconds
}

// Utility Functions
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

function getTimeAgo(timestamp) {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInMinutes = Math.floor((now - time) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
  return `${Math.floor(diffInMinutes / 1440)}d ago`;
}

// Global functions for event handlers
window.openPhotoModal = openPhotoModal;