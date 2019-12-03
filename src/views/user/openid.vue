<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="请输入用户token"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUser">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<template>
			<el-table :data="users" highlight-current-row max-height="850" height="600" v-loading="loading" style="width: 100%;">
				<el-table-column type="index" width="60">
				</el-table-column>
				<el-table-column align="center" prop="id" label="ID" width="120" sortable></el-table-column>
				<el-table-column align="center" prop="nickname" label="昵称" width="120" sortable>
				</el-table-column>
                <el-table-column align="center" label="头像">
                　　<template slot-scope="scope">
                　　　　<img :src="scope.row.headimgurl" width="60" height="60" class="head_pic"/>
                　　</template>
                </el-table-column>
				<el-table-column align="center" prop="isMember" label="是否会员" min-width="180" sortable>
				</el-table-column>
				<el-table-column align="center" prop="unionid" label="unionid" min-width="180" sortable>
				</el-table-column>
				<el-table-column align="center" prop="token" label="token" min-width="180" sortable>
				</el-table-column>
				<el-table-column align="center" prop="openid" label="openid" min-width="180" sortable>
				</el-table-column>
				<el-table-column align="center" prop="session_key" label="session_key" min-width="180" sortable>
				</el-table-column>
				<el-table-column align="center" prop="creat_time" label="创建时间" min-width="180" sortable>
				</el-table-column>
				<el-table-column align="center" prop="updata_time" label="更新时间" width="120" sortable>
				</el-table-column>
				<!-- <el-table-column label="操作" width="150">
					<template scope="scope">
						<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column> -->
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
                Api.admin_openid({
					page:this.page,
					type:type
                }).then(res=>{
                    res=JSON.parse(res)
                    if(res['success']){
                        console.log(res)
                        res=res.result
                        res.data.map(obj=>{
                            // obj.headportrait="https://1434253600.xyz/"+obj.headportrait
                        })
                        this.users = res.data;
                    }else{

                    }
                })
			},
			delAdminUserinfo(id,index){
                Api.admin_openid({
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