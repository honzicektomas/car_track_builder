
const ROWS = 20;
const COLS = 20;
const TYPES = ['grass', 'road', 'water'];
let mapData = new Array(ROWS * COLS).fill(0);

const gridEl = document.getElementById('grid');
const menuScreen = document.getElementById('menu-screen');
const editorScreen = document.getElementById('editor-screen');
const nameInput = document.getElementById('input-name');
const mapSelect = document.getElementById('select-map');

function init() {
    renderGrid();
    updateMapList();

    document.getElementById('btn-new').addEventListener('click', () => {
        mapData.fill(0);
        nameInput.value = '';
        refreshView();
        toggleScreen(true);
    });

    document.getElementById('btn-back').addEventListener('click', () => {
        toggleScreen(false);
        updateMapList();
    });

    document.getElementById('btn-save').addEventListener('click', saveMap);
    document.getElementById('btn-load').addEventListener('click', loadMap);

    gridEl.addEventListener('click', handleGridClick);
}

function toggleScreen(showEditor) {
    if (showEditor) {
        menuScreen.classList.add('hidden');
        editorScreen.classList.remove('hidden');
    } else {
        editorScreen.classList.add('hidden');
        menuScreen.classList.remove('hidden');
    }
}

function renderGrid() {
    gridEl.innerHTML = '';
    for (let i = 0; i < mapData.length; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        gridEl.appendChild(cell);
    }
    refreshView();
}

function refreshView() {
    const cells = gridEl.children;
    for (let i = 0; i < mapData.length; i++) {
        cells[i].className = 'cell ' + TYPES[mapData[i]];
    }
}

function handleGridClick(e) {
    if (!e.target.classList.contains('cell')) return;

    const index = e.target.dataset.index;
    mapData[index] = (mapData[index] + 1) % TYPES.length;

    e.target.className = 'cell ' + TYPES[mapData[index]];
}

function saveMap() {
    const name = nameInput.value.trim();
    if (!name) return alert('Zadejte název mapy');

    localStorage.setItem('map_' + name, JSON.stringify(mapData));
    alert('Uloženo');
}

function updateMapList() {
    mapSelect.innerHTML = '<option value="" disabled selected>Vyber uloženou mapu</option>';
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('map_')) {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = key.replace('map_', '');
            mapSelect.appendChild(option);
        }
    }
}

function loadMap() {
    const key = mapSelect.value;
    if (!key) return;

    const data = localStorage.getItem(key);
    if (data) {
        mapData = JSON.parse(data);
        nameInput.value = key.replace('map_', '');
        refreshView();
        toggleScreen(true);
    }
}

init();