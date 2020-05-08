const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app.js');

describe('/GET apps', () => {
    it('should return an array with all apps', () => {
        return request(app)
          .get('/apps')
          .expect(200)
          .expect('Content-Type', /json/)
          .then(res => {
            expect(res.body).to.be.an('array');
          });
      });
    
      it('should sort array by name of app', () => {
        return request(app)
          .get('/apps')
          .query({ sort: 'app' })
          .expect(200)
          .expect('Content-Type', /json/)
          .then(res => {
            expect(res.body).to.be.an('array');
            let i = 0;
            let sorted = true;
            while (sorted && i < res.body.length - 1) {
              sorted = sorted && res.body[i].App.toLowerCase() < res.body[i + 1].App.toLowerCase();
              i++;
            }
            expect(sorted).to.be.true;
          });
        })
      it('should sort array by app rating', () => {
        return request(app)
          .get('/apps')
          .query({ sort: 'rating' })
          .expect(200)
          .expect('Content-Type', /json/)
          .then(res => {
            expect(res.body).to.be.an('array');
            let i = 0;
            let sorted = true;
            while (sorted && i < res.body.length - 1) {
              sorted = res.body[i].Rating >= res.body[i + 1].Rating;
              i++;
            }
            expect(sorted).to.be.true;
          });
      });
    
    
        
      });