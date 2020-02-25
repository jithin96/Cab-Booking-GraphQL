# Cab-Booking-GraphQL

Steps to run the project

1. Start the mongo service 
2. Navigate to project folder
3. NPM INSTALL to download and install all dependencies of the project
4. Run the project using command node app.js
5. got LOCALHOST:4000/GRAPHQL  to acces graphiql testing tool
6. To add a cab invoke addCab mutation as shown below as an example

      mutation{
          addCab(car:"i10",driverName:"Ram",location:"trivandrum"){
                  id
                  }
              }
              
     this will return the cabId
     
7. To add a user invoke addUser mutation as show below as an example   

     mutation{
         addUser(name:"Jithin",location:"trivandrum"){
                id
                }  
             }
             
    this will return the cabId  
  
 8. To add a booking invoke addBooking mutation as shown below as an example
 
    mutation{ 
         addBooking(from:"trivandrum",to:"kochi",userId:"5e54dad3b453e03eb8ded541"){
                  id
                 }
            }
            
 9. Now we had made all mutation and we can query the data like user data with all his bookings and its details
    or cab data with all its trip details or we can individually query user/cab/booking details. like ann example shown below
    
    query{
      user(id:"5e54dad3b453e03eb8ded541"){
          name
          location
          bookings{
            id
            car
            cabId
            from
            to
            driverName
            }
          }
        }
 
              
              
              
              
              
              
              
              
              
              
              
