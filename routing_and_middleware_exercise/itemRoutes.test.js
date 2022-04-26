process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require("./app");
const items = require("./fakeDb");



let apples = {
    name: "apples",
    price: 0.99
};

beforeEach(() => {
    items.length = 0;
    items.push(apples);
});

afterEach(() => {
    items.length = 0;
});


describe("GET /items", () => {
    test("Should display a list of shoping items", async () => {
        const res = await request(app).get("/items");
        expect(res.status).toBe(200)
        expect(res.body).toEqual([apples]);
    })
})

describe("POST /items", () => {
    test("Addes item to the items list", async () => {
        const res = await request(app).post("/items").send({
            name: "pear",
            price: 2.00
        });
        expect(res.status).toBe(201);
        expect(res.body).toEqual({
            "added":{
                name: "pear",
                price: 2.00
            }
        });
    });
});


describe("GET /items/:name", () => {
    test("Get a single item", async () => {
        const res = await request(app).get(`/items/${apples.name}`);
        expect(res.status).toBe(200);
        expect(res.body).toEqual({name: "apples", price: 0.99});
    })
    test("Checks invaild item name error", async () => {
        const res = await request(app).get(`/items/toothpaste`);
        expect(res.status).toBe(400);
    })
})


describe("PATCH /items/:name", () => {
    test("Updates an items name", async () => {
        const res = await request(app).patch(`/items/${apples.name}`).send({
            name: "blueberries"
        });
        expect(res.status).toBe(200);
        expect(res.body).toEqual({"Updated": {name: "blueberries", price: 0.99}});
    })
    test("Checks invaild item name error", async () => {
        const res = await request(app).patch(`/items/toothpaste`);
        expect(res.status).toBe(400);
    })
})


describe("DELETE /items/:name", () =>{
    test("Selected Item should be deleted", async () => {
        const res = await request(app).delete(`/items/${apples.name}`);
        expect(res.status).toBe(200);
        expect(res.body).toEqual({"msg": "Deleted"});
    })
    test("Checks invaild item name error", async () => {
        const res = await request(app).delete(`/items/toothpaste`);
        expect(res.status).toBe(400);
        expect(res.body).toEqual({"error": {
            "message": "Item Name not Found",
            "status": 400
        }})
    })
})