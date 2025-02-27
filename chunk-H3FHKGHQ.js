import{e as x}from"./chunk-UT4SC3IQ.js";import{$a as I,C as n,F as _,G as b,Ka as g,L as v,Ma as S,Qa as C,R as w,Xa as l,_a as j,ab as k,c as a,cb as f,hb as M,l as u,m as y,o as d,ob as B,qb as R}from"./chunk-3ODZ3UFP.js";import{g as c}from"./chunk-GAL4ENT6.js";var F={formId:"bodyfood",title:"Bodyfood",components:[{name:"Text",key:"name",focused:!0,fields:[{name:"Placeholder",value:"fill bodyfood title"},{name:"Label",value:"Title"}]},{name:"Text",key:"description",fields:[{name:"Placeholder",value:"fill bodyfood description"},{name:"Label",value:"Description"}]}]};var q=(()=>{class i extends j{constructor(e,o,t,s){super({name:"bodyfood"},e,o,t,s)}static{this.\u0275fac=function(o){return new(o||i)(d(k),d(I),d(f),d(l))}}static{this.\u0275prov=u({token:i,factory:i.\u0275fac,providedIn:"root"})}}return i})();var p=(()=>{class i{constructor(e,o,t,s,m,T,D){this._translate=e,this._bodyfoodService=o,this._alert=t,this._form=s,this._core=m,this._router=T,this._route=D,this.columns=["name","description"],this.form=this._form.getForm("bodyfood",F),this.config={paginate:this.setRows.bind(this),perPage:20,setPerPage:this._bodyfoodService.setPerPage.bind(this._bodyfoodService),allDocs:!1,create:()=>{this._form.modal(this.form,{label:"Create",click:(r,h)=>c(this,null,function*(){h(),this._preCreate(r),yield a(this._bodyfoodService.create(r)),this.setRows()})})},update:r=>{this._form.modal(this.form,[],r).then(h=>{this._core.copy(h,r),this._bodyfoodService.update(r)})},delete:r=>{this._alert.question({text:this._translate.translate("Common.Are you sure you want to delete this bodyfood?"),buttons:[{text:this._translate.translate("Common.No")},{text:this._translate.translate("Common.Yes"),callback:()=>c(this,null,function*(){yield a(this._bodyfoodService.delete(r)),this.setRows()})}]})},buttons:[{icon:"cloud_download",click:r=>{this._form.modalUnique("bodyfood","url",r)}}],headerButtons:[{icon:"playlist_add",click:this._bulkManagement(),class:"playlist"},{icon:"edit_note",click:this._bulkManagement(!1),class:"edit"}]},this.rows=[],this.body_id="",this._page=1,this.setRows(),this._route.paramMap.subscribe(r=>{this.body_id=r.get("body_id")||"",console.log(this.body_id)})}setRows(e=this._page){this._page=e,this._core.afterWhile(this,()=>{this._bodyfoodService.get({page:e,query:this._query()}).subscribe(o=>{this.rows.splice(0,this.rows.length),this.rows.push(...o)})},250)}_bulkManagement(e=!0){return()=>{this._form.modalDocs(e?[]:this.rows).then(o=>c(this,null,function*(){if(e)for(let t of o)this._preCreate(t),yield a(this._bodyfoodService.create(t));else{for(let t of this.rows)o.find(s=>s._id===t._id)||(yield a(this._bodyfoodService.delete(t)));for(let t of o){let s=this.rows.find(m=>m._id===t._id);s?(this._core.copy(t,s),yield a(this._bodyfoodService.update(s))):(this._preCreate(t),yield a(this._bodyfoodService.create(t)))}}this.setRows()}))}}_preCreate(e){e.__created=!1,this.body_id&&(e.body=this.body_id)}_query(){let e="";return this.body_id&&(e+=(e?"&":"")+"body="+this.body_id),""}static{this.\u0275fac=function(o){return new(o||i)(n(M),n(q),n(f),n(R),n(l),n(S),n(g))}}static{this.\u0275cmp=_({type:i,selectors:[["ng-component"]],standalone:!1,decls:1,vars:3,consts:[["title","Bodyfood",3,"columns","config","rows"]],template:function(o,t){o&1&&w(0,"wtable",0),o&2&&v("columns",t.columns)("config",t.config)("rows",t.rows)},dependencies:[B],encapsulation:2})}}return i})();var L=[{path:"",component:p},{path:":body_id",component:p}],Z=(()=>{class i{static{this.\u0275fac=function(o){return new(o||i)}}static{this.\u0275mod=b({type:i})}static{this.\u0275inj=y({imports:[C.forChild(L),x]})}}return i})();export{Z as BodyfoodModule};
