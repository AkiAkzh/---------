const readlineSync = require('readline-sync');

class CinemaSystem {
    constructor() {
      this.movies = [];
      this.users = [];
      this.tickets = [];
      this.movieIdCounter = 1;
      this.userIdCounter = 1;
      this.ticketIdCounter = 1;
}

addMovie(movieName){
    const movie = {id: this.movieIdCounter++, name : movieName};
    this.movies.push(movie);
    return movie.id;
}

showAllMovies(){
    return this.movies
}

addUser(userName){
    const user = {id: this.userIdCounter++, name : userName};
    this.users.push(user);
    return user.id;
}

buyTicket(userId, movieId){
    let userFound = false;
    let moviesFound = false;
    for(let i = 0; i<this.users.length; i++){
        if(userId == this.users[i].id){
            userFound = true;
        }
    }
    for(let j = 0 ; j< this.movies.length; j++){
        if(movieId == this.movies[j].id){
            moviesFound = true;
        }
    }

    if(userFound && moviesFound){
        const ticket = { id: this.ticketIdCounter++, userId, movieId };
        this.tickets.push(ticket);
        return ticket.id;
    }else{
        return false;
    }
}

cancelTicket(ticketId){
    let ticketIndex = -1;
    let ticketFound = false;
    for(let i = 0; i < this.tickets.length; i++){
        if(ticketId == this.tickets[i].id){
            ticketFound = true;
            ticketIndex = i;
            break;
        }
    }

    if( ticketFound){
        this.tickets.splice(ticketIndex,1);
        return true;
    }else{
        return false;
    }
}
}

const cinemaSystem = new CinemaSystem();

while (true) {
    const action = readlineSync.question("Enter the action: \n1) addMovie \n2) showAllMovies \n3) addUser \n4) buyTicket \n5) cancelTicket \n6) Quit \n: ");
  
    if (action === "Quit") {
      break;
    }
  
    switch (action) {
      case "addMovie":
        const movieName = readlineSync.question("Enter the name of the movie: ");
        const movieId = cinemaSystem.addMovie(movieName);
        console.log(`The movie was added with an ID: ${movieId}`);
        break;
  
      case "showAllMovies":
        const movies = cinemaSystem.showAllMovies();

        console.log(`All movies:`);
        for(let i =0; i<movies.length; i++){
            console.log(`${movies[i].id}. ${movies[i].name}`);
        }
        console.log("\n");
        break;
  
      case "addUser":
        const userName = readlineSync.question("Enter the user name: ");
        const userId = cinemaSystem.addUser(userName);
        console.log(`The user was added with an ID: ${userId}`);
        break;
  
      case "buyTicket":
        const userIdForTicket = parseInt(readlineSync.question("Enter the user ID: "), 10);
        const movieIdForTicket = parseInt(readlineSync.question("Enter the movie ID:"), 10);
        const ticketId = cinemaSystem.buyTicket(userIdForTicket, movieIdForTicket);
        if (ticketId) {
          console.log(`The ticket was purchased with an ID:${ticketId}`);
        } else {
          console.log("Invalid user or movie ID");
        }
        break;
  
      case "cancelTicket":
        const ticketIdToCancel = parseInt(readlineSync.question("Enter the ticket ID: "), 10);
        const cancelResult = cinemaSystem.cancelTicket(ticketIdToCancel);
        if (cancelResult) {
          console.log(true);
        } else {
          console.log(false);
        }
        break;
  
      default:
        console.log("Wrong action");
        break;
    }
  }