

function getUserName(){
    let userName = prompt('Please enter you name');
document.write('Welcome ' + userName + '!');
return userName;

}

let userName = getUserName()
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
    
    let muchCash = getMuchCAsh();
    console.log(muchCash)