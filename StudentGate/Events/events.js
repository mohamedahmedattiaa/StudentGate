document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.event-card');
        const eventStart = new Date(card.getAttribute('data-start'));
        const eventEnd = new Date(card.getAttribute('data-end'));
        const currentDate = new Date();

        console.log("Current Date: " + currentDate);
        console.log("Event Start: " + eventStart);
        console.log("Event End: " + eventEnd);

        if(currentDate == eventStart){
            alert("Event is Started");
        }
        else if (currentDate < eventStart) {
            alert("Event is Coming Soon!");
        } else if (currentDate > eventEnd) {
            alert("Event has Ended!");
        } else {
            window.location.href = "join-event.html";
        }
    });
});

// Filter Events (Upcoming, Past, All)
function filterEvents(category) {
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}