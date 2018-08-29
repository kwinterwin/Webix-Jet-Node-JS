import {JetView} from "webix-jet";
import {genres} from "models/genres";
import {books} from "models/books";

export default class WindowEdit extends JetView{
	config(){

		let form = {
			view:"form",
			elements:[{
				rows:[ 
					{view: "text", label:"Name", name:"Name", labelWidth:100},
					{view: "text", label:"Year", name:"Year", labelWidth:100},
					{view: "text", label:"Author", name:"Author", labelWidth:100},
					{view:"combo", label:"Category", options:{ data:genres }, name:"Category", labelWidth:100},
					{view: "textarea", label:"Description", name:"Description", labelWidth:100},
					{
						cols:[
							{},
							{
								view:"button",
								label:"Save",
								type:"form",
								click: () => { 
									let popForm = this.getRoot().queryView({view:"form"});
									let values = popForm.getValues();
									if(!popForm.validate()) return false;
									if(values.id){
										books.updateItem(values.id, values);
									} else{
										books.add(values);
									}
									this.hideFunction();
								}
							},
							{
								view:"button", 
								label:"Cancel", 
								click:() => {
									this.hideFunction();
								}
							},
						]
					}
				]
			}],
		};

		let pop = {
			view:"window",
			position:"center",
			head:"Edit books information", 
			width: 700,
			body: form
		};

		return pop;
	}

	showWindow(values) {
		this.getRoot().queryView({view:"form"}).setValues(values);
		this.getRoot().show();
	}

	hideFunction(){
		let popForm = this.getRoot().queryView({view:"form"});
		popForm.clear();
		popForm.clearValidation();
		this.getRoot().hide();
	}
}

