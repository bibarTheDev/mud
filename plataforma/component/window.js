function window_mud(){var t=document.createElement("section"),e=document.createElement("header"),n=document.createElement("h2"),i=document.createElement("div"),d=document.createElement("button"),s=document.createElement("button"),c=document.createElement("button"),l=document.createElement("section"),o=document.createElement("footer"),h=document.createElement("i"),a=document.createElement("i"),u=document.createElement("i");rr=null,divBack=null,this.ReturnConfirm=function(){return rr},this.SetAppendChild=function(t,e){t.appendChild(e)},this.Create=function(m){this.SetAppendChild(t,e),this.SetAppendChild(t,l),this.SetAppendChild(t,o),this.SetAppendChild(e,n),this.SetAppendChild(e,i),this.SetAppendChild(d,h),this.SetAppendChild(s,a),this.SetAppendChild(c,u),this.SetAppendChild(i,d),this.SetAppendChild(i,s),this.SetAppendChild(i,c),this.SetAppendChild(m,t)},this.WindowMUD=function(i,m,r){let p=document.querySelector(i);this.Create(p),this.SetElementAttribute(t,"class","component-window"),this.SetElementAttribute(e,"class","window-header"),this.SetElementAttribute(h,"class","fas fa-window-minimize"),this.SetElementAttribute(a,"class","fas fa-plus"),this.SetElementAttribute(u,"class","fas fa-times"),this.SetElementAttribute(l,"class","window-contains-content"),this.SetElementAttribute(o,"class","window-footer"),d.addEventListener("click",function(){$(".window-contains-content").slideUp(500,"linear")}),s.addEventListener("click",function(){$(".window-contains-content").slideDown(500,"swing")}),c.addEventListener("click",function(){p.removeChild(t)}),this.SetText(n,m)},this.SetElementAttribute=function(t,e,n){t.setAttribute(e,n)},this.SetText=function(t,e){let n=document.createTextNode(e);t.appendChild(n)},this.AddElementWindowContains=function(t){let e=document.querySelector(t);this.SetAppendChild(l,e)},this.Modal=function(i,d,s,h,a,m){let r=document.body,p=document.createElement("div");divBack=p,this.SetElementAttribute(p,"class","background-window "+h),this.Create(p,2),1==s?this.AddElementWindowContains(d):this.SetAppendChild(l,d),this.SetElementAttribute(t,"class","component-window"),this.SetElementAttribute(e,"class","window-header"),this.SetElementAttribute(u,"class","fas fa-times"),this.SetElementAttribute(l,"class","window-contains-content"),this.SetElementAttribute(o,"class","window-footer"),c.addEventListener("click",function(){if(a){let t=document.querySelector(m),e=document.querySelector(d);e.style.display="none",t.appendChild(e)}r.removeChild(p)}),this.SetText(n,i),this.SetAppendChild(r,p)},this.Alert=function(t,e,n,i,d,s,c){let l=document.createElement("section"),o=document.createElement("h3"),h=document.createElement("i"),a=document.createElement("p");this.SetElementAttribute(l,"class","section-a-c"),this.SetElementAttribute(h,"class",i),this.SetText(o,n),this.SetText(a,e),this.SetAppendChild(l,o),this.SetAppendChild(l,h),this.SetAppendChild(l,a),this.Modal(t,l,2,d,s,c)},this.Confirm=function(t,e,n,i,d){let s=document.body,c=document.createElement("section"),l=document.createElement("h3"),o=document.createElement("i"),h=document.createElement("p");div=document.createElement("div"),bCan=document.createElement("button"),bSub=document.createElement("button"),spCan=document.createElement("span"),spSub=document.createElement("span"),bCan.textContent="Não",bSub.textContent="Sim",this.SetAppendChild(bCan,spCan),this.SetAppendChild(bSub,spSub),this.SetAppendChild(div,bSub),this.SetAppendChild(div,bCan),this.SetElementAttribute(bCan,"class","button"),this.SetElementAttribute(bSub,"class","button"),this.SetElementAttribute(div,"class","div-submit-confirm"),this.SetElementAttribute(c,"class","section-a-c"),this.SetElementAttribute(o,"class",i),this.SetText(l,n),this.SetText(h,e),this.SetAppendChild(c,l),this.SetAppendChild(c,o),this.SetAppendChild(c,h),this.SetAppendChild(c,div),this.Modal(t,c,2,d,!1,""),bCan.addEventListener("click",function(){rr=!1,s.removeChild(divBack)}),bSub.addEventListener("click",function(){rr=!0,s.removeChild(divBack)})}}