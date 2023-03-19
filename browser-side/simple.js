const get=document.getElementById('bt1')
const post=document.getElementById('bt2')

get.addEventListener('click',()=>{
  fetch('http://localhost:8001/feed/posts')
    .then(res=>res.json())
    .then(resData=>console.log(resData))
    .catch(err=>console.log(err))
})

post.addEventListener('click',function(){
  fetch('http://localhost:8001/feed/post',{
    "method":'POST',
    "body":JSON.stringify({"title":"My first post on instagram",
    "content":"This is only the start"
           }),
    headers:{
      "Content-Type":"application/json"
    }
  })
    .then(res=>res.json())
    .then(resData=>console.log(resData))
    .catch(err=>console.log(err))
})