let customerList = [];
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
// ------------------------------
// 名前データを保存する配列
// ------------------------------
// ------------------------------
// 名前データ（CSV）読み込み
// ------------------------------
document.getElementById("nameFile").addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function () {
        const lines = reader.result.trim().split("\n");
        customerList = lines.slice(1).map(line => {
            const [number, name] = line.split(",");
            return { number, name };
        });
        alert("名前データを読み込みました");
    };
    reader.readAsText(file);
});

// ------------------------------
// 検索ボタンの処理
// ------------------------------
document.getElementById("searchButton").addEventListener("click", function () {
    const keyword = document.getElementById("searchInput").value.trim();

    if (!keyword) {
        alert("名前を入力してください");
        return;
    }

    const result = customerList.filter(c =>
        c.name.includes(keyword)
    );

    if (result.length === 0) {
        alert("該当する名前が見つかりません");
    } else {
        alert(result.length + "件見つかりました\n" +
            result.map(r => `${r.number} : ${r.name}`).join("\n")
        );
    }
});
