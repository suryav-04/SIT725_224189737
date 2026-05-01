const expect = require("chai").expect;
const request = require("request");
const { calculateGrade } = require("../calculator");

const baseUrl = "http://localhost:3000";

describe("Grade API Tests", function () {

  it("should return 200 for home route", function(done) {
    request(baseUrl, function(error, response) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it("should calculate correct grade", function(done) {
    request.get(`${baseUrl}/grade?marks=80,90,100`, function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(body).to.include("HD");
      done();
    });
  });

  it("should handle missing marks", function(done) {
    request.get(`${baseUrl}/grade`, function(error, response) {
      expect(response.statusCode).to.not.equal(200);
      done();
    });
  });

  it("should handle invalid input", function(done) {
    request.get(`${baseUrl}/grade?marks=a,b,c`, function(error, response) {
      expect(response.statusCode).to.not.equal(200);
      done();
    });
  });

});

describe("Calculation Function Test", function () {

  it("should return correct average and grade", function () {
    const result = calculateGrade([80, 90, 100]);
    expect(result.grade).to.equal("HD");
  });

});