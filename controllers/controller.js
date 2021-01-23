const User = require('../models/User')
const Order = require('../models/Order')

module.exports = {
    users: async (req, res) => {
        try {
            let osr = await User.find({})
            let orders = await Order.aggregate(
                [
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'userId',
                            foreignField: '_id',
                            as: 'name'
                        }
                    },
                    { $unwind: "$name" },
                    {
                        $group: {
                            _id: '$userId',
                            name: { $first: "$name" },
                            averageBillValue: { $avg: '$subTotal' },
                            noOfOrders: { $sum: 1 },
                        }
                    },
                    { $project: { _id: 1, noOfOrders: 1, averageBillValue: 1,name: '$name.name'  } }
                ]
            )
            return res.status(200).json({ message:'success',data: orders})
        }
        catch (error) {
            return res.status(500).json(error.message)
        }
    },
    updateUsers: async (req, res) => {
        try {
            const users = await User.aggregate(
                [
                    {
                        $lookup: {
                            from: 'orders',
                            localField: '_id',
                            foreignField: 'userId',
                            as: 'noOfOrders'
                        }
                    },
                    {
                        $group: {
                            _id: '$_id',
                            name: { $first: "$name" },
                            noOfOrders: {$first: '$noOfOrders'},
                        }
                    },
                    { $project: { _id: 1, noOfOrders: { $size: "$noOfOrders" }, name: 1 } }
                ]
            )
            users.forEach(async user => await User.updateOne(
                { _id: user._id },
                {
                    $set:
                    {
                        noOfOrders: user.noOfOrders,
                    }
                }
            ))
            return res.status(500).json({ message: 'success', data: users})
        }
        catch (error) {
            return res.status(500).json(error.message)
        }
    }
}
