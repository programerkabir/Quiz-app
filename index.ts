import inquirer from "inquirer";


const apilink:string="https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple";

let fetchData = async (data:string) => {
    let fetchQuiz:Response = await fetch(data)
    let res = await fetchQuiz.json()
    return res.results;
}
let data = await fetchData(apilink);

let startQuiz = async() => {
    let score:number = 0 
    let {fname} = await inquirer.prompt({
        type:"input",
        name:"fname",
        message:"what is your name?"
    });

    for (let i=0 ; i<5 ; i++){
        let answer  = [...data[i].incorrect_answers, data[i].correct_answer];

        let {quiz} = await inquirer.prompt({
            type:"list",
            name:"quiz",
            message:data[i].question,
            choices: answer.map((val:any)=>val),
        });
        
        if(quiz == data[i].correct_answer){
            ++score
            console.log("Correct");
            } else {
                console.log(
                    `correct answer is ${data[i].correct_answer}`);
                
            }
    }

    console.log(`dear ${fname}, your final score is:${score} out of 5`);
};

startQuiz();









