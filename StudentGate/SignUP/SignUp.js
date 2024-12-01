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

document.getElementById('college').addEventListener('change', function () {
    const college = this.value;
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

const hashedPassword = CryptoJS.SHA256(password).toString();  // hashing password using SHA_256 encryption
localStorage.setItem('password', hashedPassword);
