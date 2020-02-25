const graphql = require('graphql');
const Booking = require('../models/booking')
const User = require('../models/user')
const Cab = require('../models/cab')


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const BookingType = new GraphQLObjectType({
    name: 'Booking',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        cabId: {
            type: GraphQLID
        },
        userId: {
            type: GraphQLID
        },
        car:{
            type: GraphQLString

        },
        driverName: {
            type: GraphQLString
        },
        from: {
            type: GraphQLString
        },
        to: {
            type: GraphQLString
        },
      

        user: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.userId);
            }
        },
        cab: {
            type: CabType,
            resolve(parent, args) {
                return Cab.findById(parent.cabId);
            }

        }
    })
});


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        location: {
            type: GraphQLString
        },
        bookings: {
            type: new GraphQLList(BookingType),
            resolve(parent, args) {
                return Booking.find({
                    userId: parent.id
                });
            }
        }
    })
});


const CabType = new GraphQLObjectType({
    name: 'Cab',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        driverName: {
            type: GraphQLString
        },
        location: {
            type: GraphQLString
        },
        car: {
            type: GraphQLString
        },
        available:{
            type: GraphQLString
        },
        bookings: {
            type: new GraphQLList(BookingType),
            resolve(parent, args) {
                return Booking.find({
                    cabId: parent.id
                });
            }
        }
    })
});



const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        booking: {
            type: BookingType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return Booking.findById(args.id);
            }
        },
        cab: {
            type: CabType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return Cab.findById(args.id);
            }
        },
        user: {
            type: UserType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return User.findById(args.id);
            }
        },
        cabs: {
            type: new GraphQLList(CabType),
            resolve(parent, args) {
                return Cab.find({});
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({});
            }
        }
    }
});





const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                location: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(parent, args) {
                let user = new User({
                    name: args.name,
                    location: args.location
                });


                return user.save();
            }
        },
        addCab: {
            type: CabType,
            args: {
                car: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                driverName: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                location: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(parent, args) {
                let cab = new Cab({
                    car: args.car,
                    driverName: args.driverName,
                    location: args.location,
                    available: "Yes"
                });
                return cab.save();
            }
        },
        addBooking: {
            type: BookingType,
            args: {

                cabId: {
                    type: GraphQLString
                },
                userId: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                from: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                to: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                driverName: {
                    type: GraphQLString
                },
                isCabFound: {
                    type: GraphQLString
                }

            },
            async resolve(parent, args) {

                let cabs = await Cab.find({
                    location: args.from,
                    available:"Yes"
                })

                if(cabs.length!=0){

                    cabs[0].available = "No"
                    await cabs[0].save()
    
                    let booking = new Booking({
                        cabId: cabs[0].id,
                        userId: args.userId,
                        from: args.from,
                        to: args.to,
                        driverName: cabs[0].driverName,
                        car: cabs[0].car

                    });
                    return booking.save();

                }

            
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});