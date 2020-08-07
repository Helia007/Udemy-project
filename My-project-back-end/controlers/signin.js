const handleSignin=(req,res,db,bcrypt)=>{
  const {email, name,password}=req.body;
  if(!email || !name || !password){
    return res.status(400).json('not correct info')
  }
  db.select('email','hash').from('login')
  .where('email', '=', req.body.email)
  .then(data => { 
   const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
   
  if (isValid) {
  	 db.select('*').from('users')
  	.where('email','=',req.body.email)
  	.then(user => { 
  		res.json(user[0])
  	})
  .catch(err=> res.status(400).json('error'))
 
  } else {

  	 res.status(400).json('wrong info')
 	
  	}
})
 .catch(err=> res.status(400).json('error!'))
}

module.exports={
handleSignin: handleSignin
};