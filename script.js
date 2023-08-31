document.addEventListener("DOMContentLoaded", () => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const calendarGrid = document.getElementById("calendarGrid");
    const eventForm = document.getElementById("eventForm");
    const addEventButton = document.getElementById("addEventButton");
    const prevMonthButton = document.getElementById("prevMonth");
    const nextMonthButton = document.getElementById("nextMonth");
    const currentMonthText = document.getElementById("currentMonth");
    const cells = [];

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    // Populate calendar grid with date, day, and events
    function populateCalendar() {
        calendarGrid.innerHTML = '';

        const firstDay = new Date(currentYear, currentMonth, 1);
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        for (let i = 0; i < firstDay.getDay(); i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.classList.add("empty");
            calendarGrid.appendChild(cell);
            cells.push(cell);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.date = `${currentMonth + 1}/${day}/${currentYear}`;
            const cellDate = document.createElement("span");
            cellDate.classList.add("cell-date");
            cellDate.textContent = day;
            cell.appendChild(cellDate);
            const cellDay = document.createElement("span");
            cellDay.classList.add("cell-day");
            cellDay.textContent = daysOfWeek[new Date(currentYear, currentMonth, day).getDay()];
            cell.appendChild(cellDay);
            const eventsContainer = document.createElement("div");
            eventsContainer.classList.add("events");
            cell.appendChild(eventsContainer);
            calendarGrid.appendChild(cell);
            cells.push(cell);
        }

        currentMonthText.textContent = new Date(currentYear, currentMonth).toLocaleString("en-US", { month: "long", year: "numeric" });
    }

    populateCalendar();

    // Navigation buttons
    prevMonthButton.addEventListener("click", () => {
        if (currentMonth > 0) {
            currentMonth--;
        } else {
            currentYear--;
            currentMonth = 11;
        }
        populateCalendar();
    });

    nextMonthButton.addEventListener("click", () => {
        if (currentMonth < 11) {
            currentMonth++;
        } else {
            currentYear++;
            currentMonth = 0;
        }
        populateCalendar();
    });

    // Event form functionality
    addEventButton.addEventListener("click", () => {
        const eventTitle = document.getElementById("eventTitle").value;
        const eventLocation = document.getElementById("eventLocation").value;
        const eventDescription = document.getElementById("eventDescription").value;
        const startDate = document.getElementById("startDate").value;
        const endDate = document.getElementById("endDate").value;

        // Find the cell associated with the start date
        const cellIndex = new Date(startDate).getDate() + firstDay.getDay() - 1;
        const cell = cells[cellIndex];

        // Create and display the event
        const eventElement = document.createElement("div");
        eventElement.classList.add("event");
        eventElement.innerHTML = `
            <strong>${eventTitle}</strong><br>
            Location: ${eventLocation}<br>
            Start Date: ${startDate}<br>
            End Date: ${endDate}<br>
            Description: ${eventDescription}
        `;

        cell.querySelector(".events").appendChild(eventElement);

        // Clear form fields
        clearFormFields();
    });

    function clearFormFields() {
        document.getElementById("eventTitle").value = "";
        document.getElementById("eventLocation").value = "";
        document.getElementById("eventDescription").value = "";
        document.getElementById("startDate").value = "";
        document.getElementById("endDate").value = "";
    }
});
