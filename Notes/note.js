// Toggle sidebar functionality
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  sidebar.classList.toggle("active");
  hamburgerMenu.style.left = sidebar.classList.contains("active") ? "270px" : "20px";
}

// Update year options based on selected college
function updateYears() {
  const collegeSelect = document.getElementById("college-select");
  const yearFilter = document.getElementById("year-filter");

  const years = {
    medicine: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
    dentistry: ['1st Year', '2nd Year', '3rd Year'],
    pharmacy: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
    computer: ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year']
  };

  yearFilter.innerHTML = '<option value="" disabled selected>Select year</option>';
  const selectedCollege = collegeSelect.value;

  if (years[selectedCollege]) {
    years[selectedCollege].forEach(year => {
      const option = document.createElement("option");
      option.value = year;
      option.textContent = year;
      yearFilter.appendChild(option);
    });
  }
}

// Upload note and dynamically display
// Upload note and dynamically display
function uploadNote(event) {
  event.preventDefault(); // Prevent the default form submission

  const form = document.getElementById('upload-form');
  const formData = new FormData(form);

  // Check if both files are selected
  const noteFile = document.getElementById('note-file').files[0];
  const notePhoto = document.getElementById('note-photo').files[0];
  if (!noteFile || !notePhoto) {
      alert("Both the notes file and photo are required.");
      return;
  }

  // AJAX Request to the server
  fetch('upload-note.php', {
      method: 'POST',
      body: formData
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          alert("Files uploaded successfully.");
          loadNotes(); // Reload the notes after successful upload
      } else {
          alert(data.message);
      }
  })
  .catch(error => {
      console.error("Error uploading files:", error);
      alert("An error occurred while uploading files.");
  });
}


// Create note container dynamically
function createNoteContainer(note) {
  const container = document.createElement("div");
  container.classList.add("upload-container");
  container.style.cssText = `background-image: url('${note.notePhotoURL}'); background-size: cover; background-position: center; height: 300px; position: relative;`;

  const fileNameElement = document.createElement("div");
  fileNameElement.textContent = note.noteFileName;
  fileNameElement.classList.add("file-name");
  fileNameElement.style.cssText = `position: absolute; bottom: 10px; left: 10px; color: white; background-color: rgba(0, 0, 0, 0.5); padding: 5px;`;

  const downloadButton = document.createElement("a");
  downloadButton.href = note.noteFileURL;
  downloadButton.download = note.noteFileName;
  downloadButton.textContent = "Download Note";
  downloadButton.classList.add("download-button");
  downloadButton.style.cssText = `position: absolute; bottom: 10px; right: 10px; color: white; background-color: rgba(0, 0, 0, 0.5); padding: 10px 20px; text-decoration: none;`;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.style.cssText = `position: absolute; top: 10px; right: 10px; color: white; background-color: rgba(255, 0, 0, 0.5); border: none; padding: 5px 10px; cursor: pointer;`;
  deleteButton.addEventListener("click", () => {
    container.remove();
    deleteNoteFromDatabase(note.noteFileName);
  });

  container.append(fileNameElement, downloadButton, deleteButton);
  return container;
}

// Delete a note from the database
function deleteNoteFromDatabase(noteFileName) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'delete_note.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.onload = function () {
      const data = JSON.parse(xhr.responseText);
      if (data.success) {
          alert("Note deleted successfully!");
      } else {
          alert("Error deleting note.");
      }
  };

  xhr.send('noteFileName=' + encodeURIComponent(noteFileName));
}

// Load notes from the database
function loadNotes() {
  fetch('get-notes.php')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("dynamic-upload-containers");
      container.innerHTML = ''; // Clear existing notes

      if (data.success) {
        data.notes.forEach(note => {
          const noteElement = createNoteContainer(note);
          container.appendChild(noteElement);
        });
      } else {
        container.innerHTML = "<p>No notes available at the moment.</p>";
      }
    })
    .catch(error => {
      console.error("Error loading notes:", error);
      document.getElementById("dynamic-upload-containers").innerHTML = "<p>No notes available at the moment.</p>";
    });
}

// Call loadNotes on page load
document.addEventListener("DOMContentLoaded", loadNotes);

// Add event listener for year update when the college is selected
document.getElementById("college-select").addEventListener("change", updateYears);
function fetchUploadedNotes() {
  fetch('fetch_uploaded_notes.php')
      .then(response => response.json())
      .then(data => {
          const container = document.getElementById('dynamic-upload-containers');
          container.innerHTML = ''; // Clear any previous content

          if (Array.isArray(data) && data.length > 0) {
              data.forEach(note => {
                  const noteContainer = createNoteContainer(note);
                  container.appendChild(noteContainer);
              });
          } else {
              container.innerHTML = '<p>No notes uploaded yet.</p>';
          }
      })
      .catch(error => console.error('Error fetching uploaded notes:', error));
}

// Call the function to load notes when the page loads
window.onload = function() {
  fetchUploadedNotes();
};

