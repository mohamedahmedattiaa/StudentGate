function filterEvents(category) {
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        if (category === 'all') {
            card.style.display = 'block';
        } else if (card.getAttribute('data-category') === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
function joinEvent() {
    alert("Joining the event! You’ll receive more details soon.");
}

function chooseEvent() {
    alert("Please select an event from the list.");
}

function filterEvents(category) {
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        if (category === 'all') {
            card.style.display = 'block';
        } else if (card.getAttribute('data-category') === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
