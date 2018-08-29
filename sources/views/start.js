import {JetView} from "webix-jet";

export default class Start extends JetView{
	config(){

		let header =  { 
			view: "toolbar",
			elements: [
				{
					view: "button", 
					type: "icon", 
					icon: "bars", 
					width: 30, 
					align: "left", 
					click: ()=>{
						this.getRoot().queryView({view:"sidebar"}).toggle();
					}
				},
				{ view: "label", label: "Books"},
			]
		};

		let sidebar = { 
			view: "sidebar",
			localId:"sidebar",
			data:[
				{id:"books", icon: "coffee", value: "Books"},
				{id:"users", icon: "users", value: "Users"},
				{id:"list", icon: "list", value: "List"},
				{id:"settings", icon: "cogs", value: "Setting"},
			],
			on:{
				onAfterSelect: (id)=>{
					let sidebar = this.$$("sidebar");
					this.show(`../start/${sidebar.getItem(id).id}`);
				}
			}
		};
		
		return {
			rows:[
				header,
				{
					cols:[
						sidebar,
						{$subview:true}
					]
				}
			]
		};

	}

	ready(){
		let sidebar = this.getRoot().queryView({view:"sidebar"});
		sidebar.select(sidebar.getFirstId());
	}
}