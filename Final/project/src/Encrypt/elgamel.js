function isPrime(num){
    if(num < 2)return false;
    for(var i = 2;i<Math.floor(Math.sqrt(num));i++){
        if(num % i === 0)return false;
    }
    return true;
}
const power = (a,b,c) => {
    var x = 1;
    var y = a;
    while(b>0){
        if(b%2 === 1){
            x = (x*y)%c;
        }
        y = (y*y)%c
        b = Math.floor(b/2)
    }
    return x%c
}

const Elgamel = (q,g,h,m) => {
    var y = 1;
    while(!isPrime(y)){
        y = Math.floor((q-2) * Math.random()) + 2;
    } 
    console.log(m)
    var c1 = power(g,y,q)
    var c2 = (m * power(h,y,q)) % q;   
    return { c1, c2 };
}

export default Elgamel