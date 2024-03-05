
function isPalindrome(str)
{
    const splitString = str.split("");
    const reverseArray = splitString.reverse();
    const joinArray = reverseArray.join("");
    if(joinArray.toLowerCase() === str.toLowerCase()){
        console.log("true");
        return true;
    }
    console.log("false");
    return false;
    
}

isPalindrome("Anna");