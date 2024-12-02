// Department options based on the selected college
 const departmentOptions = {
    cs: [
        { value: 'SIM', text: 'Software Industry and Multimedia' },
        { value: 'IS', text: 'Information Systems' },
        { value: 'DSAI', text: 'Data Science and Artificial Intelligence Program' },
        { value: 'CS', text: 'Cyber Security' }
    ],
    medicine: [
        { value: 'MS', text: 'Medicine and Surgery Program' },
        { value: 'ODS', text: 'Oral and Dental Surgery Program' },
        { value: 'P', text: 'Pharmacy Program - Pharm D Clinical' }
    ],
    engineering: [
        { value: 'CCE', text: 'Computer and Communication Engineering Program' },
        { value: 'MRE', text: 'Mechatronics and Robotics Engineering Program' },
        { value: 'EME', text: 'Electromechanical Engineering Program' },
        { value: 'AUD', text: 'Architecture and Urban Design' },
        { value: 'PNGEP', text: 'Petroleum and Natural Gas Engineering Program' }
    ],
    business: [
        { value: 'BF', text: 'Banking and Finance Program' },
        { value: 'M', text: 'Management Program' },
        { value: 'AIS', text: 'Accounting and Information Systems Program' },
        { value: 'MLSCM', text: 'Marketing, Logistics and Supply Chain Management Program' }
    ],
    arts: [
        { value: 'GSP', text: 'Geomatics and Surveying Program' },
        { value: 'DMP', text: 'Digital Media Program' },
        { value: 'ALP', text: 'Acoustics and Linguistics Program' }
    ]
};

// Handle college selection change and dynamically update the department list
document.getElementById('college').addEventListener('change', function () {
    const college = this.value;
    console.log('Selected College:', college); // Debugging log
    const departmentSelect = document.getElementById('department'); 
    const departmentContainer = document.getElementById('department-container');
    
    // Clear previous department options
    departmentSelect.innerHTML = '';   
    if (college) {
        departmentContainer.style.display = 'block';

        // Add default option
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.text = '--Select Department--';
        departmentSelect.appendChild(defaultOption);

        // Populate departments based on college selection
        departmentOptions[college].forEach(department => {
            const option = document.createElement('option');
            option.value = department.value;
            option.text = department.text;
            departmentSelect.appendChild(option);
        });
    } else {
        departmentContainer.style.display = 'none';
    }
});

// Handle department selection change (with an alert)
document.getElementById('department').addEventListener('change', function () {
    switch (this.value) {
        case 'DSAI':
            alert('You selected Artificial Intelligence.');
            break;
        case 'IS':
            alert('You selected Information Systems.');
            break;
        default:
            alert('You selected ' + this.options[this.selectedIndex].text + '.');
    }
});

// Handle the sign-up button click event
document.querySelector('.signup-btn').addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default form submission

    // Get form values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const gender = document.getElementById('gender').value;
    const birth = document.getElementById('birth').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const college = document.getElementById('college').value;
    const department = document.getElementById('department').value;
    const year = document.getElementById('year').value;

    // Check if all required fields are filled
    let errorMessage = '';

    if (!username) errorMessage += 'Username is required.\n';
    if (!password) errorMessage += 'Password is required.\n';
    if (!email) errorMessage += 'Email is required.\n';
    if (!gender) errorMessage += 'Gender is required.\n';
    if (!birth) errorMessage += 'Birth date is required.\n';
    if (!phone) errorMessage += 'Phone number is required.\n';
    if (!address) errorMessage += 'Address is required.\n';
    if (!college) errorMessage += 'College selection is required.\n';
    if (!year) errorMessage += 'Student year is required.\n';

    // If any field is missing, alert the user with the error messages
    if (errorMessage) {
        alert('Please fill in the following required fields:\n' + errorMessage);
    } else {
        // If all required fields are filled, proceed with saving the data
        const hashedPassword = CryptoJS.SHA256(password).toString(); // Hash the password using SHA256

        // Save all data to localStorage
        localStorage.setItem('username', username);
        localStorage.setItem('password', hashedPassword);
        localStorage.setItem('email', email);
        localStorage.setItem('gender', gender);
        localStorage.setItem('birth', birth);
        localStorage.setItem('phone', phone);
        localStorage.setItem('address', address);
        localStorage.setItem('college', college);
        localStorage.setItem('department', department);
        localStorage.setItem('year', year);

        alert('Sign-Up Successful! Redirecting to login...');
        window.location.href = '../login/login.html'; // Redirect to login page after sign-up
    }
});


