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

            let cX = i;
            let cY = j;

            let cell = document.createElement('td')

            cell.classList.add('cell', 'grass')

            cell.addEventListener('click', CellOnClick);

            row.appendChild(cell);
        }
    }
}


function CellOnClick()
{
    console.log()
}

gridBtn.addEventListener('click', CreateGrid)

