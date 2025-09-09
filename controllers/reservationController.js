
const ReservationModel  = require('../models/Reservation')

const reserveTable = async (req, res) => { 
  try {
    const { customerName, phoneNumber, tableNumber, reservationTime, status } = req.body; 
    
    // Convert string to Date
    const reservationDate = new Date(reservationTime);

    // 1. Date must not be in past
    if (reservationDate < new Date()) {
      return res.status(400).send("Date must not be in the past.");
    }

    // 2. Check if same table already reserved at that time
    const existingReservation = await ReservationModel.findOne({
      tableNumber,
      reservationTime: reservationDate,
    });

    if (existingReservation) {
      return res.status(400).send("This table is already reserved at that time.");
    }

    // 3. Save new reservation
    const newReservation = new ReservationModel({
      customerName,
      phoneNumber,
      tableNumber,
      reservationTime: reservationDate,
      status,
    });

    await newReservation.save();

    res.redirect('/api/home/reservations');

  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating reservation");
  }
};

      
      // Complete Reservation
      const completeReservation = async (req, res)=> {
        
        try {
          
        const { id } = req.params
        await ReservationModel.findByIdAndUpdate(id, {status: 'complete'})

        res.redirect('/api/home/reservations')
        
      } catch (error) {
       console.log(error);
          
      }
      }

      const cancelReservation =  async (req, res) =>{
        
        try {
          
        const { id } = req.params
        await ReservationModel.findByIdAndUpdate(id, {status: 'cancel'})

        res.redirect('/api/home/reservations')
        
      } catch (error) {
       console.log(error);
           
      }
      }
      
    
      
// Show Reservations
const showReservations = async (req, res) =>{
      try {

        const allReservations = await ReservationModel.find().sort({ reservationTime: -1 })
        res.render('reservations' , {allReservations: allReservations})


      }
    catch(e){
      console.log(e);
      

    }
    }

module.exports =  {
        reserveTable,        
        cancelReservation,
        completeReservation,
        showReservations
}  
