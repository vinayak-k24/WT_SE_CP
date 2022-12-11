const bodyParser = require("body-parser");
const express=require("express");
// const moongoose=require("mongoose");
const cors=require("cors");
const path=require("path");
const userDb = require('./model/user');
const eventDb = require('./model/event');
const app=express();
const db=require("./util/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require('multer');
const fs=require("fs");
const nodemailer = require("nodemailer");
const { response } = require("express");
const ObjectID = require('mongodb').ObjectID;

app.use('/public/uploads', express.static('uploads'));
app.use('/public', express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());   
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({ storage: storage })

app.post("/login",(req,res,next)=>{
        console.log(req.body);
        const { password, email } = req.body;
        console.log(email);
        userDb.find({ email: email })
        .then((user) => {
            console.log(user);
          if (user.length === 0){
            const error=new Error("No user was found with this email");
            error.statusCode=404;
            throw error;
            }
          else {
            
            const isValid=bcrypt.compareSync(password, user[0].password)
            if(!isValid){
                const error=new Error("Invalid Password");
                error.statusCode=401;
                throw error;
            }
            else{
                console.log(isValid);
                const userData = {
                name:user[0].name,
                email: user[0].email,
                ID: user[0]._id,
                type:user[0].userType,
                registerEvents:user[0].registeredEventsIds
                };
                const token = jwt.sign(userData, "MONGO_SECRET", { expiresIn: "1hr" });
                return res.status(200).json({
                message: "Authentication has been successful",
                token: token
                });
            }
                
            // bcrypt.compare(password, user[0].password, (_err, result) => {

            //   if (_err){
            //         const error=new Error("Authentication has failed");
            //         error.statusCode=401;
            //         throw error;
            //     }
            // else if(!result){
            //         console.log("in");
            //         const error=new Error("Invalid Password");
            //         error.statusCode=401;
            //         throw error;;
            //     // const error=new Error("Authentication has failed");
            //     // error.statusCode=401;
            //     // throw error;
            //     }
            //   else {
            //         console.log(result);
            //     const userData = {
            //       email: user[0].email,
            //       ID: user[0]._id,
            //       type:user[0].userType,
            //       registerEvents:user[0].registeredEventsIds
            //     };
            //     const token = jwt.sign(userData, "MONGO_SECRET", { expiresIn: "1hr" });
            //     return res.status(200).json({
            //       message: "Authentication has been successful",
            //       token: token
            //     });
            //   }
              
            // });
          }
        })
        .catch((err)=>{
            console.log(err);
            if(!err.statusCode){
                err.statusCode=500;
            }
            next(err);
        })
    
})


app.post("/register",(req,res,next)=>{
    console.log(req.body);
    
    const {values}=req.body;
    userDb.findOne({email:values.email})
    .then((user) => {
        if (user)
          res.status(409).json({ error: "The entered Email already exist!" });
        else {
          bcrypt.hash(values.password, 10, (error, hash) => {
            if (error) res.status(500).json({ error });
            else {
                const userTypes=["user","organizer"];
                if(!userTypes.includes(values.userType)){
                    res.status(400).json({message:"Invalid UserType"});
                }else{
                    
                    const user=new userDb({
                        name:values.name,
                        email:values.email,
                        password:hash,
                        type:values.userType,
                        gender:values.gender,
                        usn:values.usn,
                        phoneNumber:values.phoneNumber,
                        semester:values.semester,
                        department:values.department,
                        userType:values.userType
                    });
                    user.save(user)
                        .then(response=>{
                            console.log("saved");
                            // let transporter = nodemailer.createTransport({
                            //     service: "gmail",
                            //     port: 587,
                            //     secure: false, // true for 465, false for other ports
                            //     auth: {
                            //       user: "", 
                            //       pass: "", 
                            //     },
                            //   });
            
                            //   transporter
                            //     .sendMail({
                            //       from: "01fe20bcs108@kletech.ac.in",
                            //       to: `${values.email}`,
                            //       subject: "Welcome to KLE Tech Management System",
                            //       text: `Hello Dear ${values.email}`,
                            //       html: `<b>Hello Dear User, we are happy that you join our family. Kind Regards, iCinema Team.</b>`,
                            //     })
                            //     .then((info) => console.log("Email has been sent!"))
                            //     .catch((err) => console.log(err));
                            res.status(201).json({
                                message: "Signed Up Successfully",
                                user,
                            });
                        })
                        .catch((error) => res.status(500).json({ message:"Error while saving",err:error }));
                }
            }
        })
    }
    })
  
})

app.get("/upcomingEvents",(req,res,next)=>{
    const nowDate=new Date();
    eventDb.find({"status":"accepted","fromDateTime":{$gt:nowDate}})
        .then(data=>{
            console.log(data);
            if(data.length!==0){
                res.status(200).json({message:"Success",data:data});
            }
            else{
                res.status(200).json({message:"No Upcoming Events",data:data});
            }
        })
})

app.get("/previousEvents",(req,res,next)=>{
    const nowDate=new Date();
    eventDb.find({"status":"accepted",toDateTime:{$lt:nowDate}})
        .then(data=>{
            console.log(data);
            if(data.length!==0){
                res.status(200).json({message:"Success",data:data});
            }
            else{
                res.status(200).json({message:"No Previous Events",data:data});
            }
        })
})

app.post("/bookEvent",upload.single("images"),(req,res)=>{
    // console.log(req.body);
    // console.log(req.images);
    // console.log(req.data);

            const decode=jwt.verify(req.body.token,"MONGO_SECRET")
            if(!decode){
                res.status(400).json( {message: "JWT expired"} );
            }
            else if(decode.type==="user"){
                res.status(400).json( {message: "User Cannot Book an Event"} );
            }
            else{
                console.log(req.body);
                console.log(decode);
                const url = req.protocol + '://' + req.get('host');
                const event=new eventDb({
                    eventName:req.body.eventName,
                    eventDescription:req.body.eventDescription,
                    coordinatorName:req.body.coordinatorName,
                    coordinatorEmail:req.body.coordinatorEmail,
                    coordinatorNumber:req.body.coordinatorNumber,
                    venue:req.body.venue,
                    noOfPeopleEstimated:req.body.noOfPeopleEstimated,
                    fromDateTime:new Date(req.body.fromDateTime),
                    toDateTime:new Date(req.body.toDateTime),
                    image: url + '/public/uploads/' + req.file.filename,
                    organizerEmail:decode.email,
                    organizerName:decode.name,
                    guestName:req.body.guestName,
                    status:"pending",
                    eventType:req.body.eventType
                })
                console.log(event);
                event.save(event)
                    .then(response=>{
                        console.log("saved");
                        res.status(200).json({message:"Event Booking"});
                    })
                    .catch(err=>{
                        console.log(err);
                        throw err;
                    })

            }
        
    })

app.post("/getPendingEvents",(req,res,next)=>{
    eventDb.find({"status":"pending"})
        .then(data=>{
            console.log(data);
            if(data.length!==0){
                res.status(200).json({message:"Success",data:data});
            }
            else{
                res.status(200).json({message:"No Pending Events",data:data});
            }
        })
        .catch(err=>{throw err});
})


app.post("/acceptEvent",(req,res,next)=>{
    const {id,email}=req.body;
    eventDb.update({id:id},{$set:{"status":"accepted"}})
        .then(ress=>{
            userDb.updateOne({email:email},{$push:{"organizedEventIds":id}})
                .then(ress=>{
                    res.status(200).json({message:"Accepted"});
                })
        })
        .catch(err=>{throw err})
})


app.post("/eventDelete",(req,res,next)=>{
    if(!req.body.id){
        res.status(400).json( {message: "Invalid Event Id"} );
    }
    else{
        const {id,email}=req.body;
        console.log(id);
        eventDb.findOne({_id:id})
        .then(data=>{
            console.log(data);
            if(!data){
                res.status(400).json( {message: "Invalid Event Id"} );
            }
            else{
                const link=data.image.split("/")[5];
                console.log(link);
                // console.log(data.image.split("/"));
                eventDb.findByIdAndDelete(id)
                .then(response=>{
                    fs.unlink(`./public/uploads/${link}`,(err)=>{
                        if (err) throw err;
                        // if no error, file has been deleted successfully
                        console.log('File deleted!');
                    });
                    console.log("Successfully deleted");
                    userDb.findOne({email:email})
                        .then(data=>{
                            if(!data){
                                res.status(400).json( {message: "Invalid User Id"} );
                            }
                            else{
                                userDb.updateOne({email:email},{$pull:{"organizedEventIds":id}})
                                    .then(response=>{
                                        res.status(200).json( {message: "Succesfully Deleted"} );
                                    })
                                    .catch(err=>{throw err});
                            }
                        })
                        .catch(err=>{throw err});
                })
            }
        })
        
    }
})

app.get("/eventInfo/:id",(req,res,next)=>{
    const objid=new ObjectID(req.params.id);
    console.log(objid);
    eventDb.find({_id:objid})
        .then((data)=>{
            console.log(data[0]);
            console.log(data[0]["fromDateTime"].toUTCString());
            
            if(data.length===0){
                res.status(400).json({message:"Not Found"});
            }
            else{
                res.status(200).json({message:"Success",event: data[0]});
            }
        })
        .catch(err=>{
            throw err;
        })
})

app.post("/registerEvent",(req,res,next)=>{
    const {email,eventId}=req.body;
    console.log(req.body);
    userDb.find({email:email})
        .then(data=>{
            if(data.length>0){

            
                if(!data[0].registeredEventsIds.includes(eventId)){

                    userDb.update({email:email},{$push:{"registeredEventsIds":eventId}})
                        .then(response=>{
                            res.status(200).json({message:"Registerd"})
                        })
                        .catch(err=>{
                            throw err;
                        })
                    }
                    else{
                        res.status(200).json({message:"Already Registerd"})
                }
            
            }
            else{
                res.status(200).json({message:"User dosent exist"});
            }
        })
})
app.post("/deRegisterEvent",(req,res,next)=>{
    const {email,eventId}=req.body;
    console.log(req.body);
    userDb.find({email:email})
        .then(data=>{
            if(data.length>0){
                if(data[0].registeredEventsIds.includes(eventId)){

                    userDb.update({email:email},{$pull:{"registeredEventsIds":eventId}})
                        .then(response=>{
                            res.status(200).json({message:"DeRegisterd"})
                        })
                        .catch(err=>{
                            throw err;
                        })
                    }
                    else{
                        res.status(200).json({message:"Already DeRegisterd"})
                }
            
            }
            else{
                res.status(200).json({message:"User dosent exist"});
            }
        })
})

app.post("/registeredEvents",(req,res,next)=>{
    console.log(req.body);
    const {email}=req.body;
    userDb.find({email:email})
        .then(data=>{
            if(data.length>0)
            {
                res.status(200).json({registeredEventsIds:data[0].registeredEventsIds});
            }else{
                res.status(200).json({registeredEventsIds:[],message:"User dosent exist"});
            }
        })
        .catch(err=>{throw err});
})

app.post("/getUserDetails",(req,res,next)=>{
    const {email}=req.body.user;

    userDb.find({email:email})
        .then(data=>{
            if(data.length>0)
            {
                res.status(200).json({user:data[0],message:"Success"});
            }
            else{
                res.status(200).json({user:[],message:"User dosent exist"});
            }
        })
        .catch(err=>{throw err});
})

app.use((error,req,res,next)=>{
    console.log(error);
    const status=error.statusCode || 400;
    const message=error.message;
    res.status(status).json({ message:message });
});


app.listen(8081,()=>{
    db().then(res=>{
        console.log("Listening on port 8081  and connected to db");
    });
});