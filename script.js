//Initial references 
const countValue = document.getElementById("count");
const colorPart = document.querySelectorAll(".color-part"); //. for classes
const container = document.querySelector(".container");
const startButton = document.querySelector("#start"); // #for id's
const result = document.querySelector("#result");
const wrapper = document.querySelector(".wrapper");


//function to show and hide
function ShowAndHide() {
    var x = document.getElementById('SectionName');
    if (x.style.display == 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
}
//Mapping current colors to new colors by creating color object
const colors =  {
    color1: {
        current: "#008000",// green
        new: "white",
    },
    color2: {
        current: "#ff0000",//red
        new: "white",
    },
    color3: {
        current: "#ffff00",//yellow
        new: "white",
    },
    color4: {
        current: "#0000ff",//blue
        new: "white",
    },
};

let randomColors = [];
let pathGeneratorBool = false;
let count, 
clickCount = 0;


//function to start the game
startButton.addEventListener("click", () => {
    count = 0; //initial count 0
    clickCount = 0; 
    randomColors = [];
    pathGeneratorBool = false;
    wrapper.classList.remove("hide");
    container.classList.add("hide");

    pathGenerate();
});

// function to decide the sequence
const pathGenerate = () => {
randomColors.push(generateRandomValue(colors));
count =  randomColors.length;
pathGeneratorBool = true;
pathDecide(count-1); //count-1 because the game starts from 0
};

//function to get random value from object
const generateRandomValue = (obj) => {
    let arr = Object.keys(obj);
    return arr[Math.floor(Math.random() * arr.length)];
};

// function to play the sequence
const pathDecide = async (count) => {
    countValue.innerText = count;
    for (let i of randomColors) {
        let currentColor = document.querySelector(`.${i}`);
        await delay(700); //delay from one level to next
        currentColor.style.backgroundColor = `${colors[i]["new"]}`;
        await delay(500); //delay duration for each color blink
        currentColor.style.backgroundColor = `${colors[i]["current"]}`;
        
    }
    pathGeneratorBool = false;
};

//function to create delay for blink effect
async function delay(time) {
    return await new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}
// adding click event listener to colors button
//when the user clicks on the colors
colorPart.forEach((element) => {
    element.addEventListener("click", async(e) => {
        //if user clicks the right color move to the next level
        if (pathGeneratorBool) {
            return false;
        }
        if (e.target.classList[0] == randomColors[clickCount]) {
            
            //color blick effect on click
            e.target.style.backgroundColor = `${
            colors[randomColors[clickCount]]["new"]
            }`;
            await delay(200);

            e.target.style.backgroundColor = `${
            colors[randomColors[clickCount]]["current"]
            }`;
           
            //user click
            clickCount += 1;

            //Next level if number of valid clicks == count
            if(clickCount == count){
                clickCount = 0;
                pathGenerate();
            }
        } else {
            lose();
        }
    });
});

// function when player executes wrong sequence
const lose = () => {
    result.innerHTML = `<span style="color:white;"> Your Score: </span> ${count-1}`;// (count-1)because game ends at the wrong click
    result.classList.remove("hide");
    container.classList.remove("hide");

    wrapper.classList.add("hide");
    startButton.innerText = "Play Again";
    startButton.classList.remove("hide");
   
};