let RegisterDevice = (req,res) => {
    res.json({body:req.body,headers:req.headers});
    console.log({body:req.body,headers:req.headers});
};

export default RegisterDevice;