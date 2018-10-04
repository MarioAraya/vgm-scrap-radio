import { jsonString } from "album-json.js";

/// <reference types="Cypress" />

context('Actions', () => {
  before(() => {
    cy.visit('https://www.zophar.net/music/sega-saturn-ssf/street-fighter-alpha-warriors-dreams')
  })
  
  it('assert - assert shape of an object', () => {
    assert.isObject(jsonString, 'value is object')
  })
})