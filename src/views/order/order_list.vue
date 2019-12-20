<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="订单编码"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUser">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<template>
			<el-table :data="users" highlight-current-row  height="400" v-loading="loading" style="width: 100%;height:100%;">
				<el-table-column type="index" width="80">
				</el-table-column>
				<el-table-column align="center" prop="id" label="ID" width="80" sortable></el-table-column>
				<el-table-column align="center" prop="goods_id" label="商品id" width="120" sortable></el-table-column>
                
				<el-table-column align="center" prop="out_trade_no" label="订单编码" min-width="220" sortable>
                    <template slot-scope="scope">
                        {{scope.row.out_trade_no}}

                <!-- 　　　　<img :src="scope.row.goods_img_url" width="60" height="60" class="head_pic"/> -->
                　　</template>
				</el-table-column> 
				<el-table-column align="center" prop="goods_name" label="商品名称" width="200" sortable></el-table-column>
				<el-table-column align="center" prop="goods_price" label="商品价钱" width="120" sortable></el-table-column>
                <el-table-column align="center" label="商品图片">
                　　<template slot-scope="scope">
                　　　　<img :src="scope.row.goods_img_url" width="60" height="60" class="head_pic"/>
                　　</template>
                </el-table-column>
				<el-table-column align="center" prop="status" label="状态" min-width="160" sortable>
					<template slot-scope="scope">
						<div v-if="!scope.row.status">{{scope.row.status}}未付款</div>
						<div v-if="scope.row.status==3">{{scope.row.status}}已付款</div>
						<div v-if="scope.row.status==7">{{scope.row.status}}已发货</div>
						<div v-if="scope.row.status==4">{{scope.row.status}}已签收</div>
						<div v-if="scope.row.status==5">{{scope.row.status}}已完成</div>
						<div v-if="scope.row.status==6">{{scope.row.status}}申请退款中</div>
						<div v-if="scope.row.status==8">{{scope.row.status}}已退款</div>
						<div v-if="scope.row.status==-1">{{scope.row.status}}已取消</div>
						<el-button v-if="scope.row.status==3" type="primary" v-on:click="fahuoBtn(scope.row)">发货</el-button>
						<el-button v-if="scope.row.status==6" type="primary" v-on:click="fahuoBtn2(scope.row)">确认退款</el-button>

                <!-- 　　　　<img :src="scope.row.goods_img_url" width="60" height="60" class="head_pic"/> -->
                　　</template>
				</el-table-column>

				<el-table-column align="center" prop="all_day" label="总天数" min-width="100" sortable>
				</el-table-column>
				<el-table-column align="center" prop="all_price" label="总价钱" min-width="120" sortable>
				</el-table-column>
				<el-table-column align="center" prop="start_time" label="开始时间" min-width="180" sortable>
				</el-table-column>
				<el-table-column align="center" prop="end_time" label="结束时间" min-width="180" sortable>
				</el-table-column>

				<el-table-column align="center" prop="token" label="token" min-width="180" sortable>
				</el-table-column>
				<el-table-column align="center" prop="receiver_info_mobile" label="收货人电话" min-width="180" sortable>
				</el-table-column>
				<el-table-column align="center" prop="receiver_info_name" label="收货人姓名" min-width="180" sortable>
				</el-table-column>
				<el-table-column align="center" prop="creat_time" label="创建时间" min-width="180" sortable>
				</el-table-column>
				<el-table-column label="操作" width="150">
					<template scope="scope">
						<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</template>
            <!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
	</section>
</template>
<script>
    // import { getUserList } from '../../api/api';
    import Api from "../../api/api";

	//import NProgress from 'nprogress'
	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				total: 0,
				page: 1,
				loading: false,
				users: []
			}
		},
		methods: {
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
            },
            adminUserinfo(type=0){
                Api.admin_order_list({
					page:this.page,
					type:type
                }).then(res=>{
                    res=JSON.parse(res)
                    if(res['success']){
                        console.log(res)
                        res=res.result
                        
                        res.data.map(obj=>{
                            obj.goods=JSON.parse(obj.goods);
                            obj.receiver_info=JSON.parse(obj.receiver_info);
                            obj.goods_name=obj.goods.name
                            obj.goods_price=obj.goods.price
                            obj.goods_img_url=obj.goods.img_url
                            obj.receiver_info_mobile=obj.receiver_info.mobile
                            obj.receiver_info_name=obj.receiver_info.name
                            // obj.headportrait="https://1434253600.xyz/"+obj.headportrait
                        })
                        this.users = res.data;
                        console.log(this.users)
                    }else{

                    }
                })
			},
			delAdminUserinfo(id,index){
                Api.admin_order_list({
					page:this.page,
					id:id,
					type:3
                }).then(res=>{
                    res=JSON.parse(res)
                    if(res['success']){
                        this.$message({
							message: '删除成功',
							type: 'success'
						});
						var users=this.users;
						users.splice(index,1);
						this.users=users;
                    }else{
						this.$message.error('删除失败！');
                    }
                })
            },
			//获取用户列表
			getUser: function () {
                if(/.*[\u4e00-\u9fa5]+.*$/.test(this.filters.name)) { 
					this.$message.error('token输入不能含有中文！');
                    return; 
                } 
                Api.admin_openid({
                    page:this.page,
                    token:this.filters.name,
					type:1
                }).then(res=>{
                    res=JSON.parse(res)
                    if(res['success']){
                        console.log(res)
                        this.$message({
							message: '查询成功',
							type: 'success'
						});
                        res=res.result
                        res.data.map(obj=>{
                            // obj.headportrait="https://1434253600.xyz/"+obj.headportrait
                        })
                        this.users = res.data;
                    }else{
						this.$message.error('该用户不存在！');
                    }
                })
            },
            handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//删除
			handleDel: function (index, row) {
				console.log(index,row);
				// return
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					//NProgress.start();
					this.delAdminUserinfo(row.id,index)
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			fahuoBtn(row){
				console.log(row)
				Api.admin_order_list({
					page:this.page,
					id:row.id,
					status:7,
					type:2
                }).then(res=>{
                    res=JSON.parse(res)
                    if(res['success']){
                        this.$message({
							message: '操作成功',
							type: 'success'
						});
                    }else{
						this.$message.error('删除失败！');
                    }
                })
			},
			fahuoBtn2(row){
				Api.admin_order_list({
					page:this.page,
					id:row.id,
					status:8,
					type:2
                }).then(res=>{
                    res=JSON.parse(res)
                    if(res['success']){
                        this.$message({
							message: '操作成功',
							type: 'success'
						});
                    }else{
						this.$message.error('删除失败！');
                    }
                })
			}
		},
		mounted() {
            // this.getUser();
            console.log('--------------')
            this.adminUserinfo()
		}
	};

</script>

<style >

</style>