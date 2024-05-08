you are an expert in helping me create smart macro (scripts) for the ultimate hacking keyboard.

I will ask you questions and you must use the following information and examples to answer and generate code that satisfies my request.

I will provide you with a user guide and reference (you MUST use those sources only, nothing else, to create the scripts).

here is the user manual first:
## Getting started

0.1) Get your UHK :-). https://ultimatehackingkeyboard.com/

0.2) Unless you specifically wish to use the extended command set, you may wish to start with officially supported macros. In that case, please see the smart macro reference included in the right-side pane of Agent. Its quality is far superior to this document and features various interactive widgets that allow you to construct macros by just clicking and sliding GUI elements.

1) Create some macro with some command action. (And bind it in your keymap.) For instance:

```
holdKey iLS
ifDoubletap tapKey capsLock
```

![Doubletap to caps-lock macro](resources/caps_macro.png)

2) Understand how this guide and the reference manual work:

    - Use Ctrl+F (or equivalent) a lot - here, and in the [reference manual](reference-manual.md).
    - Go through the sections of the reference manual - just reading the top section lines will give you some idea about available types of commands.
    - Read through examples in order to understand how the constructs can be combined.
    - Understand how to read the stated ebnf grammar. The grammar gives you precise instructions about available features and their parameters, as well as correct syntax. Note that some commands and parameters are only mentioned in the grammar! In case you don't know anything about grammars:
        - The grammar describes a valid expression via a set of rules. In the beginning, the expression equals "BODY". Every capital word of the expression is to be "rewritten" by (some instance of) a corresponding rule.
        - Notation: `<>` mark informal (human-understandable) explanation of what is to be entered. The `|` operator indicates a choice between left and right operands. It is typically enclosed in `{}`, in order to separate the group from the rest of the rule. `[]` denotes optional arguments. Especially `[]+` marks "one or more" and `[]*` arbitrary number.
            Operator | syntax
             --- | ---
            rules - need to be expanded | `UPPERCASE_IDENTIFIERS`
            obligatory group | `{ ... }`
            optional group | `[ ... ]`
            one or more | `[ ... ]+`
            any number | `[ ... ]*`
            choice | `A \| B`
            resolved text | `text`
            human-readable description | `<hint>`
            human-readable description, backed by a specific rule | `<hint (RULE)>`

        - Provided value bounds are informational only - they denote values that seem to make sense. Sometimes default values are marked.
    - If you are still not sure about some feature or syntax, do not hesitate to ask.

3) If `ERR` appears on the display, you can retrieve the description by using `printStatus` over a focused text editor. Or, using the above point, just search the [reference manual](reference-manual.md) for `ERR`.

4) If you encounter a bug, let me know. There are lots of features and quite few users around this codebase - if you do not report problems you find, chances are that no one else will (since most likely no one else has noticed).

## Known software limitations and oddities

- Karabiner Elements does weird things in combination with UHK.

  Fix: disable Karabiner elements.

- Mac ignores short caps-lock taps.

  Fix: add a manual delay of 400 ms or so.

- Games sample input instead of processing press and release events in order. As a result, actions of secondary role keys (e.g., esc on UHK mouse key), or any macro taps get ignored.

  Fix: add manual ~50 ms delays; program secondary roles via macros.

- Some software receives input in the wrong order when the input is too fast. E.g., shift+9 sometimes produces `(`, sometimes `9`.

  Fix: `set keystrokeDelay 10`.

- Shift in shift+click macro often gets ignored. (Encountered under Windows.) This is because mouse click and shift are communicated over different usb interfaces, and therefore tend to arrive in the wrong order.

  Fix: `set keystrokeDelay 10`. 

- RDP sessions ignore modifiers.

  Fix: `set keystrokeDelay 10`.

- Linux ignores mouse releases shorter than ~20ms, which is a trouble for touchpad's doubletap-to-drag gesture.

  UHK firmware fixes this by inserting artificial delays of 20ms.

- Some software gets confused by horizontal scrolling. (Encountered under Windows.)

  Fix: make sure your scrollAxisLock is enabled (`set module.MODULEID.scrollAxisLock 1`), maybe fine-tune its settings, and make sure you scroll along the vertical axis of the module in question.

## Macro events

Macro events are specially named macros that get executed on specific occasions. For instance macro named `$onInit` will be run when UHK starts. A Macro named `$onKeymapChange any` will be run whenever a keymap is switched.

Some macro events are:
- `$onInit`
- `$onKeymapChange {KEYMAPID|any}`
- `$onLayerChange {LAYERID|any}`
- `$onKeymapLayerChange KEYMAPID LAYERID`


### Sharing layers across Keymaps

This can be also used to share layers across keymaps. For instance, assume I want to construct a colemak keymap (COL) that shares non-base layers with my querty (QTY) keymap. Then I will put the following into a macro named `$onKeymapChange COL`:

```
replaceLayer fn QTY fn
replaceLayer mod QTY mod
replaceLayer mouse QTY mouse
```

## Examples

Every nonempty line is considered as one command. Empty line, or commented line too. Empty lines are skipped. Exception is an empty command action, which counts for one command. Even `{` and `}` are treated as commands, and have to be on separate lines.

### Configuration

Configuration of the keyboard can be modified globally or per-keymap by using [macro events](reference-manual.md). For instance, the following may be placed into a macro named `$onInit` in order to make it applied on UHK startup:

```
// accel driver
set module.trackball.baseSpeed 0.5
set module.trackball.speed 1.0
set module.trackball.xceleration 0.5

//navigation modes
set module.trackball.navigationMode.base cursor
set module.trackball.navigationMode.fn caret
set module.trackball.navigationMode.mod scroll
set module.trackball.navigationMode.mouse scroll

//axis locks
set module.trackball.scrollAxisLock 1
set module.trackball.cursorAxisLock 0

//backlight defaults
set backlight.strategy constantRgb
set backlight.constantRgb.rgb 255 192 32
set leds.fadeTimeout 1
```

To change the sensitivity of modules, use the following snippet in your `$onInit` macro (to always apply), in your `$onKeymapChange QWR` macro (to change sensitivity in the QWR keymap), or in a regular macro (to change sensitivity on demand).

In order to figure out the right values, please see the Agent macro reference, or search the reference manual.

```
set module.trackball.baseSpeed 0.5
set module.trackball.speed 1.0
set module.trackball.xceleration 0.5
```

This enables and disables compensation of diagonal speed depending on shift state.

```
ifShift set diagonalSpeedCompensation 1
ifNotShift set diagonalSpeedCompensation 0
```

### KeystrokeDelay and known timing issues.

Another common configuration is `keystrokeDelay`. By default, UHK just churns out scancodes as fast as it can, which is a problem for various features such as the write text action or write command, because some programs out there are not prepared to receive input that fast. The following setting will slow down UHK's output so that at most one usb report is sent every 10 milliseconds.

```
set keystrokeDelay 10
```

### Binding keys and basic principles


Key lifecycle consists of two important points:

- key press
- key release

Various combinations of lifecycles are abstracted into the following actions:

- `pressKey` - just activate the scancode
- `releaseKey` - just deactivate it
- `tapKey` - activate the scancode and then immediately release it
- `holdKey` - activate the scancode and hold it for as long as the key is physically held, then release it
- `delayUntilRelease` - will wait until the key that activated the macro is released

So if we wanted to replace a regular 'a' key with a macro, we would use:

```
holdKey a
```

Which is similar to:

```
pressKey a
delayUntilRelease
releaseKey a
```


If we just want to quickly produce the `a` scancode/character, we would use:

```
tapKey a
```

Which is similar to:
```
pressKey a
releaseKey a
```

Complex key sequences can be achieved using `tapKeySeq`. For instance, following emoji macro (uses linux  Ctrl+U notation) will produce a shrugging person.
```
tapKeySeq CS-u 1 f 9 3 7 space
```

With these commands, modifiers are encoded using `CSAG`, with optional `LR` for the left and right side. E.g., `LC-a` means `left control + a`.

Press/release/hold/tap can be specified by `phtr` part of the mask. E.g., `tapKeySeq p-a t-b t-c r-a` means tap `b c` while holding `a`.

In macros, we also may chain multiple actions and include various conditions.

For instance, shift which also toggles caps lock on doubletap:

```
holdKey iLS
ifDoubletap tapKey capsLock
```

Or with Mac (which requires prolonged press of caps lock):

```
holdKey iLS
ifNotDoubletap break
pressKey capsLock
delayUntil 400
releaseKey capsLock
```

_sidenote: `i` in `iLS` makes the shift behave as a regular native shift, which is needed to trigger `ifShift` conditions. For more info, search reference manual for "composition modes"._

Mapping shift/non-shift scancodes independently:

```
ifShift suppressMods write 4
ifNotShift write %
```

Some common conditions are:
- `ifDoubletap` - yields true if another instance of the same macro executed lately.
- `ifInterrupted` - yields true if another key was pressed during the execution of the macro.
- `ifPlaytime 100` - yields true if macro ran for at least 100 ms.
- `ifShift` - yields true if a regular shift key is being held. (See composition modes in the reference for more info on how to hack more complex setups)

Conditions always exist in pairs, e.g., `ifDoubletap` and `ifNotDoubletap`, `ifPlaytime` and `ifNotPlaytime` etc.

There is also a concept of modifiers, which can modify the keyboard's or command's behaviour while a command is running:

- `suppressMods` - suppresses all standard modifiers, so you can rebind a shift and nonShift independent (or on the contrary dependent!) on shift state.
- `final` - ends macro after the "modified" command. Basically a syntactic sugar.
- `postponeKeys` - in order to mess with our time machine.
- `autoRepeat` - if we need to autorepeat manually from the keyboard. For instance `autoRepeat progressHue`.
- `oneShot` prolongs this key's press until another action takes place. E.g., `oneShot holdLayer mod`.

### Handling layers

In case of layer handling, macro layer switching commands have slightly different semantics from the native layer switching commands, allowing for more fine-tuned control of the behavior such as nested layer holds or toggles.

The following macro will result in switching to QWR keymap.

```
switchKeymap QWR
```

Implementation of a standard double-tap-locking hold modifier in nested version could look like:

```
holdLayer fn
ifDoubletap toggleLayer fn
```

Once the layer is toggled, the target layer needs to contain another macro to allow return to the base layer. This macro also allows holding the previous (usually base) layer from a toggled layer.

```
holdLayer previous
ifDoubletap untoggleLayer
```

Smart toggle (if tapped, locks layer; if used with a key, acts as a simple secondary role):

```
holdLayer mouse
ifNotInterrupted toggleLayer mouse
```

You can refer to layers of different keymaps via a set of `keymapLayer` commands. Be careful though, these reload entire keymaps, so they may pose a performance penalty, and they also reset all your in-memory configurations:

```
holdKeymapLayer QWR base
```

### Time machine

The firmware implements a postponing queue which allows some commands to act as a time machine by querying _future_ keystrokes, and decide what to do depending on those. In practice, it means waiting until more input is entered, and then either consuming those keys and doing something special, or rewinding back a bit and performing all the actions as if nothing happened.

One concept that uses this feature is _shortcuts and gestures_.

You can use `ifShortcut` when you want to map an action to a combination of keys. E.g, if I want z+x to produce Control+x, z+c to produce Control+c, z+v to produce Control+v, I will map following macro on the z key:

```
ifShortcut x final tapKey C-x
ifShortcut c final tapKey C-c
ifShortcut v final tapKey C-v
holdKey z
```

An `ifShortcut` macro needs to be placed on the first key of the shortcut, and refers to other keys by their hardware ids. These ids can be entered in numeric form obtained by `resolveNextKeyId` command (i.e., activating the command and pressing the key while having a text editor focused), or abbreviations may be used (as shown above). The `final` modifier breaks the command after the "modified" `tapKey` command finishes.

`ifGesture` can be used to implement "loose gestures" - i.e., shortcuts where the second keypress can follow without continuity of press of the first key. Vim-like gt and gT (g+shift+t) tab switching:

```
ifGesture t final tapKey C-pageUp
ifGesture leftShift t final tapKey C-pageDown
holdKey g
```

We can also use these to implement an emoji macro which allows us to write emojis using simple abbreviations - here tap `thisMacro + s + h` (as shrug) to get shrugging person, or `thisMacro + s + w` to get a sweaty smile.

