memePage = "https://api.imgflip.com/get_memes"
jokePage = "https://v2.jokeapi.dev/joke/Programming"
riddlePage = "https://riddles-api.vercel.app/random"

async function getMeme() {
    try {
        //SOLICITUD
        const response = await fetch(memePage);
        //Convertir a JSON
        const data = await response.json();
        //Acceder a memes
        const memes = data.data.memes;
        //Crea array de las URLS
        const memeUrls = memes.map(meme => meme.url);

        //console.log(memeUrls);

        const RandIndex = Math.floor(Math.random() * memes.length);
        let randMemeUrls = memeUrls[RandIndex];
        return randMemeUrls;

    } catch (error) {
        console.log(error);
    }

}
/*getMeme().then(memeUrls => {
    const RandIndex = Math.floor(Math.random() * memeUrls.length);
    return memeUrls[RandIndex];

});*/

async function getJoke(){
    try{
        //Request
        const response = await fetch(jokePage);
        //Convert to JSON
        const data = await response.json();

        if (data.type === "single"){
            return data.joke;
        }else if(data.type === "twopart"){
            return `${data.setup} - ${data.delivery}`;
        }

        console.log(joke);

    }catch(error){
        console.log(error);
    }

}


async function getRiddle(){
    try{
    const response = await fetch(riddlePage);
    const data = await response.json();
    const riddle = data.riddle;
    const answer = data.answer;

    return [riddle, answer];

    }catch (error){
        console.log(error);
    }
}

document.getElementById("momo").addEventListener("click", async () =>{
    const memeUrl = await getMeme();

    const memeImage = document.getElementById("view");
    memeImage.src = memeUrl;
    memeImage.style.display = "block";
});

document.getElementById("actjoke").addEventListener("click", async () =>{
    const varJoke = await getJoke(); //Get joke from function
    const jokeElement = document.getElementById("joke"); //Acces the joke HTML Element

    jokeElement.textContent = varJoke;
})

let currRiddle = "";
let currAnswer = "";

document.getElementById("riddleBttn").addEventListener("click", async () =>{
    const [riddl, answ] = await getRiddle();
    currRiddle = riddl;
    currAnswer = answ;

    const riddleElem = document.getElementById("riddle");
    riddleElem.textContent = currRiddle;

    const answElem = document.getElementById("answer");
    answElem.textContent = "";
})

document.getElementById("answerBttn").addEventListener("click", async () =>{
    const answElem = document.getElementById("answer");
    answElem.textContent = currAnswer;
})


