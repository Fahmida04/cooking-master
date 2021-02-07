const getFoodName = () => {
    const foodContainer = document.getElementById("food-container");
    foodContainer.innerText = " ";
    const inputFoodName = document.getElementById("input-food-name").value;

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputFoodName}`)
    .then(res => res.json())
    .then(data => showFoodNames(data.meals));

    const showFoodNames = foods => {
        foods.forEach (food => {
            const foodInfo = `
            <div onclick = "displayFoodDetails('${food.strMeal}')">
            <img src=${food.strMealThumb}>
            <p>${food.strMeal}</p>
            </div>
            `
            const foodDiv = document.createElement("div");
            foodDiv.innerHTML = foodInfo;
            foodContainer.appendChild(foodDiv);

        });
    }
}

const displayFoodDetails = name => {

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        .then(res => res.json())
        .then(data => displayFood(data.meals[0]))
}

const displayFood = foodDiv => {
    const foodDetails = document.getElementById("food-details");
    foodDetails.innerText = " ";
    const pic = document.createElement("img");
    pic.src = foodDiv.strMealThumb;
    foodDetails.appendChild(pic);

    const foodName = document.createElement("h3");
    foodName.innerText = foodDiv.strMeal;
    foodDetails.appendChild(foodName);

    const ul = document.createElement("ul");
    for (let i = 1; i < 20; i++) {
        let foodIngredients = foodDiv[`strMeasure${i}`] + foodDiv[`strIngredient${i}`];
        if(foodIngredients == "null"){
            continue;
        }
        const li = document.createElement("li");
        li.innerText = foodIngredients;
        ul.appendChild(li);
        foodDetails.appendChild(ul);
    }

}