```
ifGesture 80 73 final tapKeySeq CS-u 1 f 6 0 5 space
ifGesture 80 21 final tapKeySeq CS-u 1 f 9 3 7 space
...
```

In order to bind some action to doubletap, you may use two strategies:

- simple `ifDoubletap` condition, which just checks whether another instance of the same macro was active lately. Double tapping this will result in sequence `ab`:

```
ifDoubletap final tapKey b
holdKey a
```

- time-machine `ifGesture` condition. Double tapping this will produce a slight delay and then output just `b`:

```
ifGesture $thisKeyId final tapKey b
holdKey a
```

Another concept that may or may not use our time machine is secondary roles, namely the advanced strategy.

### Keyids vs Scancodes

Please note the difference between key ids and scancodes. Both notations use human-readable abbreviations and are therefore easy to mix up.

- _key ids_ identify specific hardware keys. Human readable key id abbreviations are assigned to match the printed key labels according to the default en-US layout. If you wish to use numeric key ids, then be sure that the numbers have always at least two digits (e.g., `ifGesture 03 ...`).
- _scancode_ abbreviations describe scancodes as communicated to the PC, mapped according to en-US scancode mapping.

For instance, if you rebind your UHK to Dvorak, then the key identified by hardware id `s` will be mapped to the `o` scancode (i.e., will read `o` in Agent, or contain `holdKey o` macro command). That is, issuing `activateKeyPostponed s` will produce the same thing as `holdKey o`. (Of course, if you furthermore choose some non-standard language mapping in your OS, you may end up with yet another character produced on screen.)

### Secondary roles

Secondary role is a role that becomes active if another key is pressed with this key. It can be implemented in the following variants:

- Using `ifInterrupted` command.
- Using native secondary role driver (via `ifPrimary`/`ifSecondary` or GUI-mapping) with one of the following resolution strategies:
  - simple strategy
  - advanced strategy which uses our time machine

#### Simulating secondary roles without secondary roles

Secondary role can be implemented using the `ifNotInterrupted` condition  - such macro always triggers secondary role, and once the key is released it either triggers primary role or not.

For instance:

```
holdLayer mouse
ifNotInterrupted tapKey enter
```

