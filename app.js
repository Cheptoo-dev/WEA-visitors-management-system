document.getElementById('visitorForm').addEventListener('submit', addVisitor);

async function addVisitor(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const purpose = document.getElementById('purpose').value;

    const visitor = { name, email, purpose };

    const response = await fetch('http://localhost:8080/api/visitors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(visitor)
    });

    if (response.ok) {
        loadVisitors();
    }
}

async function loadVisitors() {
    const response = await fetch('http://localhost:8080/api/visitors');
    const visitors = await response.json();

    const visitorList = document.getElementById('visitorList');
    visitorList.innerHTML = visitors.map(visitor => `
        <div class="visitor-item">
            <strong>${visitor.name}</strong> - ${visitor.purpose}
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', loadVisitors);
