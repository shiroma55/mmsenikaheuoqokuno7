async function loadStaff() {
    const response = await fetch('staff.csv');
    const text = await response.text();

    const lines = text.trim().split('\n');
    const staffList = lines.slice(1).map(line => {
        const [name, type] = line.split(',');
        return { name, type };
    });

    // ドロップダウンに反映
    const kimonoSelect = document.getElementById('kimonoSelect');
    const makeSelect = document.getElementById('makeSelect');
    const hairSelect = document.getElementById('hairSelect');

    staffList.forEach(staff => {
        const option = document.createElement('option');
        option.value = staff.name;
        option.textContent = staff.name;

        if (staff.type === 'kimono') kimonoSelect.appendChild(option);
        if (staff.type === 'make') makeSelect.appendChild(option.cloneNode(true));
        if (staff.type === 'hair') hairSelect.appendChild(option.cloneNode(true));
    });
}

window.onload = loadStaff;
