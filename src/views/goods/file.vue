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
            <span class="demonstration">商品轮播图</span>
            <el-upload
                action="https://1434253600.xyz/api/upload/uploadfile"
                ref="upload"
                list-type="picture-card"
                :on-preview="handlePreview"
                :auto-upload="false"
                :on-success="uploadSuccess"
                :file-list="users"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-button style="margin-left: 10px;" size="small" type="success">上传到服务器</el-button>
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
		},
		mounted() {

		}
	};

</script>

<style >

</style>