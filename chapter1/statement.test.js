import {expect, test} from 'vitest'
import {statement} from "./statement";

const plays = {
    "hamlet": {"name": "Hamlet", "type": "tragedy"},
    "as-like": {"name": "As You Like It", "type": "comedy"},
    "othello": {"name": "Othello", "type": "tragedy"}
}

test('customer-name', () => {
    const customer = "BigCo"
    const invoice = {
        customer,
        performances: []
    }
    const output = statement(invoice, plays).trim()
    const textToTest = `Statement for ${customer}\n` +
        "Amount owed is $0.00\n" +
        "You earned 0 credits"
    expect(output).toBe(textToTest)
})

test('tragedy with > 30 audience', () => {
    const invoice = {
        customer : "BigCo",
        "performances": [
            {
                "playID": "hamlet",
                "audience": 31
            },
        ]
    }
    const output = statement(invoice, plays).trim()
    const textToTest = `Statement for BigCo\n` +
        " Hamlet: $410.00 (31 seat)\n" +
        "Amount owed is $410.00\n" +
        "You earned 1 credits"
    expect(output).toBe(textToTest)
})

test('tragedy with < 30 audience', () => {
    const invoice = {
        customer : "BigCo",
        "performances": [
            {
                "playID": "hamlet",
                "audience": 29
            },
        ]
    }
    const output = statement(invoice, plays).trim()
    const textToTest = `Statement for BigCo\n` +
        " Hamlet: $400.00 (29 seat)\n" +
        "Amount owed is $400.00\n" +
        "You earned 0 credits"
    expect(output).toBe(textToTest)
})

test('comedy with > 20 audience', () => {
    const invoice = {
        customer : "BigCo",
        "performances": [
            {
                "playID": "as-like",
                "audience": 21
            },
        ]
    }
    const output = statement(invoice, plays).trim()
    const textToTest = `Statement for BigCo\n` +
        " As You Like It: $468.00 (21 seat)\n" +
        "Amount owed is $468.00\n" +
        "You earned 4 credits"
    expect(output).toBe(textToTest)
})

test('comedy with < 20 audience', () => {
    const invoice = {
        customer : "BigCo",
        "performances": [
            {
                "playID": "as-like",
                "audience": 19
            },
        ]
    }
    const output = statement(invoice, plays).trim()
    const textToTest = `Statement for BigCo\n` +
        " As You Like It: $357.00 (19 seat)\n" +
        "Amount owed is $357.00\n" +
        "You earned 3 credits"
    expect(output).toBe(textToTest)
})

test('complete test', () => {
    const invoice = {
        "customer": "BigCo",
        "performances": [
            {
                "playID": "hamlet",
                "audience": 55
            },
            {
                "playID": "as-like",
                "audience": 35
            },
            {
                "playID": "othello",
                "audience": 40
            }
        ]
    }

    const output = statement(invoice, plays).trim()
    const textToTest = "Statement for BigCo\n" +
        " Hamlet: $650.00 (55 seat)\n" +
        " As You Like It: $580.00 (35 seat)\n" +
        " Othello: $500.00 (40 seat)\n" +
        "Amount owed is $1,730.00\n" +
        "You earned 47 credits"
    expect(output).toBe(textToTest)
})