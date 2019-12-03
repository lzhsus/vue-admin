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
        <!-- 列表 -->
        <template>
			<el-table :data="users" highlight-current-row max-height="800" height="800" v-loading="loading" style="width: 100%;">
				<el-table-column type="index" width="60"></el-table-column>
				<el-table-column align="center" prop="id" label="ID" width="120" sortable></el-table-column>
				
                <el-table-column align="center" label="图片" >
                　　<template slot-scope="scope">
                    <img :src="scope.row.img_url" width="60" height="60" class="head_pic"/>
                　　</template>
                </el-table-column>
                <el-table-column align="center" label="是否在线" sortable min-width="100">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.is_on_line"
                         on-color="#00A854" 
                         on-text="启动" 
                         on-value="true" 
                         off-color="#F04134" off-text="禁止" off-value="false"
                            @change="changeSwitch(scope.row)"></el-switch>
                　　</template>
                </el-table-column>
			</el-table>
        </template>

        <div class="block" >
            <span class="demonstration">商品轮播图</span>
            <el-upload
                action="https://1434253600.xyz/api/upload/uploadfile"
                ref="upload"
                list-type="picture-card"
                :on-preview="handlePreview"
                :auto-upload="false"
                :on-success="uploadSuccess"
                :file-list="banner"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-button style="margin-left: 10px;" size="small" type="success"  @click="submitUpload">上传到服务器</el-button>
        </div>
        <div class="block" >
            <span class="demonstration">商品轮播图</span>
            <el-upload
                action="https://1434253600.xyz/api/upload/uploadfile"
                ref="upload"
                list-type="picture-card"
                :on-preview="handlePreview"
                :auto-upload="false"
                :on-success="uploadSuccess"
                :file-list="detail"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-button style="margin-left: 10px;" size="small" type="success"  @click="submitUpload">上传到服务器</el-button>
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
                users: [],
                banner:[],
                detail:[]
			}
		},
		methods: {
            adminUserinfo(type=0){
                var _this=this
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
                        this.users=res.data;
                    }else{

                    }
                })
			},
            uploadSuccess(response, file, fileList){
                console.log("上传文件成功response" ,response);
                console.log("上传文件成功file" ,file);
                console.log("上传文件成功fileList" ,fileList);
                // response：即为后端传来的数据，这里我返回的是图片的路径
                
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
		},
		mounted() {

		}
	};

</script>

<style >

</style>