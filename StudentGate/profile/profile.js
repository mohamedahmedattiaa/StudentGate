function saveProfile() {
    const photoInput = document.getElementById('profile-picture');
    
    // Check if a new photo is uploaded
    if (photoInput.files && photoInput.files[0]) {
        const reader = new FileReader();
        
        reader.onloadend = function () {
            const photoUrl = reader.result;
            localStorage.setItem('profilePhoto', photoUrl);  // Save new photo to localStorage
            document.getElementById('profile-pic').src = photoUrl;  // Update profile picture on the page
        };
        
        reader.readAsDataURL(photoInput.files[0]);  // Convert image to base64 and save it
    }
    
    // Hide form and show the profile view
    cancelEdit();
}

function cancelEdit() {
    document.getElementById('profile-container').style.display = 'block';  // Show profile view
    document.getElementById('form-container').style.display = 'none';  // Hide the edit form
}

function showForm() {
    document.getElementById('profile-container').style.display = 'none';  // Hide profile view
    document.getElementById('form-container').style.display = 'block';  // Show edit form
    
    // Pre-fill the form with current data (excluding photo)
    document.getElementById('phone').value = localStorage.getItem('phone');
    document.getElementById('location').value = localStorage.getItem('location');
    
    // If you want to pre-fill the photo input as well, you can add a placeholder image.
    // Since browsers do not allow setting file input fields programmatically, the user will select the photo manually.
    const savedPhoto = localStorage.getItem('profilePhoto');
    if (savedPhoto) {
        document.getElementById('profile-pic').src = savedPhoto;
    }
}
// Load profile data from localStorage
window.onload = function () {
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const phone = localStorage.getItem('phone');
    const address = localStorage.getItem('address');
    const gender = localStorage.getItem('gender');
    const birth = localStorage.getItem('birth');
    const college = localStorage.getItem('college');
    const department = localStorage.getItem('department');
    const year = localStorage.getItem('year');
    const educationLevel = localStorage.getItem('educationLevel');
    const profilePhoto = localStorage.getItem('profilePhoto'); // Assuming photo is stored in localStorage
    
    // Check if data is available in localStorage, otherwise use defaults
    if (username) {
        document.getElementById('profile-name').textContent = username;
        document.getElementById('profile-email').textContent = 'Email: ' + email;
        document.getElementById('profile-phone').textContent = 'Phone: ' + phone;
        document.getElementById('profile-address').textContent = 'Address: ' + address;
        document.getElementById('profile-gender').textContent = 'Gender: ' + gender;
        document.getElementById('profile-birth').textContent = 'Birth Date: ' + birth;
        document.getElementById('profile-college').textContent = 'College: ' + college;
        document.getElementById('profile-department').textContent = 'Department: ' + department;
        document.getElementById('profile-year').textContent = 'Education Level Year: ' + year;

        // Set profile picture if available
        if (profilePhoto) {
            document.getElementById('profile-pic').src = profilePhoto;
        }
    } else {
        alert('No profile data found!');
    }
};
