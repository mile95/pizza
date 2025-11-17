function sumPizzaCosts() {
    const table = document.querySelector("#pizza-table");
    const totalCell = document.querySelector("#total-cost");

    const costCells = table.querySelectorAll("[data-cost]");
    let total = 0;

    costCells.forEach(cell => {
        const raw = cell.dataset.cost;
        const value = raw ? parseFloat(raw) : 0;

        if (!isNaN(value)) total += value;
    });

    totalCell.textContent = total.toFixed(2);
}

function countIngredients() {
    const table = document.querySelector("#pizza-table");
    const ingredientCells = table.querySelectorAll("[data-ingredients]");
    const ingredientCount = {};

    ingredientCells.forEach(cell => {
        const raw = cell.dataset.ingredients;
        if (raw) {
            const ingredients = raw.split(",")
                .map(ing => ing.trim().toLowerCase())
                .filter(ing => ing.length > 0);

            ingredients.forEach(ingredient => {
                ingredientCount[ingredient] = (ingredientCount[ingredient] || 0) + 1;
            });
        }
    });

    const ingredientTableBody = document.querySelector("#ingredient-count-body");
    ingredientTableBody.innerHTML = "";

    const sorted = Object.entries(ingredientCount).sort((a, b) =>
        a[0].localeCompare(b[0])
    );

    sorted.forEach(([ingredient, count]) => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = ingredient;

        const countCell = document.createElement("td");
        countCell.textContent = count.toString();

        row.appendChild(nameCell);
        row.appendChild(countCell);
        ingredientTableBody.appendChild(row);
    });
}



document.addEventListener("DOMContentLoaded", () => {
    sumPizzaCosts();
    countIngredients();
});