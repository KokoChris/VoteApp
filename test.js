var request = require('supertest'),
    app = require('./app');


describe('Request to root path', function() {
    it('Returns a 200 status code', function(done) {

        request(app)
            .get('/')
            .expect(200, done);
    });
});


describe('Request to new poll path', function() {
    it('Returns an html page', function(done) {
        request(app)
            .get('/polls/new')
            .expect('Content-Type', /html/, done);
    });
});


describe('Creating new poll',function() {
	it('Returns a 201 status code',function(done) {
		request(app)
		 	.post('/polls')
		 	.expect(201,done);
	});
});