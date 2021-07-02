
let userName="";
function getUserName(){
     userName = prompt('Please enter you name');
document.write('Welcome ' + userName + '!');

return userName;

}

// let userName = getUserName()
console.log(userName)




function getMuchCash(){

    let muchCash = prompt('Do you have a million $');
    if(muchCash == 'yes') {
           document.write('Good to see you again ' + userName + '!');
    }
    else if(muchCash == 'no') {
        
        alert("Im sorry plese try lings car's insted");
        window.location.href = "https://www.lingscars.com/links";
        
        }

     else {
        alert("please answer with yes or no");
        getMuchCash();
     }   

         return muchCash
    }
    


//     // Car suggession based on speed!
    
    function topSpeed()
    
    {
    
    let kRegera = 251;   
    let kJesko =  300;
    let kGemera = 250;

    let numberOfGuess = 5;

        for(let i = 0; i < numberOfGuess; i++){
    
        console.log(i);
        let userAnswer = prompt('Guess top speed(mph) and win a koenigsegg');
        while(userAnswer <= 0 || userAnswer > 300) {
            userAnswer = prompt('Please enter speed less 301mph');
            console.log('User Guess: ' + userAnswer);
        } 
        document.write('<h4> Your Guess was'+userAnswer+' Mph</h4>');

        if(userAnswer == kRegera){
            alert('Congratulation you are now in a lucky draw to win the Regera RS!');
            document.write('<h4>'+userAnswer+' Mph is the correct answer, you have won!'+'<\h4>')
            document.write('<img src="Regera.jpg" width="50%">');

            break;
        }

        else if(userAnswer == kJesko){
            alert('Congratulation you are now in a lucky draw to win the Jesko!');
            document.write('<h4>'+userAnswer+' Mph is the correct answer, you have won!'+'<\h4>')
            document.write('<img src="absolut.jpg" width="50%">');
            break;
    
        }

        else if(userAnswer == kGemera){
            alert('Congratulation you are now in a lucky draw to win the Gemera!');

            document.write('<h4>'+userAnswer+' Mph is the correct answer, you have won!'+'<\h4>')
            document.write('<img src="gemera.jpg" width="50%">');
           
            break;
   
        }

        else {
                 alert('Try again!');
                
            }
        
        }
            
        if(i = numberOfGuess){
            alert('Ooops you almost Won! better luck next time.');
        }


    
}



   