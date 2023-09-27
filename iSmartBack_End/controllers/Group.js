const { HttpStatusCode } = require('axios')
const Group =require('../models/groupModel')
const User=require('../models/userModel')
const ChargePoint=require('../models/chargePointsModel')
const catchAsync = require('../utils/catchAsync')
const { StatusCodes } =require('http-status-codes')
const Session = require('../models/sessionModel')
const Transaction=require('../models/transactionsModel')
const bcrypt=require('bcryptjs')
const Reservation = require('../models/reservationModel')
const shortid=require('shortid')
exports.AddGroup=catchAsync(async(req,res,next)=>{
    const { 
        name,
        contactEmail,
        financialEmail,
        companyName,
        addressInformation,
        phoneNumber,
      } = req.body;

      const newGroup = new Group({
        name,
        contactEmail,
        financialEmail,
        companyName,
        phoneNumber,
        addressInformation,
      });
      const savedGroup=await newGroup.save() 
      if(savedGroup) {
             return res.status(StatusCodes.CREATED ).json({ msg:'group added successfully' })
            }
             return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("something went wrong")
})

exports.getAllGroups=catchAsync(async(req,res,next)=>{   
     const groups=await Group.find()                         
     if(groups){
      const groupsWithSummary = groups.map(group => {
        return {
          _id: group._id,
          name: group.name,
          companyName:group.companyName,
          contactEmail:group.contactEmail,
          members:group.members && group.members.length,
          chargePoints: group.chargePoints && group.chargePoints.length, 
          numberOfAdmins:group.admins && group.admins.length,
        };
      });

        return res.status( StatusCodes.OK).json(  groupsWithSummary )
     }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("something went wrong")
      
})

exports.getGroupMember=catchAsync(async(req,res,next)=>{
  console.log('get groups memebers ')
    const groupId = req.params.groupId;
    const group = await Group.findById(groupId)
                              .populate('members','-__v -password')  
                              .populate('admins','-__v -password') 
                                 
    if(!group) return res.status(StatusCodes.NOT_FOUND ).json({ error: 'Group not found' });  

    return res.status(StatusCodes.OK).json([...group.admins,...group.members])   
                                                       

})

exports.getGroupChargePoints=catchAsync(async(req,res,next)=>{
  
    let groupId = req.params.groupId;
    if(groupId==null) groupId=req.user.groupId
    const group = await Group.findById(groupId)
                             .populate('chargePoints',    "chargerName location status chargerModel supportNumber") 
                               

   if(!group) return res.status(StatusCodes.NOT_FOUND).json({ error: 'Group not found' });

   return res.status(StatusCodes.OK).json(group.chargePoints)  

                           
 }
) 


exports.addMemberToGroup=catchAsync(async(req,res,next)=>{
  console.log('hell in add Group member ')
  const groupId=req.params.groupId;
  let { 
    name,
    email,
    password,
    RFID,
    phoneNumber,
    role
  } 
  = req.body;

  password = await bcrypt.hash(password, 12);  
  //add the user instance 
   const newUser=new User({
      _id:shortid.generate(),
      name,
      email,
      password,
      RFID,
      phoneNumber,
      role
    })
    
   const SavedUser=await newUser.save()  
  
   const group=await Group.findById({_id:groupId }) 


   if (group.members.some(member => member.userId==SavedUser._id)) { 
    return res.status(400).json({ message: 'User is already a member of the group' });
  } 

 
   if (!group) {
       return res.status(404).json({ error: 'Group not found' });
    }  
    
    switch(role){
      case 'member':
         group.members.push(
           SavedUser._id
         )
         await group.save();
         res.status(201).json(group.members);  
        break;
      case 'admin':
         group.admins.push( 
           SavedUser._id  
          )  
          await group.save();
          res.status(201).json(group.admins);  
        break;
  
    } 
   
})


exports.deleteGroup=catchAsync(async(req,res,next)=>{
    const groupId=req.params.groupId
    //fetch the group

    const deletedGroup=await Group.findByIdAndDelete({_id:groupId})

    if(!deletedGroup) return res.status(StatusCodes.NOT_FOUND).json({ error: 'Group not found' }) 

    res.status(200).json({ message: 'Group deleted successfully' }); 
})


exports.getGroupById=catchAsync(async(req,res,next)=>{
   const groupId=req.params.groupId
   //fetch the group

   const fetchedGroup=await Group.findById({ _id:groupId })
                                  .select('-members -chargePoints -admins')

   if(!fetchedGroup) return res.status(StatusCodes.NOT_FOUND).json({ error: 'Group not found' }) 

   res.status(HttpStatusCode.Ok).json( fetchedGroup )
})


exports.deleteMemberFromGroup=catchAsync(async(req,res,next)=>{
    const  groupId = req.params.groupId;   
    const memberId=req.query.memberId;

    const group = await Group.findById({ _id:groupId });
   
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    
    const memberIndex = group.members.findIndex(member => member === memberId);  

    if (memberIndex === -1) {
       return res.status(404).json({ error: 'Member not found in the group' });
    }
     
    group.members.splice(memberIndex, 1);
    await group.save();
    await User.findByIdAndDelete(memberId) 

    res.status(200).json({ message: 'Member deleted from the group' });  
})

