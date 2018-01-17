var vm=new Vue({
	el:"#app",
	data:{
		totalMoney:0,
		productList:{},
		checkAllFlag:false,
		delFlag:false,
		curProduct:''
	},
	filters:{
		formatMoney:function(value){
			return "￥"+value.toFixed(2);//局部过滤器只能在本实例中调用
		}
	},
	
	mounted:function(){
		
		this.$nextTick(function(){
			vm.cartView();
		})
	},
	methods:{
		cartView:function(){
			var _this=this;
			this.$http.get("data/cartData.json",{"id":123}).then(res=>{
				this.productList=res.data.result.list;
				//this.totalMoney=res.data.result.totalMoney;
			})
		},
		changeMoney:function(product,way){
			if(way>0){
				product.productQuantity++;
			}else{
				product.productQuantity--;
				if(product.productQuantity<1){
					product.productQuantity=1;
				}
			}
			this.callTotalPrice();
		},
		selectedProduct:function(item){//选择商品
			var _this=this;
			if(typeof(item.checked) == 'undefined'){
				//Vue.set(item,"checked",true);
				this.$set(item,"checked",true);
			}else{
				item.checked =!item.checked;
			}
			
			this.callTotalPrice();
		},
		checkAll:function(flag){
			this.checkAllFlag = flag;
			var _this=this;
			this.productList.forEach(function(item,index){
				if(typeof(item.checked) == 'undefined'){
				   _this.$set(item,"checked",_this.checkAllFlag);
			}else{
				item.checked =_this.checkAllFlag;
			}
			})
			this.callTotalPrice();
		},
		callTotalPrice:function(){
			var _this=this;
			this.totalMoney=0;
			this.productList.forEach(function(item,index){
				
			  if(item.checked){
			  	_this.totalMoney += item.productPrice * item.productQuantity;
			  }
			})
		},
		delConfirm:function(item){
			this.delFlag=true;
			this.curProduct=item;
		},
		delProduct:function(){
//			this.delProduct.$delete(this.curProduct);//1.0版本时的删除方法
            var index=this.productList.indexOf(this.curProduct);
            this.productList.splice(index,1);
            this.delFlag=false;
		}
	}
});
Vue.filter("money",function(value,type){
	return "￥"+value.toFixed(2)+type;
})
//全局过滤器，在任意一页面都可以调用