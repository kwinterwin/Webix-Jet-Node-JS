import {JetView} from "webix-jet";
import {genres} from "models/genres";
import {books} from "models/books";

export default class DataTable extends JetView{
	config(){

		let datatable = {
			view: "datatable",
			localId:"datatable",
			datatype:"json",
			borderless:true,
			select:true,
			columns:[
				{id:"Name", header:"Name", fillspace:2},
				{id:"Year", header:"Year", fillspace:2},
				{id:"Author", header:"Author", fillspace:1},
				{id:"Category", header:"Category", options:genres,fillspace:1},
			],
		};

		let left = {
			rows:[
				{view:"label", label: "Select a field to filter:", align:"left"},
				{view:"richselect",	label:"Name",  options:{body:{template:"#Name#", data:books}}, localId:"Name", on:{
					onChange:()=>{
						let name = this.$$("Name").getText();
						this.$$("datatable").filter((data)=>{
							return data.Name == name;
						});
					}
				}},
				{view:"richselect", label:"Year", options:{body:{template:"#Year#", data:books}}, localId:"Year", on:{
					onChange:()=>{
						let year = this.$$("Year").getText();
						this.$$("datatable").filter((data)=>{
							return data.Year == year;
						});
					}
				}},
				{view:"richselect",	label:"Author", options:{body:{template:"#Author#", data:books}}, localId:"Author", on:{
					onChange:()=>{
						let author = this.$$("Author").getText();
						this.$$("datatable").filter((data)=>{
							return data.Author == author;
						});
					}
				}},
				{view:"richselect",	label:"Category", options:{body:{template:"#value#", data:genres}}, localId:"Category", on:{
					onChange:()=>{
						let category = this.$$("Category").getValue();
						this.$$("datatable").filter((data)=>{
							return data.Category == category;
						});
					}
				}},
				{
					view: "button", 
					label: "Refresh",
					click:()=>{
						this.$$("datatable").filterByAll();
						this.$$("Category").setValue("");
						this.$$("Year").setValue("");
						this.$$("Name").setValue("");
						this.$$("Author").setValue("");
						this.$$("datatable").filter(()=>{
							return 1;
						});
						
					}
				},
				datatable,
				{}
			]
		};

		let uploadServer = {
			view: "button", 
			label: "Upload to server",
			click:()=>{
				this.$$("upload").files.data.each((file)=>{
					this.$$("upload").send(file.id);
				});
				this.$$("img").hide();
			}
		};

		let form = {
			view:"form", localId:"form", rows: [
				{ 
					view:"uploader", 
					label:"Upload file",
					autosend:false, 
					multiple: false,
					localId:"upload",
					link:"mylist",
					upload:"http://localhost:3000/files",
					on:{
						onAfterFileAdd:(upload)=>{
							let reader = new FileReader(); 
							reader.onload = (event) => {
								if(upload.file.type == "image/png" || upload.file.type == "image/gif" || upload.file.type == "image/jpeg"){
									this.$$("img").show();
									this.$$("mylist").hide();
									this.$$("img").setValues(event.target.result);
								}
								else {
									this.$$("mylist").show();
									this.$$("img").hide();
								}
							};    
							return false;
						}, 
						onFileUpload:()=>{
							webix.message({type:"info", text:"File is upload"});
							this.$$("mylist").hide();
						}
					}
				},
				{
					view:"list",  id:"mylist", type:"uploader",
					autoheight:true, borderless:true
				}, 
				{ 
					template:(a)=>{
						return `
									<div class='imageWrape'>
										<img class='image' src=${a}>
									</div>
								`;
					},
					localId:"img",
					hidden:true
				}, 
				uploadServer
			]
		};

		let checkbox = {
			cols:[
				{view:"checkbox", localId:"hideTable", labelRight:"Hide table", checkValue:1, uncheckValue:0, on:{
					onChange:()=>{
						let check = this.$$("hideTable").getValue();
						if(check==0)
							this.$$("datatable").show();
						else
							this.$$("datatable").hide();
					}
				}},
				{view:"checkbox", localId:"hideUpload", labelRight:"Hide upload", value:0, checkValue:1, uncheckValue:0, on:{
					onChange:()=>{
						let check = this.$$("hideUpload").getValue();
						if(check==0)
							this.$$("form").show();
						else
							this.$$("form").hide();
					}
				}}
			]
		};

		let right = {
			rows:[
				checkbox,
				form,
				{}
			]
		};

		return {
			cols:[
				left, right
			]	
		};
	}

	init(){
		this.$$("datatable").sync(books);
	}
}