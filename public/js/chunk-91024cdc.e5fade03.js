(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-91024cdc"],{"18ea":function(e,t,r){"use strict";r("e772")},"1dde":function(e,t,r){var i=r("d039"),n=r("b622"),a=r("2d00"),o=n("species");e.exports=function(e){return a>=51||!i((function(){var t=[],r=t.constructor={};return r[o]=function(){return{foo:1}},1!==t[e](Boolean).foo}))}},"3a72":function(e,t,r){},5899:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(e,t,r){var i=r("1d80"),n=r("5899"),a="["+n+"]",o=RegExp("^"+a+a+"*"),s=RegExp(a+a+"*$"),c=function(e){return function(t){var r=String(i(t));return 1&e&&(r=r.replace(o,"")),2&e&&(r=r.replace(s,"")),r}};e.exports={start:c(1),end:c(2),trim:c(3)}},7156:function(e,t,r){var i=r("861d"),n=r("d2bb");e.exports=function(e,t,r){var a,o;return n&&"function"==typeof(a=t.constructor)&&a!==r&&i(o=a.prototype)&&o!==r.prototype&&n(e,o),e}},"82cc":function(e,t,r){"use strict";var i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"movieCard"},[r("div",{staticClass:"app-tabs mb-5"},[r("b-tabs",{attrs:{"content-class":"mt-3"}},[r("b-tab",{attrs:{title:"Sinopsis",active:""}},[r("b-card",{staticClass:"mb-3 app-card-movie",attrs:{title:e.movie.title,"img-src":e.url_poster+"/"+e.movie.poster_path,"img-alt":e.movie.title,"img-left":""}},[r("b-card-text",[e._v(" "+e._s(e.movie.overview)+" ")]),r("WriteReview",{staticClass:"mt-5",attrs:{movie_id:e.movie_id,token:e.token}})],1)],1),r("b-tab",{attrs:{title:"Cast"}},[r("b-list-group",e._l(e.credits,(function(t,i){return r("b-list-group-item",{key:i,staticClass:"d-flex align-items-center"},["Acting"===t.known_for_department?[r("b-avatar",{staticClass:"mr-3",attrs:{variant:"info",src:e.url_poster+"/"+t.profile_path}}),r("span",{staticClass:"mr-auto"},[e._v(e._s(t.name)+" as "),r("b",[e._v(" "+e._s(t.character)+" ")])])]:e._e()],2)})),1)],1)],1)],1)])},n=[],a=(r("99af"),r("a9e3"),r("96cf"),r("1da1")),o=r("e804"),s="http://localhost:3000/vfilm",c={name:"MovieCard",props:{movie_id:String|Number,token:String},components:{WriteReview:o["a"]},data:function(){return{movie:"",credits:"",url_poster:"https://image.tmdb.org/t/p/original"}},created:function(){this.init()},methods:{init:function(){this.getMovie()},getMovie:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.axios.get("".concat(s,"/movie/").concat(e.movie_id));case 3:r=t.sent,e.movie=r.data.movie,e.credits=r.data.credits.cast,t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](0),console.log(t.t0);case 11:case"end":return t.stop()}}),t,null,[[0,8]])})))()}}},u=c,v=(r("a02e"),r("2877")),d=Object(v["a"])(u,i,n,!1,null,"7003684a",null);t["a"]=d.exports},8418:function(e,t,r){"use strict";var i=r("c04e"),n=r("9bf2"),a=r("5c6c");e.exports=function(e,t,r){var o=i(t);o in e?n.f(e,o,a(0,r)):e[o]=r}},"99af":function(e,t,r){"use strict";var i=r("23e7"),n=r("d039"),a=r("e8b5"),o=r("861d"),s=r("7b0b"),c=r("50c4"),u=r("8418"),v=r("65f0"),d=r("1dde"),l=r("b622"),f=r("2d00"),p=l("isConcatSpreadable"),h=9007199254740991,m="Maximum allowed index exceeded",_=f>=51||!n((function(){var e=[];return e[p]=!1,e.concat()[0]!==e})),b=d("concat"),w=function(e){if(!o(e))return!1;var t=e[p];return void 0!==t?!!t:a(e)},g=!_||!b;i({target:"Array",proto:!0,forced:g},{concat:function(e){var t,r,i,n,a,o=s(this),d=v(o,0),l=0;for(t=-1,i=arguments.length;t<i;t++)if(a=-1===t?o:arguments[t],w(a)){if(n=c(a.length),l+n>h)throw TypeError(m);for(r=0;r<n;r++,l++)r in a&&u(d,l,a[r])}else{if(l>=h)throw TypeError(m);u(d,l++,a)}return d.length=l,d}})},a02e:function(e,t,r){"use strict";r("3a72")},a9e3:function(e,t,r){"use strict";var i=r("83ab"),n=r("da84"),a=r("94ca"),o=r("6eeb"),s=r("5135"),c=r("c6b6"),u=r("7156"),v=r("c04e"),d=r("d039"),l=r("7c73"),f=r("241c").f,p=r("06cf").f,h=r("9bf2").f,m=r("58a8").trim,_="Number",b=n[_],w=b.prototype,g=c(l(w))==_,x=function(e){var t,r,i,n,a,o,s,c,u=v(e,!1);if("string"==typeof u&&u.length>2)if(u=m(u),t=u.charCodeAt(0),43===t||45===t){if(r=u.charCodeAt(2),88===r||120===r)return NaN}else if(48===t){switch(u.charCodeAt(1)){case 66:case 98:i=2,n=49;break;case 79:case 111:i=8,n=55;break;default:return+u}for(a=u.slice(2),o=a.length,s=0;s<o;s++)if(c=a.charCodeAt(s),c<48||c>n)return NaN;return parseInt(a,i)}return+u};if(a(_,!b(" 0o1")||!b("0b1")||b("+0x1"))){for(var C,k=function(e){var t=arguments.length<1?0:e,r=this;return r instanceof k&&(g?d((function(){w.valueOf.call(r)})):c(r)!=_)?u(new b(x(t)),r,k):x(t)},E=i?f(b):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,fromString,range".split(","),R=0;E.length>R;R++)s(b,C=E[R])&&!s(k,C)&&h(k,C,p(b,C));k.prototype=w,w.constructor=k,o(n,_,k)}},c69e:function(e,t,r){"use strict";var i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"reviewCard"},[r("b-container",[r("b-alert",{attrs:{show:e.submit,variant:e.error.deleted?"success":"danger"}},[e._v(e._s(e.error.deleted?"Review successfully deleted":e.error.msg))])],1),0!=e.reviews.length?e._l(e.reviews,(function(t,i){return r("b-card",{key:i,staticClass:"m-3",class:e.user._id==t.user_id?"app-review-card":"",attrs:{"border-variant":"secondary","header-border-variant":"secondary",header:t.username}},[r("b-card-text",{staticClass:"text-justify"},[e._v(" "+e._s(t.content)+" ")]),e.user._id==t.user_id?r("b-button",{staticClass:"app-button-review-card",attrs:{variant:"info"},on:{click:function(r){return e.updateReview(t._id)}}},[r("b-icon",{attrs:{icon:"pencil-square"}}),e._v("Update your review")],1):e._e(),e.user._id==t.user_id?r("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.confirm-delete",modifiers:{"confirm-delete":!0}}],staticClass:"app-button-review-card app-margin-left",attrs:{variant:"danger"}},[r("b-icon",{attrs:{icon:"trash"}}),e._v("Delete")],1):e._e(),e.user._id==t.user_id?r("b-modal",{attrs:{id:"confirm-delete"},on:{ok:function(r){return e.deleteReview(t._id)}}},[r("p",{staticClass:"my-4"},[e._v("Are you sure you want to delete this review?")])]):e._e()],1)})):[r("p",{staticClass:"text-center"},[e._v(" There are no reviews availables ")])]],2)},n=[],a=(r("99af"),r("a9e3"),"http://localhost:3000/vfilm"),o={name:"ReviewCard",data:function(){return{reviews:"",user:"",submit:!1,error:{deleted:Boolean,msg:String}}},props:{movie_id:String|Number,token:String},created:function(){this.init()},methods:{init:function(){this.getReviews(),this.getUser()},getReviews:function(){var e=this;this.axios.get("".concat(a,"/review/for/").concat(this.movie_id)).then((function(t){e.reviews=t.data.reviews})).catch((function(e){console.log(e.response)}))},getUser:function(){var e=this;this.token&&this.axios.get("".concat(a,"/user"),{headers:{authorization:this.token}}).then((function(t){e.user=t.data.user})).catch((function(e){console.log(e)}))},updateReview:function(e){this.$router.push({path:"/review/update/".concat(e)})},deleteReview:function(e){var t=this;this.submit=!0,this.axios.delete("".concat(a,"/review/").concat(e),{headers:{authorization:this.token}}).then((function(e){t.error.deleted=!0,setTimeout((function(){return t.$router.push({path:"/"})}),800)})).catch((function(e){console.log(e.response),t.error.deleted=!1,t.error.msg=e.response.data.errors.msg}))}}},s=o,c=(r("18ea"),r("2877")),u=Object(c["a"])(s,i,n,!1,null,"8da1b86c",null);t["a"]=u.exports},def6:function(e,t,r){"use strict";r.r(t);var i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"movie"},[r("MovieCard",{attrs:{movie_id:e.movie_id,token:e.token}}),r("ReviewCard",{attrs:{movie_id:e.movie_id,token:e.token}})],1)},n=[],a=r("82cc"),o=r("c69e"),s=r("e804"),c={name:"Movie",components:{MovieCard:a["a"],ReviewCard:o["a"],WriteReview:s["a"]},data:function(){return{movie_id:this.$route.params.movie_id,movie:"",credits:"",url_poster:"https://image.tmdb.org/t/p/original"}},computed:{token:function(){return this.$store.getters.isAuth}}},u=c,v=r("2877"),d=Object(v["a"])(u,i,n,!1,null,"43cb743c",null);t["default"]=d.exports},e772:function(e,t,r){},e804:function(e,t,r){"use strict";var i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.reviewPath()?e._e():r("div",{staticClass:"writeReview"},[e.reviewExist?[e._m(0),r("b-button",{attrs:{variant:"info"},on:{click:function(t){return e.goUpdateReview()}}},[r("b-icon",{attrs:{icon:"pencil-square"}}),e._v(" Update review ")],1)]:[r("b-button",{staticClass:"app-button",on:{click:function(t){return e.goReviewMovie()}}},[r("b-icon",{attrs:{icon:"pencil-square"}}),e._v(" Write a review ")],1)]],2)},n=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("p",[r("small",[e._v(" You has already review this movie!")])])}],a=(r("99af"),r("a9e3"),"http://localhost:3000/vfilm"),o={name:"WriteReview",props:{movie_id:String|Number,token:String},data:function(){return{reviewExist:""}},methods:{goReviewMovie:function(){this.$router.push({path:"/review/movie/".concat(this.movie_id)})},reviewPath:function(){return this.$route.path=="/review/movie/".concat(this.movie_id)},goUpdateReview:function(){this.$router.push({path:"/review/update/".concat(this.reviewExist._id)})}},created:function(){var e=this;this.token&&this.axios.get("".concat(a,"/review/for/").concat(this.movie_id,"/user"),{headers:{authorization:this.token}}).then((function(t){e.reviewExist=t.data.review[0]})).catch((function(e){console.log(e)}))}},s=o,c=r("2877"),u=Object(c["a"])(s,i,n,!1,null,"7ac21560",null);t["a"]=u.exports}}]);
//# sourceMappingURL=chunk-91024cdc.e5fade03.js.map