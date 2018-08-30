import {JetView} from "webix-jet";
import {genres} from "models/genres";
import {books} from "models/books";

export default class DataTable extends JetView{
	config(){

		let list = {
			view:"list",
			localId:"list",
			select:true,
			on:{
				onAfterSelect: ()=> {
					this.$$("datatable").filter((data)=>{
						let values = this.$$("list").getSelectedItem();
						return data.Category == values.id;
					});
				}
			}
		};

		let datatable = {
			view: "datatable",
			localId:"datatable",
			datatype:"json",
			select:true,
			editable:true,
			gravity: 3,
			editaction:"dblclick",
			columns:[
				{id:"Name", editor:"text", header:"Name",fillspace:2},
				{id:"Year", editor:"text", header:"Year",fillspace:1},
				{id:"Author", editor:"text", header:"Author",fillspace:2},
				{id:"Category", editor:"combo", header:"Category", options:genres, fillspace:1},
			],
			on:{
				onAfterEditStop:()=>{
					let values = this.$$("datatable").getSelectedItem();
					this.$$("template").setValues(values);
				},
				onAfterSelect: ()=> {
					let values = this.$$("datatable").getSelectedItem();
					this.$$("template").show();
					this.$$("template").setValues(values);
				}
			}
		};

		let template = {	
			view:"template",
			gravity:3,
			hidden:true,
			localId:"template",
			template:(obj)=>{
				let category = "";
				if(typeof genres.getItem(obj.Category) != "undefined")
					category = genres.getItem(obj.Category).value;
				return `
				<div>
					<div><h2>${obj.Name}</h2></div>
					<div>Year: ${obj.Year}</div>
					<div>Author: ${obj.Author}</div>
					<div>Category: ${category}</div>
					<div>About: ${obj.Description}</div>
				</div>
			`;
			}
		};

		return  {cols:[list, datatable, template]};
	}
	init(){
		this.$$("datatable").sync(books);
		this.$$("list").sync(genres);
	}
}

