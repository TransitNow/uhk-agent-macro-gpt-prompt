# JSyntax favourite macros
Credit goes to kareltucek

## `$onInit`
```
setVar jigglerActive 0
set autoShiftDelay 0
set oneShotTimeout 5000
```

## Jiggle start
This macro is one macro but broken into three parts:


command part 1
```
setLedTxt 1000 "srt"
setVar stopJiggler 0
if ($jigglerActive) break
setVar jigglerActive 1
loop:
```
this requires GUI "mouse action"
<img width="273" alt="image" src="https://github.com/TransitNow/uhk-60-gpt-macro-/assets/2457368/f6a60e24-eb3c-41be-8be6-21bb18e805bc">
command part 2
```
delayUntil 2000
setLedTxt 2000 "jig"

if ($stopJiggler) {
    setVar stopJiggler 0
    setVar jigglerActive 0
    break
}
goTo loop
```

## More to come...
