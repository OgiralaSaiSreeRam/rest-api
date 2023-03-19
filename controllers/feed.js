exports.getPosts=(req,res,next)=>{

    // console.log(req.body);
    res.status(200).json({ posts: [
        {
          _id: '1',
          title: 'First Post',
          content: 'This is the first post!',
          imageUrl: 'images/goku.jpeg',
          creator: {
            name: 'goku'
          },
          createdAt: new Date()
        }
      ]})
}

exports.postPosts=(req,res,next)=>{
    const title=req.body.title
    const content=req.body.content
    console.log(title,content);
    //create a post and store in db
    res.status(201).json({
        message:'post saved successfully!!',
        post: { _id: new Date().toISOString(), title: title, content: content, imageUrl:'images/goku.jpg', creator:{
            name:'sreeram',
        } ,
        createdAt: new Date().toISOString()
    }
    })
}