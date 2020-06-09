import {
    PolymerElement,
    html
} from '../node_modules/@polymer/polymer/polymer-element.js';

import * as IronAjax from '../node_modules/@polymer/iron-ajax/iron-ajax.js';

import '../node_modules/@polymer/polymer/lib/elements/dom-repeat.js';


class EmployeeSearch extends PolymerElement {
   static get template() {
        return html `
            <h3>Статический массив</h3>
            <input value="{{searchString::input}}">
            <template is="dom-repeat" items="{{employees}}" as="employee"
                filter="{{computeFilter(searchString)}}">
                <div>{{employee.lastname}}, {{employee.firstname}}</div>
            </template>
            <h3>-----------------------------</h3>
            <br/>
            <h3>AJAX массив</h3>
            <iron-ajax
                auto
                url="[[apiUrl]][[planet]]"
                handle-as="json"
                on-response="handleRequest"
                last-response="{{planetData}}"
            ></iron-ajax>
            <input value="{{searchString2::input}}">
            <template is="dom-repeat" items="{{planetData}}" as="employee" filter="{{computeFilter(searchString2)}}">
                <br/> <button  on-click="onClickButton" > [[index]]) [[employee.lastname]]  [[employee.firstname]]</button>
            </template>
            <h3>-----------------------------</h3>
        `
        }
   static get properties() {
        return {
           apiUrl: {
                type: String,
                value: 'data/test-emploee.json'
           },
           planet: {
                type: String,
                value: ''
           },
           employees: {
             type: Array,
             value: function() {
               return [
                 { firstname: "Jack", lastname: "Aubrey" },
                 { firstname: "Anne", lastname: "Elliot" },
                 { firstname: "Stephen", lastname: "Maturin" },
                 { firstname: "Emma", lastname: "Woodhouse" }
               ]
             }
           }
        }
   }
   constructor(planet) {
      super();
      this.planet = planet;
   }
   computeFilter(string) {
        if (!string) {
          // set filter to null to disable filtering
          return null;
        } else {
          // return a filter function for the current search string
          string = string.toLowerCase();
          return function(employee) {
            var first = employee.firstname.toLowerCase();
            var last = employee.lastname.toLowerCase();
            return (first.indexOf(string) != -1 ||
                last.indexOf(string) != -1);
          };
        }
   }
   handleRequest() {
       console.log(this.searchString2);
   }
   onClickButton(e){
        var model = e.model;
        model.set('item.ordered', model.employee.firstname+1);
        var last = { firstname: "Pizza="+model.employee.firstname, lastname: '0000' };
        this.push ('planetData', last) ;
   }

}
customElements.define('employee-search', EmployeeSearch);
