import {JetView} from "webix-jet";

export default class DataTable extends JetView{
	config(){

		let datatable = {
			view: "datatable",
			datatype:"json",
			localId:"usersDatatable",
			select:true,
			editable:true,
			editaction:"dblclick",
			datafetch:10,
			loadahead:30,
			columns:[
				{id:"FirstName", editor:"text", header: ["Name" ,{content:"serverFilter"}], sort:"server",fillspace:1},
				{id:"LastName", editor:"text", header: ["Surname" ,{content:"serverFilter"}], sort:"server",fillspace:2},
				{id:"Phone", editor:"text", header: ["Phone" ,{content:"serverFilter"}], sort:"server",fillspace:2},
				{id:"Job", editor:"text", header: ["Job" ,{content:"serverFilter"}], sort:"server",fillspace:1}
			],
			url:"http://localhost:3000/users",
			save:"rest->http://localhost:3000/users/"
		};
		return datatable;
	}
}

