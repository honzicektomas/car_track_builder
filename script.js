const gridBtn = document.getElementById('btn-grid')
const grid = document.getElementById('grid')

function CreateGrid() {
    grid.innerHTML = '';
    const widthCount = 20;
    const heightCount = 20;

    for (let i = 0; i < widthCount; i++) {
        let row = document.createElement('tr')
        grid.appendChild(row);

        for (let j = 0; j < heightCount; j++) {
            let column = document.createElement('td')
            column.textContent = "aa"
            column.classList.add('cell')
            row.appendChild(column);
        }
    }
}

gridBtn.addEventListener('click', CreateGrid)

