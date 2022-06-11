exports.cookieToken=(user,res)=>{
    
    const token=user.getToken()
    const options = {
        expires: new Date(
          Date.now() + 2 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      };
 user.password=undefined
 res.status(200).cookie("cookie",token,options).json({
     success:true,
     user,
 })}