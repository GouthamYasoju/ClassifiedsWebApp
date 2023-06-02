var box1=document.getElementById("box1");
box1.addEventListener('change',checkall);
var chk= document.getElementsByClassName('check');
var g=document.getElementsByClassName('check')
for (let i of g){
    i.addEventListener('change',monitor)
}
document.getElementById('calculate').addEventListener('click',cal)
var scores = document.getElementsByClassName('score')

console.log((scores))
// var row =2
// class Details {
//     constructor(name, score, email) {
//       this.name = name;
//       this.score = score;
//       this.email=email;
//       row=row+1;
//     }
//   }
function cal(){
    document.getElementById("max").innerHTML = scores.reduce(
        (max, curr) => {
          return (max  < curr ? max : curr);
        })
    
}

function monitor(){
    var s=0;
    for (let i of chk){
        if(i.checked==false){
            s=1;
        }
    }
    if (s==1){
        box1.checked=false;
    }
    else{
        box1.checked=true;
    }

}


function checkall(){
    if (box1.checked == true){
        for (let i of chk){
            i.checked= true;
        }
        
    }
    if (box1.checked ==false){
        for (let i of chk){
            i.checked= false;
        }
    }
}