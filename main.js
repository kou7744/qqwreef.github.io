// File upload handling
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const uploadProgress = document.getElementById('upload-progress');

// Prevent default drag behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropZone.addEventListener(eventName, preventDefaults, false);
  document.body.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

// Highlight drop zone when dragging over it
['dragenter', 'dragover'].forEach(eventName => {
  dropZone.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
  dropZone.addEventListener(eventName, unhighlight, false);
});

function highlight(e) {
  dropZone.classList.add('drag-over');
}

function unhighlight(e) {
  dropZone.classList.remove('drag-over');
}

// Handle dropped files
dropZone.addEventListener('drop', handleDrop, false);
fileInput.addEventListener('change', handleFileSelect, false);

function handleDrop(e) {
  const dt = e.dataTransfer;
  const files = dt.files;
  handleFiles(files);
}

function handleFileSelect(e) {
  const files = e.target.files;
  handleFiles(files);
}

function handleFiles(files) {
  uploadProgress.classList.add('active');
  
  ([...files]).forEach(file => {
    uploadFile(file);
  });
}

function uploadFile(file) {
  // Simulate file upload with progress
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 30;
    if (progress > 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        addFileToGrid(file);
        uploadProgress.classList.remove('active');
      }, 500);
    }
    document.querySelector('.progress').style.width = `${progress}%`;
    if (progress === 100) {
      document.querySelector('.filename').textContent = 'Upload complete!';
    }
  }, 500);

  document.querySelector('.filename').textContent = file.name;
}

function addFileToGrid(file) {
  const fileCard = document.createElement('div');
  fileCard.className = 'file-card';
  
  const icon = getFileIcon(file.type);
  
  fileCard.innerHTML = `
    <div class="file-icon">
      <span class="material-icons">${icon}</span>
    </div>
    <div class="file-name">${file.name}</div>
  `;
  
  dropZone.insertBefore(fileCard, dropZone.firstChild);
}

function getFileIcon(mimeType) {
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'movie';
  if (mimeType.startsWith('audio/')) return 'audiotrack';
  if (mimeType.includes('pdf')) return 'picture_as_pdf';
  return 'description';
}