

const { describe, it } = require('mocha');
const { expect } = require('chai');
const { app, server } = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

let baseUrl;

describe('Hotel API', () => {
    before(async () => {
        const { address, port } = await server.address();
        baseUrl = `http://${address === '::' ? 'localhost' : address}:${port}`;
    });

    after(() => {
        return new Promise((resolve) => {
            server.close(() => {
                resolve();
            });
        });
    });

    // Test suite for adding hotels
    describe('POST /add-hotel', () => {
        it('should return 500 for invalid email format', (done) => {
            chai.request(baseUrl)
                .post('/add-hotel')
                .send({
                    hotelName: 'Test hotel',
                    hotelLocation: 'Test hotel',
                    hotelDescription: 'Short',
                    hotelOwner: 'invalid-email' // Invalid email for testing
                })
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    expect(res.body.message).to.equal('Validation error: Invalid email format'); 
                    done();
                });
        });

// test case for adding hotel
        it('should add a new hotel', (done) => {
            chai.request(baseUrl)
                .post('/add-hotel')
                .send({
                    hotelName: 'Test hotel',
                    hotelLocation: 'Test Location',
                    hotelDescription: 'A short description',
                    hotelOwner: 'test@example.com'
                })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });

        //test case for making sure the server starts
        it('should make sure the server starts', () => {
            expect(server.listening).to.be.true;
        });


        //test case for missing hotel name
        it('should return 500 for missing hotel name', (done) => {
            chai.request(baseUrl)
                .post('/add-hotel')
                .send({
                    hotelLocation: 'Test Location',
                    hotelDescription: 'A short description',
                    hotelOwner: 'test@example.com'
                })
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    expect(res.body.message).to.include('Validation error');
                    done();
                });
        });
        
    

        // test case for hotel location validation
        it('should return 500 for invalid hotel location if the input is less than 3 characters)', (done) => {
            chai.request(baseUrl)
                .post('/add-hotel')
                .send({
                    hotelName: 'Test Hotel',
                    hotelLocation: 'Ca', 
                    hotelDescription: 'A valid description',
                    hotelOwner: 'test@example.com'
                })
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    expect(res.body.message).to.equal('Validation error: Hotel location is invalid');
                    done();
                });
        });

        // Test case for hotel description length validation
        it('should return 500 for invalid description if the input less than 6 characters)', (done) => {
            chai.request(baseUrl)
                .post('/add-hotel')
                .send({
                    hotelName: 'Test Hotel',
                    hotelLocation: 'Valid Location',
                    hotelDescription: 'Short', // Invalid description
                    hotelOwner: 'test@example.com'
                })
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    expect(res.body.message).to.equal('Validation error: Description too short');
                    done();
                });
        });
        it('should return 500 for hotel name exceeding maximum length', (done) => {
            const longHotelName = 'A'.repeat(1001); //the limit is 1000 characters
            chai.request(baseUrl)
                .post('/add-hotel')
                .send({
                    hotelName: longHotelName, 
                    hotelLocation: 'Valid Location',
                    hotelDescription: 'A valid description',
                    hotelOwner: 'test@example.com'
                })
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    expect(res.body.message).to.equal('Input value exceeds maximum length');
                    done();
                });

        });

    });
});

