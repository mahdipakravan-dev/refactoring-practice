class PerformanceCalculator {
    constructor(aPerformance , aPlay) {
        this.performance = aPerformance;
        this.play = aPlay;
    }

    get amount() {
        throw new Error("Subclass responsibility")
    }

    get volumeCredits() {
        return Math.max(this.performance.audience - 30, 0)
    }
}

class TragedyPerformanceCalculator extends PerformanceCalculator {
    constructor(aPerformance , aPlay) {
        super(aPerformance , aPlay)
    }

    get amount() {
        let result = 40000;
        if (this.performance.audience > 30) {
            result += 1000 * (this.performance.audience - 30)
        }
        return result
    }
}

class ComedyPerformanceCalculator extends PerformanceCalculator{
    constructor(aPerformance , aPlay) {
        super(aPerformance , aPlay)
    }

    get amount() {
        let result = 30000
        if (this.performance.audience > 20) {
            result += 10000 + 500 * (this.performance.audience - 20)
        }
        result += 300 * this.performance.audience
        return result
    }


    get volumeCredits() {
        return super.volumeCredits + Math.floor(this.performance.audience / 5)
    }
}

function createPerformanceCalculator(aPerformance , aPlay) {
    switch (aPlay.type) {
        case "comedy":
            return new ComedyPerformanceCalculator(aPerformance,aPlay);
        case "tragedy":
            return new TragedyPerformanceCalculator(aPerformance,aPlay);
        default:
            throw new Error("unknown type of play " + aPlay.type)
    }
}

export function createStatementData(invoice, plays) {
    const result = {}
    result.customer = invoice.customer
    result.performances = invoice.performances.map(enrichPerformance)
    return result

    function enrichPerformance(aPerformance) {
        const calculator = createPerformanceCalculator(aPerformance , playFor(aPerformance))
        const result = Object.assign({}, aPerformance);
        result.play = calculator.play
        result.amount = calculator.amount
        result.volumeCredit = calculator.volumeCredits
        return result
    }

    function playFor(aPerformance) {
        return plays[aPerformance.playID]
    }


}

//ChangeFunctionDeclaration
function usd(aNumber) {
    return new Intl.NumberFormat("en-US",
        {
            style: "currency", currency: "USD",
            minimumFractionDigits: 2
        }).format(aNumber / 100)
}


function renderPlainText(data) {
    function totalVolumeCredits() {
        return data.performances.reduce(
            (total, aPerformance) => total + aPerformance.volumeCredit, 0)
    }

    function totalAmount() {
        return data.performances.reduce(
            (amount, aPerformance) => amount + aPerformance.amount, 0)
    }

    let result = `Statement for ${data.customer}\n`
    for (let perf of data.performances) {
        result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seat)\n`
    }
    result += `Amount owed is ${usd(totalAmount())}\n`
    result += `You earned ${totalVolumeCredits()} credits\n`
    return result
}