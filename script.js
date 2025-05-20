const aside = document.getElementById("sticky-aside");
const footer = document.querySelector("footer");

function adjustAsidePosition() {
  const footerTop = footer.getBoundingClientRect().top;
  const asideHeight = aside.offsetHeight;
  const windowHeight = window.innerHeight;

  if (footerTop < asideHeight) {
    aside.style.position = "absolute";
    aside.style.top = (window.scrollY + footerTop - asideHeight) + "px";
  } else {
    aside.style.position = "fixed";
    aside.style.top = "60px"; // Adjust this value as needed
    aside.style.bottom = "auto"; // Reset bottom position
    
  }
}



window.addEventListener("scroll", adjustAsidePosition);
window.addEventListener("resize", adjustAsidePosition);
function toggleAside() {
  const aside = document.querySelector('aside');
  if (aside.style.display === 'block') {
    aside.style.display = 'none';
  } else {
    aside.style.display = 'block';
  }
}

const form = document.querySelector('.feedback-form');
const successMsg = document.getElementById('feedback-success');

form.addEventListener('submit', function (e) {
  e.preventDefault(); // prevent real submission
  successMsg.style.display = 'block';
  form.reset();
});














 const subjects = [];

    function addSubject() {
      const input = document.getElementById("subjectInput");
      const value = input.value.trim();
      if (value) {
        subjects.push(value);
        updateSubjectList();
        input.value = "";
      } else {
        alert("Please enter a subject.");
      }
    }

    function updateSubjectList() {
      const list = document.getElementById("subjectList");
      list.innerHTML = "<strong>Subjects:</strong> " + subjects.join(", ");
    }

    function generateTimetable() {
      if (subjects.length === 0) {
        alert("Please add at least one subject.");
        return;
      }

      const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
      const sessions = 2; // sessions per day
      const timetable = [];
      let index = 0;

      for (let day of days) {
        const row = [];
        for (let i = 0; i < sessions; i++) {
          row.push(subjects[index % subjects.length]);
          index++;
        }
        timetable.push({ day, subjects: row });
      }

      const output = document.getElementById("output");
      let html = "<h2>Your Weekly Timetable</h2><table><tr><th>Day</th><th>Session 1</th><th>Session 2</th></tr>";
      timetable.forEach(entry => {
        html += `<tr><td>${entry.day}</td><td>${entry.subjects[0]}</td><td>${entry.subjects[1]}</td></tr>`;
      });
      html += "</table>";
      output.innerHTML = html;
    }





