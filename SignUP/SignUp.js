document.addEventListener("DOMContentLoaded", function () {
    const collegeDropdown = document.getElementById("college");
    const departmentDropdown = document.getElementById("department");

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

    // Populate department dropdown based on selected college
    collegeDropdown.addEventListener("change", function () {
        const selectedCollege = collegeDropdown.value;

        if (selectedCollege && departmentOptions[selectedCollege]) {
            departmentDropdown.innerHTML = `<option value="">--Select Department--</option>`;
            departmentOptions[selectedCollege].forEach(dept => {
                const option = document.createElement("option");
                option.value = dept.value;
                option.textContent = dept.text;
                departmentDropdown.appendChild(option);
            });

            departmentDropdown.disabled = false;
        } else {
            departmentDropdown.innerHTML = `<option value="">--No Departments Available--</option>`;
            departmentDropdown.disabled = true;
        }
    });

    // Handle form submission
    const signupForm = document.getElementById("signup-form");

    signupForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Collect form data
        const formData = {
            username: document.getElementById("username").value.trim(),
            password: document.getElementById("password").value.trim(),
            email: document.getElementById("email").value.trim(),
            gender: document.getElementById("gender").value.trim(),
            birth: document.getElementById("birth").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            address: document.getElementById("address").value.trim(),
            college: document.getElementById("college").value.trim(),
            department: document.getElementById("department").value.trim(),
            student_year: document.getElementById("year").value.trim(),
            skills: document.getElementById("skills").value.trim(),
            hobbies: document.getElementById("hobbies").value.trim(),
            languages: document.getElementById("languages").value.trim(),
            activities: document.getElementById("activities").value.trim(),
            scholarships: document.getElementById("scholarships").value.trim()
        };

        // Validate required fields
        const requiredFields = [
            'username', 'password', 'email', 'gender', 'birth', 'phone',
            'address', 'college', 'department', 'student_year'
        ];

        for (let field of requiredFields) {
            if (!formData[field]) {
                alert(`Please fill in the ${field.replace('_', ' ')} field.`);
                return;
            }
        }

        // Send data to the server via AJAX
        fetch("signup_handler.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData) // Convert form data to JSON string
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.message === "User registered successfully!") {
                alert(data.message); // Success message
                window.location.href = "../login/login.html"; // Redirect to login page
            } else {
                alert(data.message); // Server error message
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while registering. Please try again later.");
        });
    });
});
