# Angular 4 (With TypeScript)

# Table of Contents
[toc]

## I. Introduction

### A. Preliminary Notes

1.  Angular 4 (*Ng4*) is a JavaScript framework that allows us to easily create single-page applications. This outline assumes the reader already is familiar with the concept of single-page applications, but, in brief, it is an approach to web design where routing and rendering of pages is handled by the web client, rather than in the back end. This eliminates the need for AJAX requests to the back end, which greatly enhances performance. Of course, AJAX requests are made, but only when necessary to obtain new data, and they are handled asynchronously.

2. Angular 2 got rid of default two-way data binding, allowing it to be faster and more scalable. It is considerably different than Angular and reflects many elements present in ReactJS. Ng4 has recently come out and, while adding some functionality, is basically a continuation of Angular 2. This outline is based on an original outline made for Angular 2 and is being updated, so references to Angular 2 will be replaced over time with Ng4.

3. Angular 2 was a significant break from Angular 1. In contrast, Angular 4 is merely an enhancement of Angular 2 and considered just a non-breaking version upgrade of Angular 2. Either may be referred to now simply as *Angular*.

4.  Setup of an Ng4 project can be a major task, given the need to configure TypeScript and Webpack. We will assume setup has been taken care of throughout this outline, until [Section X](#webpack), where we discuss setup, as well as use of the Angular CLI.

5. Ng4 was designed to be used with TypeScript, a Microsoft-designed version of Javascript. The final section of this outline, [Section XI](#typescript), is an introduction to TypeScript.

### B. One Interesting Thing
1. The **safe-navigation operator** (sometimes referred to as the "Elvis" operator) prevents an error from being thrown if a we try to obtain a property of a null/undefined object. It takes the form of a question mark immediately after the object name. For example:
    ```html
    <!-- if client is not defined when evaluated, big error -->
    <h1>His name is {{client.name}}.</h1>
    
    <!-- if client is not defined when evaluated, no error -->
    <!-- simply leaves a blank space -->
    <h1>His name is {{client?.name}}.</h1>
    ```
### C. Basic Structure of the Application
1.  When we create the application, we will normally have, in addition to a variety of configuration files, a folder named something along the lines of **src**. This folder will typically contain two folders, with names such as **app** and **assets**. The *app* folder will contain the application (components, services, pipes, *etc.*, whereas the *assets* folder will typically contain fonts, css styling, and images.

2.  In addition to the directories described above, the *src* directory will contain the **index.html** file, which will be the single page of our single-page application. It is a very basic HTML setup file, and should contain in the body a single **component directive** (\<app-root> below), so that the entire file might look something like:
    ```html
    <!doctype html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>AppName</title>
            <base href="/">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="icon" type="image/x-icon" href="favicon.ico">
        </head>
        <body>
            <app-root>Loading...</app-root>
        </body>
    </html>
    ```
    
3.  In addition to the *index.html* file, there will also be a typescript file with a name such as **main.ts** or **bootstrap.ts**. This file is what is given to the *webpack.config* (or *angular-cli.json*) file as the starting point. It imports the AppModule and runs a setup method on the *platformBrowserDynamic()* method to get everything going, and the instruction to look for this file first will be contained in the configuration file for webpack. The **app.module.ts** file creates our application module. A few of the most important things it does are:
  
    a. imports various modules from Ng4 or other dependencies,

    b. declares components, directives, and pipes in a **declarations** array,
    
    c. adds modules necessary for the app in the **imports** array. This includes things like *BrowserModule* (required if running in the browser), *FormsModule*
    
    c.  declares the fundamental component in the **bootstrap** object.
    
    A very simple *app.module.ts* file might look like:
    
    ```javascript
    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    import { FormsModule } from '@angular/forms';
    import { HttpModule } from '@angular/http';
    import { AppComponent } from './app.component';

    @NgModule({
        declarations: [
            AppComponent
        ],
        imports: [
            BrowserModule,
            FormsModule,
            HttpModule
        ],
        providers: [],
        bootstrap: [
            AppComponent
        ]
    })

    export class AppModule { }
    ```
    d.  As we will learn in the next section, the bootstrap component *AppComponent* will have a **selector** of *app-root*, which is how we refer to the component when it is placed into the *index.html* file.
    
## II. Ng4 Components

### A. Components Generally

1. A **component** is a special type of directive (along with attribute directives and structural directives). A component is a directive thqt is associated with a view. They are the **key feature** of Angular, as all of the app is built out of components.


#### Creating a Component

1. The following is a basic Ng4 component:
    ```javascript
	import { Component } from '@anglar/core';
		
	@Component({
        selector: 'app-root',
        template: `Goodbye, Cruel World!` //or templateUrl: './file.html',
        styleUrls: ['src/css/component.css'] //or styles: []
	})
	
    export class AppComponent {
        name = 'Jordan';
    }
    ```
    a. In the above example, the *@Component* is a **decorator**. Basically, it takes the given object and wraps it with some functionality to create (in this case) a Component. Notice that it must be imported from *@angular/core*.
    
    b. In the above component, **selector** is what will go into the tag in the HTML to indicate where the component (*i.e.*, a directive) is to be inserted, **template** is the html string that is placed there, and **styleUrls** (or **styles**) allows us to incorporate css into our particular component. Note that the template could contain interpolated values string by using ES6 template literal syntax.
	
2. The *selector* can be a \<tag>, or it can be an *attribute* or *class*.  In such case, our code might look like:
    ```javascript
    import { Component } from '@anglar/core';
		
    @Component({
        selector: 'app-root',
        //or, for a class: '.app-root',
        //or, for an attribute: '[app-root]'
        template: `Goodbye, Cruel World!`,
    })
    ```
    **Note**: the selector cannot be an element id.

3.  Each component **must have one, and only one, template**. The template can be an HTML string, or can be a template contained in an HTML file, in which case the key name will be **templateUrl**.

4. Another key in the @Component decorator object is **styles**, which has a value of an array of style strings (or template literals if we want multi-ine), or **styleUrls**, which contains an array of paths to style pages. In either case, the value is an array, of strings or Urls. This is a prominent feature of Ng4: **view encapsulation**, which allows us to target styling to specific views. It does this by application of a **Shadow DOM**, running a separate DOM for each component behind the scenes. However, this is not supported by all browsers, so Ng4 emulates this by adding its own attribute to each element of the component template, as so:
    ```html
    <div _nghost-pax-1>
        <component _nghost-pax-1>
            <h1 _ngcontent-pax-1>Hello!</h1>
        </component>
    </div>
    ```
    **Note**: In the *@Component* decorator, we can control the level of encapsulation of CSS styles. The **encapsulation** propeerty can take three values, as follows (requires import of *ViewEncapsulation* from *@angular/core*:
    
    a. **ViewEncapsulation.None**: No encapsulation, and CSS styles in this component will be applied globally,
    
    b. **ViewEncapsulation.Native**: Only use the ShadowDOM, without the custom attributes - will only work on conforming browsers;
    
    c. **ViewEncapsulation.Emulated**: This is the default. Full encapsulation via the ShadowDOM and custom attributes.
    
**Highly recommend keeping the default encapsulation and andding global styles through a styles.css file**.
    
5.  Looking at our initial example of the component, note that we are exporting a class, *AppComponent*. In each case where we insert our component, we are creating **a new instance** of this class. We can have properties and methods in our class; of course, behind the screen it is all converted to JavaScript prototypes.

#### Local References on Component Elements
1. A **local reference** can be placed on any html element in a component template, with the following syntax:
    ```html
    <input type="text" #inputField \>
    ```
    where "inputField" is the name we assign (no quotes);
    
    Note that this is a reference to the **element**, not to the value in the element, but to the entire element with all its properties.
    
2. The reference can be used anywhere in our template, **but only in the template**, not in the component class Typescript code.

3. The element can have all sorts of attributes that we can access from the element as properties of the element object.  Of course, a very important one in the context of an input element is its *value*.

4. So, instead of using 2-way data binding to get data back to a variable in the component class, we can, upon our click, pass in the input element as the parameter of an event handler, and then pull off the value in the component Typescrpt. Or, we could pass in the value, as follows:
    ```html
    <button
        class="btn btn-primary"
        (click)="onInput((inputField.value)"
    >
        Add Name
    </button>
    ```

#### Accessing the Template Element Directly with @ViewChild
1. In the above scenario, we are simpler than 2-way binding, but are still having to use event emitters to pass the input field into the component class. We can make this unnecessary by using the **@ViewChild** decorator.

2. To access any element in the template directly from our TypeScript code, do the following:

    a. add a reference to the element, as discussed in the previous section.
    
    b. in the *.component.ts* file, create a variable, which will take a type of **ElementRef**.
    
    c. import in *ViewChild* and *ElementRef* from *@angular/core*.
    
    d. place the *@ViewChild* decorator on the variable created in step b, and pass into the decorator the reference name of the element. 

3. Through the variable, we now have access to the template element.  Of course, the variable is the *ElementRef* reference. To get direct access, we can get the **nativeElement** property of the reference. From that, we can get the value.

4. Before is some sample code. Note that one input field will be using an event emitter to pass the reference, the second input field will not use an event emitter, but will be accessed throught the *@ViewChild* decorator.
    ```html
    <div>
    <!--component.html-->
        <p>Add new Servers!</p>
            <label>Server Name</label>
            <input type="text" #serverNameInput>

            <label>Server Content</label>
            <input type="text" #SCInput>
            <br>
            <button (click)="onAddServer(serverNameInput)">
                Add Server
            </button>
    </div>
    ```
    ```javascript
    // component.ts
    import { Component, EventEmitter,
        Output, ViewChild, ElementRef } from '@angular/core';

    @Component({
        selector: 'app-cockpit',
        templateUrl: './cockpit.component.html',
        styleUrls: ['./cockpit.component.css']
    })
    
    export class CockpitComponent implements OnInit {
        @Output('sC') serverCreated = new EventEmitter<{
            serverName: string, 
            serverContent: string
        }>();

        @ViewChild('SCInput') SCInput: ElementRef;

        onAddServer(nameInput: HTMLInputElement) {
            this.serverCreated.emit({
                serverName: nameInput.value,
                serverContent: this.SCInput.nativeElement.value
            });
        }
    }
    ```

### B. Creating a Model Type
1. TypeScript allows us to apply strict typing to our JavaScript. While that does, of course, apply to numbers, strings, and other "built-in" types, we can also define our own types.

2. As an example, we will have a component responsible for creating a list of recipes. We want each recipe to follow a set pattern, with a name, a description, and a photo of the dish (actually, the path to the photo). So, we can create a **model**, or class of our recipe, as follows:
    ```javascript
    // recipe.model.ts
    export class Recipe {
        public name: string;
        public description: string;
        public imagePath: string;

        constructor(
            name: string,
            desc: string,
            imagePath: string
        ) {
            this.name = name;
            this.description = desc;
            this.imagePath = imagePath;
        }
    }
    ```
    Of course, this is all just a constructor function, and we could call this with the *new* keyword.
    
3. In our *recipeList.ts* file, we will import the Recipe class, and then use it to define our array, so that TypeScript will throw an error if we try to add any nonconforming items to our list of recipes:
    ```javascript
    import { Component, OnInit } from '@angular/core';
    import { Recipe } from '../recipe.model';

    . . . 

    export class RecipeListComponent {
        constructor() {}

	recipes: Recipe[] = [];

    }
    ```

### C. Nesting Components

1. If we wish to place a component into another component, we can easily do so, as follows:

    a. write the component to be nested, with an export of the component class.
	
    b. import the class from the file into the *app.module.ts* file, as follows:
    ```javascript
    import { MyComponent } from './my_component'
    ```
    c. include the component as a directive in the template of the outer component.
	
2. **NOTE:** In the release candidate version, we would also include in the *@Component* object the key *directives*, which would have as its value an array of all directives (including components) needed in the outer component. This has been replaced, by the requirement that the *app.module.ts* file get a list of all components used in the *declarations* property of the *@NgModule* decorator,

3. Of course, a component can be included multiple times into a parent component. Each time represents a **separate instance** of the class. For example, if we assigned a variable a random value in our component class, and included the component twice, they could show different values.

4. **ng-content**: Imagine a scenario where we have a parent component, with a child component inserted. Between the tags (for example, \<child-element>\</child-element>) we have some content:
    ```javascript
    <child-element>
        <div>
            Loading . . .
        </div>
    </child-element>
    ```
    The normal behaviour is for Ng4 to strip out the content between the child-element tags.  This can be overridden by using the **\<ng-content>** directive, which instructs Ng4 to render the contained matter. So, if our child component is really just a container for other HTML, we can insert the contents. Note that the content is stripped out of its component, so that component's styling will no longer apply.

### D. Passing Data Among Components
1. While it is great to be able to split up our app into reusable components, it will not work if we are not able to get the components to share data. In this section, we look at ways to pass data from a parent to a child (the much easier task), and then to pass data from a child component to an ancestor, or to a sibling component.

2. Compare these tasks with the concepts of *property binding* and *event binding*. Those served to connect the view with the component class. Here, we are trying to communicate between different components.


#### Passing Data to a Child Component

1. When one has a child component nested into a parent component, data can be passed from the parent to the child by including the data in the child component tag as a property, with brackets, which binds the property to the expreession assigned to it. For example, in the following, the parent component has a variable that holds an array of element objects:
    ```html
    <!--This is the template of the parent-->
    <div class="container">
        <app-cockpit></app-cockpit>
        <hr>
        <div class="row">
            <div class="col-xs-12">
            <!--This is where it starts-->
                <app-element *ngFor="let serverElement of serverElements"
                    [element]="serverElement"></app-element>
            </div>
        </div>
    </div>
    ```
    The above example is obscured a bit by the listing functionality. Note that for each array item as we iterate, we assign to **element** the item from the serverElements array.

2. Next, we stop by the child component, the one with the selector \<app-element>. This component will have a variable *element*, the one that was bound to *serverElement* throught its tag. However, **in order to make that variable available to be bound, we must subject it to the @Input decorator.**  By default, all properties of a component are accessible only inside the component. In order to do this, we must import the **@Input** decorator from *@angular/core*. Our component may look as follows:
    ```javascript
    import { Component, Input } from '@angular/core';

    @Component({
        selector: 'app-element',
        templateUrl: './element.component.html',
        styleUrls: ['./element.component.css']
    })

    export class ElementComponent implements OnInit {
        @Input() element: {type: string, name: string, content: string};
    }
    ```
    An alternative to using the @Input decorator is to include the bound variables in an array for the @Component **input** property, as follows:
    ```javascript
    import { Component, OnInit, Input } from '@angular/core';

    @Component({
        selector: 'app-element',
        templateUrl: './element.component.html',
        styleUrls: ['./element.component.css'],
        inputs: ['element']
    })

    export class ElementComponent implements OnInit {
        element: {type: string, name: string, content: string};
    }
    ```
3. The next step is to use the *element* property in the html of the component:
    ```html
    <div *ngIf="['server', 'blueprint'].includes(element.type)"
        class="panel panel-default">
        <div class="panel-heading">{{ element.name }}</div>
        <div class="panel-body">
            <p>
                <strong 
                    *ngIf="element.type === 'server'" 
                    style="color: red">{{ element.content }}
                </strong>
                <em *ngIf="element.type === 'blueprint'">
                    {{ element.content }}
                </em>
            </p>
        </div>
    </div>
    ```
 
 4. An **alias** can be used in the child component to bind as one name in the parent, but using another name in the child component.  This takes the form in the *inputs* value as **['insideValue:outsideValue']**. Extending the above example:
    ```javascript
    import { Component, OnInit, Input } from '@angular/core';

    @Component({
        selector: 'app-element',
        templateUrl: './element.component.html',
        styleUrls: ['./element.component.css'],
        inputs: ['element:testName']
    })

    export class ElementComponent implements OnInit {
        element: {type: string, name: string, content: string};
    }
    ```
    The variable *testName* would be used in the parent element to assign the parent's values to the variable, but the name *element* would be used in the child component, including its html template.
    
5. When using the *@Input* decorator, if we wish to alias the variable, we place the "parent-name" in parens, as a parameter to the decorator, as follows:
    ```javascript
    import { Component, OnInit, Input } from '@angular/core';

    @Component({
        selector: 'app-element',
        templateUrl: './element.component.html',
        styleUrls: ['./element.component.css'],
    })

    export class ElementComponent implements OnInit {
        @Input ('z') element: {type: string, name: string, content: string}
    }
    ```

#### Passing Data to a Parent Component

1. Just as with React, one cannot really pass data along from a child to a parent element.  The problem is that the parent contains the reference to the child in the form of an HTML tag, through which the data can be passed; however, the child has no reference back to the parent.  Thus, **data is not really passed up the DOM in the same way that it is passed down, but is transmitted, using event emitters.**

2. We start with the following situation, which is in the *02SampleApp* in the directory.  In that app, we have a parent level component, which maintains a property that is an array, called *serverElements*. The template of this component contains a child component, known as *cockpit*.  In the child component, we have a form with two input text fields, and an input button. The parent component has methods to add new items to the *serverElements* array, but how do we pass these items up from the child component to the parent component?

3. We will solve the above problem with the following steps:

    a. first, fill in the text fields on the child component, then click the submit button.
    
    b. The submit button will have an event listener waiting for the click. Upon detecting the click, a method of the child component will be executed. This method will emit an event containing the form info.
    
    c. The instance of the child component that is in the parent template will contain an event listener waiting for our custom event. Upon detecting the event, it will execute a method contained in the parent component, passing in the data as a parameter.

4. Below, we go through the above steps in greater detail, pointing out syntax considerations.

    a. the first step is already familiar from our discussion on event binding. Note that the code below does not use any ngForms functionality:
    ```html
    <!--child.component.html-->
    <div>
        <label>Field1</label>
        <input type="text" [(ngModel)]="field1Info">
        <label>Field2</label>
        <input type="text" [(ngModel)]="field2Info">
        <br>
        <button (click)="onSubmitInfo()">Submit</button>
    </div>
    ```
    b. Next, we go to the child component class definition. From the following code, note the steps we must take:

    i. import the **Output decorator** from @angular/core;
    
    ii. import the **EventEmitter** component from @angular/core;
    
    ii. apply the **@Output() decorator to each instance of EventEmitter we create.
    
    iii. in our executing method, fire the EventEmiiter with the method **emit()**, which takes as a parameter the data to accompany the broadcast.
    ```javascript
    //child.component.ts
    import { Component, EventEmitter, Output } from '@angular/core';

    @Component({
        selector: 'app-child',
        templateUrl: './child.component.html',
        styleUrls: ['./child.component.css']
    })

    export class ChildComponent {

        @Output() infoSubmitted = new EventEmitter<{
            firstInfo: string, 
            secondInfo: string
        }>();

	field1Info = '';
	field2Info = '';

	onSubmitInfo() {
            this.infoSubmitted.emit({
                newInfo1: this.field1Info,
                newInfo2: this.field2Info
            });
        }
    }
    ```
    Don't get spooked by the  \<  > following the Event Emitter - it is just typing.  Also, **don't forget to include the ( ) necessary to actually create the EventEmitter object.**

    c. In the template of the parent component, we will have one or more instances of our child component, and inside them, we should have as an attribut an event listener.
    ```html
    <!--parent.component.html-->
    <div>
        <app-child (infoSubmitted)="onNewInfo($event)">
        </app-child>
        <hr>
        <!--the portion below is displaying an array of submitted items-->
        <div class="row">
		<div class="col-xs-12">
			<app-element *ngFor="let serverElement of serverElements"
			[srvElement]="serverElement"></app-element>
		</div>
        </div>
    </div>
    ```
    **Important Syntax**: The parameter of the method called by the event listener must be named **$event**. This is a hard-coded Angular4 thing.

    d. Finally, in our parent component class definition, we can work with the data received. In the following, we add it onto our array of objects.
    ```javascript
    // parent.compoennt.ts
    import { Component } from '@angular/core';

    @Component({
        selector: 'app-parent',
        templateUrl: './parent.component.html',
        styleUrls: ['./parent.component.css']
    })
    export class ParentComponent {
        infoElements = [ ];

        onNewInfo(infoObject: {info1: string, info2: string}) {
            this.infoElements.push({
                type: 'info',
                name: infoObject.info1,
                content: infoObject.info2
            });
        }
    }
    ```
5. Just like with the *@Input( )* decorator, we can insert a parameter into the *@Output( )* decorator which will provide an alias name by which the event will be broadcast. So, if our child component creates a new EventEmitter that we assign to the variable "jordanEventEmitter", we can pass it the string "cjb" to emit, and this is what we will need to tell the listeners to listen for:
    ```javascript
    // child.coponent.ts
    @Output('cjb') jordansEventEmitter = new EventEmitter<string>();
    
    onSomeEvent() {
        this.jordansEventEmitter.emit('okay');
    }
    ```
    ```html
    <!-- parent.html -->
    <app-child (cjb)="someParentMethod($event)"></app-child>
    ```
#### Sharing Data Among Non Parent-Child Components
1. It is possible to share data between sibling components, but it has to be done indirectly, by sending data up to a common ancestor, and then back down to the sibling.

2. The above approach can get very unwieldy, so it is often advisable to share data through **services**. See the section on services for details on creating singleton services through which data can be shared among components.

### E. Databinding
#### Introduction
1. Databinding is a key element of both Angular Classic and Ng4, which allows **communication** between the template being viewed and the component's logic. Altough the terminology surrounding it is sometimes opaque, the concept is very simple. For example, imagine a page with a button and text input. We want the user to enter the name of a city, then have our application get from a weather service the temperature in the city, which will display on the screen.

    a. First, we will need a way to communicate the name of the city, as well as the button-click to the component, so it can fire off the AJAX request to get the weather. This will be done by *event-binding*.
    
    b. Then, when the data has been returned and is available, we want the number to appear on the page. We would want to use *string inteerpolation* to communicate this info to the DOM. We can also use *property binding* to communicate out to the DOM.
    
    c. Finally, we may sometimes wish to have two-way communication between the DOM and the component instance. This is accomplished with *two-way data binding.* This was the big thing in Angular Classic, but really is overkill most of the time, and has been abandoned as the default data-binding in Ng4.

2. There are several different methods of databinding, which are discussed below:

    a. **string interpolation**, by using the double braces (*{{ data }}*),

    b. **Property Binding**, applies when data is flowing into an element (*i.e.*, an HTML element, a directive, or a custom component). We can bind to DOM properties (*e.g.*, [src]), or properties of directives (*e.g.*, [ngClass]), or component properties (somewhat redundant, since components are directives). For example:
    ```html
    <button [disabled]="boolean expression"></button>
    ```
    c. **Event binding**, applies when we are getting something from the element, generally an event, to which we assign a handler. For example:
    ```html
    <button (click)="expression handling the event"></button>
    ```
	
    d. **Two-way data binding**: This was one of the most important features of Angular Classic. However, Ng4 does not have 2-way data binding by default. The syntax is:
    ```
    <input [(ngModel)]="bound model object">
    ```

    This makes sense, if we think of the brackets as data flowing into the DOM, and parens as data flowing out of the DOM. So, as the user types in the above input field, the value of the *name* variable is getting constantly updated.  And if *name* gets updated anywhere else, the text in the input field gets updated

#### String Interpolation

1. The template can evaluate expressions, using the traditional {{ }} syntax.  In addition, data can be passed into the object in the exported class definition, for example:
    ```javascript
    import {Component} from 'angular2/core'
        @Component({
            selector: 'my-component',
            template: `
                Hello, I'm {{name}}!
            `
        })

        export class MyComponent {
            name = 'Jordan';
        }
    ```
    **Note**: the interpolation ${ } is still available within the template literal; however, it cannot be used for the values passed in by the export object.
    
    **Note**: the only requirements regarding the contents of the double braces are:
    
    a. it must resolve to a *string* (and it will recast numbers).
    
    b. it can only take inline expressions, so no *if* blocks, *etc.*  However, it can take **ternary expressions**, so they are often used.
	
2. The scope of the interpolation is **is only the component.**. So, as a simple example, if we wanted to use a Math method in our inteerpolation, we would have to do something along the lines of:
    ```javascript
    //in the component
    export class MyComponent {
        pow = Math.pow;
    }
    ```
    ```html
    <!--in the html -->
    <h2>
        {{pow(2, 5)}} //shows "32"
    </h2>
    ```
	
3. **A Side Note**: In an \<input> tag, one can identify an input variable and bind it to the element with a hash-tag(#), like so:
    ```javascript
    template: `	
        <input type="text" #number (keyup) = null>
    `
    ```
	In the above code, the input number gets bound to the variable *#number*. The input requires an event to make anything happen, even a simple refresh. So, we add the event (in this case *keyup* to the input tag. The null value will do nothing, except force a rerendering.

#### Property Binding

1. For property binding to DOM properties, we simply use the properties that already are given us by the DOM, enclose them in brackets, and set them equal to some property of the component. For example:
    ```html
    <button [disabled]="allowNewServer">Add Server</button>
    ```
    If the ""allowNewServer" variable is set in the component to *truthy*, then the button will be disabled; if *falsey*, then it will be enabled.
    
    **Note**: The variable could also be referring to a method of the component object, in which case it would need "()" to cause it to execute and return a truthy/falsey value.
    
2. Sometimes, we can get the same result with either property binding or string interpolation. For example, if we have a method in our component "generateText()", we could include the text it generates as follows, using string interpolation:
    ```html
    <p>{{generateText()}}</p>
    ```
    In addition, we could bind the *innerText* property of the \<p>\</p> tag as follows:
    ```html
    <p [innerText]="generateText()"></p>
    ```
3. **Important Syntax Note**: In the property binding discussion, we assign a value to a property as follows:
    ```html
    <button [disabled]="allowNewServer()">
    ```
    Note that the quotation marks obviously do not indicate a string; rather, they indicate a statement that must be evaluated. For example, if we had:
    ```html
    <p [innerText]="2 + 2"></p>
    ```
    this would show the text "4". The quotation marks work just like the double braces (and their scope is the component, not the global scope). In addition, **double braces will not work** in this context; for example, the following would not work:
    ```html
    <p [innerText]={{generateText()}}></p>
    ```
4. For directive and component properties, we can add custom bindings with the *@Input()* decorator, which is placed in front of the name of the property you want to make bindable:
    ```javascript
    @Input() propName: string;
    ```
5. Remember that the following must occur:

    a. In the component where we are binding, we must import *Input* from *@angular/core*,
	
    b. In the export class section of the component, we must include the @Input statement, as follows:
    ```javascript
    export class PropertyBindingComponent {
        @Input() result: number = 0;
    }
    ```
    c. In the *app.module()* component, we must import the component, and must include it in our declarations.

    **Example**: We start with the following:
    ```html
    <input type="text" value={{name}} class="{{'red'}}"/> 
    ```
    This is an example of *string interpolation*.  The value attribute belongs to the standard HTML \<input> element tag, and it is assigned a value obtained by evaluating the variable enclosed in {{ }}. Compare that to:
    ```html
    <input type="text" [value]="name" class="{{'red'}}"/>
    ```
    This is an example of *property binding*. The *[value]* is not the \<input> tag's value, it is an Angular property assigned to all input tags. For this Angular property, there is no use of {{}}, but whatever is in quotations is evaluated.  Thus:
    ```html
    <!-- value is the value assigned to name -->
    <input type='text' [value]="name" />

    <!-- //value is 8 -->
    <input type='text' [value]="4 + 4" /> 

    <!-- value is name, if there is one, or "Bazoom" -->
    <input type='text' [value]="name ? name : 'Bazoom'" />
    ``` 
    Similarly, we can bind to a property not of an HTML element, but of an Angular directive.  Compare the following with th previous code samples:
    ```html
    <input type='text' [value]='name' [ngClass]="'red'"/>
    ```	
    This works in a similar manner, except that ngClass is a directive. One can differentiate between a Directive and an Element by the 'ng' prefix.

#### Event Binding

1. Event binding is generally reflected by parentheses, showing that something is flowing out of our element. Typically, the event will call a method of our component class to do something upon the occurence of the event.

    For example, a button may have the following:
    ```html
    <button (click)="myClickHandler()"></button>
    ```
    **Don't forget the parens!**
    
    We simply place the name of the event in parens (the above could have been "mouseover", "dblclick", etc.), followed by an expression to evaluate within quotation marks, as with the property binding.

2. To see the list of events available for an element, we can *console.log* the element, or google "[element name] events".

3. Of course, we will often wish to pass some data into the method we call via a particular event. For example, when the user types in his name and clicks the "Sign in" button, we need to pass that username back to the component so that it can do the authentication.

4. The easiest way to access this data is by passing in as a parameter to the event handler **$event**, a reserved keyword representing the event object. This object will contain a great deal of information, but what we will want, 99% of the time is the **target.value** property.


::: danger
For directive and component properties, we can add custom binding with the *@Output()* decorator, which is placed in front of the name of the property to which we wish to bind:

		@Output() eventName = new EventEmitter();

2.	The following is an example of an event-binding for a native DOM event (such as a mouse click or mouseover):

	a.	In the component, we write a method to handle the mouse-click, our event.  Notice also the designation of the event in parens, along with the binding to the onClicked() method:
	
		import { Component } from '@angular/core';

		@Component({
			selector: 'fa-event-binding',
			template: `
				<button (click)="onClicked()">Click me!</button>
			`,
			styles: []
		})
		export class EventBindingComponent {
			onClicked() {
				alert('It worked!');
			}
		}

	b.	In the app.module.ts file, we have to import the EventBindingComponent, and then include it in the declarations for the @ngModule decorator.
	

3.	**Custom Event Bindings**: We can also set up events that will allow communication between components.  The following is a simple example:

	a.  First, we set up a component, we will call *event.component.ts*, with a buttong that assigns the event "onClicked" to the click on the button.
	
		import { Component } from '@angular/core';

		@Component({
			selector: 'fa-event-binding',
			template: `
				<button (click)="onClicked()">Click me!</button>
			`,
			styles: []
		})
		export class EventBindingComponent {
			onClicked() {
				alert("Bazoom!");
			}
		}
		
	b.	The above is just what we had for the DOM click event.  However, we can create a new **EventEmitter** by importing the EventEmitter property from *@angular/core*, and creating a new emitter, as follows:
	
		import { Component, EventEmitter, Output } from '@angular/core';

		@Component({
			selector: 'fa-event-binding',
			template: `
				<button (click)="onClicked()">Click me!</button>
			`,
			styles: []
		})
		export class EventBindingComponent {
			@Output() clicked = new EventEmitter<string>();

			onClicked() {
				this.clicked.emit('It works!');
			}
		}
	
	The Output property allows the emit() to be heard outside its home component.  So, by clicking on the button, we call the *onClicked()* method, which calls the new *clicked()* method, which emits the string "It works!");
	
	c.	In another component, we insert the "clicked" event (our custom event), as follows:
	
		<app-event-binding (clicked)="clackered($event)"></app-event-binding>
		
	So, when the *clicked* event emits, it will trigger the *clackered* method.  The parameter is the Angular2 designation of the content emitted with the event.
	
	**Note:** One can assign a name for use outside the home component for the event, by the following context:
	
			@Output('outsideName') insideName = new EventEmitter();

	This will make it so listeners in other components will respond only to the 'outsideName' event.

4.	An alternative to using the @Input and/or @Output decorators is to have an *input* and/or *output* property in the @Component decorator.   
:::

#### Two-Way Data Binding
1. **IMPORTANT NOTE**: In order to make use of 2-way data binding, one must import the FormsModule property from the *@angular/forms* module into the appModule, and include it into the *imports* property of the *@NgModule* decorator, as follows:

		import { NgModule } from '@angular/core';
		import { BrowserModule  } from '@angular/platform-browser';
		import { FormsModule } from '@angular/forms';
 
		import { AppComponent }   from './app.component';
 
		@NgModule({
    		declarations: [AppComponent],
    		imports: [BrowserModule, FormsModule],
    		bootstrap: [AppComponent]
		})
		export class AppModule {}

2. Once that is done, we can combine event-binding and property-binding in the following manner. Examine the example:
    ```html
    <input 
        type="text"
        class="form-control"
        [(ngModel)]="serverName"
    />
    <p>
        {{serverName}}
    </p>
    ```
    In the above example, placing the **ngModel** directive within the brackets and parens creates a **two-way binding** of the variable "serverName". So, when the input text is changed, the variable "serverName" is updated immediately and then the updated value is sent out to any place it is referred to, as in the string interpolation in the \<p> tag.
    
    **Note**: If, somewhere else, the value of serverName was modified, the value shown in the input box would itself get updated; *i.e.*, the change in the input field flows *from* the input box and *to* the input box.

### D. Lifecycle Hooks

1. Ng4 supports several **lifecycle hooks**. These are points at which we can set code to run; for example, upon the creation of a component, or upon any changes to the component. Maybe we would like, every time a certain page is rendered, to call to a weather API and get current waeather data to display on the page.

2. In order to use a lifecycle hook, we must import it from *@angular/core*, then we have to add it into our component via the keyword *implements*, as follows:
    ```javascript
    import { Component, OnInit } from '@angular/core';

    @Component({
        selector: 'app-element',
        templateUrl: './element.component.html',
        styleUrls: ['./element.component.css'],
    })

    export class ElementComponent implements OnInit {
    
        ngOnInit() {
            . . . do stuff here
        }
    }
    ```
    Note the use of **OnInit** in the import and implement, but of **ngOnInit** as a class method.

2. Lifecyle events are events that are fired throughout the lifecycle of the component. They include:

#### ngOnInit

1. **ngOnInit** is called on component initialization, before rendering, but **after** the first ngOnChanges call. It is only called once (upon initialization), whereas *ngOnChanges* is called on every change.

2. Because it occurs after the first *ngOnChanges*, and after the constructor, so it will have all properties set up and ready before it starts to act.

#### ngOnChanges

1. **ngOnChanges** is called immediately upon the creation of a new component, and is called whenever an input bound values change (*i.e.*, properties with the @Input decorator).

2. This is the only lifecycle hook that gets an argument, which is "changes: SimpleChanges". This is an object with *currentValue* and *previousValue* properties, as well as a boolean "firstChange". 
	
#### ngDoCheck
	
**ngDoCheck** is called during every Angular2 change dectection cycle, whether or not there has been a change. It can be used to check on things that Ng4's checking might not pick up.

#### ngAfterContentInit

**ngAfterContentInit** is called after content is inserted via the \<ng-content> directive.

#### ngAfterContentChecked

**ngAfterContentChecked** is called after every check of inserted content

#### ngAfterViewInit

**ngAfterViewInit** is called after component's view(s) are initialized (and child views)
	
#### ngAfterViewChecked

**ngAfterViewChecked** is called after every check of a component's view(s) (and child views)
	
#### ngOnDestroy

**ngOnDestroy**	is called just before the component is destroyed. This is a very important hook, allowing us to do clean-up work.


## III. Directives
### A. Introduction

1. Directives are instructions in the HTML code that tell Ng4 how to alter or manipulate the DOM at the point where the directive is encountered. It is imbedded into the HTML document in a tag. **Note that a component is one type of directive, *i.e.*, one with a template attached.**

2. Do not confuse directives with Angular properties. Both can have the [ ] syntax.  For example, [hidden] is an Angular property of the element, not a directive through which the element is addressed.


3. **NOTE**: The [ ] syntax is only expressing data-binding, it is **not** indicating a directive!

4. An **attribute directive** is a directive that is placed into an HTML tag as if it were an attribute of the tag.  See the *ngClass* example. Note that the bracket syntax only applies where input is necessary for the directive to work. Many directives just work, without evaluating input, and are notated without brackets:
    ```html
    <section ngControl>
        . . .
    </section
    ```

5. A **structural directive** is one that does not necessarily change the element to which it is attached, but affects the structure of the DOM. It has a syntax of:
    ```
    *ng[directive name]
    ```
    These include *\*ngFor*, which allows looping to create a list, and *\*ngIf*, which attaches an element to the DOM upon a condition. 

6. We will begin by examining several *built-in* directives that come packaged with Ng4 that are particularly useful. In addition, we will examine in the following section how to create our own directives.


### B. Built-In Angular Directives

1. Ng4 ships with many fewer built-in directives than Angular Classic. This is because the structure of Ng4 made many of these directives unnecessary.

#### *ngIf
1. This structural directive places a condition on the element.  If the condition evaluates to *truthy*, then the div (and its descendants) will be shown. If the condition evaluates to falsey, then it is not shown. **It is not merely invisible, but is not part of the DOM unless the condition evaluates to *truthy*.** In the following example, the second div will exist in the DOM only when the user types in a number greater than 10:
    ```html
    <section class='directive'>
        <h2>*ngIf</h2>
        <div>
            Enter a number higher than 10.
            <br />
            <input type="text" #number (keyup)="0" />
        </div>
        <div *ngIf="number.value > 10">
            Number is greater!
        </div>
    </section>
    ```
::: danger
The following feature (else clause for \*ngIf and \<ng-template>) is new with Ng4
:::
2. **Adding an *else* Condition**: One common scenario is that we have two alternative components and we want to show one or the other, depending on some condition. We can have the two, each with its own \*ngif statement. Alternatively, we can  s The following is an alternative to that approach:

    a. place the \*ngIf directive on the first component, with a semi-colon at the end of the condition, followed by the keyword **else** and the name of the alternative component.
    
    b. create the alternative component using the **\<ng-template>** directive, and assigning a name to the template snippet using the hash mark (**#**). For example:
    ```html
    <p *ngIf="shakespeare; else noShakespeare">Now is the winter . ..</p>
    <ng-template #noShakespeare>
        <p>A lover of Bach in Nantucket</p>
    </ng-template>
    ```
    Note the placement of the quotation marks around the entire condition and else condition.

#### ngSwitch

1. This structural directive allows us to check on the state of a particular variable, and then render accordingly. It functions much like a *switch* statement in plain JavaScript. Its syntax is very straightfoward, but does have multiple parts.
    ```html
    <div [ngSwitch]="value">			
        <p *ngSwitchCase="5">Value is 5</p>
        <p *ngSwitchCase="10">Value is 10</p>
        <p *ngSwitchCase="100">Value is 100</p>
        <p *ngSwitchDefault>Value is Default</p>
    </div>
    ```
    In the above snippet, note that **[ngSwitch]** designates the variable to be tested.  Then we have a number of possible templates to be inserted, each with the **\*ngSwitchCase** directive stating a condition (note the use of single equal signs), and **\*ngSwitchDefault** which gets chosen if no other template does. Note that the directive is wrapped in brackets, because it takes input, but the others are not, because they are not taking any input.

#### ngStyle

1. The **ngStyle** directive allows changing a discrete number of style properties without applying an entire class. For example:
    ```html
    <div [ngStyle]="{'background-color': getColor()}"></div>
    ```
    **Note**: The css properties containing hyphens must either become sad-camel-cased, or used within quotations (as in the above). For example, background-color becomes backgroundColor.
    
    **Note**: Between the outer, double quotes, we are executing Typescript code, so we can run methods from the component instance, such as *getColor( )*.
    
    **Note**: The brackets are not part of the directive name, they are only binding the directive to the component.

2. For single style properties, we can use the following syntax:
    ```html
    <!-- shortcut syntax for one property -->
    <div [style.color]="'navy'">Hello!</div>
    ```
    Notice that the attribute, 'navy', is in quotes within the outer quotes.



#### ngClass

1.  The ngClass directive is used to present one or more classes that will be added if their associated expression evaluates to true. It takes an object, the keys of which are the class names, and the values are conditions that evaluate to truthy or falsey, (and added to the tag if truthy).

2.  The ngClass directive is shown in the following example, as well as a shortcut syntax for adding a single class:
    ```html
    <div [ngClass]="{border: true, background: true}"></div>

    <div [class.border]="2 + 2 === 4"></div>
    ```
    Note that directives and properties use brackets [ ] and affect the tag. Directives are preceded by the "ng". The second example, above, is not actually a directive, but just a use of Angular2 property binding to get the same result.

3. In addition, there are other ways of adding classes besides the objece. Examine the following:
    ```html
    <div [ngClass]="[classname]"></div>
    <div [ngClass]="[class1, class2]"></div>
    <div [ngClass]="[conditional] ? 'class1' : 'class2'"></div>
    
    ```

#### *ngFor
1. This structural directive allows us to output something into our document multiple times, such as a list. The syntax is as follows:
    ```html
    <section class='directive'>
        <h2>*ngFor</h2>
            <ul>
                <li *ngFor="let item of list; let ind = index>
                    {{item}} {{ind}}
                </li>
            </ul>
    </section>
    ```
    In the above, "item" is a variable name assigned to the list items (and included in the interpolation), "of" is a keyword designating the looping through the list, and "list" is a variable name of an iterable list of items, such as an array or set. For example, list may be defined in the class definition. "Index" is a value provided by Angular, but must be aliased, as above.

2. In addition to index, the folllowing other properties are available:


    a. **$implicit**: the value of the item (not sure what it is good for),
    
    b. **ngForOf**: the iterable list

    c. **first**: boolean (true for the first item in the list),
    
    d. **last**: boolean (true for the final item in the list)
    
    e. **even**: boolean (true for the even-numbered items)
    
    f. **odd**: boolean (true for the odd-numbered items)
    

#### \<ng-content>
1. This is a plain directive, without a template, although it looks like a component.

2. This directive acts as a placemark where content should be inserted into the compent DOM.

3. Any html that is placed between the tags of our component will be inserted where the \<ng-component> tag sits.

4. Note that other directives can be passed into this directive; for example, we can use *\*ngIf* to show something conditionally.

5. **Note**: The content is different from the view; so, for example, we have different lifecycle hooks for *AfterViewInit*, *AfterContentInit*, *etc*. Just like we have a *@ViewChild* decorator to have direct access to a child element in a template, we also have a **@ContentChild** decorator to give a component direct access to the content within an \<ng-content> tag. The type will also be *ElementRef* and we can access the *nativeElement* from it.

### C. Building a Custom Attribute Directive

#### Initial Attempt - Not the Ideal Approach

1. The following example shows how to create an attribute directive that affects how a DOM element is presented, in this case, it changes the background color. **However, this is not the "correct" solution, as it involves direct manipulatation of the DOM, rather than going through Ng4.** It is presented for discussion purposes only.

1. To start, we will create a separate folder for our directives, and in that folder we will create a file for our new directive. At the top of the file, we must import the Directive object from '@angular/core', which will allow us to attach a directive Decorator to our class. In addition, we must export an object out, so we will always have the following:
    ```javascript
    import { Directive } from 'angular2/core';
		
    @Directive({
        selector: '[directiveName]'
    })
    export class OurDirective {
		
    }
    ```
    **Note**: The value for selector is in the proper syntax. The brackets do not indicate any databinding, they are simply syntax. The "[ ]" indicate an attribute, but it could be "." to get a class or "#" to get an identified component.  In the component, the directive name, without quotes or brackets, is inserted into the html tag as an attribute.

2. In the directive class, we need to create a constructor, which is called to create a new instance of the directive whenever it is called in the component. In the constructor, we can inject the **ElementRef** object, **which gives us the html element on which the directive is sitting**.  In order to use this, we must import it from '@angular/core, as follows:
    ```javascript
    import { Directive, ElementRef } from '@angular/core';

    @Directive({
        selector: '[myDirectiveName]'
    })
    
    export class DirectiveName {
        constructor(private elRef: ElementRef)
    }
    ```
    **Note**: The designation as *private* or *public* makes the variable available anywhere in the class, on the *this* object. Of course, *private* limits access to only within the class.
    
    **\_elref** will be assigned the element on which the directive is placed, so we can modify it. So, for example, in a directive changing the background-color of an element, we could have:
    ```javascript
    constructor(public elRef: ElementRef) {}
    
    ngOnInit() {
        this.elRef.nativeElement.style
        .backgroundColor = this._defaultColor;
    }
    ```
    the actual html element is accessed through the *.nativeElement* property of the ElementRef.

4. Directives have some, but not all, of the lifecycle hooks discussed previously. In particular, they do have *OnInit* and *OnDestroy*.

5. To use our new directive, we must first go to *app.module* and import our directive, and add it to the "declarations" array in the *@NgModule* decorator:
    ```javascript
    import { BasicHighlightDirective } from 
        './directives/basic-highlight.directive';

    @NgModule({
        declarations: [
            AppComponent,
            BasicHighlightDirective
        ],
        imports: [
            BrowserModule,
            FormsModule,
            HttpModule
	],
	providers: [],
	bootstrap: [AppComponent]
    })

    export class AppModule { }
    ```
    and in our component html, we must place the attribute directive on an element, as follows:
    ```html
    <p appBasicHighlight>
        Styled with the directive
    </p>
    ```
#### Better Way: Using the "renderer" Object   
1. As noted in the above example, we should not directly manipulate the DOM, so the assignment of the background-color property in the directive was not the optimal way to do things (although it would work in most cases).

2. The reason the above approach might not work is that there are use cases where Ng4 may not be running in the DOM, so trying to access the DOM would cause it to break.

3. A better approach is to use Ng4's **Renderer2** helper object. First, we must import it from *@angular/core*. Among many other methods, the *Renderer2* object has a **setStyle** method, which takes three or more parameters:

    a. the element (obtained through *ElementRef*, as above),
    
    b. the style ('background-color'),
    
    c. the value to assign to the style,
    
    d. flags to add for options (for example, to include *!important*);

4. As an example of a directive that will create a yellow background and set the width of an element:
    ```javascript
    import { 
        Directive, Renderer2, 
        ElementRef, OnInit} from '@angular/core';

    @Directive({
        selector: '[appBetterHighlight]'
    })

    export class BetterHighlightDirective implements OnInit {
        constructor(
            private elRef: ElementRef,
            private renderer: Renderer2
        ) {}

        ngOnInit() {
            this.renderer.setStyle(
                this.elRef.nativeElement, 
                'background-color', 
                'yellow');
            this.renderer.setStyle(
                this.elRef.nativeElement, 
                'width', 
                '300px');
        }
    }
    ```
#### Best Way: Using @HostBinding
1. As a simpler alternative to using the *Renderer2* object, we can use the decorator **@HostBinding**. This decorator takes as a parameter an attribute of the host element of the directive and binds it to a variable, which should have an initial value set. This preliminary example is static, but later we will see how we can change the value of the variable and see it reflected in the attribute (for example, through an event from @HostListener.

2. See the following example:
    ```javascript
    import { Directive, HostBinding } from '@angular/core';
        
    @Directive({
        selector: '[appBetterHighlight]'
    })
    
    export class BetterHighlightDirective {
        @HostBinding('style.backgroundColor') bc = 'yellow';
        
        @HostBinding('style.color') myColor = 'navy';
    }
    ```

### D. Enabling the Directive to Listen for Events

1. In order to allow a directive to interact with the user in the DOM, we can use another decorator, **@HostListener**. In the following example, we import HostListener, then apply it to two functions, passing in the event that will trigger the function. Note that in the following example, we use the *Renderer2* approach:
    ```javascript
    import { Directive, Renderer2, 
    ElementRef, OnInit, HostListener } from '@angular/core';

    @Directive({
        selector: '[appBetterHighlight]'
    })

    export class BetterHighlightDirective implements OnInit {
        constructor(
            private elRef: ElementRef,
            private renderer: Renderer2
        ) {}

        ngOnInit() { /* set initial properties here */ }

       @HostListener('mouseenter') getOn(eventData: Event) {
           this.renderer.setStyle (
               this.elRef.nativeElement, 
               'background-color',
               'yellow');
	}

        @HostListener('mouseleave') getOff(eventData: Event) {
            this.renderer.setStyle(
                this.elRef.nativeElement, 
                'background-color', 
                'transparent'
            );
        }
    }
    ```
### E. Using HostBinding with HostListener
1. In the following example, we very easily set up a directive that sets the intial color and background color of the element on which it is placed, and then toggles that initial state of black on transparent to green on pink, based on the user's mouseclick.

2. See the following example:
    ```javascript
    import { Directive, HostBinding, HostListener } from '@angular/core';

    @Directive({
        selector: '[appDropdown]'
    })

    export class DropdownDirective {
        private colored = false;
        constructor(){}
        @HostBinding('style.backgroundColor') background = 'transparent';
        @HostBinding('style.color') myColor = 'black';
        @HostListener('click') myFunc(eventData: Event) {
            if (this.colored) {
                this.background = 'transparent';
                this.myColor = 'black';
                this.colored = false;
                return null;
            }
            this.background = 'pink';
            this.myColor = 'green';
            this.colored = true;
        }
    }
    ```
    
3. To bind a *class* to a variable, we use a very similar syntax:
    ```javascript
    @HostBinding('class.myClass') isMyClass = false;
    ```
    The above will attach the class "myClass" to the element on which the directive sits whenever *isMyClass* is true.

4. One further thing we can do is make the directive more dynamic using custom property binding to allow us to get values from outside the directive. The following is an example:

    a. first, we are going to have a component template, *app.component.html*, that will have a \<p> element on which we are going to place our directive. The pertinent part of that element is as follows:
    ```html
    <!-- app.component.html -->
    <p appHighlight 
    [defaultColor]="coldColor" 
    [highlightColor]="hotColor">
        This is some text.
    </p>
    ```
    We want the template to load with the \<p> to have a grey background color that turns pink when the mouse goes over the element and back to grey when the mouse leaves.  In the component class file, we will assign values to *coldColor* and *hotColor*. 
    ```javascript
    import { Component, Input } from '@angular/core';

    @Component({
        . . .
    })
    export class AppComponent {
        hotColor = 'pink';
        coldColor = 'grey';
    ```
    Then, in our directive, we use the @Input decorator to bind to the defaultColor and the highlightColor properties. Then we can do pretty much what we were up to before, but with the input colors. Note the use of the default set-up for *defaultColor*. We could also have used the *OnInit* method to set the default:
    ```javascript
    import { Directive, HostListener, 
        HostBinding, Input } from '@angular/core';

    @Directive({
        selector: '[appBetterHighlight]'
    })

    export class BetterHighlightDirective {
        @Input() defaultColor;
        @Input() highlightColor;
        @HostBinding('style.backgroundColor') 
            bc = this.defaultColor || 'grey';

        @HostListener('mouseenter') hover(eventData: Event) {
            this.bc = this.highlightColor;
        }

        @HostListener('mouseleave') leave(eventData: Event) {
            this.bc = this.defaultColor;
        }
    }
    ```
5. As a matter of syntax, we can make it more direct by assigning an alias to the *highlightColor* property, as follows:
    ```javascript
    import { Directive, HostListener, 
        HostBinding, Input } from '@angular/core';

    @Directive({
        selector: '[appBetterHighlight]'
    })

    export class BetterHighlightDirective {
        @Input() defaultColor;
        @Input('appBetterHighlight') highlightColor;
    ```
    this assigns *appBetterHighlight* (the selector of the directive) as an alias to *highlightColor*, thereby allowing us in the component to simply refer to assign the value to the selector, as follows:
    ```html
    <div [appBetterHighlight="'pink'">
		
        . . .

    </div>
    ```
    Note the brackets that are now around [appBetterHighlight], which were not there when it was simply a directive.  The brackets indicate it can take input.

### F. Creating a Custom Structural Directive
1. As we have noted, a **structural directive**, *i.e.*, one that affects the structure of the DOM, is notated with a preceding "*" (*e.g., *\*ngIf*, *\*ngFor*). The star(\*) is a bit of syntax that tells Ng4 to create **\<ng-template>s** to add if called for.  For example:
    ```html
    <div *ngIf="!onlyOdd">
        <li
        class="list-group-item"
        [ngClass]="{even: number % 2 === 0}"
        *ngFor="let number of evenNumbers">
        {{ number }}
        </li>
    </div>
    ```
    actually is simply syntax for:
    ```html
    <ng-template [ngIf]="!onlyOdd">
        <div>
            <li
            class="list-group-item"
            [ngClass]="{even: number % 2 === 0}"
            *ngFor="let number of evenNumbers">
            {{ number }}
            </li>
        </div>
    </ng-template>
    ```

2. In this section, we are going to create a simple structural directive, which we will name **\*unless**. It will hide the element on which it sits, unless a given condition is false (*i.e.*, the opposite action of **\*ngIf**). First, create a directive file, and provision it just like with an attribute directive:
    ```javascript
    // unless.directive.ts
    import { Directive } from '@angular/core';

    @Directive({
        selector: '[appUnless]'
    })

    export class UnlessDirective {
        constructor( ) {}
    }
    ```
    Don't forget to add into *app.module.ts*.

3. Next, we will want to get access to the input value on the directive, which we can do using the **@Input** decorator. We will want to run a method any time the value is changed, so we will use the **set()** method to run a function any time the value is updated:
    ```javascript
    // unless.directive.ts
    import { Directive, Input } from '@angular/core';

    @Directive({
        selector: '[appUnless]'
    })

    export class UnlessDirective {
        @Input() set appUnless(condition: boolean) {
            if(!condition) {
                . . .
            } else {
            
            }
        constructor( ) {}
    }
    ```
    **Note**: the set method will be for the directive selector name ("appUnless", in this case).  Also, note the parameter that the method takes, which is the boolean expression assigned to it.  

4. We will need access to two things: first, the template we will be inserting, based on the condition and, second, the location where the *\<ng-container>* will sit. They can both be injected through the constructor, the former with **TemplateRef** and the other with **ViewContainerRef**. 
    ```javascript
    // unless.directive.ts
    import { Directive, Input,
        TemplateRef, ViewContainerRef } from '@angular/core';

    @Directive({
        selector: '[appUnless]'
    })

    export class UnlessDirective {
        @Input() set appUnless(condition: boolean) {
            if(!condition) {
                . . .
            } else {
            
            }
        constructor(
            private template: TemplateRef<any>,
            private viewCont: ViewContainerRef
        ) {}
    }
    ```
5. Finally, we will use methods on the ViewContainerRef: *createEmbeddedView( )* takes as a parameter the view to embed (the TemplateRef) and places the view into the template at the designated location; **clear( )** removes any view from the location:
    ```javascript
    // unless.directive.ts
    import { Directive, Input,
        TemplateRef, ViewContainerRef } from '@angular/core';

    @Directive({
        selector: '[appUnless]'
    })

    export class UnlessDirective {
        @Input() set appUnless(condition: boolean) {
            if(!condition) {
               this.viewCont.createEmbeddedView(this.template);
            } else {
                this.viewCont.clear();
            }
        constructor(
            private template: TemplateRef<any>,
            private viewCont: ViewContainerRef
        ) {}
    }
    ```

## IV. Routing
### A. Introduction
1. One thing to keep clear is that the routes we are dealing with in this section are internal to Ng4. As we know, we are dealing with a **single-page-application (SPA)** style of design, so that, to the browser, we are not really moving around at all, we are simply inserting a group of components in and out of a single page. So, for example, if there is an Ng4 route "userInfo" that will display a list of information about the user, and we type into the browser "http://localhost:8000/userInfo", there might be a 404 error, because the browser is looking not within the page, but on a larger scale (actually, this gets handled by webpack, as discussed below).


### B. Setting Up Routes

1. The first thing to do is include something along the lines of the following as the first line in the \<head> section of our *index.html* file:
    ```javascript
    <base href='/'>
    // an alternative (note that is it NOT '/Ng4/'
    <base href='/Ng4'>
                
    ```
    This sets the root of our routing. So, if we chose the latter entry above, and typed in "localhost:4200" into the browser bar, we would go to the home page, and the browser bar would display: "localhost:4200/Ng4/". In fact, the browser will prepend the "Ng4" into any route we enter that is missing it.

2. Ng4 has a built-in router, which comes in its own module. It must be imported, as follows:
    ```javascript
    import { RouterModule [,other stuff] } from '@angular/router'
    ```

3. We can add the routes to the *app.module* folder, so they will be available throughout the application; however, the examples below add routes to a separate *app.routing.ts* file and then import the routes object into the *app.module* file.  This makes it easier to keep things organized.

4. The first thing to do in our *app.routing.ts* file is import two objects from *@angular/router*, as follows:
    ```javascript
    import { RouterModule, Routes } from '@angular/router'
    ```
    The latter will be the type for an array of routes used in our project. We then place into the array our routes, as follows:
    ```javascript
    // app.routing.js
    const APP_ROUTES: Routes = [
        {
            path: '',
            component: HomeComponent
        },
        {
            path: 'user',
            component: UserComponent
        }
    ]
    ```
    **Note**: The initial '/' is **not** part of the defined route. Similarly, the path that will show up in the browser bar as localhost:4200/Ng4/user is *user*, not */user* or *user/* or */user/*.
    
    **Note**: Each of the components referenced in the array must be imported into the file.
    
5. Then, we must export this array so it will be available to the *app.module.ts* file. Actually, we export an object created by the **forRoot** method of the **RouterModule** object, as follows:
    ```javascript
    export const routing = RouterModule.forRoot(APP_ROUTES);
    ```

6. One pain is that the components must be present both in the *app.routing.ts* file and the *app.module.ts* file. One way to make it cleaner is as follows:

    a. import the components into the *app.routing.ts* file,
	
    b. export a *routing* object with two properties: a *routes* object as above, and an array of all the components,
	
    c. import only the *routing* object from the './app.routing.ts' page, and have the following:
    ```javascript
    import { NgModule } from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser';
    import { AppComponent } from './app.component';
    import { routing } from './app.routing';

    @NgModule({
        imports: [
            BrowserModule,
            routing.routes
        ],
        declarations: [
            AppComponent,
            ...routing.components,
        ],
        bootstrap: [ AppComponent ]
    })
    export class AppModule {};
    ```
	
7. One final thing for basic routing: we must designate the place where our selected templates are to be inserted.  This is done with the **\<router-outlet>\</router-outlet>** directive tag in our main component.

8. One post-script for basic routing. Without the following, we will not be able to type the URL into the browser, or refresh the browser from anywhere but the '/' root, without getting a 404 error:

    a.	We can implement the "#" strategy, using *HashLocationStrategy*
		
    b.	We can use the default *PathLocationStrategy* which will require:
    
      i. make sure we have inserted the "\<base href='/'>" as the first line of the head of the *index.html* page,
      
      ii. in Webpack, make the following setting:
    ```json
    historyApiFallback: {
    index: path.resolve(rootDir, '/')
    },
    ```
### C. Adding Links
1. Because we have set it up, we can access our routes by typing them directly into the browser. The next step is to be able to select a route by clicking on it, as discussed below:

2. **Something that works, but don't do it:** It is possible to use the traditional \<a href=""> links; however, this will cause a full page refresh and defeat the purpose of using Ng4.

3. To have Ng4 handle the routing, use the following *routerLink* directive syntax:
    ```html
    <a [routerLink]="['']">Home</a>
    <a [routerLink]="['users']">Users</a>
    <a [routerLink]="['servers']">Servers</a>
    ```

4. The above examples, by not having "/" in the beginning, are using *relative paths*. This can cause a problem with nested paths, as it simply adds the given path to what is already in the url. To make it an absolute path, include the preceding "/". Then the path will be attached directly after the domain.

5. Note that the [routerLink] is assigned an array, the elements of which are the segments of the url path. Thus, we could have an absolute path as follows:
    ```html
    <a [routerLink]="['/', 'servers', 'new']">
    
    <!-- also, we can assign a string to be evaluated in the quotes -->
    
    <a [routerLink]="'/servers/new'">
    ```

6. The creataion of the route from the array is pretty much the same as Node's *path.join()* method. A link can contain a "..", for example.

7. As an alternative, we can use the *routerLink* directive without property binding, in which case the assigned path must be a string, not an array of strings.

### D. Styling Links

1. One can add a class to a link based on whether the path is currently being matched, by using the *routerLinkActive* attribute directive on the link, as follows:
    ```html
    <a [routerLink]="['']" 
        routerLinkActive="className">Click</a>
    ```
    In the above, the class in quotes is added whenever the path in the url **contains** the path of the link.
    
2. This brings up a problem; for example, the root path will always show as active, since it is contained in any path. However, it can be configured in its behaviour. In the case above, one can do the following:
    ```html
    <a [routerLink]="['']" routerLinkActive="active" 
    [routerLinkActiveOptions]="{exact: true}">Click</a>
    ```
    this will require a full, exact match of the path before the active class is applied.

3. The *routerLinkActive* directive can be placed not only on a link, but on other HTML tags, and the given class will be added to that element if it contains any active links within it. For example:
    ```html
    <div routerLinkActive="active">
        <a [routerLink]="['']">Home</a>
    </div>
    ```
    This will cause the \<div> to show the effects of the class when the routerLink matches the url.

### E. Imperative Routing

1. To navigate from within our code (as opposed to clicking on a link, for example), we can use the **navigate** property of the Router object. For example, if we add a button into our component, then navigate away to a specific route when we click on the button, that will often require just a link. However, sometimes we may want to obtain some data, or do some calculations, *etc,*, in addition to navigating to the new route. We can do the following:

    a. add a (click) listener to the button, and assign to it a method.

    b. in our component class definition, import the **Router** from *@angular/router*.
    
    c. inject the Routeer into our class through the constructor method.
    
    d. in our called method, use the **navigate( )** method of the router to change our view component,by including our go-to route as the argument, in an array. For example:
    ```javascript
    import { Component } from '@angular/core';
    import { Router } from '@angular/router';

    @Component({
        
        . . .
    })

    export HomeComponent {
        constructor(private router: Router) {}

        onNavigate() {
            . . .
            this.router.navigate(['/users']);
        }
    }
    ```
2. Compare the behaviour of *router.navigate* with that of *routerLink*. Navigate does **not** know the current route on which it is being called, so if we pass it a relative path (*i.e.*, without a leading "/"), it will **not** add it onto the current path, as is the case with links.

3. If we wish to use relative paths, we can override this behavior by passing a second parameter to the *navigate()* method, an options object that contains the property **relativeTo**.  We can pass this a path to serve as the relative root; by default, this is "/", which explains why it acts as it does.
    ```javascript
    this.router.navigate(['new'], {relativeTo: this.route}
    ```
    In the above, *route* is the injected **Activated Route**, which is the current route on which the application sits. To have access to it, we must import it from *@angular/router*, and then inject it through the constructor.

### F. Route Parameters

1. First, in our identification of the route path, we add at the end of the path our parameters, preceded by colons:
    ```javascript
    {
        path: 'user/:idNumber',
        component: UserDetailCompnent
    }
    ```
    The colon signifies that it is treated as a variable name, so we do not look for a path that is actually "user/idNumber" in the the above example, but rather something along the lines of "user/12345".
2.  Multiple parameters can be placed in the route as well, with the following syntax:
    ```javascript
    {
        path: 'user/:id/:name',
        component: UserDetailCoponent
    }
    ```
3. If some parameters are optional, we can handle this by having multiple routes listed, some with the parameters and some without.

4. As an example, we might get our parameter by clicking on a particular item.  Or, we might have the user input the identifying parameter:
    ```html
    <!-- input from user -->
    User Number: <input type="text" #id (input)=null/>
    <br>
    <!-- take us to route user/[number] -->
    <a [routerLink]="['user', id.value]">Our User</a>
    ```
5. At this point, we have set up a route that contains one or more parameters, and we have rigged up some manner of passing data into the route as the parameters. This could be the end of the story; however, we will probably need to access the information contained in the parameter(s). To do this, we should:

    a. import *ActivatedRoute* from "@angular/router",

    b. in the class definition of the component, include the *ActivatedRoute* object in the constructor,
    
    c. grab the parameter from the **params** property of the **snapshot** property, of the *ActivatedRoute*, as follows:
    ```javascript
    export class UserComponent {
        constructor (
            private router: Router,
            private myRoute: ActivatedRoute
        ) {}
        
       id = this.myRoute.snapshot.params['id'];
    }
    ```
6. The ActivatedRoute object has a number of properties/methods. As discussed below, we could go straight for the *ActivatedRoute.params* property; however, this is an **observable** (more on that later), and not an array or object of parameters. To see the parameters as they exist right now, we use the *snapshot* property to get the Route as it exists at the moment, and then use the *params* property of that.

7. The above approach is okay, but it assigns the value to *this.id* at once (*i.e.*, the *snapshot*). Unless there is a need to create a new component, there is not another snapshot, so the values can become out of date (for example, somebody inputs new data).

8. To keep our parameter field updated, even if the constructor is not called again, me must do the following:

	a.	access the *params* object of the ActivatedRoute. This is what is known as an **observable**.  An observable is a wrapper around an object that allows one to register to listen for change events.
	
	b.	on the params object, use the **subscribe** method to listen for changes. This method takes three parameters, each a callback function.  The first is a callback for changed data, the second is if we have an error, and the third is when all is complete (the last two are used for *http* requests). So, run the first callback to update the value, when there is a change, as follows:
    ```javascript
    import { Component, OnInit } from '@angular/core';
    import { ActivatedRoute } from '@angular/router';

    @Component({
        . . .
    })

    export class UserComponent implements OnInit {
        constructor(
            private route: ActivatedRoute
        ) { }
        
        user: {id: number, name: string} = {
            id: null,
            name: null
        };
	
        ngOnInit() {
            this.route.params.subscribe((val: any) => {
                this.user.id = val.id;
                this.user.name = val.name;
            });
        }
    };
    ```
    **Note**: We run the *subscribe()* method on *ngOnInit()*, but we do not run the callback on initialization, but only set it up waiting for a change in the *params* values.
    
9. Keep in mind that the *snapshot* method is less resource intensive, and is perfectly fine as long as there is no way to update the params from within the page.

10. In Ng4, subscriptions are route destroyed when the page is destroyed. There is no longer a need to unsubscribe using the *OnDestroy* lifecycle hook. However, the following is a to-do list for destroying a subscription, which is still necessary if the subscription if for observables not created by Ng4.

    To shut down a subscription, we must do the following, to kill the subscription when the component is destroyed (which we access through the *OnDestroy* lifecycle hook).

    a. import the Subscription object type from "rxjs/RX", which is a package Angular2 uses,
	
    b. add a property to our class of type Subscription,
	
    c. import the *OnDestroy* object from '@angular/core',
	
    d. assign the *route.params.subscribe . . .* method to "this.subscription",

    e. don't forget to *implements* the *OnDestroy* lifecycle hook,
	
    f.	when OnDestroy is called on the component, *unsubscribe()* from the subscription. So, we end up with the following:
    ```javascript
    . . .
    export class SomeComponent implements OnDestroy {
        constructor (
            private router: Router,
            private myRoute: ActivatedRoute
        ) {}
			
        mySubscription: Subscription = myRoute.params.subscribe (
            (val: any) => this.id = val.id
        );
        id: string;

        ngOnDestroy() {
            this.mySubscription.unsubscribe();
        }
    }
    ```
### G. Query Parameters

1. **Query Parameters** are the parameters at the end of a URL, separated from the path by a **question mark**. For example:
    ```
    localhost:4200/user/15?color=blue
    ```
    
2. **Passing Query Parameters**: They cannot go into the array (for example, when using the *router.navigate( )* method), because the array only holds segments of the path. Instead, the *navigate( )* method has a second argument, which is an object that has a property *queryParams*, the value of which is an object of query key/value pairs, as follows:
    ```javascript
    onNavigate() {
    this.routing.navigate(['/'], 
        {queryParams: {name: "Jordan", age: 50}});
    }
    ```
	Note that the object keys can be strings (if we want two words, hyphens, etc), and the values can be strings; if they are not, they will be converted anyway.
	
3. **Using Links with Query Parameters**: In order to pass in query parameters with a link, we use the *[queryParams]* property of the *routerLink* directive, as follows:
    ```html
    <a [routerLink]='[""]' 
        [queryParams]='{name: "Jordan", age: 55}'>Home</a>
        [fragment] = 
    ```

4. To access query parameters, use the *ActivatedRoute* object in the same manner as with route parameters (either using *snapshot* or subscribing to an observable), using the **queryParams** property, as follows:
    ```javascript
    export class HomeComponent implements OnDestroy {
        private sub: Subscription;
        param: string
			
        constructor (
            private route: ActivatedRoute
        ) {
            this.sub = route.queryParams.subscribe (
                val: any => this.param = val['name']
            );
        }
        // note that unsubscribe will be handled by Ng4 nowq
        ngOnDestroy() {
            this.subscription.unsubscribe();
        }
    }
    ```
5. Remember, query parameters do not belong to any particular route. The default action in Ng4 is to wipe out the query parameters on a change of route; however, this default action can be overridden, as discussed below.

### F. Fragments

1.	**Fragments** are pieces of an url that come at the end, like query parameters, but are preceded by a "#". It instructs the browser where to go on the web-page. For example, the url might be:
    ```
    localhost:3000/?name=Jordan#part1
    ```
		
	and in the html we could have a \<div> that has the following id:
	```html
	<div id='part1'>
	```
    On following the link to a target page, the div with the id of "part1" would be the start of the view.

2.	To access the fragment in an imperative routing, we can add a new property to the second parameter of the *navigate* method, as follows:
    ```javascript
    onNavigate() {
        this.router.navigate(['/'], {
            queryParams: {
                'name': 'Jordan'
            },
            fragment: 'section5'
        })
	}
	```
3.	In a link, we can pass in a fragment as follows:
    ```html
    <a [routerLink]="['']" queryParams="{name: Jordan}"
        [fragment]="'section5'">
    ```
4.	If we wish to keep query parameters or fragments in our url when we click on a new route, we can place the following into the link:
    ```javascript
    [preserveQueryParams]="true"
    [preserveFragement]="true"
    ```
    these can also be placed into the imperative routing as well.
	
5.	Extracting fragments works just the same as with query parameters or Params.  Use ActivatedRoute, with *snapshot* or *subscribe*.

### G. Nested (Child) Routes

1. Once we set up a primary level of routes, we might want to add subroutes.  For example, we may have a *user* route, which can then be used with a parameter to identify different users, for example, *user/1*, *user/2*, *etc*.  However, for each user we might want specific pages, for example, *user/1/info*, *user/1/edit*, etc.  To set this up, we need to do the following:

    a. **Create a file to hold the subroutes.**  This file will only export routes, not the routing module as does the primary routes file. Also, it will be located in the folder of the parent component. For example, the following is created to hold subroutes of the "/servers" routes:
    ```javascript
    // servers.routes.ts
    import { Routes } from '@angular/router';
    import { ServerComponent } from ' . . .';
    import { EditServerComponent } from '. . .';

    const SERVERS_ROUTES: Routes = [
        { path: ':id', component: ServerComponent },
        { path: ':id/edit', component: EditServerComponent }
    ];

    const serverRouting = {
        SERVERS_ROUTES,
        serverComponents: [
            ServerComponent,
            EditServerComponent
        ]
    }

    export default serverRouting;
    ```
    Note that the path is just the part after the parent, **and does not include a preceding /**.

    b. **Import the routing object.**  In the parent routes file (might be *app.routing.ts*), import the exported *SUB_ROUTES* object. Then, add a path to the child routes as follows:
    ```javascript
    import { RouterModule, Routes } from '@angular/router';
    import {. . . components } from '';
    import ServerRouting from './servers.routes';

    const APP_ROUTES: Routes = [
        { . . . paths },
        { path: 'servers', component: ServersComponent },
        { 
            path: 'servers', 
            component: ServersComponent, 
            children: ServerRouting.SERVERS_ROUTES },
    ];

    export const routing = {
        routes: RouterModule.forRoot(APP_ROUTES),
        components: [
            ...ServerRouting.serverComponents,
            . . . Other Components
        ]
    };
    ```
    The original path must be retained, if we want to be able to access it without a child appended to the path. If the parent route will not be used without a child appended, it may be removed.
		
    c. **Add \<router-outlet>.** In the parent component template, we must add a *\<router-outlet></router-outlet>* tag to place in the parent template where the routed material should be placed.

2.  Note that when we use *[routerLink]* to link to a child route, we only need to include the child part of the route if we are on the parent. However, if we are clicking on a link to use the *router.navigate* method, we should refer to the entire path.  
	
### H. Redirection

1.	Sometimes, we may wish to handle a path that does not actually exist. For example, if all our paths are of the form *user/:id*, we may wish to provide for someone entering *user/* as the path. We can set up a real path, or can use a **redirect** to send such a bad path to a different location, using the following syntax:
    ```javascript
    const APP_ROUTES = [
        {
            path: 'user',
            redirectTo: '/user/1'
        }
    ]
    ```

2.	We must also take into account the path matching behaviour. By default, Angular2 uses prefix matching behaviour, which means it looks to see if the portion given in the "path" property matches, and doesn't look past that. Thus, the following would all get redirected to */user/1*, under the path provided above:
    ```
    'user',
    'user/1',
    'user/15',
    'user/132'
    ```
	To modify this behaviour, we use the **pathMatch** attribute. It defaults to 'prefix', but can be set to *full*, which requires a complete match.
	
3.  **Note**: There is some funny behaviour on the *redirectTo* property. It works as expected when used in the brawser address bar, but does not work reliably when links are going to the detected path.

4.  Finally, the *redirectTo* property can be used to set up a default route, by setting a final path of '**', wich sets up a wildcard path, which we can redirect to an error page.


### J. Activating/Deactivating Routes

1.	**Guards** are a feature of Angular2 routing that controls access to particular routes. Angular2 has two guards: the **canActivate** guard, which can be set to be triggered whenever one attempts to access a route, and the **canDeactivate** guard, which can be set up to be triggered whenever one attempts to navigate away from a certain route.

2.	**NOTE**: This feature will come into much use in the authentication section of this outline, so go there to see more examples.

#### i. canActivate

3.	The following are the steps to create a basic *canActivate* guard that controls access to a page, *user-detail.component*.

	a.	**Create the Guard File**: Create a file in the *user* directory (where our *user-detail.component* file is), named *user-detail.guard.ts*,
	
	b.	**Create our Export Class**: From that file, export a class that implements the CanActivate module from *@angular/router*, as follows:
    ```javascript
    import { CanActivate } from "@angular/router";
		
    export class UserDetailGuard implements CanActivate { }
    ```

	c.  **Create our canActivate Method**: Also, we must import *RouterStateSnapshot* and *ActivatedRouteSnapshot* from *@angular/router*.  The former is current state, *i.e.*, the route on which we are currently sitting, and the latter is the currently active route, *i.e.*, the route to which we want to navigate.  The *canActivate* method will return an observable that will deliver a boolean, or will return a boolean directly. Thus, we have:
    ```javascript
    import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
    import { Observable } from 'rxjs/Rx';

    export class UserDetailGuard implements CanActivate {
        canActivate (
            route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot
        ): Observable<boolean> | boolean {
            //here would go our conditions
        }
    }
    ```

	Note that it returns either an observable or a boolean, *i.e.*, an answer to the question, "can we load the route into the browse?". Often, there might be an asynchronous call in the evaluation; for example, to check the user's authorization, which is why we need to use the observable.
	
	d.	**Add the Guard to the Route**: Then we need to add the guard to the route. To do this, to the routes file where it is defined and add to the route object the *canActivate* property, with a value of an array containing all the guards, as follows:
    ```javascript
    //user.routes.ts
    import { Routes } from '@angular/router';
    import { UserDetailComponent } from './user-detail.component';
    import { UserEditComponent } from './user-edit.component';
    import { UserDetailGuard } from './user-detail.guard';

    export const SUB_ROUTES: Routes = [
        {
            path: 'detail',
            component: UserDetailComponent,
            canActivate: [
                UserDetailGuard  //NOTE: multiple guards can be included in this array
            ]
        },
        {
            path: 'edit',
            component: UserEditComponent
        }
	]
	```

	e.	**Register the Guard in app.module**: Finally, don't forget to import the guards into the *app.module* file and place them in the providers property of *@NgModule*.

#### ii. canDeactivate
4.	Using the canDeactivate guard is a bit more complex than using the canActivate guard. Below is an example, in which a user is completing a form and we don't want the user to be able to leave the form until she is finished. We could put a "Complete" button at the bottom, which clicking changes the "completed" variable in the class from false to true.  Then, we allow the user to leave the route only if completed === true.  In order to do so, take the following steps:

	a.	**Create a Guard File**: We will create a new file in which to write the guard, *user-edit.guard.ts*. As expected, we import *CanDeactivate* and { Observable }, and export our class with the canDeactivate() method:
	```javascript
	import { CanDeactivate } from '@angular/router';
    import { Observable } from 'rxjs/Rx';
		
    export class UserEditGuard implements CanDeactivate {
        canDeactivate(): Observable<boolean> | boolean {
		    //insert testing code here	
        }
    }
    ```
	The *canDeactivate* method must get a *component* as an argument, and that component must have the *ComponentCanDeactivate* interface, through which it gets the *canDeactivate* method:
    ```javascript
    import { CanDeactivate } from '@angular/router';
    import { Observable } from 'rxjs/Rx';

    export interface ComponentCanDeactivate {
        canDeactivate: () => boolean | Observable<boolean>;
	}

    export class UserEditGuard implements CanDeactivate<ComponentCanDeactivate> {
        canDeactivate (
            component: ComponentCanDeactivate
        ): Observable<boolean> | boolean {
            return component.canDeactivate ? component.canDeactivate() : true;
        }
    }
    ```
    In the above code snippet, we are exporting an interface (which we can name as we want), and this interface must make available a method, *canDeactivate*, which returns a function that takes no parameters and returns a boolean or an *Observable\<boolean>*.

	b.	**Implement canDeactivate Method in Component**: Our component, *user-edit.component*, will implement the *ComponentCanDeactivate* interface. This gives it the *canDeactivate* method, which is then defined in the component class, as follows:
	```javascript
    export class UserEditComponent implements ComponentCanDeactivate {
        done = false;
        constructor(private routing: Router) {}

        onNavigate() {
            this.routing.navigate(['/']);
        }
        
        canDeactivate(): Observable<boolean> | boolean {
            if (!this.done) {
                return confirm('Do you wish to leave?');
            }
            return true;
        }
	}
	```
	
	c.  **Add Guard to the Path**: In our routes file, find the UserEditComponent and add to the array paired to the *canDeactivate* property the *UserEditGuard* component.
	```javascript
    export const SUB_ROUTES: Routes = [
        {
            path: 'detail',
            component: UserDetailComponent,
            canActivate: [
                UserDetailGuard
            ]
        },
        {
            path: 'edit',
            component: UserEditComponent,
            canDeactivate: [
                UserEditGuard
            ]
        }
    ]
    ```
    d.  **Import to app.modules File**: Be sure to import the guard into the *app.module.ts* file, and to add the guard into the array of providers.


## V. Forms

1. In our previous work on directives, we built a form by putting down a couple of labels and input components, with everything done by hand as far as validation and handling input.  This could be much improved, first by using a form element, and allowing Angular to handle the entire form object.

2.	One of the main topics here will be Angular2's options for validating form data.  We need to be able to manage the **state** of the form. Angular2 does not use the HTML5 form, but creates its own FormGroup object, which it keeps in sync with the HTML form, but uses for handling validation, submission, *etc*.
	
3.	There are two major ways of creating forms in Angular2:

	a.	**Template driven**:  We set up and configure the form in the HTML template, then submit the form via the ngSubmit() directive to allow Angular 2 to recognize it as a form.  We do **not** create the actual Ng2 form object, it is inferred from the HTML.
	
	b.	**Data driven**: We set up and configure the form in the TypeScript code in the class body, then Angular2 is instructed to use the created FormGroup, and the data from the form can be used throughout the class body without passing it via ngSubmit().

4.  **IMPORTANT:** Be sure to add *FormsModule* to the *@NgModule* decorator in the *app.module* file for the template-driven forms approach, and *ReactiveFormsModule* for the data-driven approach.


5.  Add in the hack as follows:
    ```javascript
    <input type="text" #id (input)='0'>
    ```
    The (input)='0' is simply a workaround, to cause the page to rerender every time the input is changed in the input field.






### A.  Template Driven Approach

1.	This method requires only that one simply build a \<form>\</form> element inside a component template. This will be automatically recognized by Angular2 as a form element and the *ngForm* directive will be attached to it.

2.	However, we have to add the **ngModel** directive to each input field that we wish to be treated as part of that form, as well as a name property for the field.  Otherwise, the field does not become part of the javascript object that Angular2 makes from the form.  So, we have something like the following:
    ```javascript
    <input type="text" id="username" ngModel name="username"/>
    ```
    Note that the *ngModel* directive here does not need the parens and brackets, as it is not establishing two-way data binding, it is only marking the field as a control in the Ng2 form object.

3.	We also need to add an (ngSubmit) directive to the \<form> element, as follows:
    ```html
    <form (ngSubmit)="onSubmit()">
    ```
		
4.	The *template-driven* approach does not give direct access to form values. However, we can pass the Angular2 representation of the form, as **ngForm**, to a variable, which we can then pass into our *ngSubmit* method. For example:
    ```html
    <form (ngSubmit)="onSubmit(f)" #f="ngForm">
						
    </form>
    ```
		
	In the above, **ngForm** is both a directive that is invisibly attached to the form, but also is a reference to the form that is marked as part of the Ng2 form with *NgModel*. So, in the above, we are passing the *onSubmit* method the form object. An element can be recognised as a form by Angular2 either by explicitly adding the *ngForm* directive, or by simply using the HTML \<form> tag. 
	
	To access the input values in the form, refer to *f.value*, which will be an object of name: value pairs.
	
5.	Don't forget, for TypeScript to recognize the object type, we should import the *NgForm* object from the *@angular/forms* module. So, we should have something along these lines:
    ```javascript
    import { Component } from '@angular/core';
    import { NgForm } from '@angular/forms';
    
    @Component({
    })
    
    export class MyComponent {
        onSubmit(form: NgForm) {
            //do it here
        }
    }
    ```
		
6.	Angular2 manages not only the state of the form overall, but also of each control on the form. Thus, The *NgForm* object has a *controls* property, which takes as a value an object of the controls on the form, which are *FormControls*, and each of them has many properties similar to those on the form.

7.	To set default values for a template-driven form, we can do the following:

	a.	enclose *ngModel* in brackets, making it one-way, property data-binding.
	
	b.	adding a value to it from the class:
	```html
    <!--in the form template-->
    <form>
    <input type="text" id="username" [ngModel]="user.username" name="username">
			
    <!--in the class definition-->
    export class TemplateDrivenComponent {
        user = {
            username: 'Jordan',
            email: 'jordan@cjb.info',
            password: 'password'
	    }
    };
    ```
8.	We can add validation to our *NgControl*s, with two common validators as follows:

	a.	*required*,
	
	b.	*pattern*: This takes a regular expression to match (note, the regexp is in the quotes, not enclosed in  "/ /"").

	
9.	As with Angular Classic, the following css classes are added to controls in an Angular form:

	a.	**ng-pristine**: this means the input value equals the default value and hasn't been modified (not necessarily blank).
	
	b.	**ng-valid** / **ng-invalid**: whether the input value passes any validation tests.
	
	c.	**ng-touched**: Indicates when the control has been clicked into, no need for inputing anything. It does not take effect until the control is left.
	
	d.	**ng-dirty**: this means the input value has been changed from its default state. This persists even if the value is returned to its default state.
		
		
10. As discussed abave, *ngModel* is added to a control to indicate that it is a control object in the Ng2 form object. However, it can be used with "[ ]" or "[( )]" to bind the control to data in the component class.

    a.  With "[ngModel] = test.property", the initial value of the form control will be set to the value of *test.property*; however, this can be changed in the form without affecting the value of the *test* object.
    
    b.  With "[(ngModel)] = test.property", the initial value of the form control will be set to the value of *test.property*; in this case, there is two-way data binding and the value of the *test* object will be affected by changes in the control.
    
    c.  Note that values can be accessed upon submit either through the form, or through the object bound to the controls.
    
    ```javascript
    export class TemplateDrivenComponent {
	    user = {
	        username: 'Jordan',
	        email: '',
	        password: '',
	    }

	    onSubmit(form: NgForm) {
            console.log(form);
        }
        //or
        onSubmit(form: NgForm) {
            console.log(this.user);
        }
    }
    ```
#### Data Grouping

1.  In our form, we can group controls together using the **ngModelGroup** directive.  Here is an example:
    ```html
    <h1>My Big Form</h1>
    <form (ngSubmit)="onSubmit(form)" #form="ngForm">
        <div ngModelGroup='userData'>
            <input ngModel name="username" />
            <input ngModel name="email" />
        </div>
        <input ngModel name="password" />
    ```
    In the above case, if we enter some data into the form and console.log out the form.value, we would get:
    ```javascript
    {
        userData: {
            username: "Jordan",
            email: "cjordanball@gmail.com"
        },
        password: "test"
    }
    ```
    
#### Example: Radio Buttons



4.	**PAY ATTENTION**: Angular2 does a bit of automagical here with *ngControl*. Inside the form, we can reference a form field by assignment of *ngForm* to a field variable name, as follows:

		<input ngControl="email" type='text' id='mail' required #email='ngForm'>

	Angular2 will recognize the context in which *ngForm* is used, *i.e.*, a field or the entire form.


5.	By adding the *ngControl* directive, for example, the elements now have angular classes such as *ng-untouched*, *ng-pristine*, *ng-invalid* added to the element. The *ngControl* should be bound with a name given, as so:

		<input ngControl="email" type="text" id="mail" required>
		
6.	Values in the form can be accessed in a number of ways.  The most straightforward is through the *formName*.value[*fieldName*] object, or through *formName*.controls[*fieldName*].value.







#### Data-Driven

1.	This approach takes care of things primarily in our code, rather than in the \<form> created in our template.

2.	This approach requires use of Angular2's **FormBuilder** module, so we must begin by importing:

		import {Component} from 'angular2/core';
		import {FormBuilder} from 'angular2/common';
		
	**Note**: the import of FormBuilder is from the *angular2/common* module, not the *core* module.

3.	We must then inject this module via the constructor of our exported class component.

		export class DataDrivenFormComponent {
			user = {mail: '', password: ''};
			
			constructor(private _formBuilder: FormBuilder) {
			
			}
			. . .

4.	Also, we will want to build the form on the OnInit lifecycle stage, so we should import OnInit, and implement it on the exported class declaration, as described elsewhere.

5.	To build the form, we will need to access the **group()** method of the FormBuilder object. We must also create a new property in the class declaration (called *myForm* in this example).  In Typescript, this will be of type *ControlGroup*.  This type will have to be imported from *angular2/common*.

6.	The *group()* method of the FormBuilder takes an object argument, as follows:

		ngOnInit():any {
			this.myForm = this._formBuilder.group({
				'email': ['', Validators.required],
				'password': ['', Validators.required],
				'email': ['', Validators.required],
			});
		}
		
	a.	Note that the form is set with an object where the key is the field name, and the value is an array. The first item in the array is a default value (set to '' in the example), and the second is validation.
	
	b.	The validation item references a *Validators* object, which must be imported from *angular2/common*.  There are three built-in validators: **required**, **minLength**, and **maxLength**. The last two take a numerical argument.

7.	Of course, we are building the Angular2 form object, and we also have an HTML form and component fields. We need to joing them together, which we do with the following directives:

	a.	The **[ngFormModel]** directive goes on the \<form> tag and overrides Angular2's default action on coming upon such tag. We bind our angular form from the class declaration to the \<form> with this directive:
	
	
			<form [ngFormModel]='myForm' (ngSubmit)="onSubmit()">
		
	b.	The **[ngFormControl]** directive goes on the \<input> tags and assigns a form field to the input, as follows:
	
			<input [ngFormControl]="myForm.controls['email']"

		**Note** that the form accesses the inputs through its control object, not directly to the name of the control (i.e., not "myForm.email").

	c.	We can also continue to use the *#variableName='ngForm'* syntax in the input tag to identify the tag.
	
####Custom Validation

1.	In addition to the built-in validators, we can set up custom validation, using regular expressions, or any other JavaScript to check on the input.

2.	To begin, set up one or more validator functions. They could be wrapped in their own object, or just written as independent functions.

3.	The validator function will have a parameter of type **Control**, which must be imported from *angular2/common*. It will return a JavaScript object, with a string key and a boolean value.  In TypeScript, set it up as:

		function hasbach(control: Control): {[s: string]: boolean} {
    		if (!control.value.match(/bach/i)) {
        		return {noBach: true};
    		}
		}
		
	Note that the above is making full use of TypeScript.  For example, we could leave out the return type declaration and the type declaration of the parameter, and it would still work as valid JavaScript.  I.e., the following would work just fine:
	
		function hasbach(val) {
    		if (!val.value.match(/bach/i)) {
        		return {noBach: true};
    		}
		}

4.	Whatever the syntax for writing the function, **it must return an object with a string key and boolean value** if it fails the test. If the object is not returned, the validation test will be considered passed.  The key of the returned object should identify the problem, and the boolean value should be true, but they do not need to, to fail the test.

5.	To attach the custom validator methods to a field, modify the object in *FormBuilder.group()*.  For the field where one wants to add the custom validator, call the **compose** method on the Validators object, and give it an array of all validators to apply to the field, **including built-in methods**:

		ngOnInit():any {
        	this.myForm = this._formBuilder.group({
            	'email': ['', Validators.required],
            	'password': ['', Validators.compose([
                	Validators.required,
                	hasNumbers,
                	hasbach
            	])],
            	'confirm': ['', Validators.required]
        	});
    	}




## VI. Services
### A. Introduction
1. **Services** are classes containing logic that we can inject into our components and thereby use throughout our Ng4 application.  Typically, a service will have methods that we can use in a component into which the service has been injected. It allows us to centralize logic, rather than having to duplicate it throughout the application. This makes it easy for us to change logic in one location if necessary, rather than having to hunt it down in many different places.

2. In addition, we can store **application state data** in one or more services, so that it is available throughout our application. This is because most services are **singletons**, meaning they are objects that are accessed by reference, so that they can be accessed and modified in one place and those changes will be available anywhere the object is called.

3. A service can sometimes be a (factory?), meaning multiple instances are created, so use of the service in one component is unrelated to the service in another component.

4. A concept closely related to services is that of **dependency injection**. Ng4 provides a means of making the service upon which a component class is dependent available to the service by "injecting" it into the component through the constructor. To inform Ng4 that we require an instance of the service, we use the class constructor, as set forth below.

### B. Creating a Service

1. When creating a service, follow these steps:

    a. create a file to hold the service, for example, *logging.service.ts*.
    
    b. write the service code. A service is just a plain class, so there is no need for a decorator such as *@Component*.  For example, for a service that contains a single method:
    ```javascript
    export class LoggingService {
        logStatusChange(status: string) {
            console.log(
                'A server status changed, new status: ' + status
            );
        }
    }
    ```
    The above example is very simple - it merely logs a given string to the console.

2. To use the service in a component, in the class definition, we should bind the service to a variable through the constructor function, as follows:
    ```javascript
    import { Component } from '@angular/core';
    import { LoggingService } from './services/logging.service'

    @Component({
        selector: 'component-1',
        templateUrl: './new-account.component.html',
        styleUrls: ['./new-account.component.css'],
        providers: [LoggingService]
    })
  
    export class Component1Component {
        constructor(private loggingService: LoggingService) {}

        onLog(message: string) {
            this._loggingService.logStatusChange(message);
        }
    }
    ```
    **Note**: Don't forget to import the service.
    
    **Note**: Once imported, we are able to make the service available by adding as a parameter in the constructor method a name to bind to the service, with a type that is the service imported. So, in the above, *loggingService* will have a type of LoggingService, and upon instantiation of the class instance, will get placed on the *this* object via the constructor.
    
    **Note**: It is also necessary to add a new property to the *@Component* decorator, **providers**, which will take as its value an array of all services that we wish to inject.	

### C. Hierarchical Injector

1. It is extremely important to understand the heirarchical nature of services in Ng4 if we want to use them successfully. Underneath it all, keep in mind whether we want to be using **the same instance** of a service, or not.

2. **Hierarchical** in this case means that if we provide a service, Ng4 will create the instance of the service, and make that instance available to that component **and all descendants thereof.**

3. So, for example, we can go to the *AppModdule* component and provide for the Service there, in the *providers* property array. This will make a single instance of the service available throughout the entire application, although it will still need to be imported into each file we want to have access, and bound in the constructor.

4. We do not have to go all the way up to the root AppModule. We can go to the highest level component where we need the service, and add it to the *providers* property of that component's @Component decorator in order to have it available where we need it.

### D. Injecting Services into Services

1. Services can be injected into components, of course, but can also be injected into other services.

2. This can help DRY up our code, if everything being done by one service can be done as part of another service. In addition, it is the obvious thing to do in some cases, where the particular service provides a set of functionality needed by other services, such as the *http service**.

3. However, services (and other things) can only be injected in Ng4 into classes that have metadata attached to them - in other words, a decorator.  So, **in the service that is receiving the other service by injection**, we need to add the **@Injectable** decorator. To do so, copy the following code (which injects the *LoggingService* into the *AccountsService*:
    ```javascript
    import { Injectable } from '@angular/core';
    import { LoggingService } from './logging.service';

    @Injectable()

    export class AccountsService {
        constructor(
            private loggingService: LoggingService
        ){}
        
        . . .
    }
    ```
4. An important use case is to use services as a way of passing data directly among components. To do so, we can take the following steps:

    a. In a service, we can create a new *EventEmitter*, as follows:
    ```javascript
    // accounts.service.ts
    import { EventEmitter, Injectable } from '@angular/core';
    import { LoggingService } from './logging.service';
    
    @Injectable()
    export class AccountsService {
        constructor(
            private loggingService: LoggingService
        ){}
        
        . . .
        
        statusUpdated = new EventEmitter<string>();
    ```
    b. In a component that is injecting the AccountsService, we can use the EventEmitter:
    ```javascript
    // acccount.component.ts
    import { AccountsService }} from '../accounts.service';
        . . .
        
        export class AccountComponent {
            constructor(
                private accountsService: AccountsService
            ){}
            
            . . .
            
            onMethod(status: string) {
            this.accountsService.statusUpdated.emit(status);
    
    
    ```
    c.	In the receiving component, we will listen for the event using the **subscribe()* method of the event emitter.
    ```javascript
    // new-account.component.ts
    import { Component } from '@angular/core';
    import { AccountsService } from '../accounts.service';
    
        . . .
    
    export class NewAccountComponent {
        constructor(
            private accountsService: AccountsService
        ){
            this.accountsService.statusUpdated.subscribe(
                (status: string => alert('New Status' + status)
                
                . . .
        }
    }       
    ```

### E. Example - Push Notification of Updates
1. **The Situation**: We have an initial array of ingredients that we list in our shopping list. We also have a form on which we can add the name and amount of a new item, which is added to the list when we click on the add button, and which should be visible in an updated list when we click.

2. In our service, we have an array of the initial list of ingredients. When the component initially renders, we  In our service, we call the *getIngredients()* method from the service, which returns a **copy** of the initial array. **We could just use the original array, but we want to keep it unchanged, so we are using the copy (Array.from(array)). However, when we add a new item, it is going to the original array, not the copy, so our list is not updating.

3. We can solve this by adding an *EventEmitter* to the service, which will emit a new copy of the array every time it updates. Then, in the list component, we will *subscribe* to the EventEmitter in the *ngOnInit()* method.  See the following:
    ```javascript
    // shopping-list.service.ts
    import { Ingredient } from '../shared/models/ingredient.model';
    import { EventEmitter } from '@angular/core';

    export class ShoppingListService {
        ingredientsChanged = new EventEmitter<Ingredient[]>();
        
        private ingredients: Ingredient[] = [
            new Ingredient('Apples', 5),
            new Ingredient('Tomatoes', 10)
        ];
        
        getIngredients() {
            return Array.from(this.ingredients);
        }
        addIngredient(item: Ingredient) {
            this.ingredients.push(item);
            this.ingredientsChanged.emit(Array.from(this.ingredients));
        }
    }
    ```
    **Note:** The need for this is the fact that the *getIngredients()* method returns a copy of the ingredients array. I'm still not exactly sure why this is necessary; after all, we mutate the array by adding items to it.
    ```javascript
    // shopping-list.component.ts
    import { Component, OnInit } from '@angular/core';
    import { Ingredient } from '../../shared/models/ingredient.model';
    import { ShoppingListService } from '../../services/shopping-list.service';

    @Component ({
	. . .
    })

    export class ShoppingListComponent implements OnInit {
        ingredients: Array<Ingredient>;

        constructor(
            private shoppingList: ShoppingListService
        ) { }

        ngOnInit() {
            this.ingredients = this.shoppingList.getIngredients();
            this.shoppingList.ingredientsChanged
            .subscribe(
                (ingredients: Ingredient[]) => {
                    this.ingredients = ingredients;
                }
            )
        }
    }
    ```

## VII. Pipes

### A. Introduction

1. **Pipes** can be used to transform the way a stream of data appears in HTML. Not only does Ng4 have several built-in pipes, we can design custom pipes.

2. It is important to note that the pipe **only** transforms the view of the data in the html template, it does **not** modify the underlying value. So, if the variable "name" is assigned the value "Jordan" and in the template we have:
    ```html
    {{name | uppercase}}
    ```	
    we will see JORDAN in the view, but the name variable remains the string "Jordan."

### B. Basic Use

1. Examine the following example:
    ```javascript
    import {Component} from '@angular/core';

    @Component({
        selector: . . .
        template: `
            <section>
                <h2>The Date Pipe</h2>
                <p>Today is: {{today | date}}</p>
            </section>
        `
        })
		
    export class AppComponent {
        today = new Date();
    }
    ```

2. In the above example, we have a simple base case for assigning a date to a variable and interpolating it into the text.  Without the **date** pipe, the text would be the entire date/time string. In this example, of course, we could use JavaScript functions, but this shows the use of the pipe:

	i)  on the left side is what goes in (an unformatted date)
	
	ii) on the right side is the transforming method that outputs transformed data.
	
3. As shown in some of the pipe descriptions below (*date* and *slice*, for example), we can pass in parameters to our pipe. The syntax for this is to have a preceding colon, followed by the parameter. *Multiple parameters* should each be preceded by a colon:
    ```javascript
	{{ value | slice: '3' : '10'}} //spaces are not relevant
	```	
4. Pipes can be linked together, so that what comes out of the prior pipe goes into the subsequent pipe.  Note that this is **not always transitive**, *i.e.*, the end result may differ depending upon the order of the pipes.
		
### C. Built-In Pipes

1. **date**: This pipe can take formatting arguments to control the output of the date/time string. Built in formats can be seen in the Ng4 API docs. Components to include can be specified. For example, the following:
    ```html
    <p>Today is: {{today | date:'d MMMM, y'}}</p>
    ```
    outputs "3 April, 2016".
	
    Note that times will show based on the location of the machine.  So a new date, although kept in UTC time, shows the local EST without offset if given: {{today | hh:mm:ss}};
	
2. **uppercase**: This pipe transforms text to all uppercase.  Very straightforward.

3. **lowercase**: This pipe transforms text to all lowercase.  Very straightforward.

4. **slice**: This pipe takes beginning and ending parameters to indicate the portion of a string from which to take a slice.
    ```html
    <div>Output: { {inputSlicePipe.value | slice:start.value:end.value }}</div>
    <!-- or -->
    <div>Output: {{ inputSlicePipe.value | slice:3 :10 }}</div>
    ```
    Notice in the above example, the syntax for passing multiple arguments to the slice pipe, using colons.

5. **number**: This pipe allows for the formatting of a number (remember that the input to the pipe must be a number, *not a string*). A basic example:
    ```html
    <div>Decimal: {{1.0 * inputNumberPipes.value | number:'1.0-2'}}</div>
    ```
    The argument is interpreted as follows: the first number tells the minimum number of places to be exhibited before the decimal.  It must be at least 1. The range after the decimal (*i.e.*, ""1-2") shows the minimum number of places past the decimal to show, followed by the maximum number to show. So, in the above example, an integer would show as an integer, while PI would show as 3.14.

6. **percent**: This is very similar to the *number* pipe in syntax, but expresses the number as a percentage (*i.e.*, the input number '2' would be expressed '200%'). It takes the same formatting parameter as number.

7. **currency**: This is similar to a number pipe. The default output (i.e., no arguments) is "USD12.34" (rounded to two places after the decimal).
 
    a. Can be assigned a currency argument, like so:
    ```html
    <div>Currency: {{1.0 * inputNumberPipes.value | currency:'EUR'}}</div>
    ```
    This argument can be any three letter string, and will display as uppercase letters.
    
    b. A second argument shows the short form ($, E) if *true*, and long form (USD, EUR) if *false*.
    ```html
    <!-- displays $123.46 -->
    {{ 123.456 | currency: 'usd' :true }}
    ```
    c. A third argument is for number styling, and is the same as for the number pipe, above.

8. **I18nSelect**: This pipe allows us to include a mapping object to provide a value based on our key. For example, assume that we want to include the phrase "Invite him" or "Invite her" in our text. We could include in our HTML an interpolated {{ gender }} value, with the pipe, which would take as a parameter the mapping object, as so:
    ```javascript
    @Component({
        . . .,
        template: `
            <div>{{gender | i18nSelect: inviteMap}} </div>
         `
     })
    export class I18nSelectPipeComponent {
        gender: string = 'male';
        inviteMap: any = {
            'male': 'Invite him.', 
            'female': 'Invite her.', 
            'other': 'Invite them.'
        };
    }
    ```
 
	
### D. Custom Pipes

1. We can build our own pipes, to alter output in the manner we wish, if there is not a satisfactory built-in pipe. Take the steps in the following example, in which we build a very simple pipe that doubles a number value.

    a.	For the project, create a *pipes* directory to hold the various pipes.
	
    b.	In our *pipes* directory, we add a file called *double.pipe.ts*:
    ```javascript
    import { Pipe, PipeTransform } from '@angular/core';

    @Pipe({
        name: 'double'
    })

    export class Double implements PipeTransform {
        transform(value: any, arg1?: any): any {
            return value * 2;
        }
    }
    ```
    Note that we must import *Pipe* and *Pipe Transform*, that we name our pipe in the *@Pipe decorator* and that we export a *transform()* method.
	
    Note that the *transform()* method takes a value (*i.e.*, the left side of the pipe), then the parameters.  The "?" operator means "if there is one"; in the above case there would not be any parameters since we are just doubling the value.  We can ask for lots of arguments, like so:
    ```javascript
    transform(value: any, arg1?: any, arg2?: any, arg3?: any): any {
        return value * 2;
    }
    ```
    c. Let's say we also build another pipe, called *triple*, in file *triple.pipe.ts*.  In our *pipes* directory, create an *index.ts* file and have the following:
    ```javascript
    import { Double } from './double.pipe';
    import { Triple } from './triple.pipe';

    export const Pipes = {
        pipes: [
            Double,
            Triple
        ]
    }
    ```
    d. Then, in order to be able to use them throughout the application, go to the *app.module.ts* file and add the following:
    ```javascript
    import { Pipes } from './pipes';

    @NgModule({
        declarations: [
            ...Pipes.pipes
        ]
    ```
### E. Using a Filter Pipe
1. If we have an array of valuse, we can pass that array into a custom pipe as a value, and then test the items in the array and return the items that pass the test. In the following example, we are printing out on the page a list of servers, each with a number of properties, including an *instanceType* of "small", "medium", or "large".

2. To start, we will have the following *input* tag in our page HTML:
    ```html
    <input type="text" [(ngModel)]="filteredStatus">
    ```
    and in the component class, we will establish the string variable *filteredStatus* with a value of empty string.

3. Our pipe will be very simple, taking the array of servers as the first parameter, and the input value as the second parameter:
    ```javascript
    // fiterPipe.ts
    import { Pipe, PipeTransform } from '@angular/core';

    @Pipe({
        name: 'filter'
    })

    export class FilterPipe implements PipeTransform {
        transform(values: any, needle?: string): any {
            return values.filter(val => {
                return val.instanceType.includes(needle);
            });
        };
    }
    ```
4. Finally, we include our pipe in the HTML as part of the *\*ngFor* directive:
    ```html
    . . .
    <li
    class="list-group-item"
    *ngFor="let server of servers | filter: filteredStatus"
    [ngClass]="getStatusClasses(server)">
        <span
        class="badge">
            {{ server.status }}
        </span>
        <strong>{{ server.name }}</strong> | {{ server.instanceType }}
    </li>
    . . .
    ```
    
### F. Pure vs. Impure Pipes

1. One problem that can arise is that Ng4's change detection will be triggered only if there is a change to a primitive or to a reference. A change in the contents of an object or an array will not. So, if we have a filter pipe, for example, and are adding new values into an array of values, the filter will not update as new items are added. Instead, it will update only when the filtering value changes. This is referred to as a **pure pipe**.

2. One way to take care of the problem would be to create a new array on each change in our array.

3. Another way is to create an **impure pipe**, one that is called on each event (such as keystroke). To do this, simply change the default in the *@Pipe* decorator as follows:
    ```javascript
    @Pipe({
        name: 'filter',
        pure: false
    })
    ```
4. **There is a reason pipes are pure by default!** An impure pipe will run every time any data on the page changes, which can impose a significant performance cost. Think carefully before making filter pipes impure. Note that Ng4 does not come with any filter pipes built-in, for performance reasons.

### G. Async Pipe

1. This is a built-in, impure pipe. It has a very useful feature, in that it allows data to be placed into the template after rendering. It allows us to get a promise as a value to interpolate into our component, but not have it show up as *[object Object]*, but wait until the value arrives.

2. This works not only for promises, but also for **observables**. 


## VIII. Http Requests
### Introduction
1. In Ng4 there is a module for HTTP services. In the *app.module* file, import the HttpModule from *@angular/http* and include it in the *imports* section of the *@NgModule* decorator.

2. Of course, the HTTP module is about interacting with a back-end server to get information. In a nutshell, we do so as follows in the appropriate class:
    ```javascript
    constructor (
        private http: Http
    ) {}
    this.http.get[post/put, etc.]('example.com/endpoint');
    ```

3. Ng4 uses a concept known as **observables**.  An *observable* is an object created upon the http request to which we can listen through a *subscribe()* method. The observable sends the request, gets a response, and emits an event that we listen for when it has gotten the response. The subscribe method will normally have a callback method to execute upon the event.

### Setting Up
1. As a best practice, we do not reach out to the internet in the component itself, but make a call upon a service, which we need to build, as follows:

    a. Create a file *http.service.ts*:
    ```javascript
    import { Injectable } from '@angular/core';
    import { Http } from '@angular/http';
    
    @Injectable()
    export class HttpService {
        constructor (
            private http: Http
        ) {}
    }
    ```
		
    b. Don't forget to make sure the module is imported into the *app.module.ts* file.
	
    c. create a method in the HttpService class, for example:
    ```javascript
    getData() {
        return this.http.get(
            'https://angular2course-44e01.firebaseio.com/title.json'
        ) 
    }
    
    // or a post request, passing in a body
    saveUserNames(users: any[]) {
        return this.http.post(
            this.targetUrl,
            users,
            { headers }
        );
    }
    ```
    **The above methods, when called, return an observable.** 

    d. go to the file where we need to use the service, and import the service from the file in which it resides, then inject it through the class constructor.
    ```javascript
    import { Component, OnInit } from '@angular/core';
    import { HttpService } from './http.service';

    @Component({
	. . .
        
    })

    export class AppComponent implements OnInit {
        constructor(private httpService: HttpService ){}

        ngOnInit() {
            this.httpService.getData()
        }
    }
    ```
    Note the use of the *OnInit* method in the above example. This is a common situation, wheere we need to get some information for the components we are loading.

    e.  We still haven't sealed the deal. At this point, we have only returned an observable, to which we now must **subscribe*:
    ```javascript
    ngOnInit() {
        this.httpService.getData()
        .subscribe(
            callback1 (handle response),
            callback2 (handle error),
            callback3 (handle completion)
        );
    }
    ```
    The *subscribe( )* method takes three callbacks: i) triggered when data is returned, ii) triggered when an error is returned, and iii) triggered when everything is complete.

    f. A successful query will return a *Response* object, which has a number of properties, including **ok(boolean)**, **status(number)**, and **\_body(string)**, and a method, **json()**. To get at the data, we will call this *json()* method, which returns just the data, and not any of the other properties that come with the *Response* object.

2. **Headers**: In our *httpService*, we can create headers to add to our requests as follows:

    a. import the *Headers* constructor method from the *@angular/http* module.
    
    b. create a new headers object using the *Headers* constructor and passing in an object of key/value pairs for the headers.
    
    c. add an *options object* as a parameter of our http method, with one property being *headers*. See the following example:
    ```javascript
    import { Injectable } from '@angular/core';
    import { Http, Headers } from '@angular/http';

    @Injectable()

    export class HttpService {
        constructor (
            private http: Http
        ){}

        storeServers(servers: any[]) {
            const headers = new Headers({'Content-Type': 'application/json'})
            return this.http.post(
                'https://nghttp-fb992.firebaseio.com/data.json',
                servers,
                {
                    headers
                }
            );
        }
    }
    ```
 3. *Headers* has an *append( )* method for adding headers to the ones we already have. ***Object.assign( )* will not work, so use append( )**, if you do not want to pass in an entire, new Headers object.
 
### Handling Data
1. Of course, we hope to get back *Response* object with a status of 200 and a *\_body* that contains a JSON string of our data. However, we will probably want to do something with our returned data to make it useful.

2. The first thing we will want to do is convert the string to a JavaScript object. We can do this using the *Response* object's **json( )** property. We should import the *Response* type from *@angular/http*.
    ```javascript
    import { Response } from '@angular/http';
    . . .
    
    export class AppComponent {
    . . .
        onGet() {
            this.http.getServers()
            .subscribe(
                (res: Response) => {
                    const data = res.json()
                },
                (err) => {
                    console.log(err);
                }
            )
        }
    }
    ```

3. There are a number of operations we can perform on the observable; for example, there is a *map( )* operation, which does what we would expect. However, these operations transform our objservable **into a new observable**, not  a data object, for example. This will allow us to handle our data manipulation in the service, rather than in each component that employs our service method. 

    a. first, the operation has to be imported into our service, from the *rxjs/Rx* module:
    ```javascript
    import 'rxjs/Rx';  //this brings in all the observable operators
    ```
    b.	next, use the *map( )* method to take the original observable, and transform it into **a new observable**.
    ```javascript
    getData() {
        return this.http
        .get(targetUrl)
	.map((val: Response) => val.json());
    }
    ```
    This new observable can be listened to (because it is an observable), and its type will not be a Response, but the object (use "any");


#### Async Pipe
1. This is a neat feature built in to Ng4. Suppose we want to get back a simple string when the page loads, and we have a method (let's call "getString") in the HttpService object to deliver the observable for that string. We can set up in our class definition:
    ```javascript
    title = this.httpService.getString();
    ```

2. If we simply interpolate the above (*i.e.*, {{ title }}), it will be an object, an observable, and will print to the screen as "[object Object]".  We can modify this with the **async** pipe, which will output just the string:
    ```html
    {{title | async}} 
    ```

#### Error Handling for an Observable
1. To our *observable*, we can attach the *catch()* method, and include as a parameter a callback function to handle the error. In the callback, it can take the error and work with it as an observable.  For example:
    ```javascript
    sendData(user: any) {
        const body = JSON.stringify(user);
        let heads = {};
        const headers = new Headers(heads);
        headers.append('Content-Type', 'application/json');
        return this.http.post(
            'https://angular2course-44e01.firebaseio.com/data.json', 
            body, 
            {
                headers: headers
            })
        .map((data: Response) => data.json())
        // use the method this.handleError to do whatever with
        // the error observable
	.catch(this.handleError);
    }

    //our error-handling method
    private handleError (error: any) {
        // use json() method to get the data object, 
        // then display the error property
        alert(error.json().error)
        // the following will require import of the Observable 
        // object from rxjs/RX.
        // it wraps the error as an observable and
        // sends the error observable on its way.
        return Observable.throw(error);
    }
    ```

2. All of the above was taking place in the *httpService*. Once the error observable is returned to the component, it can be manipulated with the second parameter of the observable.  For example:
    ```javascript
    onGetData() {
        this.httpService.getOwnData()
        .subscribe (
            res => {
                for (let key in res) {
                    this.items.push({ 
                        'username': res[key].username, 
                        'email': res[key].email 
                    })
                }
            },
            error => this.err = error
        )
    }
    ```

## IX. Animations
### A. Introduction
1. Ng4 comes with its own animations module, which provide a much easier way to handle events such as components being added to the DOM than use of CSS transitions. 

### Setup
1. To use Ng4 animations, we will need to install a separate package, **@angular/animations**.

2. Then, in our *app.module* file, we need to have the following import:
    ```javascript
    import { BrowserAnimationsModule } from 
        '@angular/platform-browser/animations'
    ```

3. Also, in *app.module*, we need to add *BrowserAnimationsModule* to the *imports[]* array.

4. Finally, note that *trigger*, *state*, *style*, and other animation related items will be imported from *@angular/animations*, and **not** from *@angular/core.*

### Creating a Basic Animation
1. To begin, we will create a \<div> element that we will transition in color and size.

2. What we are going to do is create two alternative **states**, one of which will be associated with a red backgroundColor, the other a blue. When we click on the button, our event-listener will change from one state to another, resulting in the change of the div color from red to blue. We will also prsscribe a **transition**, describing how it will get from one state to the next (*e.g.*, how fast).  

3. We define that animations that we will need in the *animations array*, a property of the *@Component* decorator.

3. Each animation must have a **trigger**, and this must be imported from @angular/animations. *trigger* will have the following arguments:

    a. a string, which names the trigger, and is used in the HTLM page,
    
    b. an array of **states** and **transitions**. Each state will have a name and a style object containing CSS-like code. For example:
    ```javascript
    import { Component } from '@angular/core';
    import { trigger, state, 
        style, transition, animate } from '@angular/animations';
    
    @Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css'],
        animations: [
            trigger('divState', [
                state('normal', style({
                    'background-color': 'red',
                    transform: 'translateX(0)'
                })),
                state('highlighted', style({
                    'background-color': 'blue',
                    transform: 'translateX(100px)'
                })),
                transition('normal => highlighted', animate(10000)),
                transition('highlighted => normal', animate(2000))
            ]),
        ]
    })
    ```
    **Note**: If the *transition* is the same in each direction, we can use just one *transition*, with the syntax: *normal <=> highlighted*.
    
5. In the HTML, go to the element on which we wish to use the animation, and add the trigger name as a property bound to a component variable representing the state:
    ```html
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <h1>Animations</h1>
                <button 
                class="btn btn-primary" 
                (click)="onAnimate()">
                    Animate!
                </button>
                <button 
                class="btn btn-primary" 
                (click)="onShrink()">
                    Shrink!
                </button>
                <hr>
                <div id="testDiv" [@divState]="state">
            </div>
        </div>
    </div>
    ```
    **Note**: The "@" is required in front of the name of the trigger.

6. We can have **multiple states** and define transitions for each change of state. In our transitions, we can use an asterisk **\*** to serve as a wildcard for any state. 
    
    
    
    
    
    
## X. Debugging Angular Apps
1. Obviously, the first step in debugging an Angular4 application is to open up the dev tools in the browser, particularly the **console**.

2. In addition, when things stop working and the console message is not clear, always remember to take a look at the terminal where the server is running. Often, the message generated by Webpack is very easy to figure out.

3. In development, the JavaScript files support **sourcemaps**, which allows us to map between the TypeScript code we are writing and the JavaScript code being output. To access the TypeScript, go to the **Sources** tab in the dev tools, and look for the **webpack://** entry in the *Sources* box on the left side. Once there, we can use the tools available for debugging.

4. Finally, one tool for understanding the layout of the application is **Augury**, which can be added to Chrome as a browser extension.


## XI. Unit Testing Angular4 Apps

### A. Introduction
1.  The material in this section is meant to be reviewed in conjuction with a repository located at XXXXXXXX.  This contains a general seed project with the build-out for a functioning front end, including unit testing, and is prepopulated with the components and the accompanying testing that is discussed below.

2.  The testing package used by Angular2 is Karma as the test runner and Jasmine as the actual testing package. The focus of this section is testing in Angular2 and not testing generally, so it goes pretty light on the specifics of testing.  Hopefully, the examples and having the setup already provided will allow one not experienced with unit testing to pick up the general principles pretty quickly, along with the Angular2-specific portions.

3.  To make use of the prepared app, do the following:

    a.  Make sure your machine has Node.js and the accomponying node package manager ('npm') already installed. If not, go to https://nodejs.org to install.
    
    b.  One problem I came across was having an incompatible version of Karma installed globally on my machine. My suggestion is to run the following to see what packages are installed globally:
    ```
    npm list -g --depth=0
    ```
    Then, take a good look and think about removing old clutter.
    
    c.  Clone the repository onto your machine.
    
    d.  Run *npm install* to retrieve all the dependencies.
    
    e.  To confirm the app is working, got to the command line in the project directory and type the following command:
    ```
    npm run serve
    ```
    Then go to your browser and enter "localhost:3142" in the address bar.  You should see a webpage containing the text "Goodbye, Cruel World!", in navy color type with an orange subtitle "The joy of test" underneath.
    
    f.  From the command line (either a new tab in your terminal, or close the webpack server with Ctrl + C), enter *npm install*.  This should result in output in the terminal along the lines of (note that the number of tests might be changed from time to time):
    
    ```
    webpack: Compiled successfully.
    webpack: Compiling...

    [at-loader] Using typescript@2.2.1 from typescript and "tsconfig.json" from /Users/jordanball/Desktop/Ang2Testing/tsconfig.json.


    [at-loader] Checking started in a separate process...

    [at-loader] Ok, 0.563 sec.
    24 03 2017 10:12:45.116:WARN [karma]: No captured browser, open http://localhost:9876/

    webpack: Compiled successfully.
    24 03 2017 10:12:45.131:INFO [karma]: Karma v1.5.0 server started at http://0.0.0.0:9876/
    24 03 2017 10:12:45.132:INFO [launcher]: Launching browser Chrome with unlimited concurrency
    24 03 2017 10:12:45.208:INFO [launcher]: Starting browser Chrome
    24 03 2017 10:12:45.977:INFO [Chrome 57.0.2987 (Mac OS X 10.12.2)]: Connected on socket 9xxEniKbsk462dN_AAAA with id 55148210
    ..........
    Chrome 57.0.2987 (Mac OS X 10.12.2): Executed 10 of 10 SUCCESS (0.423 secs / 0.412 secs)
    ```
    
### B. Testing Generally

1.  Note that our sample app is set up to find all files ending in **.spec.ts** that are in our *src* directory, and run the tests contained therein.  To start, we will create a folder, *startTesting*, in the *src* directory, outside our *app*. Nothing here will involve Angular2 in the least, but will allow us to start with discussion of tests generally.

2.  Let's begin by creating a file in our folder, "start.spec.ts".  This will hold our first tests.  For our first test, we will affirm that true is true:
    ```javascript
    describe('our initial tests', () => {
        it ('thinks that true is true', () => {
            expect(true).toBe(true);
        });
        it ('thinks that true is not false', () => {
            expect(true).not.toBe(false);
        });
    }
    ```
    Okay, all we did was check to see if true is true. But let's consider the what was involved.  First, Jasmine provides a **describe()** method, which can be thought of as the large grouping of our tests (in Jasmine terminology, this is a **Suite**).  It takes two parameters: i) a string we can use to describe the tests - often this might consist of the component name that we are testing, and ii) a function containing our tests, *i.e.*, the things that begin with 'it'.
    
    Inside our big *describe* heading, we have two tests. Of course, these tests don't actually test anything yet, other than our assertions.  Each test is comprised of an **it()** method (in Jasmine terminology, this is a **Spec**), which takes parameters similar to the *describe()* method, a string we can use to describe the test, and a callback function containing our assertions, or **expectations**.
    
    The heart of the *expectation* is the **matcher**, which are chainable functions that return a boolean value, *i.e.*, is our assertion true or false.  In the above, the meaning of "toBe" or "not.toBe" should not be any question. There are quite a number of matchers included with Jasmine, and one should go to the Jasmine website, look at what is available, and try them out. In addition, one can also write custom matchers, if necessary.  Of special note, however, is the **not** matcher, which is included in the above example, which negates the matcher following it.
    
3.  Now, we will build out a function by adopting the "write tests first" approach.  Our function will be a simple palindrome checker - in this case we will require exact palindromes, including spaces and grammar, but with case-insensitivity.  Our first task will be to create a file to hold our function, *startMethods.ts*.  In this file we will create our method and export it so it is available to our *start.spec.ts* file:
    ```javascript
    //startMethods.ts
    export function isPalindrome(input:string):boolean {
        return true
    }
    ```
    
4.  Obviously, this will not do much at this stage, but let's write tests for what we hope it will eventually do:
    ```javascript
    //startMethods.ts
    describe('our palindrome tester', () => {

        it ('returns an error if the input is not a string', () => {
            expect (isPalindrome(23)).toBe('Invalid Input');
            expect (isPalindrome(['a', 'b', 'c'])).toBe('Invalid Input');
        });
    
        it ('checks to see if a string is a palindrome', () => {
            expect (isPalindrome('abc')).toBe(false);
            expect (isPalindrome('abccba')).toBe(true);
        });

        it ('ignores case of letters', () => {
            expect (isPalindrome('ABCcba')).toBe(true);
        });
        
        it ('requires strict observance of spaces and puntuation', () => {
            expect (isPalindrome('A man, a plan, a canal, Panama')).toBe(false);
        });
    })
    ```

5.  Currently, our function actually passes a few tests, using the "a broken clock is right two times a day" strategy, as it only returns true, no matter what the input. The following will allow all tests to pass:
    ```javascript
    export function isPalindrome(input:any):any {
        try {
            if (typeof input !== 'string') {
                throw "Invalid Input";
            }
            input = input.toLowerCase();
            let len = input.length;
            let newWord:string = '';
            for (let i = 0; i < len; i++) {
                newWord += input[len - i - 1]
            }
            return input === newWord;
        }
	    catch (err) {
		    return err
	    }
    }
    ```


### C. Specific Tests

#### i. Pipe

1.  A pipe in Angular2 (as in Angular Classic) is a function that takes some input and manipulates in some manner for display in the DOM. It does not affect the original input data, it merely changes how it is displayed. It is notated as follows:
    ```html
    {{myName | halfCaps}}
    ```
    In the above example "myName" is text interpolated from the component, and "halfCaps" is the name of the pipe.  We could write this pipe so that every time it is called, converts the text to uppercase for every other letter.  Thus, although the variable *myName* continues to be "Jordan", it gets displayed as "JoRdAn".  There are a number of useful pipes built-in to Angular2 to handle dates, currency display and other common situations; even more useful is the ability to write one's own pipes.

2.  Pipes are a great way to dip one's toe into unit testing in Angular2, because there is almost no Angular2 involved. Pipes have no state, they are just methods that take in an input and spit out an output. Thus, this section discusses almost nothing unique to Angular2, so if you are already experienced in running Jasmine tests generally, you may wish to skip this section.  However, it will provide a good introduction for those with little or no experience in unit testing.

3.  In this example, we will test a pipe that transforms the case of a string to have every word begin with upper-case followed by all lower case.  So, it should convert "Now is the winter of our discontent" to "Now Is The Winter Of Our Discontent".

4.  To get started, let's first create a pipe that we know will fail our tests, in file *titleCase.pipe.ts*:
    ```javascript
    //titleCase.pipe.ts
    import { Pipe, PipeTransform } from '@angular';
    
    @Pipe({name: 'case', pure: false})
    
    export class TitleCasePipe implements PipeTransform {
        transform(input:string):string {
            return 'Bazoom!'
        }
    }
    ```
5.  Next, let's write some obvious tests to start.  Create a file named *titleCase.pipe.spec.ts* and set up the **describe** function.  First, however, we will need to make a single preparatory step, importing the pipe component from the file in which we saved it:
    ```javascript
    //titleCase.pipe.spec.ts
    import { TitleCasePipe } from 'pipes/titleCase.pipe'
    
    describe('TitleCasePipe', () => {
        let pipe = new TitleCasePipe();
        
        it(`transforms 'abc' to 'Abc'), () => {
            expect(pipe.transform('abc')).toBe('Abc');
        });
        
        it('transforms 'abc def' to 'Abc Def', () => {
            expect(pipe.transform('abc def')).toBe('Abc Def');
        });
    }
    ```
6.  The point of these tests should be pretty obvious, and it should be just as obvious that our current pipe is going to fail both tests. So, we go back to our pipe and update it so that it will pass these tests, by implementing a simple regular expression within a *replace()*:
    ```javascript
        //titleCase.pipe.ts
    import { Pipe, PipeTransform } from '@angular';
    
    @Pipe({name: 'case', pure: false})
    
    export class TitleCasePipe implements PipeTransform {
        transform(input:string):string {
            return input.length === 0 ? '' : input.replace(/\w\S*/g, (txt => txt[0].toUpperCase() + txt.slice(1).toLowerCase()));
        }
    }
    ```
7.  Upon saving our changes, the test runner should show that we now pass both tests.  However, let once we think about it, we realize that it would look silly if acronyms got this treatment.  So, let's add another test to our tests file:
    ```javascript
    //titleCase.pipe.spec.ts
    
    . . .
    
    it(`leaves acronyms alone`, () => {
        expect(pipe.transform('NASA')).toBe('NASA');
        expect(pipe.transform('NOrfolk')).toBe('Norfolk');
        expect(pipe.transform('my life at NASA')).toBe('My Life At NASA');
    }
    ```
    Note that we can have any number of *expects* in a single test. In fact, as I was writing this, I wrote the first two expectations, then realized that the solution I was planning to implement would cover single words, but not acronyms in phrases, so I added the third *expect*.
    
8.  Now, go back and update our code to pass these tests. Below, I will leave my initial solution, which fails the last expectation of the *it leaves acronyms alone* test. If you want, you can update it to pass all tests.
    ```javascript
    //titleCase.pipe.ts
    
    . . .
    
    export class TitleCasePipe implements PipeTransform {
        transform(input: string): string {
            if (input === input.toUpperCase()) {
                return input;
            }
            return input.length === 0 ? '' : input.replace(/\w\S*/g, (txt => txt[0].toUpperCase() + txt.slice(1).toLowerCase()));
        }
    }
    ```
9.  One final note - if we look at the code in the sample app for the pipe tests, we can see that the last test *it deals with single letter words* fails. Note that, in this case, it fails because the test contains a typo, not because the pipe is messing up.  Don't forget to look closely at the error message, and make sure that there actually is a mistake, it is just as easy to make a typo in the test as in the actual code.

#### ii. Component
1.  By now, we should have a decent feel for how tests work generally. There are a number of special considerations, however, when running tests in a framework such as Angular2. In particular, special methods are required to create instances of components to test, and to give them the attributes they would have if actually created so that tests can run.  The focus will now shift from the mechanics of using Jasmine and Karma to create and run tests to the Angular2-specific strategies for making effective tests;

2.  We will begin by running tests on a very basic Angular2 component. We begin by setting up a basic, empty component, BannerComponent, in a 'banner' folder in our *components* directory: 
    ```javascript
    // banner.component.ts
    
    import { Component } from '@angular/core';

    @Component( {
        selector: 'banner-comp',
        templateUrl: './banner.component.html',
        styleUrls: [
            './banner.component.css'
        ]
    })

    export class BannerComponent {
	    constructor() {};

        title:string = 'The joy of test';
    }
    ```
    ```html
    <h1>
        {{title}}
    </h1>
    ```
    ```css
    h1 {
        color: orange;
    }
    ```
    
3.  In order to test our component, we will need to create an angular testing module containing any components necessary for our testing. In this case, we will be testing a single, simple component. To begin, import the following dependencies:
    ```javascript
    import { TestBed, ComponentFixture } from '@angular/core/testing';
    import { DebugElement } from '@angular/core';
    import { By } from '@angular/platform-browser/';
    import { BannerComponent } from './banner.component';
    ```
    As we will soon see, **TestBed** is probably the most important of all Angular testing utilities.  It is used to create an Angular testing module (@NgModule), which we will configure using the **configureTestingModule** method. We will go over the imports in more detail, below.

4.  First, however, we will set up our testing suite with some variable declarations and Jasmine's **beforeEach()** method. This method allows the testing framework to set up for each test from scratch. All our tests are completely independent of each other, so all the set-up that the tests have in common can be placed in the beforeEach() method and run prior to each test:
    ```javascript
    describe('BannerComponent', () => {
    let fixture: ComponentFixture<BannerComponent>;
    let comp: BannerComponent;
    let de: DebugElement;
    let el: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ BannerComponent ],
        })
        fixture = TestBed.createComponent(BannerComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement.query(By.css('h1'));
        el = de.nativeElement;
    });
    ```
    In the above, we use a number of Angular2 specific methods and utitilities to set up our tests. First, we crete our testing module with *TestBed*'s **configureTestingModule()** method.  Then, we use *TestBed*'s createComponent method to create a BannerComponent and assign it to our variable *fixture*, and than assign to our variable *comp* an instance of the component class using the **componentInstance** method. Similarly, we create an instace of the element we wish to test by using the **debugElement()** method to create a handle on the targeted element in the component's DOM, and the **query** method to acces our tartgeted component. Finally, we assign that DOM element to our variable *el*, via the **nativeElement** property.
    
5.  Finally, our tests.  This is such a simple component there is hardly anything to test, but we can see how to proceed after our setup:
    ```javascript
    it('should display an original title', () => {
        fixture.detectChanges();
        expect(el.textContent).toContain(comp.title);
    });
    it('should display a different test title', () => {
        comp.title = 'A New Name';
        fixture.detectChanges();
        expect(el.innerText).toBe('A New Name');
    });
    it(`should not have a title because we don't call 'detectChanges'`, () => {
        expect(el.innerText).not.toBeDefined;
    })
    ```
    The most important thing above is the **detectChanges()** method of *fixture*.  Of course, in the second test, we should expect that we would need to do something to cause Angular2 to refresh the component ond incorporate the new assisgnment to comp.title; however, the **createComponent()** method does not trigger changes, so the *detectChanges()* method is necessary in order to set up the component in the first test.
    
    There is a method, **ComponentFixtureAutoDetect**, which will perform the initial update on the creation of the component, but it is better practice to use the **fixture.detectChange()** method. 

#### iii. Component with Service Stub

1.  Outside of our simple example components such as the one above, we will very often have data injected into our components by services.  In our next exaple, we will see how to deal with such components in Angular2.  In order to do so, we will add the following *UserComponent*"
    ```javascript
    // user.component.ts
    
    import { Component, OnInit } from '@angular/core';
    import { UserService } from 'services/user.service';

    @Component({
        selector: 'user-comp',
        templateUrl: './user.component.html',
        styleUrls: [
            './user.component.css'
        ],
    })

    export class UserComponent implements OnInit {
        constructor(
            private userService: UserService
        ) {}
        user:{name: string};
        isLoggedIn:boolean;

        ngOnInit() {
            this.user = this.userService.user;
            this.isLoggedIn = this.userService.isLoggedIn;
        }
    }
    ```
    ```html
    <!--user.component.html-->
    
    <div *ngIf="isLoggedIn">
        <h1>User Logged In</h1>
        <p>User is: {{ user.name }}</p>
    </div>
    <div *ngIf="!isLoggedIn">
        <h1>User Not Logged In</h1>
        <p>Please log in first.</p>
    </div>
    ```
    ```javascript
    //our service, user.service.ts
    export class UserService {
        user = {
            name: 'Max'
        }
        isLoggedIn:boolean = false;
    }
    ```
    **Note**: Notice that in our service, the user's name is "Max";

2.  In order to run our tests, we neet to have access to data from our service; however, it is usually much better to create a mock service with only the data necessary for the test rather than copying the entire service.  Below, in our testing module, note the use of the **overrideComponent()** method, which allows us to insert the data in **userServiceStub**.
    ```javascript
    import { TestBed, ComponentFixture, async } from '@angular/core/testing';
    import { By } from '@angular/platform-browser';
    import { UserComponent } from './user.component';

    describe('Component: User', () => {
        let fixture: ComponentFixture<UserComponent>;
        let comp: UserComponent;
        let el: HTMLElement;
        beforeEach(() => {
            let userServiceStub = {
                isLoggedIn: true,
                user: {
                    name: 'Jordan'
                }
            }
            TestBed.configureTestingModule({
                declarations: [UserComponent]
            });
            TestBed.overrideComponent(UserComponent, {
                set: {
                    providers: [
                        {
                            provide: UserService,
                            useValue: userServiceStub
                        }
                    ]
                }
            });
            fixture = TestBed.createComponent(UserComponent);
            comp = fixture.debugElement.componentInstance;
        });
        it ('should create the app', () => {
            expect(comp).toBeTruthy();
        });
        it ('should use the username from the service', () => {
            let userService = fixture.debugElement.injector.get(UserService);
            fixture.detectChanges( );
            expect(userService.user.name).toEqual('Jordan');
        });
        it ('shouldn\'t display the user name if user is not logged in', () => {
            let userService = fixture.debugElement.injector.get(UserService);
            userService.isLoggedIn = false;
            fixture.detectChanges();
            el = fixture.debugElement.nativeElement;
            expect(el.querySelector('p').textContent).not.toContain(comp.user.name);
        });
        it ('should display the user name if user is logged in', () => {
            let userService = fixture.debugElement.injector.get(UserService);
            userService.isLoggedIn = true;
            fixture.detectChanges();
            el = fixture.debugElement.nativeElement;
            expect(el.querySelector('p').textContent).toContain(comp.user.name);
        });
    });
    ```
3.  Note that in the *userServiceStub* object, the user's name is "Jordan", not "Max", and that the second test passes when the userService.user.name equals "Jordan". This is because it is using the stub data for the service in the test. 

#### iv. Component with Async Action (Http Query) 

1.  In the case of the *service*, the data injection is a synchronous process.  Many times we will be testing data that is obtained from http requests or otheer asynchronous processes. In the following example, we will continue using the *UserComponent*, but will be injecting a *DataService*, which will deliver data in a mock async process, using the **setTimeout()** method.
    ```javascript
    // data.service.ts
    export class DataService {
        getDetails() {
            const resultPromise = new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve('Now is the winter of our discontent');
                }, 1500);
            });
            return resultPromise;
        }
    }
    ```
2.  In addition, we will update our **UserComponent** files to incorporate our data service:
    ```javascript
    // user.component.ts
    import { Component, OnInit } from '@angular/core';
    import { UserService } from 'services/user.service';
    import { DataService } from 'services/data.service';

    @Component({
        selector: 'user-comp',
        templateUrl: './user.component.html',
        styleUrls: [
            './user.component.css'
        ],
    })

    export class UserComponent implements OnInit {
        constructor(
            private userService: UserService,
            private dataService: DataService
        ) {}
        user:{name: string};
        isLoggedIn:boolean;
        data: string;

        ngOnInit() {
            this.user = this.userService.user;
            this.isLoggedIn = this.userService.isLoggedIn;
            this.dataService.getDetails().then((data:string) => this.data = data);
        }
    }
    ```
    ```html
    <!--user.component.html-->
    <div *ngIf="isLoggedIn">
        <h1>User Logged In</h1>
        <p>User is: {{ user.name }}</p>
        <h2>Data:</h2><span>{{data}}</span>
    </div>
    <div *ngIf="!isLoggedIn">
        <h1>User Not Logged In</h1>
        <p>Please log in first.</p>
        <h2>Data:</h2><span>{{data}}</span>
    </div>
    ```
    ```javascript
    // user.component.spec.ts
    import { TestBed, ComponentFixture, async } from '@angular/core/testing';
    import { By } from '@angular/platform-browser';
    import { UserComponent } from './user.component';
    import { UserService } from 'services/user.service';
    import { DataService } from 'services/data.service';

    describe('Component: User', () => {
        let fixture: ComponentFixture<UserComponent>;
        let comp: UserComponent;
        let el: HTMLElement;
        beforeEach(() => {
            let userServiceStub = {
                isLoggedIn: true,
                user: {
                    name: 'Jordan'
                }
            }
            TestBed.configureTestingModule({
                declarations: [UserComponent],
                providers: [DataService]
            });
            TestBed.overrideComponent(UserComponent, {
                set: {
                    providers: [
                        {
                            provide: UserService,
                            useValue: userServiceStub
                        }
                    ]
                }
            });
            fixture = TestBed.createComponent(UserComponent);
            comp = fixture.debugElement.componentInstance;
        });
        it ('should create the app', () => {
            expect(comp).toBeTruthy();
        });
        it ('should use the username from the service', () => {
            let userService = fixture.debugElement.injector.get(UserService);
            fixture.detectChanges( );
            expect(userService.user.name).toEqual('Jordan');
        });
        it ('shouldn\'t display the user name if user is not logged in', () => {
            let userService = fixture.debugElement.injector.get(UserService);
            userService.isLoggedIn = false;
            fixture.detectChanges();
            el = fixture.debugElement.nativeElement;
            expect(el.querySelector('p').textContent).not.toContain(comp.user.name);
        });
        it ('should display the user name if user is logged in', () => {
            let userService = fixture.debugElement.injector.get(UserService);
            userService.isLoggedIn = true;
            fixture.detectChanges();
            el = fixture.debugElement.nativeElement;
            expect(el.querySelector('p').textContent).toContain(comp.user.name);
        });
        it (`shouldn't fetch data if not called asynchronously`, () => {
            let dataService = fixture.debugElement.injector.get(DataService);
            let spy = spyOn(dataService, 'getDetails')
                .and.returnValue(Promise.resolve('Data'));
            fixture.detectChanges();
            expect(comp.data).toBe(undefined);
        });
        it (`should fetch data if called asynchronously`, async(() => {
            let dataService = fixture.debugElement.injector.get(DataService);
            let spy = spyOn(dataService, 'getDetails')
                .and.returnValue(Promise.resolve('Chiken'));
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                expect(comp.data).toBe('Chiken');
            });
        }));
    });
    ```
3.  Our strategy for dealing with the asynchronous data is similar to that for data provided directly by a service, but with some difference in the details. Looking at the **configureTestingModule**, we note that we are using the *DataService*, without substituting in a mock service.  However, if we examine the last two tests, we note the following:

    a.  We get the dataService from the **fixture.debugElement.injector.get()** method.
    
    b.  we use the **spyOn()** method to track any calls to the function.  It takes the service and the method names as parameters. When combined with the **.and.returnValue()**, all calls to the function return a specific value.
    
3.  if we look at the second-to-last test, we see that the value of *comp.data* is undefined. This is because of the async nature of the *getDetails()* method; when *fixture.detectChanges()* is called, the promise has not yet resolved.  In order to make this work, we must wrap the entire thing with the **async()** method, which is imported from '@angular/core/testing'. 
  
## XII. Observables 

### Introduction

1. Use of **observables** is an alternative to callbacks or promises for handling asynchronous data, which is used a great deal by Ng4.

2. An **observable** can be thought of as a *data source*. It could be a button waiting for user interaction, an HTTP request, an event triggered in our code, *etc.*

3. In addition to the *observable*, we also have the **observer**, *i.e.*, our code (a *subscribe()* method). Over time, the *observable* might emit a series of events, which our *observer* will listen for and act upon. Eventually, the *observable* might (or might not) complete its task and close. For example, an HTTP request observable will complete upon receipt of the response; an observable waiting for button clicks may exist indefinitely, waiting for more clicks.

4. The observable may emit multiple events, or data packages. The *observer* will have three callbacks, one for handling a data response, one for handling an error response, and one for handling a completion response.

5. Most of what we do in Ng4 is simply understanding that certain items are observables created by Ng4, and then subscribing to them and handling them. However, we can create our own observables, and do more with them.

### Creating an Observable

1. There are many ways of creating an observable. We will start with a very simple example:

    a. In our component, import the *Observable* object from 'rxjs/Observable', and import the package 'rxjs/Rx.
    
    b. In *ngOnInit*, create an Observable that will emit an ascending integer number periodically, with a parameter that gives us the number of milliseconds between number emits:
    ```javascript
    import { Component, OnInit } from '@angular/core';
    import { Observable } from 'rxjs/Observable';
    import 'rxjs/Rx';

    @Component({
    . . . 
    })
    
    export class HomeComponent implements OnInit {
        constructor() { }
        ngOnInit() {
            const myNumbers = Observable.interval(1000);
            myNumbers
            .subscribe(
                (num: number) => {
                    console.log(num);
                }
            );
        }
    }
    ```
    Of course, the above example is a "prepackaged" observable, but it is an example of the kind of things that are available from **rxjs/Rx**.
    
2. In addition, we can create our own, custom observables. What we will do is create the observable using the **Observable.create()** method, which will take as a parameter the **observer** to which it will be linked.

3. Note that this will require import of the **Observer** object from *rxjs/Observer*, in addition to the imports in the prior example.

4. The *observer* will have three methods, **next()**, **error()**, and **complete()**. *next()* is used to transmit data contained as an argument on a success, *error()* is used to deliver data contained as an argument on an error, and *commplete* takes no arguments.

5. As seen in the following example, once we create the observable, we can then subscribe to it, using our three methods.
    ```javascript
    import { Component, OnInit } from '@angular/core';
    import { Observer } from 'rxjs/Observer';
    import { Observable } from 'rxjs/Observable';
    import 'rxjs/Rx';

    @Component({
    . . .
    })
    export class HomeComponent implements OnInit {
        constructor() { }

        ngOnInit() {
            const myObservable = Observable
                .create((observer: Observer<string>) => {
                    setTimeout(() => {
                        observer.next('first package');
                    }, 2000);
                    setTimeout(() => {
                        observer.next('second package');
                    }, 4000);
                    setTimeout(() => {
                        observer.error('this does not work');
                    }, 5000);
                    setTimeout(() => {
                        observer.complete();
                    }, 8000);
                });
            myObservable
            .subscribe(
                (data: string) => {
                    console.log(data);
                },
                (err: string) => {
                    console.log(err);
                },
                () => {
                    console.log('All aboard!');
                }
            );
        }
    }
    ```
    Note that the subscription ends once the observable gets to *complete()*, or *error()*.

### Killing our Observables
1. If we run the first example, we will note that the Observable does not end; *i.e.*, it continues to emit incrementing numbers *ad inifinitum*. Even if we navigate away from the page and the component instances are destroyed, the observable keeps on going. This can be a big waste of resources (*i.e.*, memory leak), if we do not handle it correctly.

2. In order to handle this, we should always be careful to kill off any observables when they are no longer needed - in most cases, when we have navigated away from the page on which they sit.

3. To do this, we should make use of the *OnDestroy* hook and inside it run the **unsubscribe** method on each active **subscription** (not on the observable itself! To do this, we must import *Subscription*, and we must assign our subscriptions to object variables so we can access them in the *OnDestroy()* method, as follows:
    ```javascript
    import { Component, OnInit, OnDestroy } from '@angular/core';
    import { Observer } from 'rxjs/Observer';
    import { Observable } from 'rxjs/Observable';
    import { Subscription } from 'rxjs/Subscription';
    import 'rxjs/Rx';

    @Component({
    . . .
    })
    export class HomeComponent implements OnInit, OnDestroy {
        constructor() { } 
        
        myNumbersSub: Subscription;
        ngOnInit() {
            const myNumbers = Observable.interval(100);
            this.myNumbersSub = myNumbers.subscribe(
                (num: number) => {
                    console.log(num);
                }
            );
        })
        ngOnDestroy() {
            this.myNumbersSub.unsubscribe();
        }
    }
    ```

<span id='webpack'></span>
## XIII. Webpack Setup
1. Setup of Ng4 projects can become extremely complex, due to the large number of component imports, the use of Typescript, and the use of Webpack and compilers to be able to safely use ES6 and more modern features. The easiest way, by far, to get started is to use the Ng4 command line interface (CLI) to get projects up and running.

### A. Using the Angular4 CLI

#### Initial Setup

1. Make certain that NodeJS is installed on your machine. NodeJS itself is not so important, but installation will come with the node package manager (npm), which will be used for installing dependencies.

2. Angular has a cli interface to easily create and manage a new angular project using Webpack. So, the first step is to load it globally using npm:
    ```
    sudo npm install -g @angular/cli
    ```	
3. Then, to start a new project, go to where you want the directory to set up, and type:
    ``` 
    ng new [ProjectName]
    ```	
4. Once it is set up, the project can be started by either of the following from the command line:
    ```
    ng serve
    ```
    This starts a compilation server, and we can access the app at localhost:4200
	
    **Note:** From the command line, we can also start up our app with the command:
    ```
    npm start
    ```
    This, of course, simply refers to the *package.json* file, which runs the *ng serve* command.
    
 #### Additional Features
 
 1. To create a new component, we can simply enter the at the command line:
    ```javascript
    ng generate component [componentName]
    //or ng g c [componentName]
    ```
    This will generate the directory *ComponentName* in the directory in which the command was run, and in it will be the following files:
    
    a.   **componentName.component.css**
    
    b.  **componentName.component.html**
    
    c.  **componentName.component.spec.ts**
    
    d.  **componentName.component.ts**: Note that this file will contain the *OnInit* lifecycle hook.
    
    In addition, it will modify the *app.module* folder to contain the created component.

2.  Some options in using the component creation command are:

    a.  ==--flat== keeps angular from creating a new level of folder,
    
    b.  ==--inline-styles== (or "-is") to keep from creating css folder,
    
    c.  ==--inline-template== (or "-it") to keep from creating a template folder

3. One important file to work with is the **.angular-cli.json** file, which allows us to set a number of the configurations for webpack, which is hidden behind the scenes (there is no *webpack.config* file). For example, if we wish to add Bootstrap to the project, instead of downloading it into the index.html head section, we can use npm, and then add it to the "styles" property, as:
    ```json
    "styels": [
        "styles.css"
        "../node_modules/bootstrap/dist/css/bootstrap.min.css",
    ```
    
### B. Customization of Angular2 Setup

<span id='typescript'></span>
## XIII. Typescript
### Introduction

1. TypeScript is a Microsoft take on JavaScript that transpiles down to regular JavaScript. Thus, any JavaScript can be written as-is in TypeScript, in which case it will merely be converted to itself. However, TypeScript provides a number of extra features, such as *types*, *classes*, *interfaces*, *etc.*.

2. The browser cannot run TypeScript, so it must always be transpiled into JavaScript.  Keep in mind that in transpiling, many features may be unenforceable in JavaScript, but will throw an error during the transpilation.  For example, failure to declare a type for a variable will not make the resulting JavaScript go bad, but it will create a compilation error.

3. The file extension for TypeScript files is **.ts**.

4. The basic goal of TypeScript is to provide a familiar coding environment for users of object-oriented languages such as C#, by providing features such as strong typing and classes.

5. Although much of TypeScript looks foreign to traditional ES5 JavaScript, much of its syntax is now incorporated into ES6 or the ES7 standard.

6. Reasons to use TypeScript:

    a. The strong typing will catch a lot of errors before they occur.
    
    b. Many ECMA-2015, ECMA-2016, *etc.* features come built into TypeScript, giving us access to them without having to deal with Babel or other transpilers.
    
    c. Ng4 was designed with the use of TypeScript in mind, and although everything *can* be done with JavaScript, it is much easier to find documentation, examples, *etc.*, that employ TypeScript.

7. There is no need to install TypeScript onto one's machine, as the project setup will take care of that through the npm modules.  However, if one wishes to install TypeScript, enter the following command to install the TypeScript cli:
    ```
    sudo npm install typescript -g
    ```

8. If the cli tool is installed, we can convert a .ts file into JavaScript by running the command:
    ```
    tsc [filename]
    ```
    This will save the JavaScript file in the same directory. To save it to another location, use the option --outDir, as so:
    ```
    tsc [filename] --outDir [target directory]
    ```
9. Note that even though our code may contain TypeScript errors (for example, we assign a number to a string variable), it will still transpile and create a JavaScript file if the code is valid as JavaScript.

### Types and Typing
1. The defining feature of Typescript is the ability to use typed variables. This is accomplished with the following syntax:
    ```javascript
    var isGood: boolean = true;
    ```
    Note that the declaration of the variable includes the trailing colon and identification of type; in addition, we can assign a value.
    
2. Note that if a type is not assigned to a variable, it will be assigned the type of its initially assigned value.  For example, if we have:
    ```javascript
    let num = "Now is the winter";
		
    num = 4;
    ```
    We will throw a compilation error, because num is given the type of string when it was assigned a string value at time of declaration. The inferring of type **only occurs if assignment is at time of declaration of the variable.**

3. These are basic data types in TypeScript:

    a. **boolean**: true or false
	
    b. **number**: all numbers are floating point values
	
    c. **string**: uses double or single quote marks to delineate strings.
	
    d. **any**: this allows any type, as in JavaScript.
	
    e. **void**: commonly used as the return type of functions that do not return a value.
	
    f. **array**: Arrays are given types (including *any* for a mixed-type array).  There are two ways to denote an array:
    ```javascript
    var myList: number[] // or
		
    var myList: Array<boolean>
		
    var myList: new Array<{name: string, age: number}>
    ```

    g.	**enum**: This is a way of assigning easy-to-access names to sets of numerical values.  Examine the following syntax:
    ```javascript
    enum Height {Short, Medium, Tall};
		
    var x: Height = Height.Short;
    ```
    The above code would establish the enum type *Height* in the first line, then use it in the second line.  In the above case, x would be assigned the default value of 0 (*Height.Medium would be 1, etc.* ).  The default values can be altered as follows:
    ```javascript
    // starts count at 5;
    enum Height {Short = 5, Medium, Tall}
    
    // manually sets each value
    enum Height {Short = 60, Medium = 70, Tall = 76}
    ```
4. In addition, we can create our own types and classes and use them to insure that a variable be only of that type or class.

### Classes

1. Much of the class syntax in TypeScript is now part of the ECMA 6 standard.  However, using TypeScript may be a safer bet, because it transpiles to ECMA 5, and thus we won't have to worry about browser version nearly as much.

2. One concept that does not directly exist in ECMA 6 is private properties of a class. For example:
    ```javascript
    class Car {
        engineName: string;
        gears: number;
        private speed: number;
			
        constructor(speed: number) {
            this.speed = speed || 0;
        }
			
        accelerate(): void {
            this.speed++;
        }
			
        getSpeed(): void {
            console.log(this.speed);
        }
        
        static wheelCount(); number {
            return 4;
        }
    }
    ```

    If marked as **private*, the property is only accessible from within the class, and will throw an error in the TypeScript compiler if one tries to access it from without.  So, in the above example, if one had an instance of the class named *myCar*, one could refer to *myCar.gears*, or *myCar.engineName*, but **not** to *myCar.speed*.  However, *myCar.accelerate()* would be able to increase the speed, and we could actually see the speed by calling *myCar.getSpeed()*; 

3. The **static** keyword is used to indicate a class method that is called on the Class, and **not on an instance** of the Class.  For example, the in the above *Car* class, we find out the number of wheels by **Car.wheelCount()**, not *myCar.wheelCout()*.

4. **A Simple Shortcut**: When creating a **model** (basically, a class that consists only of a constructor), we can perform a shortcut instead of declaring all our variables and assigning them to *this*, as follows:
    ```javascript
    export class Ingredient {
        constructor(
            public name: string,
            public amount: number,
        )
    }
    ```
    The above code is the equivalent of:
    ```javascript
    export class Ingredient {
        public name: string;
        public amount: number;

        constructor(
            name: string,
            amount: number,
        ) {
            this.name = name;
            this.amount = amount;
        }
    }
    ```

### Interfaces

1. An **interface** is basically a template for a collection of data, such as an object, so that we can define each property and type in one place, then use the interface in every place we would otherwise be defining types.

2. Note that this does **not** have any effect on the transpiled JavaScript code, as there is no support for types. However, is does make writing in TypeScript more convenient.

3. An example of an interface would be:
    ```javascript
    interface User {
        username: string;
        password: string;
        confirmPassword?: string;
    }
    
    let user: User;
    ```
    In the above, we are requiring that any User (such as *user*) must have a *username* that will be a string, and a *password* that will be a string. In addition, the **trailing ?** means that a User may have an optional *confirmPassword* value.

4. A good example of using an interface is in the shopping-list app. In that, we were constantly defining an item by its two properties and their types:
    ```javascript
    item<{name: string, amount: number}>
    ```
5. We then created a file for the item interface, *list-item.ts*, with the following simple code:
    ```javaswcript
    export interface ListItem {
        name: string,
        amount: Number
    }
    ```
6. An interface can also prescribe *methods*; however, it does not contain the body of the method, just its name, parameters, and return type:

    ```javascript
    interface CanDrive {
        accelerate(speed: number): void;
    }
    
    let car: CanDrive = {
        accelerate(speed: number) {
            . . .
        }
    }
    ```
### Generics
1. A **type variable** is a special kind of variable that works on *types* rather than *values*. It is denoted with the \< > syntax, as follows:
    ```javascript
    function identity<T>(arg: T): T {
        return arg;
    }
    ```
    In the above method, which simply returns whatever we input as an argument, we  are able to know that our method returns the same type that is input (symbolized by "T"). Then, when we call the method, we can either rely on **type argument inference**, or explicitly set the type, as follows:
    ```javascript
    let myOutput = identity<string>("Now is the winter . . .");
    ```
    
2. A **generic** is a type that can hold or use several types. For example, an **Array** can take any type of value, numbers, strings, etc. We can specify what type it is holding with the type specifier \< > (used as a variable in the function definition above).
    ```javascript
    let numberArray = Array<number>;
    ```
---
:::danger
####Anything below here is still in preliminary draft form and may contain outdated information
:::
---

## The End

###Starting Up
		
####Setting Up a Project Manually with Webpack

1.	In order to document the workings of the setup, this section will begin with the setup of a project that is about as basic as one can devise.  This will be followed up with additional materials such as:

	a.	setting up for testing,
	b.	setting up for multiple environments (dev, test, production),
	c.	setting up linting with es-lint.
	
2.	Note, however, that even the "Hello World" app may have a few more steps than one might expect, given the use of Typescript in Angular2 and the need to transpile such code.

####Building the Super-Basic App

1.	Set up the repository in GitHub.

2.	Clone the repository into your machine.

3.	Run npm init and answer the questions.  You can always go back and change the answers in the *package.json* file.

4.	In the *package.json* file, add the following dependencies (current versions in parens):

	a.	@angular/common (2.1.2),
	
	b.	@angular/compiler (2.1.2)
	
	c.	@angular/core (2.1.2)
	
	d.	@angular/forms (2.1.2)
	
	e.	@angular/http (2.1.2)
	
	f.	@angular/platform-browser (2.1.2)
	
	g.	@angular/platform-browser-dynamic (2.1.2)
	
	h.	@angular/router (3.1.2)
	
	i.	rxjs (5.0.0-beta.12)
	
	j.	zone.js (0.6.26)
	
	k.	core-js (2.4.1)
	
5.	In the *package.json* file, add the following dev-dependencies:

	a.	typescript (2.0.6)
	
	b.	typings (1.5.0)
	
	c.	webpack (1.13.2)
	
	d.	webpack-dev-server (1.16.2)
	
	e.	raw-loader (0.5.1)
	
	f.	awesome-typescript-loader (2.2.4)
	
	g.	html-webpacke-plugin (2.24.1)

6.	run *npm install*

7.	Create the following directories under the project directory:

	a.	src - this is where the source code will be written
	
	b.	webpack - this is where webpack configuration files will be kept.  We could have a single webpack.config.js file at this stage, but lets make the folder and keep our dev config file there, to be joined later by test config.
	
8.	Create the typings.json file in our project root:

		./node_modules/.bin/typings init
		
9.	Install typing for node:

		./node_modules/.bin/typings install env~node --save --global
		
	This will set up the typings folder in the project.
	
10.	Create a *tsconfig.json* file to configure the Typescript transpilation. Below is a sample:

		{
    		"compilerOptions": {
        		"emitDecoratorMetadata": true,
        		"experimentalDecorators": true,
        		"module": "commonjs",
        		"moduleResolution": "node",
        		"noImplicitAny": true,
        		"suppressImplicitAnyIndexErrors": true,
        		"removeComments": false,
        		"sourceMap": true,
        		"target": "es5"
    		},
    	"exclude": [
        	"node_modules",
        	"typings/main",
        	"typings/main.d.ts"
    	]
	}

:::danger
Be sure to include information regarding the relative path issue
:::


11.	In the webpack folder, create a file, *webpack.dev.js*. There will also be a file for *test* and *production*, eventually. In order to access the file, we place the following in the *npm start* command in the *package.json* file:

		 "start": "webpack-dev-server --config ./webpack/webpack.dev.js",

12.	The following is a sample *webpack.dev.js* file:

		'use strict';

		const path = require('path');
		const HtmlWebpack = require('html-webpack-plugin');
		const webpack = require('webpack');
		const ChunkWebpack = webpack.optimize.CommonsChunkPlugin;
		const rootDir = path.resolve(__dirname, '..');

		module.exports = {
			debug: true,
			devtool: 'source-map',
			devServer: {
				contentBase: path.resolve(rootDir, 'dist'),
				port: 3142
			},
			entry: {
				app: [ path.resolve(rootDir, 'src', 'bootstrap') ],
				vendor: [ path.resolve(rootDir, 'src', 'vendor') ]
			},
			module: {
				loaders: [
					{
						test: /\.ts$/,
						loader: 'awesome-typescript-loader',
						exclude: /node_modules/
					},
					{
						test: /\.(css|html)$/,
						loader: 'raw',
						exclude: /node_modules/
					}
				]
			},
			output: {
				filename: '[name].bundle.js',
				path: path.resolve(rootDir, 'dist')
			},
			plugins: [
				new ChunkWebpack({
					filename: 'vendor.bundle.js',
					miniChunks: Infinity,
					name: 'vendor'
				}),
				new HtmlWebpack({
					filename: 'index.html',
					inject: 'body',
					template: path.resolve(rootDir, 'src', 'app', 'index.html')
				})
			],
			resolve: {
				extensions: ['', '.js', '.ts']
			}
		};

13.	In the *src* folder, create a directory *components*, which will hold our Angular2 components.

14.	Create an *index.html* file, with a basic html skeleton.

15.	Create the basic initial component:

	a.	





 	

	

	 

	


