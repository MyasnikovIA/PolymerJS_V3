import {
    PolymerElement,
    html
} from '../node_modules/@polymer/polymer/polymer-element.js';

import * as IronAjax from '../node_modules/@polymer/iron-ajax/iron-ajax.js';
import '../node_modules/@polymer/polymer/lib/elements/dom-repeat.js';

class PolymerApp extends PolymerElement {
    static get properties() {
        return {
           planetData: {
                type: Array,
                value: []
           },
           planet: {
                type: String,
                value: ''
            },
            who: {
                type: String,
                value: 'Medium'
            },
            apiUrl: {
                type: String,
                value: 'data/test.json'
            },
            searchString: {
                type: String,
                value: ''
            },
            menuItems : {
               type: Array,
               value: [
                  { name: "Pizza", ordered: 0 },
                  { name: "Pasta", ordered: 0 },
                  { name: "Toast", ordered: 0 }
               ]
            }
        }
    }
    static get template() {
        return html `
            <iron-ajax
                auto
                url="[[apiUrl]][[planet]]"
                handle-as="json"
                on-response="handleRequest"
                last-response="{{planetData}}"
            ></iron-ajax>
        <div class="app-container">
            <br/>Hello [[who]]
            <br/>[[planetData]]
            <br/>  <br/>
            <template is="dom-repeat" items="{{planetData}}">
                <br/> <button  on-click="onClickButton" > [[index]]) [[item.Pole1]]  [[item.ordered]]</button>
            </template>
            <br/>
            <br/>
            <br/>[[menuItems]]
            <br/>
           <input value="{{searchString::input}}">
           <template is="dom-repeat" items="{{menuItems}}">
                <div>
                  <span>{{item.name}}</span>
                  <span>{{item.ordered}}</span>
                  <button on-click="orderTest">orderTest</button>
                </div>
            </template>
        </div>
        <style>
            .app-container {
                text-align: center;
                height: 100vh;
                width: 100vw;
                background-color: #e3e3e3;
                /*display: flex; */
                align-items: center;
                justify-content: center;
            }
        </style>
        `;
    }
    constructor(planet) {
        super();
        this.planet = planet;
    }
    handleRequest() {
        console.log(this.planetData);
    }
    onClickButton(evn) {
        var model = evn.model;
        model.set('model.item.ordered', model.item.ordered+1);
        console.log('model.item',model.item);
        this.planetData.push({"Pole1" :"FirstUser"+model.item.ordered,"ordered": 0});
    }
    orderTest(e) {
        var model = e.model;
        model.set('item.ordered', model.item.ordered+1);
        var last = { name: "Pizza="+model.item.ordered, ordered: 0 };
        this.push ('menuItems', last) ;
    }
}
customElements.define('polymer-app', PolymerApp);