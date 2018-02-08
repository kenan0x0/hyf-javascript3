class Movie {
    constructor(title, director) {
        this.title = title;
        this.director = director;
        this.newStars = [];
        this.newWriters = [];
        this.newRating = [];
    }

    getTitle() {
        return this.title;
    }

    getDirector() {
        return this.director;
    }

    addStar(star) {
        this.newStars.push(star);
    }

    getStars() {
        return this.newStars;
    }

    addWriter(writer) {
        this.newWriters.push(writer);
    }

    getWriters() {
        return this.newWriters;
    }

    addRating(rating) {
        this.newRating.push(rating);
    }

    getAverageRating() {
        return this.newRating;
    }
}

class StaffMember {
    constructor(name, role, dateOfBirth) {
        this.name = name;
        this.role = role;
        this.dateOfBirth = dateOfBirth;
        this.newMovie = [];
    }

    addMovie(movie) {
        this.newMovie.push(movie);
    }

    getName() {
        return this.name;
    }

    getRole() {
        return this.role;
    }

    getAge() {
        return this.dateOfBirth;
    }
}

const myMovie = new Movie("How I Met Your Mother", "Pamela Fryman");


const firstActor = new StaffMember("Neil Patrick Harris", "Barney Stinson", "June 15, 1973");
const secondActor = new StaffMember("Cobie Smulders", "Robin Scherbatsky", "April 3, 1982");
const thirdActor = new StaffMember("Josh Randor", "Ted Mosby", "July 29, 1974");
firstActor.addMovie("How I Met Your Mother");
myMovie.addStar(firstActor);
myMovie.addStar(secondActor);
myMovie.addStar(thirdActor);
myMovie.addRating(8.4);
myMovie.addWriter("Carter Bays");





console.log(myMovie.getStars().map(actor => `${actor.getName()} ${actor.getAge()}`));

// Way too messy I know,, but on my way to write more compact cleaner code I hope :)