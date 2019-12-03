<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.mobile" placeholder="输入用户手机号码"></el-input>
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
				<el-table-column align="center" prop="nickname" label="姓名" width="120" sortable>
				</el-table-column>
				<el-table-column align="center" prop="mobile" label="手机号码" width="100" sortable>
				</el-table-column>
                <el-table-column align="center" label="头像">
                　　<template slot-scope="scope">
                　　　　<img :src="scope.row.headportrait" width="60" height="60" class="head_pic"/>
                　　</template>
                </el-table-column>
				<el-table-column align="center" prop="country" label="地区" width="120" sortable>
				</el-table-column>
				<el-table-column align="center" prop="introduce" label="友介" min-width="180" sortable>
				</el-table-column>
				<el-table-column align="center" prop="occupation" label="职业" min-width="180" sortable>
				</el-table-column>
				<el-table-column align="center" prop="password" label="密码" min-width="180" sortable>
				</el-table-column>
				<el-table-column align="center" prop="timeestamp" label="创建时间" min-width="180" sortable>
				</el-table-column>
				<el-table-column align="center" prop="token" label="token" min-width="180" sortable>
				</el-table-column>
				<el-table-column align="center" prop="yzcode" label="验证码" min-width="180" sortable>
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
					name: '',
					mobile:''
				},
				mobile:'',
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
                Api.admin_userinfo({
					page:this.page,
					type:type
                }).then(res=>{
                    res=JSON.parse(res)
                    if(res['success']){
                        console.log(res)
                        res=res.result
                        res.data.map(obj=>{
                            obj.headportrait="https://1434253600.xyz/"+obj.headportrait
                        })
                        this.users = res.data;
                    }else{

                    }
                })
			},
			delAdminUserinfo(row,index){
                Api.admin_userinfo({
					page:this.page,
					id:row.id,
					token:row.token,
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
			//获取指定用户
			isMobilePhone(s) {
				let re = /^(((13[0-9]{1})|(15[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
				return re.test(s);
			},
			getUser: function () {
				if(!this.isMobilePhone(this.filters.mobile)){
					this.$message.error('手机号输入有误，请重新输入！');
					return
				}
				Api.admin_userinfo({
					page:this.page,
					mobile:this.filters.mobile,
					type:1
                }).then(res=>{
                    res=JSON.parse(res)
                    if(res['success']){
                        this.$message({
							message: '查询成功',
							type: 'success'
						});
						
						res=res.result
                        res.data.map(obj=>{
                            obj.headportrait="https://1434253600.xyz/"+obj.headportrait
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
					this.delAdminUserinfo(row,index)
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
            this.adminUserinfo()
		}
	};

</script>

<style >

</style>