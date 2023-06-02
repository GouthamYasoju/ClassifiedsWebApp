class details{
    name: string;
    score:number;
    email:string;

    constructor(x:string,y:number,z:string){
        this.name=x;
        this.score=y;
        this.email=z;
    }
}
const scores:number[] =[]
class addtotable{
    chk = document.getElementsByClassName('check') ;
    
    initialise(x:any){
         var sum=0;
         const arr:number[]=[]
         var max=0;
        for (let i of x){
            const row= new addtotable()
            row.addrow(new details(i[0],i[1],i[2]))
            let n=i[1] as number
            scores.push(n)            
        }arr.push(sum);arr.push(max);return arr;
    }

    checkall(){
        if (box1?.checked == true){
            for (var i in chk ){
                let x=chk[i] as HTMLInputElement;
                x.checked=true;
            }
            
        }
        if (box1?.checked ==false){
            for (let i in chk){
                let x=chk[i] as HTMLInputElement;
                x.checked=false;
            }
        }
    }

    monitor(){
        var s=0;
        for (let i in chk){
            let x =chk[i] as HTMLInputElement
            if(x.checked==false){
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
    calci(){
        var sum=0;
        var len=0;
        var max=0;
        for (let i in scores){
            if ((chk[i] as HTMLInputElement).checked == true){
                sum = sum + scores[i]
                len+=1
                if(scores[i]>max){
                    max=scores[i]
                }
            }
            
        }
        var avg=sum/(len)
        
        let f=document.getElementById('avg') as HTMLElement
        if (len==0){
            f.innerHTML ="Please select the desired rows"
        }
        else{
        f.innerHTML = avg.toString() }
        let g=document.getElementById('max') as HTMLElement
        g.innerText= max.toString()
    

        
    }
    
    addrow(x:details){
        var g=document.createElement('tr');
        g.className='table-row'
        var c1 = document.createElement('td');
        c1.setAttribute('name','chbox')
        var inp =document.createElement('input') as HTMLInputElement
        inp.setAttribute('type','checkbox')
        inp.className='check'
        c1.appendChild(inp)
        c1.className='table-data '
        g.appendChild(c1);

        var c2 =document.createElement('td')
        c2.innerText=x.name
        c2.className='table-data'
        c2.setAttribute('name','text')
        g.appendChild(c2)

        var c3 =document.createElement('td')
        c3.innerHTML= (x.score as unknown) as string
        c3.className='score'
        c3.setAttribute("name","text")
        g.appendChild(c3)

        var c4 =document.createElement('td')
        c4.innerText= x.email
        c4.className='table-data'
        c4.setAttribute('name','text')
        g.appendChild(c4)

        var c5=document.createElement('td')
        c5.className='table-data'
        g.appendChild(c5)
        document.getElementById('table')?.appendChild(g);
    
    }
    search(){
        if (searchtext.value.length>0){
            dataarray.forEach((ele:any,index:number) => {
                var ind=ele.indexOf(searchtext.value)
                if(ind >=0){

                    var t=ele.substring(0,ind)+ '<span class="highlight">'+ele.substring(ind,ind+searchtext.value.length)+'</span>'+ ele.substring(ind+searchtext.value.length)
                    data[index].innerHTML = t;
                }
                else{
                        data[index].innerText=ele
                    }
                
            });
        }
        else{
            dataarray.forEach((ele:any,index:number) =>{
                data[index].innerText=ele;
            })
        }
    }

}

var start=new addtotable()
const arr=start.initialise([["goutham y",20,"abc@yahoo.com"],["spiderman",80,"spidy@keka.com"],["ironman",30,"ironman@yahoo.com"],["kabali",70,"daa@keka.com"],["thor",70,"thor@keka.com"],["superman",70,"super@keka.com"],["batman",70,"dark@keka.com"]]);
var box1=document.getElementById("box1") as HTMLInputElement;
box1?.addEventListener('change',start.checkall);
var chk = document.getElementsByClassName('check') ;
for (let i=0;i< chk.length;++i){
    chk[i].addEventListener('change',start.monitor);
}
const cal=document.getElementById('calculate')
cal?.addEventListener('click',start.calci)
var data =document.getElementsByName("text") 
const dataarray:any=[]
for (let i of data){
        dataarray.push(i.innerText)
    }
var searchtext= document.getElementById('fetch') as HTMLInputElement
searchtext?.addEventListener('input',start.search)

