/**
 * Step definitions
 */
var
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    GooglePO = require('../page_objects/google.js').Google,
    google = new GooglePO,
    expect
    ;

chai.use(chaiAsPromised);
expect = chai.expect;

module.exports = function () {

    this.Given(/^I am on google's search page$/, function (next) {

        google.openSearchPage();
        next();
    });

    this.When(/^I search for "([^"]*)"$/, function (searchString, next) {

        google.searchFor(searchString).then(function () {
            // wait for results
            browser.sleep(1500).then(next);
        });
    });

    this.When(/^I click on the "([^"]*)"-st result link$/, function (linkNumber, next) {

        google.clickOnTheResultLink(linkNumber).then(function () {
            // wait for results
            browser.sleep(1500).then(next);
        });
    });

    this.Then(/^I should see the following result in the "([^"]*)"(?:.{1,3})? place$/, function (place, dataTable, next) {

        expect(google.getResultByIndex(place)).to.eventually.deep.equals(dataTable.rows()[0]).and.notify(next);
    });

    this.Then(/^I should be directed to the address "([^"]*)"$/, function (address, next) {

        expect(google.getPageAddress()).to.eventually.equal(address).and.notify(next);
    });
};

