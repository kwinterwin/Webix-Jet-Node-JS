import {JetView} from "webix-jet";
import {genres} from "models/genres";
import {books} from "models/books";
import WindowEdit from "views/window";

export default class DataTableBook extends JetView{
	config(){
	
		let header =  { 
			view: "toolbar",
			name:"dataset A",
			elements: [
				{ view: "label", label: ""},
				{
					view: "button", 
					label: "Export to excel",
					click:()=>{
						webix.toExcel(this.getRoot().queryView({view:"datatable"}));
					}
				},
				{
					view: "button", 
					label: "Refresh",
				}
			]
		};
		
		
		let datatable = {
			view: "datatable",
			datatype:"json",
			localId:"datatable",
			select:true,
			columns:[
				{id:"Name", header: ["Name" ,{content:"textFilter"}], sort:"string",fillspace:2},
				{id:"Year", header: ["Year" ,{content:"numberFilter"}], sort:"int",fillspace:2},
				{id:"Author", header: ["Some information" ,{content:"textFilter"}], sort:"string",fillspace:1},
				{id:"Category", header: ["Category" ,{content:"selectFilter"}], sort:"string", options:genres,fillspace:1},
			],
			on:{
				onAfterSelect: ()=> {
					let values = this.getRoot().queryView({view:"datatable"}).getSelectedItem();
					this._jetPopup.showWindow(values);
				},
			}
		};


		return {rows:[header, datatable]};
	}
	
	init(view){
		this._jetPopup = this.ui(WindowEdit);
		view.queryView({view:"datatable"}).sync(books);
	}
}

