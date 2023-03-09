const User = require('../models/Users')
const PersonalDetails = require('../models/PersonalDetails')  

const createPersonalDetails = async (req, res)=>{
  const {userId,fatherName, motherName, street, city,
    state, country, pincode,educationDetails} = req.body
    
  try {
    const personalDetails = await PersonalDetails.create({
    userId, fatherName, motherName, street, city,
    state, country, pincode , educationDetails: [...educationDetails]
    });
    await personalDetails.save();
    res.status(201).json(personalDetails);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}



const personalDetails = async (req, res)=>{

    try {
    const users = await PersonalDetails.aggregate([
      {
        $match: {
           userId: { $exists: true } 
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: 'userId',
          as: 'userDetails'
        }
      },
      {
        $unwind: {
          path: '$userDetails',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          name: '$userDetails.name',
          email: '$userDetails.emailId',
          phoneNumber: '$userDetails.phoneNumber',
          type: '$userDetails.type',
          role: '$userDetails.role',
          fatherName: '$fatherName',
          motherName: '$motherName',
          address: {
            street: '$street',
            city: '$city',
            state: '$state',
            country: '$country',
            pincode: '$pincode'
          },
          educationDetails: '$educationDetails'
        }
      },
    ]);
    res.status(200).json({users});
  } catch (err) {
    res.status(500).send(err);
  }
  }

  module.exports = {personalDetails,  createPersonalDetails}