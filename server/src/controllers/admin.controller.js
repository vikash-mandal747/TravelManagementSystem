const TripModel = require("../models/trip.model");

// Total revenue by month
const revenueByMonth = async (req, res) => {
  const result = await TripModel.aggregate([
    { $match: { isCompleted: true } },
    {
      $group: {
        _id: { $month: "$startDate" },
        totalRevenue: { $sum: "$totalFare" },
        count: { $sum: 1 }
      }
    },
    { $sort: { "_id": 1 } }
  ]);
  res.status(200).json({message:result});
};


module.exports = revenueByMonth;