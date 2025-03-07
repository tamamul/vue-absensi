import{B as d,U as L,j as p,o as c,c as b,q as u,m as o,cj as P,F as A,l as g,v as O,k as m,w as S,p as $,i as w,g as N,ck as y,cl as C,x as k,cm as E,cn as v,c2 as F,co as R,R as I,A as K,a as T,y as f,z as D}from"./index-IT0w0-03.js";import{s as W}from"./index-Cg8qX79j.js";import{s as _}from"./index-D0k6Dizi.js";var H=function(t){var e=t.dt;return`
.p-tabs {
    display: flex;
    flex-direction: column;
}

.p-tablist {
    display: flex;
    position: relative;
}

.p-tabs-scrollable > .p-tablist {
    overflow: hidden;
}

.p-tablist-viewport {
    overflow-x: auto;
    overflow-y: hidden;
    scroll-behavior: smooth;
    scrollbar-width: none;
    overscroll-behavior: contain auto;
}

.p-tablist-viewport::-webkit-scrollbar {
    display: none;
}

.p-tablist-tab-list {
    position: relative;
    display: flex;
    background: `.concat(e("tabs.tablist.background"),`;
    border-style: solid;
    border-color: `).concat(e("tabs.tablist.border.color"),`;
    border-width: `).concat(e("tabs.tablist.border.width"),`;
}

.p-tablist-content {
    flex-grow: 1;
}

.p-tablist-nav-button {
    all: unset;
    position: absolute !important;
    flex-shrink: 0;
    inset-block-start: 0;
    z-index: 2;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: `).concat(e("tabs.nav.button.background"),`;
    color: `).concat(e("tabs.nav.button.color"),`;
    width: `).concat(e("tabs.nav.button.width"),`;
    transition: color `).concat(e("tabs.transition.duration"),", outline-color ").concat(e("tabs.transition.duration"),", box-shadow ").concat(e("tabs.transition.duration"),`;
    box-shadow: `).concat(e("tabs.nav.button.shadow"),`;
    outline-color: transparent;
    cursor: pointer;
}

.p-tablist-nav-button:focus-visible {
    z-index: 1;
    box-shadow: `).concat(e("tabs.nav.button.focus.ring.shadow"),`;
    outline: `).concat(e("tabs.nav.button.focus.ring.width")," ").concat(e("tabs.nav.button.focus.ring.style")," ").concat(e("tabs.nav.button.focus.ring.color"),`;
    outline-offset: `).concat(e("tabs.nav.button.focus.ring.offset"),`;
}

.p-tablist-nav-button:hover {
    color: `).concat(e("tabs.nav.button.hover.color"),`;
}

.p-tablist-prev-button {
    inset-inline-start: 0;
}

.p-tablist-next-button {
    inset-inline-end: 0;
}

.p-tablist-prev-button:dir(rtl),
.p-tablist-next-button:dir(rtl) {
    transform: rotate(180deg);
}


.p-tab {
    flex-shrink: 0;
    cursor: pointer;
    user-select: none;
    position: relative;
    border-style: solid;
    white-space: nowrap;
    background: `).concat(e("tabs.tab.background"),`;
    border-width: `).concat(e("tabs.tab.border.width"),`;
    border-color: `).concat(e("tabs.tab.border.color"),`;
    color: `).concat(e("tabs.tab.color"),`;
    padding: `).concat(e("tabs.tab.padding"),`;
    font-weight: `).concat(e("tabs.tab.font.weight"),`;
    transition: background `).concat(e("tabs.transition.duration"),", border-color ").concat(e("tabs.transition.duration"),", color ").concat(e("tabs.transition.duration"),", outline-color ").concat(e("tabs.transition.duration"),", box-shadow ").concat(e("tabs.transition.duration"),`;
    margin: `).concat(e("tabs.tab.margin"),`;
    outline-color: transparent;
}

.p-tab:not(.p-disabled):focus-visible {
    z-index: 1;
    box-shadow: `).concat(e("tabs.tab.focus.ring.shadow"),`;
    outline: `).concat(e("tabs.tab.focus.ring.width")," ").concat(e("tabs.tab.focus.ring.style")," ").concat(e("tabs.tab.focus.ring.color"),`;
    outline-offset: `).concat(e("tabs.tab.focus.ring.offset"),`;
}

.p-tab:not(.p-tab-active):not(.p-disabled):hover {
    background: `).concat(e("tabs.tab.hover.background"),`;
    border-color: `).concat(e("tabs.tab.hover.border.color"),`;
    color: `).concat(e("tabs.tab.hover.color"),`;
}

.p-tab-active {
    background: `).concat(e("tabs.tab.active.background"),`;
    border-color: `).concat(e("tabs.tab.active.border.color"),`;
    color: `).concat(e("tabs.tab.active.color"),`;
}

.p-tabpanels {
    background: `).concat(e("tabs.tabpanel.background"),`;
    color: `).concat(e("tabs.tabpanel.color"),`;
    padding: `).concat(e("tabs.tabpanel.padding"),`;
    outline: 0 none;
}

.p-tabpanel:focus-visible {
    box-shadow: `).concat(e("tabs.tabpanel.focus.ring.shadow"),`;
    outline: `).concat(e("tabs.tabpanel.focus.ring.width")," ").concat(e("tabs.tabpanel.focus.ring.style")," ").concat(e("tabs.tabpanel.focus.ring.color"),`;
    outline-offset: `).concat(e("tabs.tabpanel.focus.ring.offset"),`;
}

.p-tablist-active-bar {
    z-index: 1;
    display: block;
    position: absolute;
    inset-block-end: `).concat(e("tabs.active.bar.bottom"),`;
    height: `).concat(e("tabs.active.bar.height"),`;
    background: `).concat(e("tabs.active.bar.background"),`;
    transition: 250ms cubic-bezier(0.35, 0, 0.25, 1);
}
`)},U={root:function(t){var e=t.props;return["p-tabs p-component",{"p-tabs-scrollable":e.scrollable}]}},j=d.extend({name:"tabs",theme:H,classes:U}),M={name:"BaseTabs",extends:p,props:{value:{type:[String,Number],default:void 0},lazy:{type:Boolean,default:!1},scrollable:{type:Boolean,default:!1},showNavigators:{type:Boolean,default:!0},tabindex:{type:Number,default:0},selectOnFocus:{type:Boolean,default:!1}},style:j,provide:function(){return{$pcTabs:this,$parentInstance:this}}},q={name:"Tabs",extends:M,inheritAttrs:!1,emits:["update:value"],data:function(){return{id:this.$attrs.id,d_value:this.value}},watch:{"$attrs.id":function(t){this.id=t||L()},value:function(t){this.d_value=t}},mounted:function(){this.id=this.id||L()},methods:{updateValue:function(t){this.d_value!==t&&(this.d_value=t,this.$emit("update:value",t))},isVertical:function(){return this.orientation==="vertical"}}};function G(a,t,e,s,i,n){return c(),b("div",o({class:a.cx("root")},a.ptmi("root")),[u(a.$slots,"default")],16)}q.render=G;var J={root:"p-tabpanels"},Q=d.extend({name:"tabpanels",classes:J}),X={name:"BaseTabPanels",extends:p,props:{},style:Q,provide:function(){return{$pcTabPanels:this,$parentInstance:this}}},Y={name:"TabPanels",extends:X,inheritAttrs:!1};function Z(a,t,e,s,i,n){return c(),b("div",o({class:a.cx("root"),role:"presentation"},a.ptmi("root")),[u(a.$slots,"default")],16)}Y.render=Z;var tt={root:function(t){var e=t.instance;return["p-tabpanel",{"p-tabpanel-active":e.active}]}},at=d.extend({name:"tabpanel",classes:tt}),et={name:"BaseTabPanel",extends:p,props:{value:{type:[String,Number],default:void 0},as:{type:[String,Object],default:"DIV"},asChild:{type:Boolean,default:!1},header:null,headerStyle:null,headerClass:null,headerProps:null,headerActionProps:null,contentStyle:null,contentClass:null,contentProps:null,disabled:Boolean},style:at,provide:function(){return{$pcTabPanel:this,$parentInstance:this}}},nt={name:"TabPanel",extends:et,inheritAttrs:!1,inject:["$pcTabs"],computed:{active:function(){var t;return P((t=this.$pcTabs)===null||t===void 0?void 0:t.d_value,this.value)},id:function(){var t;return"".concat((t=this.$pcTabs)===null||t===void 0?void 0:t.id,"_tabpanel_").concat(this.value)},ariaLabelledby:function(){var t;return"".concat((t=this.$pcTabs)===null||t===void 0?void 0:t.id,"_tab_").concat(this.value)},attrs:function(){return o(this.a11yAttrs,this.ptmi("root",this.ptParams))},a11yAttrs:function(){var t;return{id:this.id,tabindex:(t=this.$pcTabs)===null||t===void 0?void 0:t.tabindex,role:"tabpanel","aria-labelledby":this.ariaLabelledby,"data-pc-name":"tabpanel","data-p-active":this.active}},ptParams:function(){return{context:{active:this.active}}}}};function st(a,t,e,s,i,n){var r,l;return n.$pcTabs?(c(),b(A,{key:1},[a.asChild?u(a.$slots,"default",{key:1,class:N(a.cx("root")),active:n.active,a11yAttrs:n.a11yAttrs}):(c(),b(A,{key:0},[!((r=n.$pcTabs)!==null&&r!==void 0&&r.lazy)||n.active?g((c(),m($(a.as),o({key:0,class:a.cx("root")},n.attrs),{default:S(function(){return[u(a.$slots,"default")]}),_:3},16,["class"])),[[O,(l=n.$pcTabs)!==null&&l!==void 0&&l.lazy?!0:n.active]]):w("",!0)],64))],64)):u(a.$slots,"default",{key:0})}nt.render=st;var it={root:"p-tablist",content:function(t){var e=t.instance;return["p-tablist-content",{"p-tablist-viewport":e.$pcTabs.scrollable}]},tabList:"p-tablist-tab-list",activeBar:"p-tablist-active-bar",prevButton:"p-tablist-prev-button p-tablist-nav-button",nextButton:"p-tablist-next-button p-tablist-nav-button"},rt=d.extend({name:"tablist",classes:it}),ot={name:"BaseTabList",extends:p,props:{},style:rt,provide:function(){return{$pcTabList:this,$parentInstance:this}}},ct={name:"TabList",extends:ot,inheritAttrs:!1,inject:["$pcTabs"],data:function(){return{isPrevButtonEnabled:!1,isNextButtonEnabled:!0}},resizeObserver:void 0,watch:{showNavigators:function(t){t?this.bindResizeObserver():this.unbindResizeObserver()},activeValue:{flush:"post",handler:function(){this.updateInkBar()}}},mounted:function(){var t=this;this.$nextTick(function(){t.updateInkBar()}),this.showNavigators&&(this.updateButtonState(),this.bindResizeObserver())},updated:function(){this.showNavigators&&this.updateButtonState()},beforeUnmount:function(){this.unbindResizeObserver()},methods:{onScroll:function(t){this.showNavigators&&this.updateButtonState(),t.preventDefault()},onPrevButtonClick:function(){var t=this.$refs.content,e=this.getVisibleButtonWidths(),s=y(t)-e,i=Math.abs(t.scrollLeft),n=s*.8,r=i-n,l=Math.max(r,0);t.scrollLeft=C(t)?-1*l:l},onNextButtonClick:function(){var t=this.$refs.content,e=this.getVisibleButtonWidths(),s=y(t)-e,i=Math.abs(t.scrollLeft),n=s*.8,r=i+n,l=t.scrollWidth-s,h=Math.min(r,l);t.scrollLeft=C(t)?-1*h:h},bindResizeObserver:function(){var t=this;this.resizeObserver=new ResizeObserver(function(){return t.updateButtonState()}),this.resizeObserver.observe(this.$refs.list)},unbindResizeObserver:function(){var t;(t=this.resizeObserver)===null||t===void 0||t.unobserve(this.$refs.list),this.resizeObserver=void 0},updateInkBar:function(){var t=this.$refs,e=t.content,s=t.inkbar,i=t.tabs,n=k(e,'[data-pc-name="tab"][data-p-active="true"]');this.$pcTabs.isVertical()?(s.style.height=E(n)+"px",s.style.top=v(n).top-v(i).top+"px"):(s.style.width=F(n)+"px",s.style.left=v(n).left-v(i).left+"px")},updateButtonState:function(){var t=this.$refs,e=t.list,s=t.content,i=s.scrollTop,n=s.scrollWidth,r=s.scrollHeight,l=s.offsetWidth,h=s.offsetHeight,B=Math.abs(s.scrollLeft),x=[y(s),R(s)],V=x[0],z=x[1];this.$pcTabs.isVertical()?(this.isPrevButtonEnabled=i!==0,this.isNextButtonEnabled=e.offsetHeight>=h&&parseInt(i)!==r-z):(this.isPrevButtonEnabled=B!==0,this.isNextButtonEnabled=e.offsetWidth>=l&&parseInt(B)!==n-V)},getVisibleButtonWidths:function(){var t=this.$refs,e=t.prevButton,s=t.nextButton,i=0;return this.showNavigators&&(i=((e==null?void 0:e.offsetWidth)||0)+((s==null?void 0:s.offsetWidth)||0)),i}},computed:{templates:function(){return this.$pcTabs.$slots},activeValue:function(){return this.$pcTabs.d_value},showNavigators:function(){return this.$pcTabs.scrollable&&this.$pcTabs.showNavigators},prevButtonAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.previous:void 0},nextButtonAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.next:void 0}},components:{ChevronLeftIcon:W,ChevronRightIcon:_},directives:{ripple:I}},lt=["aria-label","tabindex"],ut=["aria-orientation"],bt=["aria-label","tabindex"];function dt(a,t,e,s,i,n){var r=K("ripple");return c(),b("div",o({ref:"list",class:a.cx("root")},a.ptmi("root")),[n.showNavigators&&i.isPrevButtonEnabled?g((c(),b("button",o({key:0,ref:"prevButton",class:a.cx("prevButton"),"aria-label":n.prevButtonAriaLabel,tabindex:n.$pcTabs.tabindex,onClick:t[0]||(t[0]=function(){return n.onPrevButtonClick&&n.onPrevButtonClick.apply(n,arguments)})},a.ptm("prevButton"),{"data-pc-group-section":"navigator"}),[(c(),m($(n.templates.previcon||"ChevronLeftIcon"),o({"aria-hidden":"true"},a.ptm("prevIcon")),null,16))],16,lt)),[[r]]):w("",!0),T("div",o({ref:"content",class:a.cx("content"),onScroll:t[1]||(t[1]=function(){return n.onScroll&&n.onScroll.apply(n,arguments)})},a.ptm("content")),[T("div",o({ref:"tabs",class:a.cx("tabList"),role:"tablist","aria-orientation":n.$pcTabs.orientation||"horizontal"},a.ptm("tabList")),[u(a.$slots,"default"),T("span",o({ref:"inkbar",class:a.cx("activeBar"),role:"presentation","aria-hidden":"true"},a.ptm("activeBar")),null,16)],16,ut)],16),n.showNavigators&&i.isNextButtonEnabled?g((c(),b("button",o({key:1,ref:"nextButton",class:a.cx("nextButton"),"aria-label":n.nextButtonAriaLabel,tabindex:n.$pcTabs.tabindex,onClick:t[2]||(t[2]=function(){return n.onNextButtonClick&&n.onNextButtonClick.apply(n,arguments)})},a.ptm("nextButton"),{"data-pc-group-section":"navigator"}),[(c(),m($(n.templates.nexticon||"ChevronRightIcon"),o({"aria-hidden":"true"},a.ptm("nextIcon")),null,16))],16,bt)),[[r]]):w("",!0)],16)}ct.render=dt;var pt={root:function(t){var e=t.instance,s=t.props;return["p-tab",{"p-tab-active":e.active,"p-disabled":s.disabled}]}},ht=d.extend({name:"tab",classes:pt}),vt={name:"BaseTab",extends:p,props:{value:{type:[String,Number],default:void 0},disabled:{type:Boolean,default:!1},as:{type:[String,Object],default:"BUTTON"},asChild:{type:Boolean,default:!1}},style:ht,provide:function(){return{$pcTab:this,$parentInstance:this}}},ft={name:"Tab",extends:vt,inheritAttrs:!1,inject:["$pcTabs","$pcTabList"],methods:{onFocus:function(){this.$pcTabs.selectOnFocus&&this.changeActiveValue()},onClick:function(){this.changeActiveValue()},onKeydown:function(t){switch(t.code){case"ArrowRight":this.onArrowRightKey(t);break;case"ArrowLeft":this.onArrowLeftKey(t);break;case"Home":this.onHomeKey(t);break;case"End":this.onEndKey(t);break;case"PageDown":this.onPageDownKey(t);break;case"PageUp":this.onPageUpKey(t);break;case"Enter":case"NumpadEnter":case"Space":this.onEnterKey(t);break}},onArrowRightKey:function(t){var e=this.findNextTab(t.currentTarget);e?this.changeFocusedTab(t,e):this.onHomeKey(t),t.preventDefault()},onArrowLeftKey:function(t){var e=this.findPrevTab(t.currentTarget);e?this.changeFocusedTab(t,e):this.onEndKey(t),t.preventDefault()},onHomeKey:function(t){var e=this.findFirstTab();this.changeFocusedTab(t,e),t.preventDefault()},onEndKey:function(t){var e=this.findLastTab();this.changeFocusedTab(t,e),t.preventDefault()},onPageDownKey:function(t){this.scrollInView(this.findLastTab()),t.preventDefault()},onPageUpKey:function(t){this.scrollInView(this.findFirstTab()),t.preventDefault()},onEnterKey:function(t){this.changeActiveValue(),t.preventDefault()},findNextTab:function(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,s=e?t:t.nextElementSibling;return s?f(s,"data-p-disabled")||f(s,"data-pc-section")==="inkbar"?this.findNextTab(s):k(s,'[data-pc-name="tab"]'):null},findPrevTab:function(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,s=e?t:t.previousElementSibling;return s?f(s,"data-p-disabled")||f(s,"data-pc-section")==="inkbar"?this.findPrevTab(s):k(s,'[data-pc-name="tab"]'):null},findFirstTab:function(){return this.findNextTab(this.$pcTabList.$refs.content.firstElementChild,!0)},findLastTab:function(){return this.findPrevTab(this.$pcTabList.$refs.content.lastElementChild,!0)},changeActiveValue:function(){this.$pcTabs.updateValue(this.value)},changeFocusedTab:function(t,e){D(e),this.scrollInView(e)},scrollInView:function(t){var e;t==null||(e=t.scrollIntoView)===null||e===void 0||e.call(t,{block:"nearest"})}},computed:{active:function(){var t;return P((t=this.$pcTabs)===null||t===void 0?void 0:t.d_value,this.value)},id:function(){var t;return"".concat((t=this.$pcTabs)===null||t===void 0?void 0:t.id,"_tab_").concat(this.value)},ariaControls:function(){var t;return"".concat((t=this.$pcTabs)===null||t===void 0?void 0:t.id,"_tabpanel_").concat(this.value)},attrs:function(){return o(this.asAttrs,this.a11yAttrs,this.ptmi("root",this.ptParams))},asAttrs:function(){return this.as==="BUTTON"?{type:"button",disabled:this.disabled}:void 0},a11yAttrs:function(){return{id:this.id,tabindex:this.active?this.$pcTabs.tabindex:-1,role:"tab","aria-selected":this.active,"aria-controls":this.ariaControls,"data-pc-name":"tab","data-p-disabled":this.disabled,"data-p-active":this.active,onFocus:this.onFocus,onKeydown:this.onKeydown}},ptParams:function(){return{context:{active:this.active}}}},directives:{ripple:I}};function gt(a,t,e,s,i,n){var r=K("ripple");return a.asChild?u(a.$slots,"default",{key:1,class:N(a.cx("root")),active:n.active,a11yAttrs:n.a11yAttrs,onClick:n.onClick}):g((c(),m($(a.as),o({key:0,class:a.cx("root"),onClick:n.onClick},n.attrs),{default:S(function(){return[u(a.$slots,"default")]}),_:3},16,["class","onClick"])),[[r]])}ft.render=gt;export{ct as a,nt as b,Y as c,q as d,ft as s};
