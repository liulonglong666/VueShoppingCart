new Vue({
	el:'.container',
	data:{
		limitNum:3,
		addressList:[],
		currentIndex:0,
		shippingMethod:1,
		delAddress:false,
		curItem:'',
		editAddress:false,
		editName:'',
		editStreetAddress:'',
		editTel:'',
		editAddId:''
	},
	mounted:function(){
		this.$nextTick(function(){
			this.getAddressList();
		})
	},
	computed:{
		filterAddress:function(){
			return this.addressList.slice(0,this.limitNum);
		}
		
	},
	methods:{
		getAddressList:function(){
			var _this=this;
			this.$http.get("data/address.json").then(function(response){
				var res=response.data;
				if(res.status=="0"){
					_this.addressList=res.result;
				}
			})
		},
		loadMore:function(){
			this.limitNum=this.addressList.length;
		},
		setDefault:function(addressId){
			this.addressList.forEach(function(address,index){
				if(address.addressId==addressId){
					address.isDefault=true;
				}else{
					address.isDefault=false;
				}
			})
		},
		//点击删除
		dela:function(item){
			this.delAddress=true;
			this.curItem=item;
		},
		//确认删除
		delAddressList:function(){
			this.delAddress=false;
			var index=this.addressList.indexOf(this.curItem);
			this.addressList.splice(index,1);
		},
		//点击编辑
		editAdd:function(item){
			this.editAddress=true;
			this.editAddId=item.addressId;
			this.editName=item.userName;
			this.editStreetAddress=item.streetName;
			this.editTel=item.tel;
		},
		sureEditAdd:function(addressId){
			this.editAddress=false;
			var _this=this;
			this.addressList.forEach(function(item,index){
				if(item.addressId==addressId){
					item.userName=_this.editName;
					item.streetName=_this.editStreetAddress;
					item.tel=_this.editTel;
				}
			})
			
		}
	}
})
