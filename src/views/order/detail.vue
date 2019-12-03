<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.order" placeholder="订单编码"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="adminUserinfo">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
        <div class="block" >
            <!-- <span class="demonstration">{{ fit }}</span> -->
            <el-col :span="6" class="toolbar" v-for="fit in users" :key="fit" style="padding-bottom: 0px;">
                <img :src="fit.img_url" style="width: 100px; height: 100px" alt="" srcset="" />
            </el-col>
        </div>
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
                    order:''
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
                Api.admin_detail({
					good_id:this.filters.order
                }).then(res=>{
                    res=JSON.parse(res)
                    if(res['success']){
                        console.log(res)
                        res=res.result
                        
                        res.data.map(obj=>{
                            obj.img_url="https://1434253600.xyz/"+obj.img_url
                        })
                        this.users = res.data;
                        console.log(this.users)
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
            // this.adminUserinfo()
		}
	};

</script>

<style >

</style>