Regular secondary role with prevention of accidental key taps: (Activates the secondary role immediately, but activates the primary role only if the key has been pressed for at least a certain amount of time. This could be used to emulate the [Space Cadet Shift feature](https://docs.qmk.fm/#/feature_space_cadet).)

```
holdKey leftShift
ifInterrupted break
ifPlaytime 200 break
tapKey S-9
```

#### Native secondary role - simple strategy

Simple strategy can be activated by `ifSecondary simpleStrategy` or `ifPrimary simpleStrategy`, or from agent GUI.

It can be explicitly set by:

```
set secondaryRole.defaultStrategy simple
```

However, at the moment of writing this, it already is the default strategy, so even without the above command, it can be activated by:

```
ifSecondary final holdLayer mouse
tapKey escape
```

This strategy does the same as the `ifNotInterrupted` version, except it activates secondary role only after the other key is pressed. This strategy does not use any complicated postponing.

Pros: it is reliable.
Cons: it will activate during writing if you put it on an alphanumeric key.

#### Native secondary role - advanced strategy

Advanced strategy postpones all other keypresses until it can distinguish between primary and secondary role. This is handy for alphabetic keys, or if the secondary role is not a no-op. This strategy can be used via `ifPrimary advancedStrategy` and `ifSecondary advancedStrategy` conditions.

It can be made default by:
```
set secondaryRole.defaultStrategy advanced
```

Then it can be activated via GUI-mapped secondary role, or simply:

```
ifPrimary final holdKey a
holdLayer mouse
```

The advanced strategy has the disadvantage that its configuration depends on the user's typing style. Please see the reference manual for the meaning of all its configuration values. Two example configurations follow.

Release-order configuration:

```
set secondaryRole.defaultStrategy advanced
set secondaryRole.advanced.timeout 350
set secondaryRole.advanced.timeoutAction secondary
set secondaryRole.advanced.safetyMargin 50
set secondaryRole.advanced.triggerByRelease 1
set secondaryRole.advanced.doubletapToPrimary 0
```

The above configuration distinguishes roles based on the release order of the keys. I.e., `press-A, press-B, release-B, releaseA` leads to secondary action; `press-A, press-B, release-A, release-B` leads to primary action. This configuration does not mind if you release keys lazily during writing.

More conventional timeout-triggered configuration:

```
set secondaryRole.defaultStrategy advanced
set secondaryRole.advanced.timeout 200
set secondaryRole.advanced.timeoutAction secondary
set secondaryRole.advanced.safetyMargin 0
set secondaryRole.advanced.triggerByRelease 0
set secondaryRole.advanced.doubletapToPrimary 1
set secondaryRole.advanced.doubletapTime 200
```

Simple strategy behavior, but via advanced strategy and with timeout on 500ms:

```
set secondaryRole.defaultStrategy advanced
set secondaryRole.advanced.timeout 500
set secondaryRole.advanced.timeoutAction secondary
set secondaryRole.advanced.safetyMargin 0
set secondaryRole.advanced.triggerByRelease 0
set secondaryRole.advanced.triggerByPress 1
set secondaryRole.advanced.doubletapToPrimary 1
set secondaryRole.advanced.doubletapTime 200
```

Full set of advanced strategy config values follows (for copy-paste convenience):

```
set secondaryRole.defaultStrategy advanced
set secondaryRole.advanced.timeout 500
set secondaryRole.advanced.timeoutAction secondary
set secondaryRole.advanced.safetyMargin 0
set secondaryRole.advanced.triggerByRelease 0
set secondaryRole.advanced.triggerByPress 0
set secondaryRole.advanced.triggerByMouse 0
set secondaryRole.advanced.doubletapToPrimary 1
set secondaryRole.advanced.doubletapTime 200
```

The above configuration will trigger the secondary role whenever the dual-role key is pressed for more than 200ms, i.e., just a very slightly prolonged activation will trigger the secondary role.

Furthermore, this configuration allows you to activate the primary role by double-tap-and-hold. You may want this on your space key, or other primary key that is often used to produce a row of characters.

### Advanced key binding

In order to bind an action to a complex shortcut, you can bind an `ifShortcut` macro onto the first key of such shortcut (as already shown above).

In order to bind an action to a sequence of keys, you can use `ifGesture` (as already shown above).
 
In order to rebind keys during runtime, you can also use the `set keymapAction` command. Such bindings will last until keymap reload.

```
set keymapAction.base.15 keystroke left            // map base.j to left arrow    15 is numeric keyid of the j key
set keymapAction.base.16 keystroke down            // map base.k to down arrow    16 is numeric keyid of the k key
set keymapAction.base.17 keystroke right           // map base.l to right arrow   17 is numeric keyid of the l key
set keymapAction.base.08 keystroke up              // map base.i to up arrow      08 is numeric keyid of the i key
```

You may also use similar syntax to bind stuff into module navigation modes. E.g., you may repurpose your mini-trackball to do some vim magic (with `VimMTL` and `VimMTR` macros). 

I.e., if you run the following macro and then roll your keycluster trackball to the right, then every roll event will activate the VimMTR macro.

```
set navigationModeAction.media.left macro VimMTL
set navigationModeAction.media.right macro VimMTR
set navigationModeAction.media.up none
set navigationModeAction.media.down none
set module.keycluster.navigationMode.base media
```

Similarly, you may rebind your touchpad's "right button" by using the following `$onKeymapChange any` macro event:

```
//this needs to go into a macro named `$onKeymapChange any`
set keymapAction.base.192 macro TouchpadLeft
set keymapAction.base.193 macro TouchpadRight
```

### Macro recorder

Runtime macro recorder allows capturing and replaying sequences of scancodes. Each such macro is identified by a number or a character (or `$thisKeyId` which resolves to the `KEYID` of the current key, therefore allowing generic key-associated macros). (Runtime macros are unrelated to the macros that can be created via Agent.)

In this setup, shift+key will start recording (indicated by the "adaptive mode" led), another shift+key will stop recording. Hitting the key alone will then replay the macro (e.g., a simple repetitive text edit). Alternatively, `$thisKeyId` can be used as an argument in order to assign every key to a different slot.

```
ifShift recordMacro $thisKeyId
ifNotShift playMacro $thisKeyId
```

See advanced examples for ways to bind macros in vim-style.

### Strings, variables, and expressions

Write command accepts (not exactly) bash-style interpolated strings. E.g.:

```
write "Current keystrokeDelay is $keystrokeDelay. One plus one is $(1 + 1).\n"
write 'This is a literal "$" character. And here you have an apostrophe '"'"'.'
```

You can save values into named variables via the following syntax:

```
setVar foo 42
write "\$foo value is $foo."
```

You can use your variables, or configuration values in commands. Expressions have to be enclosed in parentheses. E.g. to control led brightness, you may:

```
ifShift autoRepeat set leds.brightness ($leds.brightness * 1.5 + 0.01)
ifNotShift autoRepeat set leds.brightness ($leds.brightness / 1.5)
```

To toggle a boolean config value, you may simply:

```
set leds.enabled (!$leds.enabled)
```

The following operators are accepted:
- `+,-,*,/,%` - addition, subtraction, multiplication, division and modulo
- `min(),max()` - minimum, maximum, e.g. `min($a, 2, 3, 4)`
- `<,<=,>,>=` - less than, less or equal, greater than, greater or equal
- `==,!=` - equals, not equals
- `!` - unary boolean negation
- `&&`, `||` - boolean "and" and "or"

### Control flow

_Please see advanced examples for actual usage._

We implement the following standard(ish) control flow constructs:
- `{`, `}` enclosed command blocks. Please note that these are treated like regular commands, so they *have to* be followed by newlines! E.g.:
    ```
    postponeKeys {
        ...
    }
    autoRepeat {
        ...
    }
    ```
- `goTo`, jumping to a c-style label, e.g.:
    ```
    begin:
    ...
    goTo begin
    ```
- `if` / `else`:
    ```
    if ($i > 5) {
        ...
    }
    else if ($i > 1) {
        ...
    }
    else {
        ...
    }
    ```
- `while`, including `break` notation:
    ```
    setVar i 0
    while (true) {
        if ($i > 5) {
            break
        }
        ...
        setVar i ($i+1)
    }
    ```

These constructs can be combined just as all other conditions and modifiers, so neither braces nor parentheses are obligatory. For instance following code is valid (although not very aesthetic and not recommended):
```
ifCtrl if $foo ifShift write "a"
ifCtrl else write "b"
else write "c"
```
or
```
while (true) ifShift write "this *is* valid, but *please* do not do this."
```

### Advanced examples:

#### Cycle through backlight colors.

The following example allows you to cycle through different backlight colors.

In your `$onInit`:

```
setVar backroundColor 0
```

Then in the macro itself:

```
setVar backgroundColor (($backgroundColor + 1) % 3)        // let the backgroundColor var cycle over values 0, 1 and 2

if ($backgroundColor == 0) {
    set backlight.constantRgb.rgb 255 0 0
}
else if ($backgroundColor == 1) {
    set backlight.constantRgb.rgb 0 255 0
}
else {
    set backlight.constantRgb.rgb 0 0 255
}
```

#### Macro repeat

Let's reimplement vim-like macro repetition. E.g., record macro on key q, then tap `fn+1 fn+3 fn+q`. Observe the macro being performed 13x.

In `$onInit`:

```
setVar macroRepeat 0
```

On keys fn.1 through fn.6:

```
setVar macroRepeat ($macroRepeat*10 + ($keyId - 65))
```

On keys fn.7 through fn.9:
```
setVar macroRepeat ($macroRepeat*10 + $keyId)
```

On fn.0:
```
setVar macroRepeat ($macroRepeat*10)
```

on fn.q (and possibly on all other fn layer characters?):

```
ifShift final recordMacro $thisKeyId          // start or end macro recording by fn+shift+q
if ($macroRepeat == 0) setVar macroRepeat 1   // if number of repetitions was not specified, specify that we should repeat once
while ($macroRepeat > 0) {
    playMacro $thisKeyId
    setVar macroRepeat ($macroRepeat-1)
}
```

#### Vim @ prefix key

If briefly tapped, this macro produces `@@` (play last vim macro). If held, it prepends any other key tap with a `@` key. E.g., `thisMacro + p + p + p` produces `@p@p@p` (play vim macro in register p, thrice).

This example features active wait loops via `goTo $currentAddress` and some postponing queue magic.

```
begin: 
    postponeKeys {                                                           // make sure that other key taps are just queued in postponing queue, but not executed
        ifNotPending 1 ifNotReleased goTo $currentAddress                    // active wait for another key to get pressed
        ifReleased final ifNotInterrupted ifNotPlaytime 300 tapKeySeq @ @    // if this is just a short tap, produce `@@` and finish
        ifPending 1 tapKey @                                                 // there is a key activation in the queue, produce `@`
        setVar savedKey $queuedKeyId.0
    }
    ifPending 1 goTo $currentAddress                        // active wait until the other key press gets executed
    ifKeyActive $savedKey goTo $currentAddress              // active wait until the other key gets released
goTo begin
```

#### Caps words

Simple active wait loop example, to simulate qmk "caps words" - a feature which acts as a caps lock, but automatically turns off on space character:

On activation key:

```
pressKey LS-
setVar capsActive 1                                // let the world know caps words is active
if ($capsActive) goTo $currentAddress              // active wait until space sets the var to 0
//at the end of macro, the shift gets released automatically
```

on space:

```
holdKey space
setVar capsActive 0                                 // signal to the above macro that it should stop holding shift
```

#### Vim Q key

The above examples can be combined into more elaborate setups. Assume we bind the following `perKeyMacro` on every key in our fn layer. Furthermore, assume we bind the following `recordKey` macro onto the `q` key (or `mod-q`). This gives us standard (although incomplete) vim behaviour. Tap `qa` (`mod-q + a`) to start recording a macro in slot "a". Tap `q` (`mod-q`) to end recording. Tap `fn-a` to replay the macro.

```
// perKeyMacro
ifShift final recordMacro $thisKeyId
if ($qActive) final recordMacro $thisKeyId
playMacro $thisKeyId
```

```
// recordKey

ifRecording final stopRecording      // stop recording if already recording
if $qActive final setVar qActive 0   // terminate the "start recording" state if tapped second time

 // signal to perKeyMacro that we want to start recording
setVar qActive 1                                                

// toggle fn layer and keep it active for 5 seconds or until some recordKey instance starts recording a macro
toggleLayer fn                                                   
ifNotRecording ifNotPlaytime 5000 if ($qActive) goTo $currentAddress
untoggleLayer
setVar qActive 0
```

#### Backlight color picker

Colour picker for constant colours. Bound on fn+r, fn+r+r turns colour to red, fn+r+v to violet, etc..

```
ifGesture r final set backlight.constantRgb.rgb 255 32 0  // r - red
ifGesture g final set backlight.constantRgb.rgb 192 255 0  // g - green
ifGesture b final set backlight.constantRgb.rgb 128 192 255 // b - blue
ifGesture y final set backlight.constantRgb.rgb 255 192 0 // y - yellow
ifGesture v final set backlight.constantRgb.rgb 192 64 255 // v - violet
ifGesture o final set backlight.constantRgb.rgb 255 128 0 // o - orange
ifGesture w final set backlight.constantRgb.rgb 192 32 0 // w - wine
ifGesture b final set backlight.constantRgb.rgb 128 48 0 // b - brown
ifGesture n final set backlight.constantRgb.rgb 255 192 32 // n - warm white, as "normal"
ifGesture f final set backlight.strategy functional // f to functional backlight
ifGesture q final set leds.enabled 0 // q - to turn off
ifGesture p final set leds.enabled 1 // p - to turn back on
```

#### Rotate hues v1

To see all possible UHK hues (maximum saturation), hold a key with the following macro:

```
autoRepeat progressHue
```

#### Rotate hues v2

In order to make UHK slowly rotate through all rainbow colors all the time, you can use the following macro:

```
progressHue
delayUntil 1000
goTo 0
```

#### Rotate hues v3

The above macro will not terminate, not even when ran multiple times. In order to fix this issue, we can use some register signaling:

```
setVar hueStopper 1       // signal other instances of this macro to terminate
delayUntil 2000           // give other instances 2 seconds to terminate (via line 5)
setVar hueStopper 0
while (true) {
    if $hueStopper exit   //if another macro signals us to terminate, do terminate
    progressHue
    delayUntil 1000
}
```

#### Rotate hues from other macros

You can also start this from `$onInit` by `fork rotateHues` (given you have the macro named `rotateHues`). Or add the following lines to the colour picker:

```
// put this at the beginning of the picker, to stop rotateHues when another choice is made.
setVar hueStopper 1
// start the `rotateHues` macro on 'c' - as "changing"
ifGesture c final fork rotateHues

here is the reference manual:
# Reference manual

This file contains (semi)formal documentation of all features of the extended engine. Please note:

- You might want to start by reading [user-guide manual](user-guide.md), especially the point on understanding the docs.

- The grammar is meant to be the ultimate information source. Not all commands or parameters are described in the later text.

- Most values in the following text are just recommended ranges. The firmware will usually accept even values outside these ranges.

### Error handling

Whenever a garbled command is encountered, `ERR` will light up on the display, and details are appended to the error buffer. You can retrieve it by running a `printStatus` macro command over a focused text editor.

Errors have the following format:

```
{Error|Warning} at <macro name> <action index>/<line>: <message>: <failed command>
```

## Macro events

Macro events allow hooking special behaviour, such as applying a specific configuration to events. This is done via a special naming scheme. Currently, the following names are supported:

    $onInit
    $onKeymapChange {KEYMAPID|any}
    $onLayerChange {LAYERID|any}
    $onKeymapLayerChange KEYMAPID LAYERID
    $onCapsLockStateChange
    $onNumLockStateChange
    $onScrollLockStateChange

Please note that:
  - under Linux, scroll lock is disabled by default. As a consequence, the macro event does not trigger.
  - under MacOS, scroll lock dims the screen but does not toggle the scroll lock state. As a consequence, the macro event does not trigger.

I.e., if you want to customize the acceleration driver for your trackball module on keymap QWR, create a macro named `$onKeymapChange QWR`, with content e.g.:

    set module.trackball.baseSpeed 0.5
    set module.trackball.speed 1.0
    set module.trackball.xceleration 1.0

(Also note, that the above will *not* restore original settings when you leave the keymap. You will need another macro event for that.)

## Macro commands

The following grammar is supported:

Operator | syntax
 --- | ---
rules - need to be expanded | `UPPERCASE_IDENTIFIERS`
obligatory group | `{ ... }`
optional group | `[ ... ]`
one or more | `[ ... ]+`
any number | `[ ... ]*`
choice | `A \| B`
resolved text | `text`
human-readable description | `<hint>`
human-readable description, backed by a specific rule | `<hint (RULE)>`

```
#########################
# GENERAL FUNCTIONALITY #
#########################
BODY = COMMENT
BODY = [LABEL:] COMMAND [COMMENT]
COMMENT = //<comment>
CODE_BLOCK = {
    COMMAND
    COMMAND
    ...
}
COMMAND = <command>
COMMAND = CODE_BLOCK
COMMAND = [CONDITION|MODIFIER]* COMMAND
COMMAND = delayUntilRelease
COMMAND = delayUntil <timeout in ms (INT)>
COMMAND = delayUntilReleaseMax <timeout (INT)>
COMMAND = switchKeymap KEYMAPID
COMMAND = toggleLayer LAYERID
COMMAND = toggleKeymapLayer KEYMAPID LAYERID
COMMAND = untoggleLayer
COMMAND = holdLayer LAYERID
COMMAND = holdLayerMax LAYERID <time in ms (INT)>
COMMAND = holdKeymapLayer KEYMAPID LAYERID
COMMAND = holdKeymapLayerMax KEYMAPID LAYERID <time in ms (INT)>
COMMAND = overlayKeymap KEYMAPID
COMMAND = overlayLayer <target layer (LAYERID)> <source keymap (KEYMAPID)> <source layer (LAYERID)>
COMMAND = replaceLayer <target layer (LAYERID)> <source keymap (KEYMAPID)> <source layer (LAYERID)>
COMMAND = resolveNextKeyId
COMMAND = activateKeyPostponed [atLayer LAYERID] [append | prepend]  KEYID
COMMAND = consumePending <number of keys (INT)>
COMMAND = postponeNext <number of commands (NUMER)>
COMMAND = break
COMMAND = exit
COMMAND = noOp
COMMAND = yield
COMMAND = {exec|call|fork} MACRONAME
COMMAND = resetTrackpoint
COMMAND = printStatus
COMMAND = setLedTxt <timeout, or 0 forever (INT)> { STRING | VALUE }
COMMAND = write STRING
COMMAND = goTo <index (ADDRESS)>
COMMAND = repeatFor <var name (IDENTIFIER)> <action adr (ADDRESS)>
COMMAND = while (EXPRESSION) COMMAND
COMMAND = progressHue
COMMAND = recordMacroDelay
COMMAND = {startRecording | startRecordingBlind} [<slot identifier (MACROID)>]
COMMAND = {recordMacro | recordMacroBlind} [<slot identifier (MACROID)>]
COMMAND = {stopRecording | stopRecordingBlind}
COMMAND = playMacro [<slot identifier (MACROID)>]
COMMAND = {startMouse|stopMouse} {move DIRECTION|scroll DIRECTION|accelerate|decelerate}
COMMAND = setVar <variable name (IDENTIFIER)> <value (PARENTHESSED_EXPRESSION)>
COMMAND = {pressKey|holdKey|tapKey|releaseKey} SHORTCUT
COMMAND = tapKeySeq [SHORTCUT]+
COMMAND = set module.MODULEID.navigationMode.LAYERID_BASIC NAVIGATION_MODE
COMMAND = set module.MODULEID.baseSpeed <non-xcelerated speed, 0-10.0 (FLOAT)>
COMMAND = set module.MODULEID.speed <xcelerated speed, 0-10.0 (FLOAT)>
COMMAND = set module.MODULEID.xceleration <increases sensitivity at high speeds, descreases at low speeds, exponent 0-2.0 (FLOAT)>
COMMAND = set module.MODULEID.caretSpeedDivisor <pixels per one caret event, 1-100 (FLOAT)>
COMMAND = set module.MODULEID.scrollSpeedDivisor <pixels per one scroll event, 1-100 (FLOAT)>
COMMAND = set module.MODULEID.axisLockSkew <0-2.0, controls strength of axis locking behavior (FLOAT)>
COMMAND = set module.MODULEID.axisLockFirstTickSkew <0-2.0, controls sensitivity of the start of mouse movement (FLOAT)>
COMMAND = set module.MODULEID.scrollAxisLock BOOL
COMMAND = set module.MODULEID.cursorAxisLock BOOL
COMMAND = set module.MODULEID.caretAxisLock BOOL
COMMAND = set module.MODULEID.swapAxes BOOL
COMMAND = set module.MODULEID.invertScrollDirectionX BOOL
COMMAND = set module.MODULEID.invertScrollDirectionY BOOL
COMMAND = set module.touchpad.pinchZoomDivisor <1-100 (FLOAT)>
COMMAND = set module.touchpad.pinchZoomMode NAVIGATION_MODE
COMMAND = set module.touchpad.holdContinuationTimeout <0-65535 (INT)>
COMMAND = set secondaryRole.defaultStrategy { simple | advanced }
COMMAND = set secondaryRole.advanced.timeout <ms, 0-500 (INT)>
COMMAND = set secondaryRole.advanced.timeoutAction { primary | secondary }
COMMAND = set secondaryRole.advanced.safetyMargin <ms, higher value adjusts sensitivity towards primary role -50-50 (INT)>
COMMAND = set secondaryRole.advanced.triggerByPress <trigger immediately on action key press (BOOL)>
COMMAND = set secondaryRole.advanced.triggerByRelease <trigger secondary role if action key is released before dual role (BOOL)
COMMAND = set secondaryRole.advanced.triggerByMouse <trigger secondary role immediately on mouse move (BOOL)
COMMAND = set secondaryRole.advanced.doubletapToPrimary <hold primary on doubletap (BOOL)>
COMMAND = set secondaryRole.advanced.doubletapTime <ms, 0-500 (INT)>
COMMAND = set mouseKeys.{move|scroll}.initialSpeed <px/s, ~100/20 (INT)>
COMMAND = set mouseKeys.{move|scroll}.baseSpeed <px/s, ~800/20 (INT)>
COMMAND = set mouseKeys.{move|scroll}.initialAcceleration <px/s, ~1700/20 (INT)>
COMMAND = set mouseKeys.{move|scroll}.deceleratedSpeed <px/s, ~200/10 (INT)>
COMMAND = set mouseKeys.{move|scroll}.acceleratedSpeed <px/s, ~1600/50 (INT)>
COMMAND = set mouseKeys.{move|scroll}.axisSkew <multiplier, 0.5-2.0 (FLOAT)>
COMMAND = set i2cBaudRate <baud rate, default 100000(INT)>
COMMAND = set diagonalSpeedCompensation BOOL
COMMAND = set chordingDelay <time in ms (INT)>
COMMAND = set autoShiftDelay <time in ms (INT)>
COMMAND = set stickyModifiers {never|smart|always}
COMMAND = set debounceDelay <time in ms, at most 250 (INT)>
COMMAND = set doubletapTimeout <time in ms (INT)>
COMMAND = set keystrokeDelay <time in ms (INT)>
COMMAND = set autoRepeatDelay <time in ms (INT)>
COMMAND = set autoRepeatRate <time in ms (INT)>
COMMAND = set oneShotTimeout <time in ms (INT)>
COMMAND = set macroEngine.batchSize <number of commands to execute per one update cycle INT>
COMMAND = set navigationModeAction.NAVIGATION_MODE_CUSTOM.DIRECTION ACTION
COMMAND = set keymapAction.LAYERID.KEYID ACTION
COMMAND = set backlight.strategy { functional | constantRgb | perKeyRgb }
COMMAND = set backlight.constantRgb.rgb <number 0-255 (INT)> <number 0-255 (INT)> <number 0-255 (INT)><number 0-255 (INT)>
COMMAND = set backlight.keyRgb.LAYERID.KEYID <number 0-255 (INT)> <number 0-255 (INT)> <number 0-255 (INT)>
COMMAND = set leds.enabled BOOL
COMMAND = set leds.brightness <0-1 multiple of default (FLOAT)>
COMMAND = set leds.fadeTimeout <seconds to fade after (INT)>
COMMAND = set modifierLayerTriggers.{shift|alt|super|ctrl} {left|right|both}
CONDITION = <condition>
CONDITION = if (EXPRESSION)
CONDITION = else
CONDITION = {ifShortcut | ifNotShortcut} [IFSHORTCUT_OPTIONS]* [KEYID]+
CONDITION = {ifGesture | ifNotGesture} [IFSHORTCUT_OPTIONS]* [KEYID]+
CONDITION = {ifPrimary | ifSecondary} [ simpleStrategy | advancedStrategy ]
CONDITION = {ifDoubletap | ifNotDoubletap}
CONDITION = {ifInterrupted | ifNotInterrupted}
CONDITION = {ifReleased | ifNotReleased}
CONDITION = {ifKeyActive | ifNotKeyActive} KEYID
CONDITION = {ifKeyDefined | ifNotKeyDefined} KEYID
CONDITION = {ifKeyPendingAt | ifNotKeyPendingAt} <idx in queue (INT)> KEYID
CONDITION = {ifPending | ifNotPending} <n (INT)>
CONDITION = {ifPendingKeyReleased | ifNotPendingKeyReleased} <queue idx (INT)>
CONDITION = {ifPlaytime | ifNotPlaytime} <timeout in ms (INT)>
CONDITION = {ifShift | ifAlt | ifCtrl | ifGui | ifAnyMod | ifNotShift | ifNotAlt | ifNotCtrl | ifNotGui | ifNotAnyMod}
CONDITION = {ifCapsLockOn | ifNotCapsLockOn | ifScrollLockOn | ifNotScrollLockOn | ifNumLockOn | ifNotNumLockOn}
CONDITION = {ifKeymap | ifNotKeymap} KEYMAPID
CONDITION = {ifLayer | ifNotLayer} LAYERID
CONDITION = {ifLayerToggled | ifNotLayerToggled}
CONDITION = {ifRecording | ifNotRecording}
CONDITION = {ifRecordingId | ifNotRecordingId} MACROID
CONDITION = {ifModuleConnected | ifNotModuleConnected} MODULEID
MODIFIER = <modifier>
MODIFIER = suppressMods
MODIFIER = postponeKeys
MODIFIER = final
MODIFIER = autoRepeat
MODIFIER = oneShot
IFSHORTCUT_OPTIONS = noConsume | transitive | anyOrder | orGate | timeoutIn <time in ms (INT)> | cancelIn <time in ms(INT)>
DIRECTION = {left|right|up|down}
LAYERID = {fn|mouse|mod|base|fn2|fn3|fn4|fn5|alt|shift|super|ctrl}|last|previous
LAYERID_BASIC = {fn|mouse|mod|base|fn2|fn3|fn4|fn5}
KEYMAPID = <short keymap abbreviation(IDENTIFIER)>|last
MACROID = last | <single char slot identifier(CHAR)> | <single number slot identifier(INT)>
OPERATOR = + | - | * | / | % | < | > | <= | >= | == | != | && | ||
VARIABLE_EXPANSION = $<variable name(IDENTIFIER)> | $<config value name> | $currentAddress | $thisKeyId | $queuedKeyId.<queue index (INT)> | $keyId.KEYID_ABBREV
EXPRESSION = <expression> | (EXPRESSION) | INT | BOOL | FLOAT | VARIABLE_EXPANSION | EXPRESSION OPERATOR EXPRESSION | !EXPRESSION | min(EXPRESSION [, EXPRESSION]+) | max(EXPRESSION [, EXPRESSION]+)
PARENTHESSED_EXPRESSION = (EXPRESSION)
INT = PARENTHESSED_EXPRESSION | VARIABLE_EXPANSION | [0-9]+ | -[0-9]+
BOOL = PARENTHESSED_EXPRESSION | VARIABLE_EXPANSION | 0 | 1
FLOAT = PARENTHESSED_EXPRESSION | VARIABLE_EXPANSION | [0-9]*.[0-9]+ | -FLOAT
VALUE = INT | BOOL | FLOAT
STRING = "<interpolated string>" | '<literal string>'
IDENTIFIER = [a-zA-Z_][a-zA-Z0-9_]*
CHAR = <any nonwhite ascii char>
LABEL = <label (IDENTIFIER)>
MODMASK = [MODMASK]+ | [L|R]{S|C|A|G} | {p|r|h|t} | {s|i|o}
NAVIGATION_MODE = cursor | scroll | caret | media | zoom | zoomPc | zoomMac | none
NAVIGATION_MODE_CUSTOM = caret | media | zoomPc | zoomMac
MODULEID = trackball | touchpad | trackpoint | keycluster
ADDRESS = LABEL | INT
ACTION = { macro MACRONAME | keystroke SHORTCUT | none }
SCANCODE = <en-US character (CHAR)> | SCANCODE_ABBREV
SHORTCUT = <MODMASK-SCANCODE, e.g. LC-c (COMPOSITE_SHORTCUT)>
SHORTCUT = <SCANCODE long abbreviation (SCANCODE)> 
SHORTCUT = <MODMASK, e.g. LS for left shift(MODMASK)> 
COMPOSITE_SHORTCUT = MODMASK-SCANCODE
SCANCODE_ABBREV = enter | escape | backspace | tab | space | minusAndUnderscore | equalAndPlus | openingBracketAndOpeningBrace | closingBracketAndClosingBrace
SCANCODE_ABBREV = backslashAndPipeIso | backslashAndPipe | nonUsHashmarkAndTilde | semicolonAndColon | apostropheAndQuote | graveAccentAndTilde | commaAndLessThanSign
SCANCODE_ABBREV = dotAndGreaterThanSign | slashAndQuestionMark | capsLock | printScreen | scrollLock | pause | insert | home | pageUp | delete | end | pageDown | numLock
SCANCODE_ABBREV = nonUsBackslashAndPipe | application | power | keypadEqualSign |  execute | help | menu | select | stop | again | undo | cut | copy | paste | find | mute
SCANCODE_ABBREV = volumeUp | volumeDown | lockingCapsLock | lockingNumLock | lockingScrollLock | keypadComma | keypadEqualSignAs400 | international1 | international2
SCANCODE_ABBREV = international3 | international4 | international5 | international6 | international7 | international8 | international9 | lang1 | lang2 | lang3 | lang4 | lang5
SCANCODE_ABBREV = lang6 | lang7 | lang8 | lang9 | alternateErase | sysreq | cancel | clear | prior | return | separator | out | oper | clearAndAgain | crselAndProps | exsel
SCANCODE_ABBREV = keypad00 | keypad000 | thousandsSeparator | decimalSeparator | currencyUnit | currencySubUnit | keypadOpeningParenthesis | keypadClosingParenthesis
SCANCODE_ABBREV = keypadOpeningBrace | keypadClosingBrace | keypadTab | keypadBackspace | keypadA | keypadB | keypadC | keypadD | keypadE | keypadF | keypadXor | keypadCaret
SCANCODE_ABBREV = keypadPercentage | keypadLessThanSign | keypadGreaterThanSign | keypadAmp | keypadAmpAmp | keypadPipe | keypadPipePipe | keypadColon | keypadHashmark
SCANCODE_ABBREV = keypadSpace | keypadAt | keypadExclamationSign | keypadMemoryStore | keypadMemoryRecall | keypadMemoryClear | keypadMemoryAdd | keypadMemorySubtract
SCANCODE_ABBREV = keypadMemoryMultiply | keypadMemoryDivide | keypadPlusAndMinus | keypadClear | keypadClearEntry | keypadBinary | keypadOctal | keypadDecimal
SCANCODE_ABBREV = keypadHexadecimal | keypadSlash | keypadAsterisk | keypadMinus | keypadPlus | keypadEnter | keypad1AndEnd | keypad2AndDownArrow | keypad3AndPageDown
SCANCODE_ABBREV = keypad4AndLeftArrow | keypad5 | keypad6AndRightArrow | keypad7AndHome | keypad8AndUpArrow | keypad9AndPageUp | keypad0AndInsert | keypadDotAndDelete
SCANCODE_ABBREV = leftControl | leftShift | leftAlt | leftGui | rightControl | rightShift | rightAlt | rightGui
SCANCODE_ABBREV = up | down | left | right | upArrow | downArrow | leftArrow | rightArrow
SCANCODE_ABBREV = np0 | np1 | np2 | np3 | np4 | np5 | np6 | np7 | np8 | np9
SCANCODE_ABBREV = f1 | f2 | f3 | f4 | f5 | f6 | f7 | f8 | f9 | f10 | f11 | f12 | f13 | f14 | f15 | f16 | f17 | f18 | f19 | f20 | f21 | f22 | f23 | f24
SCANCODE_ABBREV = mediaVolumeMute | mediaVolumeUp | mediaVolumeDown | mediaRecord | mediaFastForward | mediaRewind | mediaNext | mediaPrevious | mediaStop | mediaPlayPause | mediaPause
SCANCODE_ABBREV = systemPowerDown | systemSleep | systemWakeUp
SCANCODE_ABBREV = mouseBtnLeft | mouseBtnRight | mouseBtnMiddle | mouseBtn4 | mouseBtn5 | mouseBtn6 | mouseBtn7 | mouseBtn8
KEYID = <keyid (INT)> | <keyid abbreviation(KEYID_ABBREV)>
KEYID_ABBREV = ' | , | - | . | / | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | ; | = | ` | [ | ]
KEYID_ABBREV = a | q | w | e | r | t | y | u | i | o | p | a | s | d | f | g | h | j | k | l | z | x | c | v | b | n | m
KEYID_ABBREV = apostropheAndQuote | backspace | capsLock | closingBracketAndClosingBrace | commaAndLessThanSign | dotAndGreaterThanSign | enter
KEYID_ABBREV = equalAndPlus | graveAccentAndTilde | isoKey | semicolonAndColon | slashAndQuestionMark | tab | minusAndUnderscore | openingBracketAndOpeningBrace
KEYID_ABBREV = leftAlt | leftCtrl | leftFn | leftMod | leftMouse | leftShift | leftSpace | leftSuper
KEYID_ABBREV = leftModule.key1 | leftModule.key2 | leftModule.key3 | leftModule.leftButton | leftModule.middleButton | leftModule.rightButton
KEYID_ABBREV = rightAlt | rightCtrl | rightFn | rightMod | rightShift | rightSpace | rightSuper | rightModule.leftButton | rightModule.rightButton
MACRONAME = <macro name (IDENTIFIER)>
#####################
# DEVELOPMENT TOOLS #
#####################
COMMAND = stopAllMacros
COMMAND = statsRuntime
COMMAND = statsLayerStack
COMMAND = statsPostponerStack
COMMAND = statsActiveKeys
COMMAND = statsActiveMacros
COMMAND = statsRecordKeyTiming
COMMAND = diagnose
COMMAND = setStatus STRING
COMMAND = clearStatus
COMMAND = set setEmergencyKey KEYID
COMMAND = validateUserConfig
##############
# DEPRECATED #
##############
COMMAND = set macroEngine.scheduler {blocking|preemptive}
COMMAND = set doubletapDelay <time in ms, at most 65535, alias to doubletapTimeout (INT)>
COMMAND = set modifierLayerTriggers.{control} {left|right|both}
COMMAND = untoggleLayer
LAYERID = control
###########
# REMOVED #
###########
INT = #<register idx (INT)> | #key | @<relative macro action index(INT)> | %<key idx in postponer queue (INT)>
CONDITION = {ifRegEq | ifNotRegEq | ifRegGt | ifRegLt} <register index (INT)> <value (INT)>
COMMAND = resolveNextKeyEq <queue position (INT)> KEYID {<time in ms>|untilRelease} <action adr (ADDRESS)> <action adr (ADDRESS)>
COMMAND = setStatusPart <custom text>
COMMAND = resolveSecondary <time in ms (INT)> [<time in ms (INT)>] <primary action macro action index (ADDRESS)> <secondary action macro action index (ADDRESS)>
COMMAND = {setReg|addReg|subReg|mulReg} <register index (INT)> <value (INT)>
COMMAND = set module.MODULEID.invertScrollDirection BOOL
COMMAND = writeExpr INT
COMMAND = statsRegs
COMMAND = setExpDriver <baseSpeed (FLOAT:0.0)> <speed (FLOAT:1.0)> <acceleration (FLOAT:0.5)> <midSpeed (FLOAT:3000)>
COMMAND = setSplitCompositeKeystroke {0|1}
COMMAND = setActivateOnRelease {0|1}
COMMAND = switchLayer LAYERID
COMMAND = switchKeymapLayer KEYMAPID LAYERID
MODIFIER = suppressKeys
COMMAND = setStickyModsEnabled {0|never|smart|always|1}
COMMAND = setCompensateDiagonalSpeed {0|1}
COMMAND = setDebounceDelay <time in ms, at most 250 (INT)>
COMMAND = setKeystrokeDelay <time in ms, at most 65535 (INT)>
COMMAND = setEmergencyKey KEYID
```

### Uncategorized commands:

- `setLedTxt <time> { STRING | VALUE }` will set led display to the supplemented text and block for the given time before updating display back to default value.
    - If the given time is zero, i.e. `<time> = 0`, the led text will be set indefinitely (until the display is refreshed by other text) and this command will return immediately.
    - If `VALUE` is given (e.g., `$keystrokeDelay`), will be shown in notation that shows first two significant digits and a letter denoting floating point shift. E.g., `A23 = 2.3`, `Y23 = -0.23`, `23B = 2300`...
- `progressHue` or better `autoRepeat progressHue` will slowly adjust constantRGB value in order to rotate the per-key-RGB backlight through all hues.
- `resetTrackpoint` resets the internal trackpoint board. Can be used to recover the trackpoint from drift conditions. Drifts usually happen if you keep the cursor moving at slow constant speeds, because of the boards's internal adaptive calibration. Since the board's parameters cannot be altered, the only way around is or you to learn not to do the type of movement which triggers them.
- `i2cBaudRate <baud rate, default 100000(INT)>` sets i2c baud rate. Lowering this value may improve module reliability, while increasing latency.
- `{|}` Braces allow grouping multiple commands as if they were a single command. Please note that from the point of view of the engine, braces are (almost) regular commands, and have to be followed by newlines like any other command. Therefore idioms like `} else {` are not possible at the moment.

### Triggering keyboard actions (pressing keys, clicking, etc.):

- `write <custom text>` will type the provided string. Strings are single quote- (for literal strings) or double quote- (for interpolated strings) enclosed. E.g., `write "keystrokeDelay is $keystrokeDelay, 1+1=$(1+1)\n"`, or `'$ will show as literal dollar sign.'`.
- `startMouse/stopMouse` start/stop corresponding mouse action. E.g., `startMouse move left`
- `pressKey|holdKey|tapKey|releaseKey` Presses/holds/taps/releases the provided scancode. E.g., `pressKey mouseBtnLeft`, `tapKey LC-v` (Left Control + (lowercase) v), `tapKey CS-f5` (Ctrl + Shift + F5), `LS-` (just tap left Shift).
  - **press** means adding the scancode into a list of "active keys" and continuing the macro. The key is released once the macro ends. I.e., if the command is not followed by any sort of delay, the key will be released again almost immediately.
  - **release** means removing the scancode from the list of "active keys". I.e., it negates the effect of `pressKey` within the same macro. This does not affect scancodes emitted by different keyboard actions.
  - **tap** means pressing a key (more precisely, activating the scancode) and immediately releasing it again
  - **hold** means pressing the key, waiting until the key which activated the macro is released, and then releasing the key again. I.e., `holdKey <x>` is equivalent to `pressKey <x>; delayUntilRelease; releaseKey <x>`, while `tapKey <x>` is equivalent to `pressKey <x>; releaseKey <x>`.
  - `tapKeySeq` can be used for executing custom sequences. The default action for each shortcut in the sequence is tap. Other actions can be specified using `MODMASK`. E.g.:
    - `CS-u 1 2 3 space` - control shift U + number + space - linux shortcut for a custom unicode character.
    - `pA- tab tab rA-` - tap alt tab twice to bring forward the second background window.
  - `MODMASK` meaning:
    - `{S|C|A|G}` - Shift Control Alt Gui. (Windows, Super, and Gui are the same thing.)
    - `[L|R]` - Left Right (which hand side modifier should be used) E.g. `holdKey RA-c` (right alt + c).
    - `{s|i|o}` - modifiers (ctrl, alt, shift, gui) exist in three composition modes within UHK - sticky, input, output:
        - **sticky modifiers** are modifiers of composite shortcuts. These are applied only until the next key press. In certain contexts, they will take effect even after their activation key is released (e.g., to support alt + tab on non-base layers, you can do `holdKey sLA-tab`).
        - **input modifiers** are queried by `ifMod` conditions, and can be suppressed by `suppressMods`. E.g. `holdKey iLS`.
        - **output modifiers** are ignored by `ifMod` conditions, and are not suppressed by `suppressMods`.

      By default:
        - modifiers of normal non-macro scancode actions are treated as **sticky** when accompanied by a scancode.
        - normal non-macro modifiers (not accompanied by a scancode) are treated as **input** by default.
        - macro modifiers are treated as **output**.
    - `{p|r|h|t}` - press release hold tap - by default corresponds to the command used to invoke the sequence, but can be overridden for any.
    - windows, super, gui - all these are different names for the same key. For the sake of consistency, we choose `gui`.

### Control flow, macro execution (aka "functions"):

- `goTo ADDRESS` will go to action index int. Actions are indexed from zero. See `ADDRESS`
- `repeatFor <variable name> ADDRESS` - abbreviation to simplify cycles. Will decrement the supplemented variable and perform `goTo` to `adr` if the value is still greater than zero. Intended use case - place after command which is to be repeated with the variable containing the number of repeats and address `($currentAddress-1)` (or similar).
- `break` will terminate innermost while loop. If there is no enclosing while loop, then this will terminate the current macro.
- `exit` will terminate the current macro
- `noOp` does nothing - i.e., stops macro for exactly one update cycle and then continues.
- `yield` forces macro to yield, if blocking scheduler is used. With preemptive scheduler acts just as `noOp`.
- `exec MACRONAME` will execute the macro in the current state slot. I.e., the macro will be executed in the current context and will *not* return. The first action of the called macro is executed within the same event loop cycle.
- `call MACRONAME` will execute another macro in a new state slot and enters sleep mode. After the called macro finishes, the control returns to the caller macro. First action of the called macro is executed within the same eventloop cycle. The called macro has its own context (e.g., its own ifInterrupted flag, its own postponing counter and flags etc.) Beware, the state pool is small - do not use deep call trees!
- `fork MACRONAME` will execute another macro in a new state slot, without entering sleep mode.
- `stopAllMacros` interrupts all macros.

### Status buffer/Debugging tools

- `printStatus` will "type" content of status buffer (256 or 1024 chars, depends on my mood) on the keyboard. Mainly for debug purposes.
- `setStatus STRING` will append STRING to the status buffer, if there is enough space for that. This text can then be printed by `printStatus`.
- `clearStatus` will clear the buffer.
- `statsRuntime` will output information about runtime of current macro into the status buffer. The time is measured before the printing mechanism is initiated.
- `statsLayerStack` will output information about layer stack (into the buffer).
- `statsPostponerStack` will output information about postponer queue (into the buffer).
- `statsActiveKeys` will output all active keys and their states (into the buffer).
- `statsActiveMacros` will output all active macros (into the buffer).
- `statsRecordKeyTiming` will write timing information of pressed and released keys into status buffer until invoked again.
- `diagnose` will deactivate all keys and macros and print diagnostic information into the status buffer.
- `set emergencyKey KEYID` will make the one key be ignored by postponing mechanisms. `diagnose` command on such key can be used to recover keyboard from conditions like infinite postponing loop...

### Delays:

- `delayUntil <timeout>` sleeps the macro until timeout (in ms) is reached.
- `delayUntilRelease` sleeps the macro until its activation key is released. Can be used to set action on key release.
- `delayUntilReleaseMax <timeout>` same as `delayUntilRelease`, but is also broken when timeout (in ms) is reached.

### Layer/Keymap switching:

Layer/Keymap switching mechanism allows toggling/switching of keymaps or layers. We keep layer records in a stack of limited size, which can be used for nested toggling and/or holds.

special ids:
- `previous` refers to the second stack record (i.e., `stackTop-1`)
- `last` always refers to the previously used layer/keymap (i.e., `stackTop-1` or `stackTop+1`)

terminology:
- switch means loading the target keymap and resetting layer-switching context
- toggle refers to activating a layer and remaining there (plus the activated layer is pushed onto the layer stack)
- hold refers to activating a layer, waiting until the key is released, and then switching back (plus the activated layer is pushed onto the layer stack and then removed again)

implementation details:
- layer stack contains information about switch type (held or toggle) and a boolean which indicates whether the record is active. Once hold ends or untoggle is issued, the corresponding record (not necessarily the top record) is marked as "inactive". Whenever some record is marked inactive, all inactive records are popped from the top of the stack.
- the stack contains both layer id and keymap id. If keymap ids of previous/current records do not match, the full keymap is reloaded.

Commands:
- `switchKeymap` will load the keymap by its abbreviation and reset the stack.
- `toggleLayer` toggles the layer.
- `untoggleLayer` pops topmost non-held layer from the stack. (I.e., untoggles layer which was toggled via "toggle" or "switch" feature.)
- `toggleKeymapLayer` toggles layer from different keymap.
- `holdLayer LAYERID` mostly corresponds to the sequence `toggleLayer <layer>; delayUntilRelease; untoggleLayer`, except for more elaborate conflict resolution (releasing holds in incorrect order).
- `holdKeymapLayer KEYMAPID LAYERID` just as holdLayer, but allows referring to layer of different keymap. This reloads the entire keymap, so it may be very inefficient.
- `holdLayerMax/holdKeymapLayerMax` will timeout after <timeout> ms if no action is performed in that time.
- `ifPrimary/ifSecondary [ simpleStrategy | advancedStrategy ] ... COMMAND` will wait until the firmware can distinguish whether primary or secondary action should be activated and then either execute `COMMAND` or skip it.

### Layer/Keymap loading manipulation / shared layers:

Following commands allow altering current keymap in RAM. Typically, you can use this to share layers among keymaps, or modify/construct your layers/keymaps on the fly out of pre-fabricated pieces (e.g., changing ijkl to arrows by a shortcut).

These alterations will last only until keymap is reloaded. I.e., switching keymap, or issuing `holdKeymapLayer` will destroy all changes done by following commands.

- `replaceLayer <target layer (LAYERID)> <source keymap (KEYMAPID)> <source layer (LAYERID)>` will replace one layer with a layer from another keymap. You can use this to share layers across keymaps. For instance, add `replaceLayer mod QWR fn` to your `$onKeymapChange QTY` macro event to "permanently" replace the mod layer of your QTY keymap by the fn layer of the QWR keymap
- `overlayLayer <target layer (LAYERID)> <source keymap (KEYMAPID)> <source layer (LAYERID)>` will take defined actions from the source layer and apply them on the target layer. Assume `ARR base` layer contains just arrows on `ijkl` keys. Now, in your QWERTY layout, call `overlayLayer base ARR base` and you get QWERTY that has arrows on `ijkl`.
- `overlayKeymap KEYMAPID` as `overlayLayer`, but overlays all layers by corresponding layers of the provided keymap.

### Postponing mechanisms.

We allow postponing key activations in order to allow deciding between some scenarios depending on the next pressed key and then activating the keys pressed in "past" in the newly determined context. The postponing mechanism happens in key state preprocessing phase - i.e., works prior to activation of the key's action, including all macros. Postponing mechanism registers and postpones both key presses and releases, but does not preserve delays between them. Postponing affects even macro keystate queries, unless the macro in question is the one which initiates the postponing state (otherwise `postponeKeys delayUntilRelease` would indefinitely postpone its own release). Replay of postponed keys happens every `CYCLES_PER_ACTIVATION` update cycles, currently 2. The following commands either use this feature or allow control of the queue.

- `postponeKeys` modifier prefixed before another command keeps the firmware in postponing mode. Once no instance of postponeKeys modifer is active, the postponer will start replaying the keys. Replaying happens with normal event loop, which means that postponed keys will be replayed even during macro execution (most likely after next macro action). Some commands (thos from this section) apply this modifier implicitly. See MODIFIER section.
- `postponeNext <n>` command will apply `postponeKeys` modifier on the current command and following next n commands (macro actions).
- `ifPending/ifNotPending <n>` is true if there is at least `n` postponed keys in the queue.
- `ifPendingKeyReleased/ifNotPendingKeyReleased <queue idx>` is true if the key pending at `idx` in queue has been released. I.e., if there exists matching release event in the queue.
- `ifKeyPendingAt/ifNotKeyPendingAt <idx> <keyId>` looks into postponing queue at `idx`th waiting key and compares it to the `keyId`.
- `consumePending <n>` will remove n records from the queue.
- `activateKeyPostponed KEYID` will add tap of KEYID at the end of queue. If `atLayer LAYERID` is specified, action will be taken from that layer rather than current one. If `prepend` option is specified, event will be place at the beginning of the queue.
- `ifPrimary/ifSecondary [ simpleStrategy | advancedStrategy ] ... COMMAND` will wait until the firmware can distinguish whether primary or secondary action should be activated and then either execute `COMMAND` or skip it.
- `ifShortcut/ifNotShortcut/ifGesture/ifNotGesture [IFSHORTCUT_OPTIONS]* [KEYID]*` will wait for next keypresses until sufficient number of keys has been pressed. If the next keypresses correspond to the provided arguments (hardware ids), the keypresses are consumed and the condition is performed. Consuming takes place in both `if` and `ifNot` versions if the full list is matched. E.g., `ifShortcut 090 089 final tapKey C-V; holdKey v`.
  - `Shortcut` requires continual press of keys (e.g., Ctrl+c). By default, it timeouts with the activation key release.
  - `Gesture` allows a noncontinual sequence of keys (e.g., vim's gg). By default, timeouts in 1000 ms since activation.
  - `IFSHORTCUT_OPTIONS`:
    - `noConsume` allows not consuming the keys. Useful if the next action is a standalone action, yet we want to branch the behaviour of the current macro depending on it.
    - `transitive` makes termination conditions relate to that key of the queue whose result is most permissive (normally, they always refer to the activation key) - e.g., in transitive mode with a 3-key shortcut, the first key can be released once the second key is being held. Timers count the time since the last performed action in this mode. Both `timeoutIn` and `cancelIn` behave according to this flag. In non-transitive mode, timers are counted since the activation key press - i.e., since the macro start.
    - `anyOrder` will check only presence of mentioned keyIds in postponer queue.
    - `orGate` will treat the given list of keys as *or-conditions* (rather than as *and-conditions*). Check any presence of mentioned keyIds in postponer queue for the next key press. Implies `anyOrder`.
    - `timeoutIn <time (INT)>` adds a timeout timer to both `Shortcut` and `Gesture` commands. If the timer times out (i.e., the condition does not suceed or fail earlier), the command continues as if matching KEYIDs failed. Can be used to shorten life of `Shortcut` resolution.
    - `cancelIn <time (INT)>` adds a timer to both commands. If this timer times out, all related keys are consumed and macro is broken. *"This action has never happened, lets not talk about it anymore."* (Note that this is an only condition which behaves same in both `if` and `ifNot` cases.)
  - `arg1 - queue idx` idx of key to compare, indexed from 0. Typically 0, if we want to resolve the key after next key then 1, etc.
  - `arg2 - key id` key id obtained by `resolveNextKeyId`. This is static identifier of the hardware key.
  - `arg3 - timeout` timeout. If not enough keys is pressed within the time, goto to `arg5` is issued. Either number in ms, or `untilRelease`.
  - `arg4 - adr1` index of macro action to go to if the `arg1`th next key's hardware identifier equals `arg2`.
  - `arg5 - adr2` index of macro action to go to otherwise.
- `resolveNextKeyId` will wait for next key press. When the next key is pressed, it will type a unique identifier identifying the pressed hardware key.
  - E.g., create a macro containing this command, and bint it to key `a`. Focus text editor. Tap `a`, tap `b`. Now, you should see `91` in your text editor, which is `b`'s `KEYID`.

### Conditions

Conditions are checked before processing the rest of the command. If the condition does not hold, the rest of the command is skipped entirelly. If the command is evaluated multiple times (i.e., if it internally consists of multiple steps, such as the delay, which is evaluated repeatedly until the desired time has passed), the condition is evaluated only in the first iteration.

- `if BOOL` allows switching based on a custom expression. E.g., `if ($keystrokeDelay > 10) ...`
- `else` condition is true if the previous command ended due to a failed condition.
- `ifDoubletap/ifNotDoubletap` is true if the macro was started at most 300ms after the start of another instance of the same macro.
- `ifInterrupted/ifNotInterrupted` is true if a keystroke action or mouse action was triggered during macro runtime. Allows fake implementation of secondary roles. Also allows interruption of cycles.
- `ifReleased/ifNotReleased` is true if the key which activated current macro has been released. If the key has been physically released but the release has been postponed by another key, the conditien yields false. If the key has been physically released and the postponing mode was initiated by this macro (e.g., `postponeKeys ifReleased goTo ($currentAddress+2)`), it returns non-postponed release state (i.e., true if there's a matching release event in the postponing queue).
- `ifPending/ifNotPending <n>` is true if there is at least `n` postponed keys in the postponing queue. In context of postponing mechanism, this condition acts similar in place of ifInterrupted.
- `ifPendingKeyReleased/ifNotPendingKeyReleased <queue idx>` is true if the key pending at `idx` in queue has been released. I.e., if there exists matching release event in the queue.
- `ifKeyPendingAt/ifNotKeyPendingAt <idx> KEYID` looks into the postponing queue at `idx`th waiting key press and compares it to the `keyId`. See `resolveNextKeyId`.
- `ifKeyActive/ifNotKeyActive KEYID` is true if the key is pressed at the moment. This considers *postponed* states (I.e., reads state as processed by postponer, not reading actual hardware states).
- `ifKeyDefined/ifNotKeyDefined KEYID` is true if the key in parameter has defined action on the current keymap && layer. If you wish to test keys from different layers/keymaps, you will have to toggle them manually first.
- `ifPlaytime/ifNotPlaytime <timeout in ms>` is true if at least `timeout` milliseconds passed since macro was started.
- `ifShift/ifAlt/ifCtrl/ifGui/ifAnyMod/ifNotShift/ifNotAlt/ifNotCtrl/ifNotGui/ifNotAnyMod` is true if either right or left modifier was held in the previous update cycle. This does not indicate modifiers which were triggered from macroes.
- `ifCapsLockOn/ifNotCapsLockOn/ifScrollLockOn/ifNotScrollLockOn/ifNumLockOn/ifNotNumLockOn` is true if corresponding caps lock / num lock / scroll lock is set to true by the host OS.
  - Please note that:
      - under Linux, scroll lock is disabled by default. As a consequence, the macro event does not trigger.
      - under MacOS, scroll lock dims the screen but does not toggle the scroll lock state. As a consequence, the macro event does not trigger.
- `{ifKeymap|ifNotKeymap|ifLayer|ifNotLayer} <value>` will test if the current Keymap/Layer equals the first argument.
- `{ifLayerToggled|ifNotLayerToggled}` will return true if current layer is toggled. It will return true if the toggled layer is on top of the stack, or anywhere else as long as only the same (currently active) layers are above it in the layer stack.
- `ifRecording/ifNotRecording` and `ifRecordingId/ifNotRecordingId MACROID` test if the runtime macro recorder is in the recording state.
- `ifShortcut/ifNotShortcut [IFSHORTCUT_OPTIONS]* [KEYID]*` will wait for future keypresses and compare them to the argument. See the postponer mechanism section.
- `ifGesture/ifNotGesture [IFSHORTCUT_OPTIONS]* [KEYID]*` just as `ifShortcut`, but breaks after 1000ms instead of when the key is released. See the postponer mechanism section.
- `ifPrimary/ifSecondary [ simpleStrategy | advancedStrategy ] ... COMMAND` will wait until the firmware can distinguish whether primary or secondary action should be activated and then either execute `COMMAND` or skip it.

### Modifiers

Modifiers modify behaviour of the rest of the keyboard while the rest of the command is active (e.g., a delay) is active.

- `suppressMods` will supress any modifiers except those applied via macro engine. Can be used to remap shift and nonShift characters independently.
- `postponeKeys` will postpone all new key activations for as long as any instance of this modifier is active. See postponing mechanisms section.
- `final` will end macro playback after the "modified" action is properly finished. Simplifies control flow. "Implicit break."
- `autoRepeat` will continuously repeats the following command while holding the macro key, with some configurable delay. See `set autoRepeatDelay <time>` and `set autoRepeatRate <time>` for more details. This enables you to use keyrepeat feature (which is typically implemented in the OS level) with any macro action. For example, you can use something like `autoRepeat tapKey down` or `ifShift autoRepeat tapKeySeq C-right right`.
- `oneShot` prolongs this key's press until another action takes place or oneShot times out. E.g., `oneShot holdLayer mod`. Set timeout by `set oneShotTimeout 500`.

### Runtime macros:

Macro recorder targets vim-like macro functionality.

Usage (e.g.): call `recordMacro a`, do some work, end recording by another `recordMacro a`. Now you can play the actions (i.e., sequence of keyboard reports) back by calling `playMacro a`.

Only BasicKeyboard scancodes are available at the moment. These macros are recorded into RAM only. Number of macros is limited by memory (current limit is set to approximately 500 keystrokes (4kb) (maximum is ~1000 if we used all available memory)). If less than 1/4 of dedicated memory is free, oldest macro slot is freed. If currently recorded macro is longer than 1/4 of dedicated memory, recording is stopped and the macro is freed (prevents unwanted deletion of macros).

Macro slots are identified by a single character or a number or `$thisKeyId` (meaning "this key").

- `recordMacroDelay` will measure the time until key release (i.e., works like `delayUntilRelease`) and insert a delay of that length into the currently recorded macro. This can be used to wait for a window manager's reaction etc.
- `recordMacro [<macro slot id(MACROID)>]` will toggle recording (i.e., either start or stop)
- `startRecording [<macro slot id(MACROID)>]` will stop current recording (if any) and start new
- `stopRecording` will stop recording the current macro
- If the `MACROID` argument is omitted, the last used id is used.
- `{startRecordingBlind | stopRecordingBlind | recordMacroBlind} ...` work similarly, except that the basic scancode output of the keyboard is suppressed.

### Named variables:

`setVar <name> <value>` allows setting/creating custom named variable. E.g., `setVar foo ($abc + 3)`. Value then can be accessed via `$foo` in place of numeric argument.

Internally, values are saved in one of the following types, and types are automatically converted as needed in expressions:
- `INT` - as a int32_t. E.g., `(7/3)` yields 2
- `FLOAT` - as 32-bit floating point value. E.g., `(7/3.0)` yields 2.333...
- `BOOL` - 1 or 0 value

### Configuration options:

- `set stickyModifiers {never|smart|always}` globally turns on or off sticky modifiers. This affects only standard scancode actions. Macro actions (both gui and command ones) are always nonsticky, unless `sticky` flag is included in `tapKey|holdKey|pressKey` commands. Default value is `smart`, which is the official behaviour - i.e., `<alt/ctrl/gui> + <tab/arrows>` are sticky.
- `set diagonalSpeedCompensation BOOL` will divide diagonal mouse speed by sqrt(2) if enabled.
- `set chordingDelay 0 | <time in ms (INT)>` If nonzero, keyboard will delay *all* key actions by the specified time (recommended 50ms). If another key is pressed during this time, pending key actions will be sorted according to their type:
  1) Keymap/layer switches
  2) Macros
  3) Keystrokes and mouse actions
  This allows the user to trigger chorded shortcuts in an arbitrary order (all at the "same" time). E.g., if `A+Ctrl` is pressed instead of `Ctrl+A`, the keyboard will still send `Ctrl+A` if the two key presses follow within the specified time.
- `set autoShiftDelay 0 | <time in ms (INT)>` If nonzero, the autoshift feature is turned on. This adds shift to a scancode when the key is held for at least `autoShiftDelay` ms. (E.g., tapping 'a' results in 'a', pressing 'a' for a little bit longer results in 'A'.)
- `set debounceDelay <time in ms, at most 250>` prevents key state from changing for some time after every state change. This is needed because contacts of mechanical switches can bounce after contact and therefore change state multiple times in span of a few milliseconds. Official firmware debounce time is 50 ms for both press and release. Recommended value is 10-50, default is 50.
- `set doubletapTimeout <time in ms, at most 65535>` controls doubletap timeouts for both layer switchers and for the `ifDoubletap` condition.
- `set keystrokeDelay <time in ms, at most 65535>` allows slowing down keyboard output. This is handy for lousily written RDP clients and other software which just scans keys once a while and processes them in wrong order if multiple keys have been pressed inbetween. In more detail, this setting adds a delay whenever a basic usb report is sent. During this delay, key matrix is still scanned and keys are debounced, but instead of activating, the keys are added into a queue to be replayed later. Recommended value is 10 if you have issues with RDP missing modifier keys, 0 otherwise.
- `set autoRepeatDelay <time in ms, at most 65535>` and `set autoRepeatRate <time in ms, at most 65535>` allows you to set the initial delay (default: 500 ms) and the repeat delay (default: 50 ms) when using `autoRepeat`. When you run the command `autoRepeat <command>`, the `<command>` is first run without delay. Then, it will waits `autoRepeatDelay` amount of time before running `<command>` again. Then and thereafter, it will waits `autoRepeatRate` amount of time before repeating `<command>` again. This is consistent with typical OS keyrepeat feature.
- `set oneShotTimeout <time in ms, at most 65535>` sets the timeout for `oneShot` modifier. Zero means infinite.
- `set mouseKeys.{move|scroll}.{...} INT` please refer to Agent for more details.
  - `initialSpeed` - the speed that is active when the key is pressed.
  - `initialAcceleration,baseSpeed` - when the mouse key is held, speed increases until it reaches baseSpeed.
  - `deceleratedSpeed` - speed as affected by deceleration modifier.
  - `acceleratedSpeed` - speed as affected by acceleration modifier.
  - `axisSkew` - axis skew multiplies the horizontal axis and divides the vertical axis. The default value is 1.0, a reasonable value is between 0.5-2.0 Useful for very niche use cases.
- `set module.MODULEID.{baseSpeed|speed|xceleration}` modifies speed characteristics of right side modules.

    Simply speaking, `xceleration` increases sensitivity at high speeds, while decreasing sensitivity at low speeds. Furthermore, `speed` controls contribution of the acceleration formula. The `baseSpeed` can be used to offset the low-speed-sensitivity-decrease effect by making some raw input be applied directlo to the output.

    ![speed relations](resources/mouse_speeds.svg)

    Actual formula is is something like `speedMultiplier(normalizedSpeed) = baseSpeed + speed*(normalizedSpeed^xceleration)` where `normalizedSpeed = actualSpeed / midSpeed`. Therefore `appliedDistance(distance d, time t) = d*(baseSpeed*((d/t)/midSpeed) + d*speed*(((d/t)/midSpeed)^xceleration))`. (`d/t` is actual speed in px/s, `(d/t)/midSpeed` is normalizedSpeed which acts as base for the exponent).
  - `baseSpeed` makes a portion of the raw input contribute directly to the output. I.e., if `speed = 0`, then the traveled distance is `reportedDistance*baseSpeed`.
  - `speed` multiplies the effect of the xceleration expression. I.e., simply multiplies the reported distance when the actual speed equals `midSpeed`.
  - `xceleration` is exponent applied to the speed normalized w.r.t midSpeed. It makes cursor move relatively slower at low speeds and faster with aggresive swipes. It increases non-linearity of the curve, yet does not alone make the cursor faster and more responsive - thence "xceleration" rather than "acceleration" to avoid confusion. I.e., xceleration expression of the formula is `speed*(reportedSpeed/midSpeed)^(xceleration)`. I.e., no acceleration is xceleration = 0, reasonable (square root) acceleration is xceleration = 0.5. Highest recommended value is 1.0.
  - `midSpeed` represents "middle" speed, where the user can easily imagine behaviour of the device (currently fixed 3000 px/s) and henceforth easily set the coefficient. At this speed, acceleration formula yields `1.0`, i.e., `speedModifier = (baseSpeed + speed)`.

  General guidelines are:
    - If your cursor is sluggish at low speeds, you want to:
      - either lower xceleration
      - or increase baseSpeed
    - If you struggle to cover large distances with a single swipe, you want to:
      - set xceleration to either `0.5` or `1.0` (or somewhere in-between)
      - and then increase speed till you are satisfied
    - If the cursor moves non-intuitively:
      - you want to either lower xceleration (`0.5` is a reasonable value)
      - or increase baseSpeed
    - If you want to make the cursor more responsive overall:
      - you want to increase speed

  (Mostly) reasonable examples (`baseSpeed speed xceleration midSpeed`):
    - `0.0 1.0 0.0 3000` (no xceleration)
      - speed multiplier is always 1x at all speeds
    - `0.0 1.0 0.5 3000` (square root multiplier)
      - starts at 0x speed multiplier - allowing for very precise movement at low speed)
      - at 3000 px/s, yields cursor speed equal to the actual picked-up movement
      - at 12000 px/s, cursor speed is going to be twice the movement (because `sqrt(4) = 2`)
    - `0.5 0.5 1.0 3000` (linear speedup starting at 0.5)
      - starts at 0.5x speed multiplier - meaning that the resulting cursor speed is half the picked-up movement at low speeds
      - at 3000 px/s, speed multiplier is 1x
      - at 12000 px/s, speed multiplier is 2.5x
      - (notice that linear xceleration actually means quadratic overall curve)
    - `1.0 1.0 1.0 3000`
      - the same as before, but the resulting cursor speed is double. I.e., 1x at 0 speed, 2x at 3000 px/s, 5x at 12000 px/s
    - `0.0 1.0 1.0 3000` (linear speedup starting at 0)
      - again very precise at low speed
      - at 3000 px/s, speed multiplier is 1x
      - at 6000 px/s, speed multiplier is 4x
      - not recommended - the curve will behave in a very non-linear fashion.
- `set module.MODULEID.{caretSpeedDivisor|scrollSpeedDivisor|zoomSpeedDivisor|swapAxes|invertScrollDirection|invertScrollDirectionX|invertScrollDirectionY}` modifies scrolling and caret behaviour:
    - `caretSpeedDivisor` (default: 16) is used to divide input in caret mode. This means that per one tick, you have to move by 16 pixels (or whatever the unit is). (This is further modified by axisLocking skew, as well as by acceleration.)
    - `scrollSpeedDivisor` (default: 8) is used to divide input in scroll mode. This means that while scrolling, every 8 pixels produce one scroll tick. (This is further modified by axisLocking skew, as well as acceleration.)
    - `pinchZoomDivisor` (default: 4 (?)) is used specifically for the touchpad's zoom gesture, therefore its default value is nonstandard. Only valid for touchpad.
    - `swapAxes` swaps the x and y coordinates of the module. The intended use is for the keycluster trackball, since sideways scrolling is easier.
    - `invertScrollDirection` inverts the scroll direction in the y-axis...
    - `invertScrollDirectionX` explicitly inverts the scroll direction in the x-axis...
    - `invertScrollDirectionY` explicitly inverts the scroll direction in the y-axis...

- `set module.MODULEID.{axisLockSkew|axisLockFirstTickSkew|cursorAxisLock|scrollAxisLock}` control axis locking feature:

  When you first move in navigation mode that has axis locking enabled, the axis is locked to one of the axes. Axis-locking behaviour is defined by two characteristics:

  - axis skew: when axis is locked, the secondary axis value is multiplied by `axisLockSkew`. This means that in order to change locked direction (with 0.5 value), you have to produce stroke that goes at least twice as fast in the non-locked direction compared to the locked one.
  - secondary axis zeroing: whenever the locked (primary) axis produces an event, the secondary axis is zeroed.

  Behaviour of the first tick (the one which locks the axis) can be controlled independently. The first tick (the first event produced when the axis is not yet locked) skew is applied to *both* axes. This allows the following tweaks:

  - use `axisLockFirstTickSkew = 0.5` in order to require a stronger "push" at the beginning of a movement. Useful for the mini trackball, since it is likely to produce an unwanted move event when you try to just click it. With a `0.5` value, it will require two roll events to activate.
  - use `axisLockFirstTickSkew = 2.0` in order to make the first event more responsive. E.g., caret mode will make the fist character move even with a very gently push, while consecutive activations will need greater momentum.

  By default, axis locking is enabled in scroll and discreet modes for right hand modules, and for scroll, caret and media modes for keycluster.

  - `axisLockSkew` controls caret axis locking. Defaults to 0.5, valid/reasonable values are 0-100, centered around 1.
  - `axisLockFirstTickSkew` - same meaning as `axisLockSkew`, but controls how axis locking applies on the first tick.
 non-zero value means that the first tick will require a "push" before the cursor starts moving. Or will require less "force" if the value is greater than 1.
  - `cursorAxisLock BOOL` - turns axis locking on for cursor mode. Not recommended, but possible.
  - `scrollAxisLock BOOL` - turns axis locking on for scroll mode. Default for keycluster trackball.
  - `caretAxisLock BOOL` - turns axis locking on for all discrete modes.

- `set module.touchpad.holdContinuationTimeout <0-65535 (INT)>` If non-zero, touchpad allows you to release your finger for the specified amount of time during drag-and-drop (without the left click getting released).

- Remapping keys:
  - `set navigationModeAction.{caret|media}.{DIRECTION|none} ACTION` can be used to customize the caret or media mode behaviour by binding directions to macros. This action is global and reversible only by powercycling.
  - `set keymapAction.LAYERID.KEYID ACTION` can be used to remap any action that lives in a keymap. Most remappable ids can be retrieved with `resolveNextKeyId`. Keyid can also be constructed manually - see `KEYID`. Binding applies only until the next keymap switch. E.g., `set keymapAction.base.64 keystroke escape` (maps `~` key to escape), or `set keymapAction.fn.193 macro TouchpadAction` (maps touchpad two-finger gesture to a macro named `TouchpadAction`).

- Secondary roles section configures the resolution strategy used for controlling both the native (agent-mapped) secondary roles and the`ifPrimary` and `ifSecondary` conditions.

  - `set secondaryRole.defaultStrategy [ simple | advanced ]` sets the default resolution strategy to be used. Furthermore, `ifPrimary/ifSecondary` can specify explicitly which strategy to use (e.g., `ifPrimary advancedStrategy final tapKey a`).
    - simple strategy listens for other key activations until the dual-role key is released. If there is any such activation, it activates the secondary role and then the action of the other key without any further delays. If there is no such other action, it performs primary role on the dual-role key release.
    - advanced strategy may trigger secondary role depending on timeout, or depending on key release order.
      - `set secondaryRole.advanced.timeout <timeout in ms, 350 (INT)>` if this timeout is reached, `timeoutAction` (secondary by default) role is activated.
      - `set secondaryRole.advanced.timeoutAction { primary | secondary }` defines whether the primary action or the secondary role should be activated when timeout is reached
      - `set secondaryRole.advanced.triggerByRelease BOOL` if enabled, secondary role is chosen depending on the release order of the keys (`press-A, press-B, release-B, release-A` leads to secondary action; `press-A, press-B, release-A, release-B` leads to primary action). This is further modified by safetyMargin.
      - `set secondaryRole.advanced.triggerByPress BOOL` if enabled, secondary role is triggered when there is another press, simiarly to the simple strategy. Unlike simple strategy, this allows setting timeout behaviors, and also is modified by safetyMargin.
      - `set secondaryRole.advanced.triggerByMouse BOOL` if enabled, any mouse (module) activity triggers secondary role immediately.
      - `set secondaryRole.advanced.safetyMargin <ms, -50 - 50 (INT)>` finetunes sensitivity of the trigger-by-release and trigger-by-press behaviours, so that positive values favor primary role, while negative values favor secondary role. This works by adding the value to the action key (or subtracting from the dual role key). E.g., suppose trigger by release is active, and safetyMargin equal 50. Furthermore assume that dual-role key is released 30ms after the action key. Due to safety margin 50 being greater than 30, the dual-role key is still considered to be released first, and so primary role is activated.
      - `set secondaryRole.advanced.doubletapToPrimary BOOL` allows initiating hold of primary action by doubletap. (Useful if you want a dual key on space.)
      - `set secondaryRole.advanced.doubletapTime <ms, 200 (INT)>` configures the above timeout (measured press-to-press).

- `macroEngine`
  - terminology:
       - action - one action as shown in the agent.
       - subAction - some actions have multiple phases (such as tapKey which consists at least of press and release, or delay). Such actions may take multiple update cycles to complete.
       - command - in case of command action, the action consists of multiple commands. A command is defined as any nonempty text line. Commands are treated as actions, which means that the macro action context is resetted for every command line. Every command line has its own address.
  - `scheduler` controls how are macros executed.
    - `preemptive` default old one - freely interleaves commands. It gives every macro slot an oppotunity to execute one action or subaction or command. This means that no macro can block operation of ther macros, but comes at a cost of quirkiness and nondeterminism.
      - `batchSize` limits how many commands can be executed per one macro slot per macro engine invocation.
    - `blocking` experimental scheduler. This scheduler keeps track of macro states and allows only one macro to run at a time. If a macro yields (either enters waiting state or explicitly yields), another macro gets the exclusive privilege of running. As long as there are running (nonsleeping / waiting) macros, the rest of the keyboard is in the postponing state.
      - `batchSize` parameter controls how many commands can be executed per one macro engine invocation. If the number is exceeded, normal update cycle resumes in the postponing state. This means that if a macro takes many actions, keyboard keys get queued in a queue to be executed later in the correct order.
      - Macro states roughly correspond to the following:
        - In progress - means that current action progresses state of the macro - i.e., does some work. As long as macro actions/subactions/commands return this state, they can be all executed within one keyboard update cycle.
        - In progress blocking - corresponds to commands that operate on usb reports - e.g., tap keys, etc.. If a macro returns with this state, the macro engine allows the keyboard to complete the update cycle in order to send the usb reports. This update cycle is performed in postponing mode. The macro engine is then resumed at the same action.
        - In progress waiting - corresponds to waiting states, such as `delayUntil`, `ifGesture`, `ifSecondary`. Whenever they get the running privilege, they check their state and yield, allowing the rest of the keyboard to run uninterrupted. These don't initiate postponing unless it is part of their function.
        - Sleeping - if one macro calls another, the caller sleeps until the callee finishes.
        - Backward jump - any backward jump also yields. This should prevent unwanted endless loops, as well as the need for the user to manage yielding logic manually.

- backlight:
    - `backlight.strategy { functional | constantRgb | perKeyRgb }` sets backlight strategy.
    - `backlight.constantRgb.rgb INT INT INT` allows setting custom constant colour for the entire keyboard. E.g.: `set backlight.strategy constantRgb; set backlight.constantRgb.rgb 255 0 0` to make entire keyboard shine red.
    - `backlight.keyRgb.LAYERID.KEYID INT INT INT` allows overriding color of the key. This override will last until reload of keymap and will apply to all backlight strategies.

- general led configuration:
    - `leds.enabled BOOL` turns on/off all keyboard leds: i.e., backlight, indicator leds, segment display
    - `leds.brightness <0-1 multiple of default (FLOAT)>` allows scaling default brightness. E.g., `0.5` will dim the entire keyboard to half of the default values that are configured in Agent
    - `leds.fadeTimeout <seconds to fade after (INT)>` will turn off leds after the configured interval.

- modifier layer triggers:
    - `set modifierLayerTriggers.{shift|alt|super|ctrl} {left|right|both}` controls whether modifier layers are triggered by left or right or either of the modifiers.

### Argument parsing rules:

- `INT` is parsed as a 32 bit signed integer and then assigned into the target variable. However, the target variable is often only 8 or 16 bit unsigned.
- `EXPRESSION` / variables - all numeric/boolean arguments also accept arbitrary expressions. These have to be enclosed in parentheses.
  - The following operators are accepted:
    - `+,-,*,/,%` - addition, subtraction, multiplication, division and modulo
    - `min(),max()` - minimum, maximum, e.g. `min($a, 2, 3, 4)`
    - `<,<=,>,>=` - less than, less or equal, greater than, greater or equal
    - `==,!=` - equals, not equals
    - `!` - unary boolean negation
    - `&&`, `||` - and, or
  - The following special identifiers are supported:
    - `$thisKeyId` which stands for the keyid of the key that activated the macro.
    - `$keyId.<keyId abbreviation>` which stands for numeric keyid of the provided abbreviation.
    - `$currentAddress` which stands for the address of the command in which it is found.
    - `$queuedKeyId.<index (NUMBER)>` which stands for a zero-indexed position in the postponer queue.
- `KEYMAPID` - is assumed to be 3 characters long abbreviation of a keymap.
- `MACROID` - macro slot identifier is either a number or a single ascii character (interpreted as a one-byte value). `$thisKeyId` can be used so that the same macro refers to different slots when assigned to different keys.
- `custom text` is an arbitrary text starting on the next non-space character and ending at the end of the text action. (Yes, this should be refactored in the future.)
- `KEYID` is a numeric id obtained by `resolveNextKeyId` macro. It can also be constructed manually, as an index (starting at zero) added to an offset of `64*slotid`.  This means that starting offsets are:

```
  RightKeyboardHalf = 0
  LeftKeyboardHalf  = 64
  LeftModule        = 128
  RightModule       = 192
```

- `SHORTCUT` is an abbreviation of a key possibly accompanied by modifiers. Describes at most one scancode action. Can be prefixed by `C/S/A/G` denoting `Control/Shift/Alt/Gui`. Mods can further be prefixed by `L/R`, denoting left or right modifier. If a single ascii character is entered, it is translated into corresponding key combination (shift mask + scancode) according to standard EN-US layout. E.g., `pressKey mouseBtnLeft`, `tapKey LC-v` (Left Control + (lowercase) V (scancode)), `tapKey CS-f5` (Ctrl + Shift + F5), `tapKey v` (V), `tapKey V` (Shift + V).
- `LABEL` is an identifier marking some lines of the macro. When a string is encountered in a context of an address, UHK looks for a command beginning by `<the string>:` and returns its addres (index). If the same label is present multiple times, the next one w.r.t. currently processed command is returned.
- `ADDRESS` addresses allow jumping between macro instructions. Every action or command has its own address, numbered from zero. Formally, address is either a `INT` or a string which denotes label identifier. Every action consumes at least one address. (Except for command action, exactly one.) Every command (non-empty line of command action) consumes one address. E.g., `goTo 0` (go to beginning), `goTo ($currentAddress-1)` (go to the previous command), `goTo $currentAddress` (active waiting), `goTo default` (go to a line which begins by `default: ...`).

### Navigation modes:

UHK modules feature four navigation modes, which are mapped by layer and module. This mapping can be changed by the `set module.MODULEID.navigationMode.LAYERID_BASIC NAVIGATION_MODE` command.

- **Cursor mode** - in this mode, modules control mouse movement. Default mode for all modules except keycluster's trackball.
- **Scroll mode** - in this mode, the module can be used to scroll. Default mode for mod layer. This means that apart from layer switching, your layer switch key also makes your right-hand module act as a comfortable scroll wheel. Sensitivity is controlled by the `scrollSpeedDivisor` value.
- **Caret mode** - in this mode, module produces arrow key taps. This can be used to move comfortably in a text editor, since in this mode, the cursor is also locked to one of the two directions, preventing unwanted line changes. Sensitivity is controlled by `caretSpeedDivisor`, `axisLockStrengthFirstTick`, and `axisLockStrength`.
- **Media mode** - in this mode, up/down directions control volume (via media key scancodes), while horizontal play/pause and switch to the next track. At the moment, this mode is not enabled by default on any layer. Sensitivity is shared with the caret mode.
- **Zoom mode pc / mac** - in this mode, `Ctrl +`/`Ctrl -` or `Gui +`/`Gui -` shortcuts are produced.
- **Zoom mode** - This mode serves specifically to implement the touchpad pinch zoom gesture. It alternates actions of zoomPc and zoomMac modes. Can be customized via `set module.touchpad.pinchZoomMode NAVIGATION_MODE`.

Caret and media modes can be customized by `set navigationModeAction` command.

### Modifier layers:

Modifier layers are meant to allow easy overriding of modifier scancodes. If you bind an action there, it will be activated from the base layer when the corresponding modifier is pressed. E.g., allowing different scancodes for shifted keys compared to non-shifted keys. As such, they are not really layers.

These layers work through an elaborate setup of positive and negative sticky layer masks.

here are some queries and the correct responses that were generated (these are examples):
Query: "When I long press 1, the keyboard sends F1, but if I tap it quickly, it sends 1."

Response:
create a new macro and bind it to 1 on your keymap

Within the macro, create a single command with the following code:
```
ifPrimary final tapKey 1
holdKey f1
```

Save the command to the macro and bind the macro to the key to start it.

Here is another example.

Query: I want a script that emulate a mouse jiggler that loops indefinitely moving the mouse slightly and then stops, it should also update the LED light on the keyboard to show that it's running.

Response:
Create the following macro and bind it to a key.

The macro is composed of multiple parts:

Create the command:
```
setLedTxt 1000 "srt"
setVar stopJiggler 0
if ($jigglerActive) break
setVar jigglerActive 1
loop:
```

Create Mouse action:
Move pointer by 1px rightward (this is done in the GUI, it's not codified like a command)

Create Mouse action:
Move pointer by 1px leftward (this is done in the GUI, it's not codified like a command)

Finally, create another command:
```
delayUntil 5000
setLedTxt 1000 "jig"

if ($stopJiggler) {
    setVar stopJiggler 0
    setVar jigglerActive 0
    break
}
goTo loop
```

You should also declare `jigglerActive` variable upon keyboard initialization (or when the keyboard is saved), you do this using a special macro name that you create called `$onInit`

within that special macro, you define a command like so:
setVar jigglerActive 0



How can I create a macro on my UHK so that pressing Alt and then Tab, and continuing to hold Alt, changes the function of the D key to Delete? The D key should revert to its normal function when Alt is released.

I want to avoid creating an Alt layer that maps D to delete because A) there is no quick way to copy the base layer mapping to another layer (you can only duplicate a keymap); B) I want to preserve the original Alt+D for other applications (meaning I don’t want Alt+D to become Alt+Delete all the time).

answer:
```
pressKey iLA
ifShortcut noConsume tab set keymapAction.base.81 keystroke delete
delayUntilRelease
set keymapAction.base.81 keystroke d
releaseKey LA
```

User
query: how do i create the ability to record and stop a macro with shift + bind, and pressing the bind key again replays the macro:

answer:
```
ifShift recordMacro $thisKeyId
ifNotShift playMacro $thisKeyId
```

here is another gaming oriented script:

```
holdKey iLS
ifNotShift ifNotInterrupted ifNotPlaytime 500 {
    pressKey iLS
    setVar shiftHeld 1
    while $shiftHeld delayUntil 10
}
else {
    setVar shiftHeld 0
}
```
this is used in cs go when the player doesnt want to hold shift all the time to walk but still have control to hold it down with their pinky and let go as normal, a quick tap sustains the shift (walking movement) .. this is a good use case for this macro
