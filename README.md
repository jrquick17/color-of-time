## Synopsis
 
[See a demo here](https://www.color-of-time.jrquick.com)

## Installation

##### Bower
###### Install
```bash
bower install color-of-time --save
```

###### Add javascript files
```html
<script src="bower_components/color-of-time/dist/color-of-time.min.js"></script>
```


##### NPM
###### Install
```bash
npm install color-of-time --save
```

###### Add javascript files
```html
<script src="node_modules/color-of-time/dist/color-of-time.min.js"></script>
```


## Code Example

##### Inject
```angularjs
angular.module('app', [
    'color-of-time'
]);
```

##### Make background color change based on the time
```html
<body data-ng-app="color-of-time">
    <div color-of-time>
        <!-- More code -->
     </div>
</body>
```

##### Make font change color based on time
```html
<color-of-time properties="'color'">
    Color Of Time
</color-of-time>
```

##### Multiple properties
```html
<color-of-time properties="'fill,color'">
    <i class="icon github"/>
    <p>
        SEE THE CODE!
    </p>
</div>
```

##### As an attribute
```html
<div class="color"
     color-of-time
     increment="24"
     skip="60*60*1"
     properties="'color'">
    Color Of Time
</div>
```

## Options
* **increment** (Default: 1): _The number of seconds to skip ahead._
* **rate** (Default: 1000): _Check every X number of milliseconds._
* **skip** (Default: 0): _The number of seconds to skip ahead._
* **properties** (Default: 'background-color'): _The css attributes to apply the color too (separate multiple properties with a comma)._

## Tests

I know, I know. I will get to it _eventually_.

## Contributors

I currently maintain this project alone, you can find more of my projects and contact me on [my website](https://www.jrquick.com). If you would like to be a contributor then please do!

## License

MIT License

>Copyright (c) 2018 Jeremy Quick

>Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

>The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Upcoming

Give me some ideas and I just may work on them!