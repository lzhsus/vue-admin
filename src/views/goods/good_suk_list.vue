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
                <el-col :span="8">
                    <el-form-item>
                        <el-button type="primary" @click="handleAdd">新增</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="sx" icon="el-icon-refresh-left">刷新</el-button>
                    </el-form-item>
                </el-col>
			</el-form>
		</el-col>
		<!--列表-->
		<template>
			<el-table :data="users" highlight-current-row max-height="850" height="600" v-loading="loading" style="width: 100%;">
				<el-table-column type="index" width="60"></el-table-column>
				<el-table-column align="center" prop="id" label="ID" width="120" sortable></el-table-column>
				<el-table-column align="center" prop="good_id" label="good_id" width="120" sortable></el-table-column>
				<el-table-column align="center" prop="value" label="value" width="320" sortable></el-table-column>
				<el-table-column align="center" label="是否在线" sortable min-width="120">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.is_on_line"
                         on-color="#00A854" 
                         on-text="启动" 
                         on-value="true" 
                         off-color="#F04134" off-text="禁止" off-value="false"
                            @change="changeSwitch(scope.row)"></el-switch>
                　　</template>
                </el-table-column>
				<el-table-column align="center" prop="creat_time" label="创建时间" min-width="120" sortable></el-table-column>
                <el-table-column align="center" prop="updata_time" label="更新时间" min-width="120" sortable></el-table-column>

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
        <!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" ref="editForm">
				<el-form-item label="名称value" prop="value">
					<el-input v-model="editForm.value" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="大类good_id" prop="good_id">
                    <el-input v-model="editForm.good_id" auto-complete="off"></el-input>
                </el-form-item>
                <!-- img_url -->
                <el-form-item>
                    <el-form-item label="是否上线">
                        <el-switch v-model="editForm.is_on_line" on-color="#00A854" on-text="启动" on-value="true" off-color="#F04134" off-text="禁止" off-value="false"></el-switch>          
				    </el-form-item>
                </el-form-item> 
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>
        <!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
            <div style="padding:20px;">模板：29.00-26.00-23.00-9.00</div>
			<el-form :model="addForm" label-width="80px" ref="addForm">
				<el-form-item label="名称value" prop="value">
					<el-input v-model="addForm.value" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="大类good_id" prop="good_id">
                    <el-input v-model="addForm.good_id" auto-complete="off"></el-input>
                </el-form-item>
                <!-- img_url -->
                <el-form-item>
                    <el-form-item label="是否上线">
                        <el-switch v-model="addForm.is_on_line" on-color="#00A854" on-text="启动" on-value="true" off-color="#F04134" off-text="禁止" off-value="false"></el-switch>          
				    </el-form-item>
                </el-form-item> 
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
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
					class: '',
                    sign:'',
                    id:'',
                    open:"true",
                    close:"false"
                },
                value: false,//选择在线 
				mobile:'',
				total: 0,
				page: 1,
				loading: false,
                users: [],
                editFormVisible:false,
                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                editLoading:false,
                //新增界面数据
                editFileList: [
                ],
				editForm: {
                    good_id: "",
                    value: '',
                    is_on_line: "false"
				},
                fileList: [
                ],
                
				addForm: {
                    good_id: "",
                    value: '',
                    is_on_line: "false"
				}
			}
		},
		methods: {
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
            },
            adminUserinfo(type=0){
                Api.admin_suk_list({
					page:this.page,
					type:type
                }).then(res=>{
                    res=JSON.parse(res)
                    if(res['success']){
                        console.log(res)
                        res=res.result
                        res.data.map(obj=>{
                            obj.img_url="https://1434253600.xyz/"+obj.img_url
                        })
                        this.users = res.data;
                    }else{

                    }
                })
			},
			delAdminUserinfo(row,index){
                Api.admin_suk_list({
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
			queryBtn (id) {
                var is_on_line=false
                var data={
                    page:this.page,
					type:1
                }
                if(id==1){
                    data.class=this.filters.class
                }
                if(id==2){
                    data.sign=this.filters.sign
                }
                if(id==3){
                    data.id=this.filters.id
                }
                if(id==4){
                    data.hint=1
                    data.is_on_line=this.filters.open
                }
                if(id==5){
                    data.hint=1
                    data.is_on_line=this.filters.close
                }
				Api.admin_suk_list(data).then(res=>{
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
                this.editForm.img_url=row.img_url.replace('https://1434253600.xyz/','')
            },
            editSubmit(){
                var editForm=this.editForm
                console.log(this.editFileList)
               var data=editForm;
                this.$refs.editForm.validate((valid) => {
					if (valid) { 
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            data.all=1
                            data.type=2
                            console.log('data------',data)
                            
                            Api.admin_suk_list(data).then(res=>{
                                res=JSON.parse(res)
                                if(res['success']){
                                    this.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                    this.$refs['editForm'].resetFields();
                                    this.editFormVisible = false;
                                }else{
                                    this.$message.error('该用户不存在！');
                                }
                            })
                        })
                    }
                })

            },
            //显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
                    value: "",
                    good_id: '',
                    is_on_line: "false",
				};
            },
            //新增
			addSubmit: function () {
                console.log('addForm',this.addForm)
                console.log(this.fileList)
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            var data=this.addForm;
                            data.page=1
                            data.type=4

                            Api.admin_suk_list(data).then(res=>{
                                res=JSON.parse(res)
                                if(res['success']){
                                    this.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                    this.$refs['addForm'].resetFields();
                                    this.addFormVisible = false;
                                }else{
                                    this.$message.error('该用户不存在！');
                                }
                            })
                        })
                    }
                })
            },
            uploadSuccess(response, file, fileList){
                console.log("上传文件成功response" ,response);
                console.log("上传文件成功file" ,file);
                console.log("上传文件成功fileList" ,fileList);
                // response：即为后端传来的数据，这里我返回的是图片的路径
                this.addForm.img_url=response.data[0]
            },
            uploadSuccess2(response, file, fileList){
                console.log("上传文件成功response" ,response);
                console.log("上传文件成功file" ,file);
                console.log("上传文件成功fileList" ,fileList);
                // response：即为后端传来的数据，这里我返回的是图片的路径
                this.editForm.img_url=response.data[0]
            },
             submitUpload() {
                this.$refs.upload.submit();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            onChange(file){
                console.log(file);
            },
            changeOnLine(index,row){
                // console.log(index,row)
            },
            changeSwitch(row){
                var is_on_line=0
                console.log(row)
                if(row.is_on_line=="true"){
                    // 关闭
                    is_on_line=true
                    console.log('1---',row.is_on_line)
                }
                if(row.is_on_line=="false"){
                    // 开启
                    is_on_line=false
                    console.log('2---',row.is_on_line)
                }
                Api.admin_suk_list({
					page:this.page,
					id:row.id,
					is_on_line:is_on_line,
					type:2
                }).then(res=>{
                    res=JSON.parse(res)
                    if(res['success']){
                        this.$message({
							message: '修改成功！',
							type: 'success'
						});
                    }else{
						this.$message.error('修改失败！');
                    }
                })
            },
            sx(){
                this.adminUserinfo()
            },
            handleLook(index,row){
                console.log(index,row)
                this.$router.push({
                    path: '/goodBanner', //跳转的路径
                    params: {
                        name: 'name',
                        dataObj: row
                    },
                    query:{
                        name: 'name',
                        dataObj: row
                    }
                })
            }
		},
		mounted() {
            this.adminUserinfo()
		}
	};

</script>

<style >

</style>