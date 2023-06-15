import {createStatementData} from "./createStatementData";

export function statement(invoice, plays) {
    return renderPlainText(createStatementData(invoice,plays))
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

function usd(aNumber) {
    return new Intl.NumberFormat("en-US",
        {
            style: "currency", currency: "USD",
            minimumFractionDigits: 2
        }).format(aNumber / 100)
}