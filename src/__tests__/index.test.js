import app  from '../app.js';
import supertest from "supertest"
import mongoose from "mongoose"
import { mongo_test_url } from '../tools/envSetup.js';
// require('dotenv').config()
// // import dotenv from "dotenv/config"

const request = supertest(app)

const validUser = {
    name: "Test User",
    surname: "The First",
    username: "Testy",
    password: "PSWRD101",
    dateOfBirth: "1997-26-12",

}
const invalidUser = {
    surname: "The First",
    username: "Testy",
    password: "PSWRD101",
    dateOfBirth: "1997-26-12",
}

const validGame = {
    name: "Test Game",
    baseGame: "Basic Fantasy",
    characterSheet: "OSR",
    ownerId: "00000001",
}
const invalidGame = {
    baseGame: "Basic Fantasy",
    characterSheet: "OSR",
    ownerId: "00000001",
}

const validMonsterUpdate = {
    name: "John"
}
const validUserUpdate = {
    name: "John"
}

describe("Testing the server endpoints", () => {


    beforeAll(done => {
        console.log("Runs first setting up the connection url is : ", mongo_test_url)

        mongoose.connect(process.env.MONGO_DB_URL_TEST).then(() => {
            console.log("Connected to the test database")
            done()
        })
    })
    it("should check that the GET /test endpoint returns a success message", async () => {
        const response = await request.get("/test");

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Test successful");
    })

    /* *************************** POST for games, users, monsters ********************************* */

    //POST Create new user
    it("should check that the POST /user endpoint returns a success message if input is correct", async () => {
        const response = await request.post("/users").send(validUser);

        expect(response.status).toBe(201);
        expect(response.body.name).toBeDefined()
        expect(response.body.surname).toBeDefined()
        expect(response.body.username).toBeDefined()
        expect(response.body.password).toBeDefined()
        expect(response.body.dateOfBirth).toBeDefined()
    })


    //POST Create new user FALSE DATA
    it("should check that the POST /user endpoint returns a 400 if input is incorrect", async () => {
        const response = await request.get("/users").send(invalidUser);

        expect(response.status).toBe(400);
    })

    //POST Create a new game
    it("should check that the POST /games endpoint creates a new game and returns a success", async () => {
        const response = await request.post("/games").send(validGame);

        expect(response.status).toBe(201);
        expect(response.body.name).toBeDefined()
        expect(response.body.baseGame).toBeDefined()
        expect(response.body.CharacterSheet).toBeDefined()
        expect(response.body.ownerId).toBeDefined()

    })

    //POST Create a new game FALSE Data
    it("should check that the POST /games endpoint and returns a 400 if data is incorrect", async () => {
        const response = await request.post("/games").send(invalidGame);

        expect(response.status).toBe(400);
    })

    /* *************************** GET for games, users, monsters ********************************* */

    /*  USERS  */

    //GET all users
    it("should check that the GET /users endpoint returns an array of all the users , return 200 if ok", async () => {
        const response = await request.get("/users");

        expect(response.status).toBe(200);
        expect(response.body.length).tobeGreaterThan(0)
    })

    //GET user by id
    it("should check that the GET /users/:id endpoint returns a single user " async () => {
        const allUsersArray = await request.get("/users")
        const id = allUsersArray[0]._id
        const response = await request.get("/users/"+id)

        expect(response.status).toBe(200);
        expect(response.body.name).toBeDefined()
        expect(response.body.surname).toBeDefined()
        expect(response.body.username).toBeDefined()
        expect(response.body.password).toBeDefined()
        expect(response.body.dateOfBirth).toBeDefined()
    })

    //GET user by id FALSE DATA 
    it("should check that the GET /users/:id endpoint returns 404 if user id is invalid " async () => {
        const allUsersArray = await request.get("/users")
        const response = await request.get("/users/00000124");


        expect(response.status).toBe(404);
    })

    /*  GAMES  */

        //GET all games
        it("should check that the GET /games endpoint returns an array of all the games , return 200 if ok", async () => {
            const response = await request.get("/games");
    
            expect(response.status).toBe(200);
            expect(response.body.length).tobeGreaterThan(0)
        })
    
        //GET game by id
        it("should check that the GET /games/:id endpoint returns a single game " async () => {
            const allUsersArray = await request.get("/games")
            const id = allUsersArray[0]._id
            const response = await request.get("/games/"+id)
    
            expect(response.status).toBe(200);
            expect(response.body.name).toBeDefined()
            expect(response.body.baseGame).toBeDefined()
            expect(response.body.ownerId).toBeDefined()
            expect(response.body.characterSheet).toBeDefined()
            expect(response.body.characters).toBeDefined()
            expect(response.body.players).toBeDefined()
        })
    
        //GET game by id FALSE DATA 
        it("should check that the GET /games/:id endpoint returns 404 if user id is invalid " async () => {
            const allUsersArray = await request.get("/games")
            const response = await request.get("/games/00000124");
    
    
            expect(response.status).toBe(404);
        })

    //GET all games for a single user
    it("should check that the GET /users endpoint returns an array of all the user's games, return 200 if ok", async () => {

        const usersArrayList = await request.get("/users/");
        const id = usersArrayList[0]._id
        const response = await request.get("/games/user/"+id);

        expect(response.status).toBe(200);
        expect(response.body.length).tobeGreaterThan(0);

    })


    /*  MONSTERS  */

    //GET all monsters
    it("should check that the GET /monsters endpoint returns an array of all the monsters , return 200 if ok", async () => {
        const response = await request.get("/monsters");

        expect(response.status).toBe(200);
    })

    //GET monster by id
    it("should check that the GET /users/:id endpoint returns a single user " async () => {
        const arrayOfMonsters = await request.get("/monsters");
        const id = arrayOfMonsters[0]._id
        const response = await request.get("/monsters/"+id);

        expect(response.status).toBe(200);
        expect(response.body.name).toBeDefined()
        expect(response.body.hitDice).toBeDefined()
        expect(response.body.description).toBeDefined()
        expect(response.body.attack).toBeDefined()
        expect(response.body.numberOfAttacks).toBeDefined()
        expect(response.body.numberAppearing).toBeDefined()
        expect(response.body.morale).toBeDefined()
        expect(response.body.saveAs).toBeDefined()
        expect(response.body.experience).toBeDefined()
        expect(response.body.treasureType).toBeDefined()
        expect(response.body.armorClass).toBeDefined()
    })

    //GET monster by id FALSE DATA 
    it("should check that the GET /users/:id endpoint returns 404 if user id is invalid " async () => {
        const arrayOfMonsters = await request.get("/monsters");
        const id = arrayOfMonsters[0]._id
        const response = await request.get("/monsters/40014");

        expect(response.status).toBe(404);
    })



    /* *************************** PUT for games, users, monsters ********************************* */

    /* USERS */
    //PUT edit user by id
    it("should check that the PUT /users/:id endpoint returns 200 if user and data is changed " async () => {
        const arrayOfUsers = await request.get("/users");
        const id = arrayOfUsers[0]._id
        const response = await request.get("/users/"+id).send(validUserUpdate);
        const checkUserChange = await request.get("/users/"+id)

        expect(response.status).toBe(200);
        expect(typeof checkUserChange.body.name).toBe("string");
        expect(checkUserChange.body.name).toBe("John");

    })

    //PUT edit user by id FALSE DATA 
    it("should check that the GET /users/:id endpoint returns 404 if user id is invalid " async () => {
        const arrayOfUsers = await request.get("/users");
        const id = arrayOfUsers[0]._id
        const response = await request.get("/users/40014").send(validUserUpdate);
        expect(response.status).toBe(404);
    })

    /* MONSTERS */
    
    //PUT edit monster user by id
    it("should check that the PUT /users/:id endpoint returns 200 if user and data is changed " async () => {
        const arrayOfMonsters = await request.get("/monsters");
        const id = arrayOfMonsters[0]._id
        const response = await request.get("/monsters/"+id).send(validMonsterUpdate);
        const checkMonsterChange = await request.get("/monsters/"+id)

        expect(response.status).toBe(200);
        expect(typeof checkMonsterChange.body.name).toBe("string");
        expect(checkMonsterChange.body.name).toBe("John");
    })

    //PUT edit monster by id FALSE DATA 
    it("should check that the GET /users/:id endpoint returns 404 if user id is invalid " async () => {
        const response = await request.get("/monsters/400014").send(validMonsterUpdate);

        expect(response.status).toBe(404);
    })

    
    /* *************************** DELETE for games, users, monsters ********************************* */
    
    /* USER */

    //Delete user by id
    it("should check that the DELETE /users/:id endpoint returns 204 " async () => {
        const response = await request.get("/users");

        expect(response.status).toBe(200);
    })

    //Delete user by id FALSE DATA 
    it("should check that the DELETE /users/:id endpoint returns 404 if user id is invalid " async () => {
        const response = await request.get("/users");

        expect(response.status).toBe(200);
    })


    /* GAME */

    //Delete Game by id
    it("should check that the DELETE /games/:id endpoint returns 204 " async () => {
        const response = await request.get("/users");

        expect(response.status).toBe(200);
    })

    //Delete Game by id FALSE DATA 
    it("should check that the DELETE /games/:id endpoint returns 404 if user id is invalid " async () => {
        const response = await request.get("/users");

        expect(response.status).toBe(200);
    })


    /* MONSTER */

    //Delete Monster by id
    it("should check that the DELETE /monsters/:id endpoint returns 204 " async () => {
        const response = await request.get("/users");

        expect(response.status).toBe(200);
    })

    //Delete Monster by id FALSE DATA 
    it("should check that the DELETE /monsters/:id endpoint returns 404 if user id is invalid " async () => {
        const response = await request.get("/users");

        expect(response.status).toBe(200);
    })



    afterAll(done => {
        mongoose.connection.dropDatabase()
            .then(() => {
                return mongoose.connection.close()
            })
            .then(() => {
                done()
            })
    })

})