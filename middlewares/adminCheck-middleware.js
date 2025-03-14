export const isAdmin = (req, res, next)=>{

    if(req.userInfo.role !== 'admin'){
        return res.json({success:false, message:'Access denied for normal user'})
    }
    next();
}