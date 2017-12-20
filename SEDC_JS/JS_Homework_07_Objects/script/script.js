let task = document.getElementById("task");

task.addEventListener("change", () => {

    switch (task.value) {
        case "recipe":
            recipe();
            break;
        case "reading":
            reading();
            break;
        case "coffee":
            coffee();
            break;
        default:
            console.log("Oops, something went wrong");
            break;
    }
});


// Task 1:
// Recipe Card
// Creating Object with literal notation
function recipe() {
    console.log("Task 1: RECIPE CARD \n----------------------");
    let recipeCard = {
        name: null,
        servings: NaN,
        ingredients: []
    }
    let message;

    // ASK FOR RECIPE NAME, ANYTHING EXCEPT EMPTY SPACE IS ACCEPTED AS A NAME
    message = "Enter recipe name: "
    while ((recipeCard.name = prompt(message)).trim().length == 0) {
        message = "We all need air, I know. But that's a different toppic.";
    }

    // ASK FOR NUMBER OF SERVINGS. ONLY NUMBERS ARE ACCEPTED HERE
    message = "Enter number of servings: "
    while (isNaN(recipeCard.servings) || recipeCard.servings == 0) {
        recipeCard.servings = Number(prompt(message));
        message = "Invalid input! Enter a number: "
    }

    //ASK FOR INGREDIENTS. ONLY STRINGS OR NUMBERS WITHIN STRINGS
    // AS IN "3 EGGS" ARE ACCEPTED
    let ingredient, msgTemp;
    message = msgTemp = "Enter ingreidents. type \"end\" to stop."
    while ((ingredient = prompt(message).toLowerCase()) != "end") {

        if (ingredient.trim().length == 0) {
            message = "The whole air thing all over again? Not funny.";
        } else if (isNaN(ingredient)) {
            recipeCard.ingredients.push(ingredient);
            message = msgTemp;
        } else {
            if (ingredient != 1) {
                message = `${ingredient} what? Mosquitoes?`;
            } else {
                message = "Good job Jesus. Turning numbers into food! Try again.";
            }
        }
    }
    //PRINT THE RECIPE
    console.log(`Recipe name - ${recipeCard.name}`);
    console.log(`Servings - ${recipeCard.servings}`);
    console.log(`Ingredients: `);
    let ingredientsLen = recipeCard.ingredients.length
    for (let i = 0; i < ingredientsLen; i++) {
        console.log(`  ${i + 1}. ${recipeCard.ingredients[i]}`);
    }
}

// Task 2:
// The reading list
// Create object with Object() constructor
function reading() {
    console.log("Task 2: THE READING LIST \n----------------------");

    let bookArr = [];

    function newBook(name, author, read) {
        let Book = new Object();
        Book.name = name;
        Book.author = author;
        Book.read = read;
        bookArr.push(Book);
    }

    (function addBook() {
        let add = prompt("Add new book to collection? type 'yes' or 'no'").toLowerCase();
        if (add == "yes") {

            var name, author, read, message;
            message = "What's the name of the book?"

            while ((name = prompt(message)).trim().length === 0) {
                message = "Really? Never heard of a book? Try a movie. Movies are generaly based on books";
            }

            message = "Enter the authors name"
            while ((author = prompt(message)).trim().length === 0 || !isNaN(author)) {

                if (author.trim().length > 0 && !isNaN(author)) {
                    message = "Even agent 007 has a name...";
                } else {
                    message = "You can always ask uncle Google or aunt Wiki";
                }
            }

            // Na sledniov while loop imav problem... prvicno mi bese napisan 
            // while ((read = prompt(message).toLowerCase()) != "yes" || read != "no"). logikata mi bese
            // vo prvite zagradi da go pojavi promptot, vrednosta da ja zakaci na read ( go zatvoriv vo 
            // zagradi so cel da ne go proveruva assignmentot kako uslov, tuku da dade rezultat koj ke se proveri
            // nareden)... sledno da go proveri uslovot dali vrednosta zakacena na read != yes || read != no. No mi 
            // zaglavi vo loopot. vo debuggerot ne ni stigase do uslovite... izgleda samiot asignment go registrira kako
            // true i prodolzuva da vrti... no vo predhodnite loopovi ne reagira taka...

            message = "Have you read it? answer 'yes' or 'no'";
            while (read = prompt(message).toLowerCase()) {
                if (read == "yes" || read == "no") {
                    break;
                }
            }

        } else if (add == "no") {
            return;
        } else {
            addBook();
        }

        newBook(name, author, read);
        addBook();

    })();

    bookArrLen = bookArr.length;
    for (let i = 0; i < bookArrLen; i++) {
        if (bookArr[i]["read"] == "yes") {
            console.log(`You already read "${bookArr[i]["name"]}" by author ${bookArr[i]["author"]}`);
        } else {
            console.log(`You still need to read "${bookArr[i]["name"]}" by author ${bookArr[i]["author"]}`);
        }
    }


}


// Task 3:
// Order coffee drinks
// Create object with a constructor function
function coffee() {
    console.log("Task 3: ORDER COFFEE DRINKS \n----------------------");

    (function orderCoffee() {

        function GetCoffee(ounce, type) {
            this.ounce = ounce;
            this.type = type;
            switch (this.ounce) {
                case "0.2":
                    this.size = "small";
                    break;
                case "0.4":
                    this.size = "medium";
                    break;
                case "0.6":
                    this.size = "large";
                    break;
                default:
                    break;
            }

            this.getString = () => {
                console.log(`You’ve ordered a ${this.size} ${this.type} coffee.`);
            }

        }

        let type, ounce;
        while ((type = prompt("Enter type of coffee")).trim().length === 0);
        while ((ounce = prompt("Enter size in ounces. 0.2, 0.4 or 0.6")).trim().length === 0 || isNaN(ounce));

        let order = new GetCoffee(ounce, type);
        order.getString();

        let another;
        while (another = prompt("Take another order? 'yes' or 'no' ").toLowerCase()) {
            if (another == "yes") {
                orderCoffee();
                break;
            } else if (another == "no") break;
        }
    })();
}