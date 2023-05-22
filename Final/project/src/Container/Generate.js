function isPrime(num){
    if(num < 2)return false;
    for(var i = 2;i<Math.floor(Math.sqrt(num));i++){
        if(num % i === 0)return false;
    }
    return true;
}
const gcd = (a,b) => {
    if(!b){
        return a;
    }
    return gcd(b,a%b);
}

const gen_key = (q) => {
    var key = Math.floor((q-Math.pow(10,5))*Math.random())+Math.pow(10,5);
    var ans = gcd(q,key);
    while(ans !== 1){
        key = Math.floor((q-Math.pow(10,5))*Math.random())+Math.pow(10,5);
        ans = gcd(q,key);
    }
    return key;
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

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
   
    element.style.display = 'none';
    document.body.appendChild(element);
   
    element.click();
   
    document.body.removeChild(element);
}
const Generate = (name) => {
    var q = Math.floor(Math.pow(10,5) * Math.random()) + Math.pow(10,5)
    while(!isPrime(q)){
        q = Math.floor(Math.pow(10,5) * Math.random()) + Math.pow(10,5)
    }
    var g = Math.floor((q-2) * Math.random()) + 2;
    var key = gen_key(q)
    var h = power(g,key,q)
    console.log(q)
    console.log(g)
    console.log(h)
    var strkey = key.toString()
    var context = name + ": " + strkey
    download('private_key.txt', context)
    return {q,g,h}
}


export default Generate;