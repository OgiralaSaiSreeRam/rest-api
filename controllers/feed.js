exports.getPosts=(req,res,next)=>{

    console.log(req.body);
    res.status(200).json({title:'potter',price:20.67})
}

exports.postPosts=(req,res,next)=>{
    const title=req.body.title
    const content=req.body.content
    console.log(title,content);
    //create a post and store in db
    res.status(201).json({
        message:'post saved successfully!!',
        post: { id: new Date().toISOString(), title: title, content: content }
    })
}