exports.deleteAdminFromGroup=catchAsync(async(req,res,next)=>{
  const  groupId = req.params.groupId;   
  const adminId=req.query.AdminId;    

  const group = await Group.findById({ _id:groupId });
   
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    const AdminIndex = group.members.findIndex(admin => admin === adminId); 

    if (AdminIndex === -1) {
      return res.status(404).json({ error: 'Admin not found in the group' });
   }

   group.admins.splice(memberIndex, 1);
   await group.save();
   await User.findByIdAndDelete(adminId) 

   res.status(200).json({ message: 'Admin deleted from the group' });   
 })

exports.addChargePointToGroup=catchAsync(async(req,res,next)=>{

  const groupId = req.params.groupId;
  const chargePointData = req.body;
  console.log(chargePointData); 
  const newChargePoint= new ChargePoint(chargePointData)
  await newChargePoint.save()
 
  const group = await Group.findById(groupId); 

  if (!group) {
    return res.status(404).json({ message: 'Group not found' }); 
  } 

  group.chargePoints.push(newChargePoint._id)   
  group.save()
  res.status( HttpStatusCode.Created ).json(group.chargePoints) 
})

exports.deleteAllGroups=catchAsync(async(req,res,next)=>{
 
  await Group.deleteMany();    
  console.log("hello the world ")
  res.status( HttpStatusCode.Ok).json({ message: 'All groups have been deleted' });

})

exports.deleteChargePointFromGroup=catchAsync(async(req,res,next)=>{

     const { groupId,chargePointId }=req.query 

     // Find the group by ID
    const group = await Group.findById(groupId);
     if (!group) {
      return res.status(404).json({ message: 'Group not found' });
     } 
     // Find the index of the charge point ID to remove
     const chargePointIndex = group.chargePoints.indexOf(chargePointId);
     if (chargePointIndex === -1) {
      return res.status(404).json({ message: 'Charge point not found in the group' });
    }

    // Remove the charge point ID from the group's chargePoints array
    group.chargePoints.splice(chargePointIndex, 1);

    await group.save();

    res.status(200).json({ message: 'chargePoint deleted from the group' });
     

})

exports.getGroupStatistics=catchAsync(async(req,res,next)=>{
      const groupId=req.params.groupId

      const group=await Group.findById(groupId)
                             .populate('chargePoints','_id longitude latitude ')

      if (!group) {
        return res.status(404).json({ message: 'Group not found' });      
       } 

    //search for the group session  

    const allGroupSessions = await Session.find({
       chargerId: { $in: group.chargePoints }, 
    });
    
 
 
     //calculate the totalKwCharged and total Duration
     let totalEnergyUsed = 0;
     let totalDuration = 0;
      
     allGroupSessions.forEach((s) => {
      totalEnergyUsed += s.totalKlwCharged;
      totalDuration += s.duration;
    });
  
    // Filter out the active sessions from allGroupSessions
    const  totalActiveSession = allGroupSessions.filter(session => session.status === 'active').length;
    
    res.status( HttpStatusCode.Ok ).json({
            totalEnergyUsed,
            totalDuration,
            totalActiveSession,
            totalSessions:allGroupSessions.length, 
            cordinates:group.chargePoints        
    })

})

exports.getGroupSessions=catchAsync(async(req,res,next)=>{
    const groupId=req.params.groupId

    const groups=await Group.findById(groupId) 

    if (!groups) {
      return res.status(404).json({ message: 'Group not found' });
     } 

     //search for the group session  

    const allGroupSessions = await Session.find({
      chargerId: { $in: groups.chargePoints },   
   });

    res.status( HttpStatusCode.Ok ).json( allGroupSessions ) 

})

exports.getGroupTransaction=catchAsync(async(req,res,next)=>{
  const groupId=req.params.groupId

  const groups=await Group.findById(groupId) 
  if (!groups) {
    return res.status(404).json({ message: 'Group not found' });
   } 

    //search for the group Transaction  
   const allGroupTransaction=await Transaction.find({
       chargerId: { $in: groups.chargePoints }
   });

   res.status( HttpStatusCode.Ok ).json(allGroupTransaction)

})

exports.getGroupReservation=catchAsync(async(req,res,next)=>{
     const groupId=req.params.groupId
     const groups=await Group.findById(groupId) 
     if (!groups) {
       return res.status(404).json({ message: 'Group not found' });
      } 
      const allGroupReservation=await Reservation.find({
        chargerId:{ $in: groups.chargePoints }
      })
      res.status(200).json( allGroupReservation )

}) 


exports.updateGroupDetails=catchAsync(async(req,res,next)=>{
  const groupId = req.params.groupId;
  const updatedDetails = req.body;

  // Find the group by ID
  const group = await Group.findById(groupId);
  if (!group) {
    return res.status(404).json({ message: 'Group not found' });
  }
  
   // Check if the updated details only contain properties other than members, admins, and chargePoints
   const allowedProperties = ['name', 'contactEmail', 'financialEmail','companyName','phoneNumber','addressInformation'];
   const hasOnlyAllowedProperties=Object.keys(group).every((property)=> allowedProperties.includes(property) )   
   
   if(allowedProperties){
        // Update the properties and save the group 
      Object.assign(group, updatedDetails);
      await group.save();
   }else{
      res.status(400).json({ message: 'Invalid properties in the update' });     
   }

})

exports.deleteAllChFromGroup=catchAsync(async(req,res,next)=>{
  const groupId = req.params.groupId;

  const group = await Group.findById(groupId);
  if (!group) {
    return res.status(404).json({ message: 'Group not found' });
  }
  group.chargePoints = [];

  
  await group.save();

  res.json({ message: 'All chargePoints removed from the group' });  

})