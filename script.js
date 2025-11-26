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

function addTopTenMostCommonIngridients() {

    const table = document.querySelector("#pizza-table");
    const ingredientCount = {};

    const ingredientCells = table.querySelectorAll("[data-ingredients]");

    ingredientCells.forEach(cell => {
        const raw = cell.dataset.ingredients;
        const ingredients = raw ? raw.split(",") : [];

        ingredients.forEach(ingredient => {
            const trimmed = ingredient.trim().toLowerCase();
            if (trimmed) {
                if (!ingredientCount[trimmed]) {
                    ingredientCount[trimmed] = 0;
                }
                ingredientCount[trimmed] += 1;
            }
        });
    });

    const sortedIngredients = Object.entries(ingredientCount)
        .map(([ingredient, count]) => ({ ingredient, count }))
        .sort((a, b) => b.count - a.count);

    const topIngredients = sortedIngredients.slice(0, 10);

    const topIngredientsList = document.querySelector("#top-ingredients-list");
    topIngredientsList.innerHTML = "";

    topIngredients.forEach(({ ingredient, count }) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${ingredient} [${count}]`;
        topIngredientsList.appendChild(listItem);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    sumPizzaCosts();
    addTopTenMostCommonIngridients();
});