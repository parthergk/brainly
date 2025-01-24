
export const random = (len:number)=>{
    const char = "qwertyuioplkjhgfdsazxcvbnm1234567890";
    const length = char.length;
    let ans='';

    for(let i = 0; i<len; i++){
        ans += char[Math.floor(Math.random()*length)];
    }
    return ans;
}

