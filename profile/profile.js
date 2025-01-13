// Fetch user profile data from the database
function fetchUserProfile() {
    fetch('getProfileData.php')
        .then(response => response.json())
        .then(data => {
            console.log("Profile Data: ", data);
            if (data.error) {
                alert("Error fetching profile data: " + data.error);
            } else {
               
                document.getElementById('profile-name').textContent = data.username || "N/A";
                document.getElementById('profile-email').textContent = "Email: " + (data.email || "N/A");
                document.getElementById('profile-phone').textContent = "Phone: " + (data.phone || "N/A");
                document.getElementById('profile-address').textContent = "Address: " + (data.address || "N/A");
                document.getElementById('profile-gender').textContent = "Gender: " + (data.gender || "N/A");
                document.getElementById('profile-birth').textContent = "Birth Date: " + (data.birth || "N/A");
                document.getElementById('profile-college').textContent = "College: " + (data.college || "N/A");
                document.getElementById('profile-department').textContent = "Department: " + (data.department || "N/A");
                document.getElementById('profile-year').textContent = "Year: " + (data.student_year || "N/A");

               
                document.getElementById('profile-pic').src = data.profile_picture 
                ? "profile_pictures/" + data.profile_picture 
                : "../Photos/unphoto.jpg";


            }
        })
        .catch(error => {
            console.error("Error fetching profile data:", error);
            alert("An error occurred while fetching the profile data.");
        });
}


function showForm() {
    document.getElementById('profile-container').style.display = 'none'; // Hide profile view
    document.getElementById('form-container').style.display = 'block';  // Show edit form
}


function cancelEdit() {
    document.getElementById('form-container').style.display = 'none';  // Hide the edit form
    document.getElementById('profile-container').style.display = 'block';  // Show profile view
}


function previewImage() {
    const fileInput = document.getElementById('profile-picture');
    const file = fileInput.files[0];

    if (file) {
        if (!file.type.startsWith('image/')) {
            alert("Please upload a valid image file.");
            return;
        }

        if (file.size > 2 * 1024 * 1024) { 
            alert("File size exceeds the 2 MB limit.");
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('profile-pic').src = e.target.result; 
        };
        reader.readAsDataURL(file); 
    }
}


function saveProfile() {
    const photoInput = document.getElementById('profile-picture');

    if (photoInput.files && photoInput.files[0]) {
        const reader = new FileReader();
        reader.onloadend = function () {
            const photoUrl = reader.result;
            localStorage.setItem('profilePhoto', photoUrl); 
            document.getElementById('profile-pic').src = photoUrl; 
        };
        reader.readAsDataURL(photoInput.files[0]); 
    }

    cancelEdit();
}


function logout() {
    if (confirm("Are you sure you want to log out?")) {
        localStorage.removeItem('profilePhoto'); 
        window.location.href = 'login.html'; 
    }
}

window.onload = function () {
    fetchUserProfile(); // Fetch user profile data on page load

    const savedPhoto = localStorage.getItem('profilePhoto');
    if (savedPhoto) {
        document.getElementById('profile-pic').src = savedPhoto; 
    }

    // Attach logout event listener
    const logoutButton = document.getElementById('logout-btn');
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }
};
