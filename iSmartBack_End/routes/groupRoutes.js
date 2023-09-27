const exporess=require('express')
const router=exporess.Router()


const { protectRoute, SuperadminMidllware, AdminMidllware } = require('../controllers/auth')

const { AddGroup, getAllGroups, getGroupMember, addMemberToGroup,getGroupReservation, deleteGroup, getGroupById, deleteMemberFromGroup, getGroupStatistics, deleteAllGroups, getGroupChargePoints, addChargePointToGroup, deleteChargePointFromGroup, getGroupSessions, getGroupTransaction, updateGroupDetails, deleteAllChFromGroup } =require('../controllers/Group')



router.route('/').get( protectRoute,SuperadminMidllware,getAllGroups )
                 .post( protectRoute,SuperadminMidllware,AddGroup ) 
                 .delete( protectRoute,SuperadminMidllware,deleteAllGroups )



router.route('/GroupMembers/:groupId/').get( protectRoute, AdminMidllware, getGroupMember )
                                         .delete( protectRoute, AdminMidllware, deleteMemberFromGroup ) 
                                         .post( protectRoute, AdminMidllware, addMemberToGroup )   
                                        
router.route('/Chargepoints/:groupId').get( protectRoute, AdminMidllware, getGroupChargePoints )
                                      .post(protectRoute, AdminMidllware, addChargePointToGroup )
                                      .delete( protectRoute, AdminMidllware, deleteChargePointFromGroup )  
                             
 router.route('/AllChargepoints/:groupId').delete(protectRoute, AdminMidllware, deleteAllChFromGroup )   

router.route('/:groupId').get(  protectRoute ,AdminMidllware ,getGroupById ) 
                         .delete( protectRoute,SuperadminMidllware, deleteGroup ) 

router.route('/GroupMembers/:groupId').get( getGroupMember )
                                         .delete( deleteMemberFromGroup ) 
                                         .post( AdminMidllware,addMemberToGroup )    
                                        
router.route('/Chargepoints/:groupId').get( getGroupChargePoints )
                                      .post( addChargePointToGroup )
                                      .delete( deleteChargePointFromGroup )  
 router.route('/reservations/:groupId').get( getGroupReservation )                 

router.route('/:groupId').get( getGroupById )
.put(updateGroupDetails)
                         .delete( deleteGroup ) 




router.route('/getGroupStatistics/:groupId').get( protectRoute, AdminMidllware, getGroupStatistics )   

router.route('/sessions/:groupId').get( protectRoute, AdminMidllware, getGroupSessions )   
router.route('/transactions/:groupId').get( protectRoute, AdminMidllware, getGroupTransaction )           

module.exports=router