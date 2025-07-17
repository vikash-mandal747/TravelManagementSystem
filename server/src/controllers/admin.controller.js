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
  res.status(200).json({ message: result });
};


// Total revenue for all completed trips
const totalRevenue = async (req, res) => {
  try {
    const result = await TripModel.aggregate([
      { $match: { isCompleted: true } },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalFare" }
        }
      }
    ]);

    const revenue = result[0]?.total || 0;
    res.status(200).json({ revenue });
  } catch (err) {
    res.status(500).json({ error: "Failed to calculate revenue" });
  }
};


module.exports = { revenueByMonth, totalRevenue };