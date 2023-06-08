##Steps of refactoring `statement function`

### ✅ make set of solid-test for code .

### ✅ Extract Function
``hint : identify points that different part of overall behaviour``

amountFor function extracted .

### ✅ clarify extracted function
```a coding standard : always call the return value of the function **result**```

```kentBeck[BeckSBPP]convention : default name for a paramter includes the type name example : aPerformance```

perf => aPerformance

thisAmount => result

#### remove play in extracted function !

When I’m breaking down a long function, 
`I like to get rid of variables`like **play**,

```Hint : we can use ReplaceTempWithQuery technique```

play is calculating in every round ```plays[perf.playID]``` , so we can use ReplaceTempWithQuery .

``playFor(aPerformance) return playOfThisPerformance``
