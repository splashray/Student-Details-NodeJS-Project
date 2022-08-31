const Detail = require('../models/Details')

const getAllDetails =   async (req, res) =>{
     const detail = await Detail.find({})
     res.status(200).json({detail})
}

const createDetail =   async (req, res) =>{
        const detail =  await Detail.create(req.body)
        res.status(201).json({ detail }) 
}
 
const getDetail =  async (req, res) =>{
       try{
         const {id} = req.params
         const detail = await Detail.findOne({_id:id})
         if(!detail){ 
           return  res.status(404).json({msg:`No student with id: ${id}`})  
         } 
         res.status(200).json({detail})
       }catch(error){
        return res.status(500).json({ msg: 'Something went wrong, please try again' })
      }
      
}


const deleteDetail = async (req, res) =>{
    try{
      const {id} = req.params
      const detail = await Detail.findOneAndDelete({_id:id})
      if(!detail){
        return  res.status(404).json({msg:`No student with id: ${id}`})  
      }
      //optional later
       res.status(200).send('Student detail deleted successfully') 
    } catch(error){
      return res.status(500).json({ msg: 'Something went wrong, please try again' })
    }   

 }

const updateDetail =  async (req, res) =>{
    try{
      const {id} = req.params
      const detail = await Detail.findOneAndUpdate({_id:id},req.body,{
          new:true,
          runValidator:true
      })
      if(!detail){
        return  res.status(404).json({msg:`No student with id: ${id}`})  
      }
      res.status(200).json({detail})
    }catch(error){
      return res.status(500).json({ msg: 'Something went wrong, please try again' })

    }
   
}


module.exports = {
    getAllDetails,
    createDetail,
    getDetail,
    updateDetail,
    deleteDetail,

 }